import bpy, json, sys
from pathlib import Path
root=Path(__file__).resolve().parents[1]
source=next((root/'.asset-work/diplodocus/source').rglob('Diplodocus.blend'))
bpy.ops.wm.open_mainfile(filepath=str(source))
report=[]
for o in bpy.data.objects:
    data={'name':o.name,'type':o.type,'location':list(o.location),'rotation':list(o.rotation_euler),'scale':list(o.scale),'dimensions':list(o.dimensions)}
    if o.type=='ARMATURE':data['bones']=[{'name':b.name,'head':list(b.head_local),'tail':list(b.tail_local),'parent':b.parent.name if b.parent else None} for b in o.data.bones]
    if o.type=='MESH':data['vertices']=len(o.data.vertices);data['groups']=[g.name for g in o.vertex_groups]
    report.append(data)
(root/'.asset-work/diplodocus/inspection.json').write_text(json.dumps(report,indent=2))
print(json.dumps(report))
