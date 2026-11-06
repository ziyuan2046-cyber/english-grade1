import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
const source=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..'),repo=path.resolve(source,'..'),dist=path.join(source,'dist')
fs.cpSync(dist,repo,{recursive:true})
let html=fs.readFileSync(path.join(repo,'index.html'),'utf8')
html=html.replace(/<script type="module" crossorigin src="([^"]+)"><\/script>/g,(all,url)=>'<script type="module" data-inlined-source="'+url+'">\n'+fs.readFileSync(path.join(repo,url),'utf8').replace(/<\/script/gi,'<'+String.fromCharCode(92)+'/script')+'\n</script>')
html=html.replace(/<link rel="stylesheet" crossorigin href="([^"]+)">/g,(all,url)=>'<style data-inlined-source="'+url+'">\n'+fs.readFileSync(path.join(repo,url),'utf8')+'\n</style>')
fs.writeFileSync(path.join(repo,'index.html'),html)
console.log('Packaged inline startup resources without deleting old media or assets.')
