# Environment assets — Escape Dinosaur Island V0

Acquired and checked on 2026-09-26. The game self-hosts these files; it does not call a live asset API while playing. The environment directory is approximately 16.3 MB, including retained source textures and geometry files not referenced by the optimized models.

All seven external environment assets below are CC0 from Poly Haven. Their [asset license](https://polyhaven.com/license) permits modification, commercial use, and redistribution of the downloaded files without attribution. Credits are retained voluntarily. API acquisition used a unique application User-Agent, following the [API terms](https://github.com/Poly-Haven/Public-API/blob/master/ToS.md). Exact file URLs and source MD5 values are in `public/assets/environment/sources.json`; every original download was checked against the API's MD5 value.

| Runtime asset | Source and author | Delivered content |
|---|---|---|
| `fern/fern.gltf` | [Fern 02](https://polyhaven.com/a/fern_02), Rob Tuytel / Rico Cilliers | Four variants, 6,232 triangles total; 1K PBR textures. Original RGB and alpha maps combined into RGBA PNG so leaves do not render as opaque rectangles. Alpha mask retained. |
| `rocks/rocks.gltf` | [Rock Moss Set 01](https://polyhaven.com/a/rock_moss_set_01), Kless Gyzen | Six scanned mossy rocks, simplified from 63,127 to 11,358 triangles total (900–2,978 per rock). 1K PBR. |
| `broadleaf/broadleaf.gltf` | [Anthurium Botany 01](https://polyhaven.com/a/anthurium_botany_01), Rob Tuytel / Rico Cilliers | Six tropical broadleaf variants, actual glTF export simplified from 67,152 to 8,044 triangles total (918–1,892 per plant). 1K PBR. The website's displayed polygon count differs from the downloaded evaluated geometry. |
| `tree/tree.glb` | [Island Tree 02](https://polyhaven.com/a/island_tree_02), Rob Tuytel / Rico Cilliers | V0 distant-canopy LOD: 9,357 triangles, 4.51 MB GLB with embedded 1K textures. Main trunk has 1,911 triangles. From 29,781 original independent leaves, one in eight is retained as a two-triangle card: 3,723 cards / 7,446 leaf triangles. Positions, orientations, and atlas UV regions are retained; each card is enlarged 3.2 times around its own center to keep canopy coverage and reduce tiny leaf noise. Disconnected fine twigs are omitted. Original leaf RGB and alpha maps combined into RGBA; alpha blend changed to mask. |
| `sand/{diffuse,normal,roughness}.jpg` | [Coast Sand 01](https://polyhaven.com/a/coast_sand_01), Rob Tuytel | 1K diffuse, OpenGL normal, roughness. |
| `ground/{diffuse,normal,roughness}.jpg` | [Forest Ground 04](https://polyhaven.com/a/forest_ground_04), Rob Tuytel / Rico Cilliers | 1K diffuse, OpenGL normal, roughness. |
| `sky/sky.hdr` | [Kloofendal 38d Partly Cloudy (Pure Sky)](https://polyhaven.com/a/kloofendal_38d_partly_cloudy_puresky), Greg Zaal (original) / Jarod Guest (sky edits) | Original unmodified 1K RGBE HDR, 1,366,191 bytes. Blue partly cloudy daylight, sky-only background suitable for ocean horizons and environment lighting. |

The feather palms, terrain, ocean placement, and atmospheric particles are procedural scene geometry/effects. The palms are a V0 background approximation; they are not downloaded scans. A scanned palm was researched ([Next Spring](https://sketchfab.com/3d-models/realistic-palm-tree-free-39052ea764c945858449e699318efa53), CC Attribution, 27.2K triangles), but it was not downloaded or included. No asset from a paid library or an Unreal-only entitlement was used.

`waternormals.jpg` is provided separately by the scene implementation; its provenance is recorded in the project's main asset credits.

## Rebuild

With Python + Pillow + NumPy and Node/npm available, run from this directory:

```powershell
python tools/download_environment.py
python tools/optimize_environment.py
```

The first script obtains sources from the documented Poly Haven API, uses a unique User-Agent, checks MD5 hashes, and fixes foliage alpha packing. High-detail tree downloads live in the OS temporary directory `dinosaur-island-environment-build`, outside the served application. The second script invokes `@gltf-transform/cli@4.2.1` to simplify and prune the files and `tree_leaf_cards.py` to create the canopy LOD per leaf. No Blender installation is required for this baseline. The GLB requires no Draco or Meshopt runtime decoder.

Geometry is instanced by source variant. The loader bakes each source transform and then centers its horizontal bounds and grounds its minimum Y. Tree submeshes use one common tree anchor, so the leaves retain their relation to the trunk. Tree heights and instance counts are controlled by the scene implementation. Foliage uses alpha masking. Terrain diffuse textures are sRGB; normal and roughness data are linear.

The final tree asset reduces the previous 31,693-triangle tree to 9,357 triangles (about 70% fewer). It targets the measured integrated-GPU bottleneck and distant canopy appearance; this triangle reduction is verified from the delivered GLB, but an FPS gain requires a new browser measurement. The source download hashes remain unchanged. `sources.json` records the derivative's processing, actual triangle counts, byte size, and SHA-256 separately from original-file hashes.

Static verification confirmed all external glTF buffer/image references exist, the fern alpha channel spans 0–255, and the final mesh triangle counts above were read from the delivered glTF/GLB files. `npx tsc --noEmit` passed after the integration changes. Final visual appearance and performance still depend on the app's browser run and camera placement.

For further optimization, start with screen-space foliage coverage and shadow cost. Lower tree instance density or make spatial instancing cells before adding a complex world streaming system. KTX2 can reduce VRAM if measured texture pressure warrants an additional build step; the current 1K self-contained asset set is deliberately usable without that prerequisite.
