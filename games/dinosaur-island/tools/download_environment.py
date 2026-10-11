"""Acquire a small, self-hosted CC0 environment set from Poly Haven.

Requires Pillow only for combining the source foliage RGB and alpha channels.
The source tree is saved in a temporary build directory for later simplification.
"""
from concurrent.futures import ThreadPoolExecutor
from pathlib import Path
from urllib.request import Request, urlopen
import hashlib
import json
import tempfile
from PIL import Image

ROOT = Path(__file__).resolve().parents[1]
OUT = ROOT / 'public/assets/environment'
CACHE = Path(tempfile.gettempdir()) / 'dinosaur-island-environment-build'
HEADERS = {'User-Agent': 'EscapeDinosaurIslandV0-AssetBuild/1.0'}
records = []

def read(url):
    with urlopen(Request(url, headers=HEADERS), timeout=90) as r:
        return r.read()

def api(asset):
    return json.loads(read('https://api.polyhaven.com/files/' + asset))

def download(spec, target):
    target.parent.mkdir(parents=True, exist_ok=True)
    raw = read(spec['url'])
    actual = hashlib.md5(raw).hexdigest()
    if actual != spec['md5']:
        raise ValueError(f"Source MD5 mismatch: {spec['url']}")
    target.write_bytes(raw)
    records.append({'url': spec['url'], 'sourceMd5': actual,
                    'sourceBytes': len(raw), 'local': target.relative_to(OUT).as_posix()
                    if target.is_relative_to(OUT) else 'build-cache/' + target.relative_to(CACHE).as_posix()})

def model(asset, folder, filename, alpha_key=None, temporary=False):
    files = api(asset)
    package = files['gltf']['1k']['gltf']
    dest = (CACHE if temporary else OUT) / folder
    download(package, dest / filename)
    with ThreadPoolExecutor(max_workers=5) as pool:
        list(pool.map(lambda x: download(x[1], dest / x[0]), package['include'].items()))
    doc = json.loads((dest / filename).read_text())
    if alpha_key:
        alpha_path = dest / 'textures/source-alpha.png'
        download(files[alpha_key]['1k']['png'], alpha_path)
        for mat in doc['materials']:
            if mat.get('alphaMode') in ('MASK', 'BLEND'):
                tex_index = mat['pbrMetallicRoughness']['baseColorTexture']['index']
                image = doc['images'][doc['textures'][tex_index]['source']]
                rgb_path = dest / image['uri']
                rgba = Image.open(rgb_path).convert('RGBA')
                alpha = Image.open(alpha_path).convert('L')
                if alpha.size != rgba.size:
                    alpha = alpha.resize(rgba.size, Image.Resampling.LANCZOS)
                rgba.putalpha(alpha)
                rgba_path = rgb_path.with_suffix('.png')
                rgba.save(rgba_path, optimize=True)
                image['uri'] = rgba_path.relative_to(dest).as_posix()
                image.pop('mimeType', None)
                mat['alphaMode'] = 'MASK'
                mat['alphaCutoff'] = 0.5
        (dest / filename).write_text(json.dumps(doc, separators=(',', ':')))
    print(f'OK {asset}: {dest / filename}', flush=True)

def terrain(asset, folder):
    files = api(asset)
    for source, target in [('Diffuse','diffuse'),('nor_gl','normal'),('Rough','roughness')]:
        download(files[source]['1k']['jpg'], OUT / folder / (target + '.jpg'))
    print(f'OK {asset}: {folder}', flush=True)

if __name__ == '__main__':
    model('fern_02', 'fern', 'fern.gltf', 'Alpha')
    model('rock_moss_set_01', 'rocks', 'rocks.gltf')
    terrain('coast_sand_01', 'sand')
    terrain('forest_ground_04', 'ground')
    model('anthurium_botany_01', 'broadleaf', 'broadleaf.gltf')
    model('island_tree_02', 'tree', 'tree.gltf', 'leaves_alpha', temporary=True)
    sky_files = api('kloofendal_38d_partly_cloudy_puresky')
    download(sky_files['hdri']['1k']['hdr'], OUT / 'sky/sky.hdr')
    (OUT / 'sources.json').write_text(json.dumps(records, indent=2))
    print(f'Acquired {len(records)} verified source files', flush=True)
