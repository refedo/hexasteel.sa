#!/usr/bin/env node
/**
 * V3.12: automatically index the public copy of every static website route.
 * Dynamic project, article and insight bodies are indexed through CMS/public data
 * in getCmsSearchEntries and searchIndex.ts; studio, API and private content excluded.
 */
import fs from "node:fs";
import path from "node:path";
import ts from "typescript";

const root=process.cwd();
const sitemap=fs.readFileSync(path.join(root,"src/app/sitemap.ts"),"utf8");
const routeBlock=sitemap.match(/const routes=\[([\s\S]*?)\];/);
if(!routeBlock)throw Error("Static sitemap route list is unavailable");
const routes=[...routeBlock[1].matchAll(/"(\/[^"]*)"/g)].map(x=>x[1]);
const corpus={};
const skipProps=new Set(["className","href","src","key","symbol","service","slug","id","aria-controls","data-testid","type","rel","target","name"]);
const rejectText=s=>!s||s.startsWith("/")||s.startsWith("@/")||s.startsWith("https://")||s.startsWith("http://")||s.startsWith("#")||/^[\W\d_]+$/.test(s)||!/[A-Za-z]{3}/.test(s)||s.length>2400;
for(const route of routes){
 const sourcePath=path.join(root,"src/app",route==="/"? "":route.replace(/^\//,""),"page.tsx");
 if(!fs.existsSync(sourcePath))throw Error("Sitemap route has no source page: "+route);
 const source=fs.readFileSync(sourcePath,"utf8");
 const ast=ts.createSourceFile(sourcePath,source,ts.ScriptTarget.Latest,true,ts.ScriptKind.TSX);
 const visible=[];
 const visit=node=>{
  if(ts.isJsxText(node)){
   const s=node.getText(ast).replace(/\s+/g," ").trim();
   if(!rejectText(s))visible.push(s);
  }else if(ts.isStringLiteral(node)||ts.isNoSubstitutionTemplateLiteral(node)){
   const parent=node.parent;
   if(ts.isImportDeclaration(parent)||ts.isExportDeclaration(parent)||ts.isExternalModuleReference(parent))return;
   if(ts.isJsxAttribute(parent)&&skipProps.has(parent.name.text))return;
   if(ts.isPropertyAssignment(parent)){
    const key=parent.name.getText(ast).replace(/['"]/g,"");
    if(skipProps.has(key))return;
   }
   const s=node.text.replace(/\s+/g," ").trim();
   if(!rejectText(s))visible.push(s);
  }
  ts.forEachChild(node,visit);
 };
 visit(ast);
 corpus[route]=[...new Set(visible)].join(" ").slice(0,24000);
}
const output=path.join(root,"src/content/generatedPageSearch.json");
const next=JSON.stringify(corpus,null,2)+"\n";
if(process.argv.includes("--check")){
 if(!fs.existsSync(output)||fs.readFileSync(output,"utf8")!==next)throw Error("Search index stale. Run npm run generate:search");
 console.log("Public route search corpus up to date:",routes.length,"routes");
}else{
 fs.writeFileSync(output,next);
 console.log("Generated search corpus:",routes.length,"public routes");
}
