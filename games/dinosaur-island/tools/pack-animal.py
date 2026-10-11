"""Resize embedded textures and repack GLB buffer views without changing the rig.
Usage: python tools/pack-animal.py input.glb output.glb [max texture size]
"""
import io, json, struct, sys
from pathlib import Path
from PIL import Image

source, target = map(Path, sys.argv[1:3])
limit = int(sys.argv[3]) if len(sys.argv) > 3 else 1024
raw = source.read_bytes()
json_length = struct.unpack_from('<I', raw, 12)[0]
doc = json.loads(raw[20:20+json_length])
binary = raw[28+json_length:]
replacements = {}
alpha_sources = set()
for material in doc.get('materials', []):
    refs = []
    if material.get('alphaMode', 'OPAQUE') != 'OPAQUE':
        refs.append(material.get('pbrMetallicRoughness', {}).get('baseColorTexture'))
    refs.append(material.get('extensions', {}).get('KHR_materials_specular', {}).get('specularTexture'))
    for ref in refs:
        if ref: alpha_sources.add(doc['textures'][ref['index']]['source'])
for image_index, img in enumerate(doc.get('images', [])):
    view_id = img['bufferView']
    view = doc['bufferViews'][view_id]
    data = binary[view.get('byteOffset', 0):view.get('byteOffset', 0)+view['byteLength']]
    image = Image.open(io.BytesIO(data)).convert('RGBA')
    image.thumbnail((limit, limit), Image.Resampling.LANCZOS)
    transparent = image_index in alpha_sources and image.getchannel('A').getextrema()[0] < 255
    fmt = 'PNG' if transparent else 'JPEG'
    out = io.BytesIO()
    (image if transparent else image.convert('RGB')).save(out, fmt, quality=93, optimize=True)
    replacements[view_id] = out.getvalue()
    img['mimeType'] = 'image/png' if transparent else 'image/jpeg'
    img.pop('uri', None)
packed = bytearray()
for index, view in enumerate(doc['bufferViews']):
    original = binary[view.get('byteOffset', 0):view.get('byteOffset', 0)+view['byteLength']]
    data = replacements.get(index, original)
    packed += b'\0' * (-len(packed) % 4)
    view['byteOffset'] = len(packed)
    view['byteLength'] = len(data)
    packed += data
doc['buffers'][0]['byteLength'] = len(packed)
packed += b'\0' * (-len(packed) % 4)
metadata = json.dumps(doc, separators=(',', ':')).encode()
metadata += b' ' * (-len(metadata) % 4)
target.parent.mkdir(parents=True, exist_ok=True)
target.write_bytes(struct.pack('<III', 0x46546C67, 2, 28+len(metadata)+len(packed)) +
                  struct.pack('<I4s', len(metadata), b'JSON') + metadata +
                  struct.pack('<I4s', len(packed), b'BIN\0') + packed)
print(f'{target}: {len(raw):,} -> {target.stat().st_size:,} bytes')
