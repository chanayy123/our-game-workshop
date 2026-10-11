"""Convert Skorpio's CC BY-SA 3.0 rig; add simple original idle/walk cycles.
Run with Blender 4.2: blender --background --python tools/build-diplodocus.py
The derivative model and animations remain CC BY-SA 3.0.
"""
import bpy, math
from pathlib import Path
root=Path(__file__).resolve().parents[1]
source=root/'.asset-work/diplodocus/source'
bpy.ops.wm.open_mainfile(filepath=str(source/'Diplodocus.blend'))
rig=bpy.data.objects['Armature_Diplodocus']
mesh=bpy.data.objects['Diplodocus_low.004']
for obj in list(bpy.data.objects):
    if obj not in [rig,mesh]:bpy.data.objects.remove(obj,do_unlink=True)
rig.animation_data_clear()
for p in rig.pose.bones:
    for c in list(p.constraints):p.constraints.remove(c)
    p.rotation_mode='XYZ';p.rotation_euler=(0,0,0);p.location=(0,0,0);p.scale=(1,1,1)
for action in list(bpy.data.actions):bpy.data.actions.remove(action)
bpy.context.view_layer.objects.active=mesh
for obj in bpy.context.selected_objects:obj.select_set(False)
mesh.select_set(True)
# Apply the subdivision before skinning so the exported silhouette stays smooth.
sub=mesh.modifiers.new('Smooth silhouette','SUBSURF');sub.levels=2
bpy.ops.object.modifier_move_to_index(modifier=sub.name,index=0)
bpy.ops.object.modifier_apply(modifier=sub.name)
for poly in mesh.data.polygons:poly.use_smooth=True
mat=bpy.data.materials.new('Diplodocus skin · Skorpio');mat.use_nodes=True
nodes=mat.node_tree.nodes;links=mat.node_tree.links;bsdf=nodes.get('Principled BSDF')
bsdf.inputs['Roughness'].default_value=.8
color=nodes.new('ShaderNodeTexImage');color.image=bpy.data.images.load(str(next(source.rglob('Diplodocus_col3.png'))))
links.new(color.outputs['Color'],bsdf.inputs['Base Color'])
normal=nodes.new('ShaderNodeTexImage');normal.image=bpy.data.images.load(str(next(source.rglob('Diplodocus_nor4.png'))));normal.image.colorspace_settings.name='Non-Color'
normal_map=nodes.new('ShaderNodeNormalMap');normal_map.inputs['Strength'].default_value=.48
links.new(normal.outputs['Color'],normal_map.inputs['Color']);links.new(normal_map.outputs['Normal'],bsdf.inputs['Normal'])
mesh.data.materials.clear();mesh.data.materials.append(mat)
scene=bpy.context.scene;scene.render.fps=30;scene.frame_start=1;scene.frame_end=121
rig.animation_data_create()
for name in ['Idle','Walk']:
    action=bpy.data.actions.new(name);action.use_fake_user=True;rig.animation_data.action=action
    for frame in range(1,122,4):
        scene.frame_set(frame);t=(frame-1)/120*math.tau
        for p in rig.pose.bones:p.rotation_euler=(0,0,0);p.location=(0,0,0);p.scale=(1,1,1)
        for name_body in ['Body1','Body2']:
            rig.pose.bones[name_body].scale.x=1+.008*math.sin(t)
            if name=='Walk':rig.pose.bones[name_body].location.z=.025*math.cos(t*2)
        for i in range(1,8):
            p=rig.pose.bones[f'Neck{i}'];p.rotation_euler.x=-.025+.012*math.sin(t-i*.3);p.rotation_euler.z=.009*math.sin(t-i*.25)
        for i in range(1,12):rig.pose.bones[f'Tail{i}'].rotation_euler.z=.014*math.sin(t-i*.3)
        if name=='Walk':
            for limb,offset in [('Foreleg_l',0),('Hindleg_r',.7),('Foreleg_r',math.pi),('Hindleg_l',math.pi+.7)]:
                front,side=limb.split('_');stride=math.sin(t+offset);lift=max(0,math.cos(t+offset))
                rig.pose.bones[f'{front}1_{side}'].rotation_euler.x=.18*stride
                rig.pose.bones[f'{front}2_{side}'].rotation_euler.x=-.08*stride+.09*lift
                rig.pose.bones[f'{front}3_{side}'].rotation_euler.x=-.10*stride-.06*lift
        for p in rig.pose.bones:
            p.keyframe_insert('rotation_euler',frame=frame);p.keyframe_insert('location',frame=frame);p.keyframe_insert('scale',frame=frame)
    for curve in action.fcurves:
        for key in curve.keyframe_points:key.interpolation='LINEAR'
rig.animation_data.action=bpy.data.actions['Idle'];scene.frame_set(1)
rig['author']='Skorpio / OpenGameArt';rig['license']='CC BY-SA 3.0'
rig['source']='https://opengameart.org/content/diplodocus'
rig['modifications']='Subdivision, PBR material, original idle and walking cycles for Escape Dinosaur Island.'
out=root/'.asset-work/diplodocus/animated.glb'
bpy.ops.export_scene.gltf(filepath=str(out),export_format='GLB',export_animations=True,export_animation_mode='ACTIONS',export_extras=True,export_yup=True)
print('EXPORTED',out)

