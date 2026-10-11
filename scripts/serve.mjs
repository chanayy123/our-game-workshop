import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';
import {pathToFileURL} from 'node:url';
const root=path.resolve(import.meta.dirname,'../.site');
export const prefix='/our-game-workshop/';
const types={'.html':'text/html','.js':'application/javascript','.css':'text/css','.svg':'image/svg+xml','.png':'image/png','.jpg':'image/jpeg','.jpeg':'image/jpeg','.json':'application/json','.glb':'model/gltf-binary','.woff':'font/woff','.woff2':'font/woff2','.md':'text/plain'};
export function createServer(){return http.createServer((req,res)=>{
  let pathname;
  try{pathname=decodeURIComponent(new URL(req.url,'http://localhost').pathname);}catch{res.writeHead(400).end();return;}
  if(!pathname.startsWith(prefix)){res.writeHead(302,{Location:`${prefix}games/`}).end();return;}
  let file=path.resolve(root,pathname.slice(prefix.length)||'index.html');
  if(file!==root&&!file.startsWith(root+path.sep)){res.writeHead(403).end();return;}
  if(fs.existsSync(file)&&fs.statSync(file).isDirectory())file=path.join(file,'index.html');
  if(!fs.existsSync(file)){res.writeHead(404).end();return;}
  res.setHeader('Content-Type',types[path.extname(file)]??'application/octet-stream');
  fs.createReadStream(file).pipe(res);
});}
if(import.meta.url===pathToFileURL(process.argv[1]).href){createServer().listen(4170,'127.0.0.1',()=>console.log(`Workshop preview: http://127.0.0.1:4170${prefix}games/`));}
