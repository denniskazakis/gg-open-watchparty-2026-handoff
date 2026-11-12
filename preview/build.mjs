// node build.mjs → slides/*.html + slides/*.png (1080x1350). Quelle: HANDOFF.md §1 (nur diese Fakten).
import {readFileSync,writeFileSync,mkdirSync} from 'node:fs';
import {createRequire} from 'node:module';const {chromium}=createRequire(import.meta.url)('playwright');
const C={g:'#218f5b',cream:'#f5efdf',ink:'#17251f',or:'#ef6b43',red:'#cd4a2f'};
const art=readFileSync('../assets/final/slide2.svg','utf8').match(/<g>.*<\/g>/s)[0]; // Illustration (Monitor/Pokal/Pad/Crowd)
const logo=(x,y,w)=>`<image href="../assets/watchparty_logo_clean.png" x="${x}" y="${y}" width="${w}" height="${w*498/1539}"/>`;
const t=(x,y,s,w,f,txt,extra='')=>`<text x="${x}" y="${y}" font-size="${s}" font-weight="${w}" fill="${f}" ${extra}>${txt}</text>`;
const pill=(x,y,w,h,txt,s=38)=>`<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${h/2}" fill="${C.or}" stroke="${C.ink}" stroke-width="8"/>`+t(x+w/2,y+h/2+s*.35,s,700,C.cream,txt,'text-anchor="middle" letter-spacing="1.5"');
const row=(y,l,v)=>t(112,y,22,600,C.red,l,'letter-spacing="3"')+t(112,y+58,54,700,C.ink,v);
const slides={
1:logo(80,70,400)+t(80,360,150,800,C.cream,'Watchparty','letter-spacing="-3"')+t(84,442,52,600,C.ink,'in der')+t(80,545,96,800,C.cream,'GG Open Lobby','letter-spacing="-1"')+pill(80,590,500,80,'SAMSTAG · 14.11.2026'),
2:logo(80,70,400)+`<rect x="70" y="240" width="940" height="410" rx="34" fill="${C.cream}" stroke="${C.ink}" stroke-width="10"/>`+row(305,'DATUM','Samstag, 14.11.2026')+row(415,'UHRZEIT','19:00 / 20:00')+row(525,'ORT','Hauptstraße 240, Herne')+pill(650,92,330,76,'EINTRITT FREI',34),
3:logo(80,70,400)+t(80,370,128,800,C.cream,'Sei dabei.','letter-spacing="-2"')+t(84,440,40,600,C.ink,'Watchparty in der GG Open Lobby')+pill(80,480,380,84,'EINTRITT FREI',38)+t(82,628,40,700,C.cream,'Samstag, 14.11.2026 · 19:00 / 20:00')+t(82,682,34,600,C.ink,'Hauptstraße 240, Herne')};
const svg=b=>`<svg xmlns="http://www.w3.org/2000/svg" width="1080" height="1350" viewBox="0 0 1080 1350" font-family="Poppins,sans-serif"><rect width="1080" height="1350" fill="${C.g}"/><circle cx="950" cy="110" r="300" fill="#b7d966" opacity=".3"/><circle cx="70" cy="1170" r="250" fill="#d5e8c5" opacity=".16"/><circle cx="920" cy="920" r="420" fill="${C.ink}" opacity=".07"/>${b}${art}${t(82,1300,20,600,C.cream,'GG OPEN · HAUPTSTRASSE 240 · HERNE','letter-spacing="1" opacity=".9"')}</svg>`;
const html=b=>`<!doctype html><meta charset=utf-8><style>@font-face{font-family:Poppins;font-weight:600;src:url(../../fonts/Poppins/Poppins-SemiBold.ttf)}@font-face{font-family:Poppins;font-weight:700;src:url(../../fonts/Poppins/Poppins-Bold.ttf)}@font-face{font-family:Poppins;font-weight:800;src:url(../../fonts/Poppins/Poppins-ExtraBold.ttf)}html,body{margin:0;background:${C.g}}svg{display:block}</style>${svg(b)}`;
mkdirSync('slides',{recursive:true});
const br=await chromium.launch(),pg=await br.newPage({viewport:{width:1080,height:1350}});
for(const[n,b]of Object.entries(slides)){writeFileSync(`slides/slide${n}.html`,html(b));await pg.goto(`file://${process.cwd()}/slides/slide${n}.html`);await pg.evaluate(()=>document.fonts.ready);await pg.screenshot({path:`slides/slide${n}.png`})}
await br.close();
