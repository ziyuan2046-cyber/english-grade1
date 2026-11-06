import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
const source=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..'),repo=path.resolve(source,'..')
fs.mkdirSync(path.join(source,'public'),{recursive:true})
for(const name of ['audio','video','manifest.webmanifest','icon-192.png','icon-512.png','sw.js','install.html','content-audit.json']){
 fs.cpSync(path.join(repo,name),path.join(source,'public',name),{recursive:true})
}
console.log('Prepared public assets from the repository; existing media unchanged.')
