import { chromium } from 'playwright';
import { publicTarget } from './sources';
export async function captureScreenshot(url:string) {
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
 const bytes=await page.screenshot({type:'jpeg',quality:75,fullPage:false,timeout:10000});
 return {image:`data:image/jpeg;base64,${bytes.toString('base64')}`,sourceUrl:page.url(),capturedAt:new Date().toISOString()};
 }finally{await browser.close();}
}
