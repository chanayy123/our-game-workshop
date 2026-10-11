# Dinosaur asset provenance

Verified 2026-09-26. This directory contains the actual downloaded, animated asset, not a placeholder mesh.

- Title: **Animated Tyrannosaurus Rex Dinosaur Running Loop**
- Author/uploader: **LasquetiSpice**
- Original: https://sketchfab.com/3d-models/animated-tyrannosaurus-rex-dinosaur-running-loop-38007d947ae74dea83988cb0b08ee053
- Author profile: https://sketchfab.com/LasquetiSpice
- License supplied by the original model page, glTF metadata and bundled license: **CC BY 4.0** — https://creativecommons.org/licenses/by/4.0/
- Public redistribution mirror used: https://huggingface.co/datasets/fernandotonon/QtMeshEditor-motion-corpus/tree/main/raw/sketchfab/Animated_Tyrannosaurus_Rex_Dinosaur_Running_Loop_38007d94
- Original `license.txt` is retained unchanged. Original download hashes and the runtime file hash are in `source-manifest.json`.

The mirror provides the original glTF, textures, animation and attribution files openly without a login. No Sketchfab viewer extraction or access-control workaround was used. The upstream author profile mentions several third-party model libraries in general; it does not identify a separate author for this individual model. This project preserves the license and attribution supplied for this individual asset. No claim of independent authorship verification is made.

## Actual content verified from the files

- 11,938 triangles, one skinned mesh, one PBR material, 75 skin joints.
- Authored clips: `run` (9.267 s), `bite` (10.967 s), `roar` (9 s), `attack_tail` (6 s), `idle` (11.867 s).
- **There is no separate authored walk clip.** The V0 walking state reuses the supplied running cycle at a lower playback speed. Turning comes from the controller while skeletal animation continues.
- Skin texture detail comes from the original 2048px diffuse, normal and occlusion maps. Material conversion also produces 1024px roughness/specular maps.

## Changes made for this prototype

1. Converted the obsolete `KHR_materials_pbrSpecularGlossiness` workflow into metallic-roughness PBR with optional `KHR_materials_specular` and `KHR_materials_ior`, supported by the selected Three.js GLTFLoader.
2. Losslessly removed redundant animation keyframes with glTF Transform `resample`.
3. Embedded model, animations and texture images in `trex.glb`.
4. Runtime normalizes body length to 11 metres, places idle-pose feet at ground zero, confirms head direction from the bones, and blends actions.
5. A desaturated earthy color grade is applied in the runtime material shader; source texture detail is retained.
6. V0.3 corrects the converted material's extreme IOR (1000) to 1.45 at runtime, adjusts dielectric highlights, and adds wetness-driven roughness/clearcoat. Chest breathing, gentle slope pitch, and subtle idle head motion are layered on the existing rig. The topology and original animation files are unchanged; this is not a new walking animation or full foot IK.

Conversion commands (glTF Transform CLI 4.2.1, installed SDK dependencies resolved to 4.5.0):

```powershell
npm exec --yes --package=@gltf-transform/cli@4.2.1 -- gltf-transform metalrough scene.gltf trex-pbr.glb
npm exec --yes --package=@gltf-transform/cli@4.2.1 -- gltf-transform resample trex-pbr.glb trex.glb
```

Validation: Three.js 0.180.0 parsed the actual GLB and sampled the beginning, middle and end of every authored animation; all produced finite skinned bounds. The glTF validator found no errors. Upstream warnings include unused UV channels, zero-weight joint references and a nested skinned mesh; the selected Three.js runtime was checked directly for these structures. Visual browser acceptance remains a separate step.

## Required credit

This work is based on **“Animated Tyrannosaurus Rex Dinosaur Running Loop”** by **LasquetiSpice**, licensed under **CC BY 4.0**. Original source: https://sketchfab.com/3d-models/animated-tyrannosaurus-rex-dinosaur-running-loop-38007d947ae74dea83988cb0b08ee053 . Converted to modern PBR, resampled and packaged as GLB for this prototype; walking reuses the running cycle at a reduced rate.
