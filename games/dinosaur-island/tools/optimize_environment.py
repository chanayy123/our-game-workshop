"""Build the V0 web meshes after download_environment.py.

Uses the mature glTF Transform CLI; no Blender installation is required.
Fine, disconnected twig geometry is omitted from the distant canopy tree.
"""
from pathlib import Path
import shutil
import subprocess
import sys
import tempfile

ROOT = Path(__file__).resolve().parents[1]
OUT = ROOT / 'public/assets/environment'
CACHE = Path(tempfile.gettempdir()) / 'dinosaur-island-environment-build'

def transform(*args):
    subprocess.run(['npx.cmd', '--yes', '@gltf-transform/cli@4.2.1', *map(str,args)],
                   check=True, cwd=ROOT)

if __name__ == '__main__':
    for folder, ratio, error in [('broadleaf', '.12', '.02'), ('rocks', '.18', '.012')]:
        raw = CACHE / folder
        # Keep pristine downloads in temp for repeatable simplification.
        if not (raw / (folder + '.gltf')).exists():
            shutil.copytree(OUT / folder, raw, dirs_exist_ok=True)
        transform('simplify',raw/(folder+'.gltf'),OUT/folder/(folder+'.gltf'),
                  '--ratio',ratio,'--error',error)
    tree = CACHE / 'tree'
    target = OUT / 'tree/tree.glb'
    target.parent.mkdir(parents=True,exist_ok=True)
    transform('weld',tree/'tree.gltf',tree/'tree-weld.glb')
    transform('simplify',tree/'tree-weld.glb',tree/'tree-more-leaves.glb',
              '--ratio','.045','--error','.004')
    # Global simplification erases small disconnected leaves. Build canopy LOD
    # per leaf instead, preserving its source position, orientation, and atlas UV.
    subprocess.run([sys.executable,str(ROOT/'tools/tree_leaf_cards.py')],check=True,cwd=ROOT)
