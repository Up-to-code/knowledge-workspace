import { chromium } from 'playwright';
import { publicTarget } from './sources';
async function capturePage(url:string,readText:boolean) {
 if(process.env.ENABLE_SCREENSHOTS!=='true')throw new Error('Screenshot capture is not configured. Set ENABLE_SCREENSHOTS=true after installing Chromium.');
 const target=await publicTarget(url);
 const browser=await chromium.launch({headless:true,args:[`--host-resolver-rules=MAP ${target.url.hostname} ${target.addresses[0].address}`]});
 try {
 const context=await browser.newContext({viewport:{width:1280,height:800},serviceWorkers:'block',acceptDownloads:false});
 await context.route('**/*',async route=>{try {const requested=new URL(route.request().url());if(!['http:','https:'].includes(requested.protocol)||requested.hostname!==target.url.hostname){await route.abort();return;}await publicTarget(requested.href);await route.continue();}catch{await route.abort();}});
 await context.routeWebSocket('**/*',socket=>socket.close());
 const page=await context.newPage();
 const response=await page.goto(target.url.href,{waitUntil:'domcontentloaded',timeout:15000});
 if(!response?.ok())throw new Error('Source did not load for screenshot capture');
 await page.waitForFunction(()=>{const text=(document.querySelector('article,main')||document.body).textContent||'';return text.trim().length>150&&!/^\s*(unpacking|loading|please wait)[.… ]*$/i.test(text);},{},{timeout:10000}).catch(()=>{});
 await page.evaluate(()=>document.fonts.ready);
 if(readText)return {html:await page.content(),url:page.url()};
 const bytes=await page.screenshot({type:'jpeg',quality:75,fullPage:false,timeout:10000});
 return {image:`data:image/jpeg;base64,${bytes.toString('base64')}`,sourceUrl:page.url(),capturedAt:new Date().toISOString()};
 }finally{await browser.close();}
}

export async function captureScreenshot(url:string) {const result=await capturePage(url,false);if(!result.image||!result.sourceUrl||!result.capturedAt)throw new Error('Screenshot unavailable');return {image:result.image,sourceUrl:result.sourceUrl,capturedAt:result.capturedAt};}
export async function readRenderedSource(url:string) {const result=await capturePage(url,true);if(!result.html||!result.url)throw new Error('Rendered source unavailable');return {html:result.html,url:result.url};}
