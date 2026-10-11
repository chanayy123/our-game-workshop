import fs from 'node:fs';
import path from 'node:path';
import {spawnSync} from 'node:child_process';
import {assemble} from './assemble.mjs';
export const root=path.resolve(import.meta.dirname,'..');
export const games=JSON.parse(fs.readFileSync(path.join(root,'games.json'),'utf8'));
const [action,...ids]=process.argv.slice(2);
if(!['install','test','build','dev'].includes(action))throw new Error('Choose install, test, build or dev.');
for(const id of ids)if(!games.some(g=>g.id===id))throw new Error(`Unknown game: ${id}`);
const selected=ids.length?games.filter(g=>ids.includes(g.id)):games;
if(action==='dev'&&selected.length!==1)throw new Error('Choose one game: npm run dev -- shark-sea-survival');
for(const game of selected){
  console.log(`\n[${action}] ${game.title} (${game.id})`);
  const args=action==='install'?['ci','--no-audit','--no-fund']:['run',action==='build'?'build:pages':action];
  const options={cwd:path.join(root,'games',game.id),stdio:'inherit'};
  const result=process.env.npm_execpath
    ?spawnSync(process.execPath,[process.env.npm_execpath,...args],options)
    :spawnSync(process.platform==='win32'?'cmd.exe':'npm',process.platform==='win32'?['/d','/s','/c','npm',...args]:args,options);
  if(result.error)throw result.error;
  if(result.status!==0)process.exit(result.status??1);
}
if(action==='build')assemble();
