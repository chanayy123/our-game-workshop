import * as THREE from 'three';

/** One background draw, with the same linear horizon color as the water fog. */
export function createCoastalSky() {
  const material = new THREE.ShaderMaterial({
    side: THREE.BackSide, depthWrite: false, depthTest: false, toneMapped: false,
    uniforms: {
      horizonColor: { value: new THREE.Color(0xe6eee3) },
      zenithColor: { value: new THREE.Color(0x9ec8dc) },
      glowColor: { value: new THREE.Color(0xfff1cd) },
      glowStrength: { value: .07 },
    },
    vertexShader: `
      varying vec3 direction;
      void main() {
        direction = position;
        vec4 clip = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        gl_Position = clip.xyww;
      }
    `,
    fragmentShader: `
      uniform vec3 horizonColor;
      uniform vec3 zenithColor;
      uniform vec3 glowColor;
      uniform float glowStrength;
      varying vec3 direction;
      void main() {
        vec3 ray = normalize(direction);
        float height = smoothstep(0.0, 0.18, max(0.0, ray.y));
        vec3 color = mix(horizonColor, zenithColor, pow(height, 0.65));
        float halo = pow(max(0.0, dot(ray, normalize(vec3(-0.5, 0.18, -1.0)))), 45.0);
        color += glowColor * halo * glowStrength * smoothstep(0.0, 0.12, ray.y);
        gl_FragColor = vec4(color, 1.0);
        #include <colorspace_fragment>
      }
    `,
  });
  const sky = new THREE.Mesh(new THREE.SphereGeometry(190, 24, 16), material);
  sky.frustumCulled = false; sky.renderOrder = -1000;
  return sky;
}

/** A deliberately small, original water shader: no render targets or reflection pass. */
export function createCoastalWater() {
  return new THREE.ShaderMaterial({
    uniforms: {
      time: { value: 0 },
      travel: { value: 0 },
      deepColor: { value: new THREE.Color(0x329b98) },
      shallowColor: { value: new THREE.Color(0x78cbb5) },
      skyColor: { value: new THREE.Color(0xe6eee3) },
      sunColor: { value: new THREE.Color(0xfff3d7) },
    },
    vertexShader: `
      varying vec3 world;
      void main() {
        vec4 p = modelMatrix * vec4(position, 1.0);
        world = p.xyz;
        gl_Position = projectionMatrix * viewMatrix * p;
      }
    `,
    fragmentShader: `
      uniform float time;
      uniform float travel;
      uniform vec3 deepColor;
      uniform vec3 shallowColor;
      uniform vec3 skyColor;
      uniform vec3 sunColor;
      varying vec3 world;
      void main() {
        vec2 p = world.xz + vec2(0.0, -travel);
        float warp = sin(p.x*0.13 + p.y*0.19 + time*0.2)*0.7;
        float a = p.x * 0.39 + p.y * 0.2 + time * 0.85 + warp;
        float b = p.x * -0.25 + p.y * 0.57 - time * 0.68 + sin(p.x*0.09+p.y*0.11)*1.3;
        float c = p.x * 1.17 + p.y * 0.74 + time * 1.3 + sin(a+b)*0.8;
        vec3 n = normalize(vec3(-cos(a)*0.06 + cos(b)*0.04 - cos(c)*0.018,
          1.0, -cos(a)*0.035 - cos(b)*0.06 - cos(c)*0.014));
        vec3 view = normalize(cameraPosition - world);
        float fresnel = pow(1.0 - max(0.0, dot(n, view)), 3.0);
        float shore = 1.0 - smoothstep(4.7, 13.0, abs(world.x));
        float swells = sin(a) * 0.5 + sin(b) * 0.3;
        vec3 color = mix(deepColor, shallowColor, clamp(0.18 + shore*0.4 + swells*0.045, 0.0, 1.0));
        color = mix(color, skyColor, fresnel * 0.24);
        vec3 light = normalize(vec3(-0.5, 0.9, 0.5));
        float sparkle = pow(max(dot(n, normalize(light + view)), 0.0), 130.0);
        color += sunColor * sparkle * 0.38;
        float wave = sin(abs(world.x)*8.0 + p.y*0.15 - time*2.0);
        float foam = (1.0-smoothstep(4.6, 5.6, abs(world.x))) * smoothstep(0.5, 0.95, wave);
        color = mix(color, shallowColor*0.6 + vec3(0.4), foam*0.55);
        float fleck = smoothstep(0.91, 0.98, sin(c)*sin(p.x*0.82-p.y*1.5-time));
        color += vec3(fleck * 0.065 * (1.0-fresnel));
        float fog = smoothstep(38.0, 135.0, distance(cameraPosition, world));
        gl_FragColor = vec4(color, 1.0);
        #include <tonemapping_fragment>
        // The solid scene background is not tone-mapped. Blend after tone
        // mapping, before output conversion, so the far plane joins it exactly.
        gl_FragColor.rgb = mix(gl_FragColor.rgb, skyColor, fog);
        #include <colorspace_fragment>
      }
    `,
  });
}
