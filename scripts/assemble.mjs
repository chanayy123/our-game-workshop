import fs from 'node:fs';
import path from 'node:path';
const root=path.resolve(import.meta.dirname,'..');
const games=JSON.parse(fs.readFileSync(path.join(root,'games.json'),'utf8'));
export function assemble(){
  const output=path.join(root,'.site');
  // This exact generated directory is the only directory removed by this script.
  fs.rmSync(output,{recursive:true,force:true});fs.mkdirSync(output,{recursive:true});
  for(const game of games){
    const source=path.join(root,'games',game.id),dist=path.join(source,'dist');
    if(!fs.existsSync(path.join(dist,'index.html')))throw new Error(`Missing build for ${game.id}; run npm run build once before selective builds.`);
    const destination=path.join(output,game.path);fs.cpSync(dist,destination,{recursive:true});
    const dependencies=Object.keys(JSON.parse(fs.readFileSync(path.join(source,'package.json'),'utf8')).dependencies??{});
    for(const dependency of dependencies){
      const installed=path.join(source,'node_modules',dependency);
      const license=['LICENSE','LICENSE.txt','LICENSE.md','OFL.txt'].map(name=>path.join(installed,name)).find(file=>fs.existsSync(file));
      if(license){const dir=path.join(destination,'licenses');fs.mkdirSync(dir,{recursive:true});fs.copyFileSync(license,path.join(dir,dependency.replaceAll('/','-').replace('@','')+'-'+path.basename(license)));}
    }
    for(const name of ['ASSETS.md','THIRD_PARTY_NOTICES.md','ASSET_ENVIRONMENT.md'])if(fs.existsSync(path.join(source,name)))fs.copyFileSync(path.join(source,name),path.join(destination,name));
    let html=fs.readFileSync(path.join(destination,'index.html'),'utf8');
    const href=game.path?'../games/':'games/';
    html=html.replace('</body>',`<a href="${href}" aria-label="返回游戏工坊" style="position:fixed;right:12px;bottom:12px;z-index:1000;padding:8px 12px;border-radius:20px;background:#10282add;color:#e8e7d7;font:12px system-ui;text-decoration:none">← 工坊</a></body>`);
    fs.writeFileSync(path.join(destination,'index.html'),html);
  }
  const cards=games.map((g,i)=>`<a class="card" href="../${g.path}" aria-label="开始试玩${g.title}"><div class="art"><img src="previews/${g.id}.png" alt="${g.title}游戏画面" width="1440" height="900"/><span class="tag">${String(i+1).padStart(2,'0')} / ${g.english}</span></div><div class="copy"><p class="en">${g.english}</p><h2 class="name">${g.title}</h2><p class="description">${g.description}</p><div class="play"><span>开始冒险 <span class="controls">· ${g.controls}</span></span><span class="arrow">↗</span></div></div></a>`).join('\n');
  const gallery=path.join(output,'games');fs.cpSync(path.join(root,'gallery'),gallery,{recursive:true});
  let html=fs.readFileSync(path.join(gallery,'index.html'),'utf8').replace('<!-- GAME_CARDS -->',cards).replace('<!-- GAME_OPTIONS -->',games.map(g=>`<option value="${g.id}">${g.title}</option>`).join(''));
  fs.writeFileSync(path.join(gallery,'index.html'),html);
  fs.writeFileSync(path.join(output,'.nojekyll'),'');
  fs.writeFileSync(path.join(output,'version.json'),JSON.stringify({commit:process.env.GITHUB_SHA??'local',date:new Date().toISOString(),games:games.map(g=>({id:g.id,path:g.path}))},null,2));
  console.log(`Assembled ${games.length} games into .site; gallery: /games/, original dinosaur address preserved.`);
}
