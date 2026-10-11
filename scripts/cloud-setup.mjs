import {spawnSync} from 'node:child_process';
import path from 'node:path';
const root=path.resolve(import.meta.dirname,'..');
// Cloud runners may not allow writing the account's default npm cache.
process.env.npm_config_cache??=path.join(root,'.npm-cache');
function run(args){
  const result=spawnSync(process.platform==='win32'?'cmd.exe':'npm',process.platform==='win32'?['/d','/s','/c','npm',...args]:args,{cwd:root,stdio:'inherit'});
  if(result.error)throw result.error;if(result.status!==0)process.exit(result.status??1);
}
if(Number(process.versions.node.split('.')[0])<22)throw new Error('Node.js 22.17+ required.');
run(['ci','--no-audit','--no-fund']);run(['run','setup']);
console.log('Cloud dependencies ready. Browser checks additionally need: npx playwright install --with-deps chromium');
