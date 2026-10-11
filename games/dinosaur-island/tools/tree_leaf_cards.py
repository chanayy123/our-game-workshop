"""Preserve each scanned leaf while replacing its tessellation with a UV card."""
from pathlib import Path
import hashlib
import json
import struct
import tempfile
import subprocess
import numpy as np

CACHE = Path(tempfile.gettempdir()) / 'dinosaur-island-environment-build/tree'

def accessor(doc, blobs, index):
    a=doc['accessors'][index]; v=doc['bufferViews'][a['bufferView']]
    kind={5126:np.float32,5125:np.uint32,5123:np.uint16,5121:np.uint8}[a['componentType']]
    size={'SCALAR':1,'VEC2':2,'VEC3':3,'VEC4':4}[a['type']]
    dtype=np.dtype(kind)
    return np.ndarray((a['count'],size), dtype=dtype, buffer=blobs[v['buffer']],
        offset=v.get('byteOffset',0)+a.get('byteOffset',0),
        strides=(v.get('byteStride',size*dtype.itemsize),dtype.itemsize)).copy()

def components(indices, count):
    parents=list(range(count))
    def find(i):
        while parents[i]!=i:
            parents[i]=parents[parents[i]];i=parents[i]
        return i
    for a,b,c in indices.tolist():
        ra,rb,rc=find(a),find(b),find(c)
        if rb!=ra:parents[rb]=ra
        if rc!=ra:parents[rc]=ra
    groups={}
    for i in range(count):groups.setdefault(find(i),[]).append(i)
    return groups

if __name__=='__main__':
    doc=json.loads((CACHE/'tree.gltf').read_text())
    blobs=[(CACHE/b['uri']).read_bytes() for b in doc['buffers']]
    primitive=doc['meshes'][0]['primitives'][1]
    positions=accessor(doc,blobs,primitive['attributes']['POSITION'])
    uv=accessor(doc,blobs,primitive['attributes']['TEXCOORD_0'])
    indices=accessor(doc,blobs,primitive['indices']).reshape((-1,3))
    groups=components(indices,len(positions))
    print('Original leaf components:',len(groups),flush=True)
    normals=accessor(doc,blobs,primitive['attributes']['NORMAL'])
    card_positions=[];card_normals=[];card_uv=[];card_indices=[]
    # This V0 distant-canopy LOD retains one in eight original leaves.
    # Larger cards preserve full canopy coverage while reducing small alpha-tested
    # triangles and their noise when viewed on an integrated GPU.
    for ordinal,group in enumerate(groups.values()):
        if ordinal%8:continue
        pts=positions[group];tex=uv[group]
        uv_min=tex.min(axis=0);uv_max=tex.max(axis=0)
        corners=np.array([[uv_min[0],uv_min[1]],[uv_max[0],uv_min[1]],
                          [uv_max[0],uv_max[1]],[uv_min[0],uv_max[1]]])
        coefficients=np.linalg.lstsq(np.column_stack([tex,np.ones(len(tex))]),pts,rcond=None)[0]
        quad=np.column_stack([corners,np.ones(4)])@coefficients
        center=quad.mean(axis=0);quad=center+(quad-center)*3.2
        n=normals[group].mean(axis=0);n/=max(np.linalg.norm(n),1e-8)
        base=len(card_positions);card_positions.extend(quad);card_uv.extend(corners)
        card_normals.extend([n]*4);card_indices.extend([base,base+1,base+2,base,base+2,base+3])
    # Reuse the separately simplified main trunk and original embedded materials.
    packed=(CACHE/'tree-more-leaves.glb').read_bytes()
    json_length=struct.unpack_from('<I',packed,12)[0]
    lod=json.loads(packed[20:20+json_length]);binary=bytearray(packed[28+json_length:])
    def add_array(values,dtype,kind,target):
        arr=np.array(values,dtype=dtype)
        binary.extend(b'\0'*((-len(binary))%4));offset=len(binary);binary.extend(arr.tobytes())
        view=len(lod['bufferViews']);lod['bufferViews'].append({'buffer':0,'byteOffset':offset,'byteLength':arr.nbytes,'target':target})
        index=len(lod['accessors']);entry={'bufferView':view,'componentType':5126 if dtype==np.float32 else 5125,'count':len(arr),'type':kind}
        if kind=='VEC3':entry.update(min=arr.min(axis=0).tolist(),max=arr.max(axis=0).tolist())
        lod['accessors'].append(entry);return index
    leaf=lod['meshes'][0]['primitives'][1]
    leaf['attributes']={'POSITION':add_array(card_positions,np.float32,'VEC3',34962),
                        'NORMAL':add_array(card_normals,np.float32,'VEC3',34962),
                        'TEXCOORD_0':add_array(card_uv,np.float32,'VEC2',34962)}
    leaf['indices']=add_array(card_indices,np.uint32,'SCALAR',34963)
    lod['meshes'][0]['primitives']=lod['meshes'][0]['primitives'][:2]
    trunk_triangles=lod['accessors'][lod['meshes'][0]['primitives'][0]['indices']]['count']//3
    lod['nodes'][0]['name']='island_tree_02_web_canopy'
    cards=len(card_indices)//6
    description=(f'{cards} original leaf positions and UV regions preserved as 2-triangle leaf cards; '
                 'one in eight original leaves retained, 3.2x leaf size, fine twigs omitted. '
                 'V0 distant-canopy LOD for integrated GPUs.')
    lod['asset'].setdefault('extras',{})['canopyLOD']=description
    lod['buffers'][0]['byteLength']=len(binary)
    payload=json.dumps(lod,separators=(',',':')).encode();payload+=b' '*((-len(payload))%4)
    binary.extend(b'\0'*((-len(binary))%4))
    output=CACHE/'tree-leaf-cards.glb'
    output.write_bytes(struct.pack('<III',0x46546c67,2,28+len(payload)+len(binary))
        +struct.pack('<II',len(payload),0x4e4f534a)+payload
        +struct.pack('<II',len(binary),0x004e4942)+binary)
    root=Path(__file__).resolve().parents[1]
    runtime=root/'public/assets/environment/tree/tree.glb'
    subprocess.run(['npx.cmd','--yes','@gltf-transform/cli@4.2.1','prune',str(output),
                    str(runtime)],check=True,cwd=root)
    sources_path=root/'public/assets/environment/sources.json'
    if sources_path.exists():
        sources=json.loads(sources_path.read_text(encoding='utf-8'))
        for source in sources:
            if source.get('local')=='build-cache/tree/tree.gltf':
                source['derivative']={'runtimePath':'tree/tree.glb','processing':description,
                                      'leafCards':cards,'leafTriangles':cards*2,
                                      'trunkTriangles':trunk_triangles,'totalTriangles':cards*2+trunk_triangles,
                                      'bytes':runtime.stat().st_size,
                                      'sha256':hashlib.sha256(runtime.read_bytes()).hexdigest()}
        sources_path.write_text(json.dumps(sources,indent=2),encoding='utf-8')
    print('Preserved leaf cards:',cards,flush=True)
