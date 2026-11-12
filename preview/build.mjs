// node build.mjs → slides/*.html + slides/*.png (1080x1350). Quelle: HANDOFF.md §1 (nur diese Fakten).
import {readFileSync,writeFileSync,mkdirSync} from 'node:fs';
import {createRequire} from 'node:module';const {chromium}=createRequire(import.meta.url)('playwright');
const C={g:'#218f5b',cream:'#f5efdf',ink:'#17251f',or:'#ef6b43',red:'#cd4a2f'};
// Neue Illustration: Arena aus konzentrischen Rängen + Leinwand mit Play + Publikum-Punkte (original, geometrisch)
const dots=(r,n,fills)=>Array.from({length:n},(_,i)=>{const a=Math.PI*(1.06+0.88*i/(n-1)),x=540+r*Math.cos(a),y=1400+r*Math.sin(a);return x>255&&x<825&&y<1090||y>1235?'':`<circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="15" fill="${fills[i%fills.length]}"/>`}).join('');
const art=`<g><path d="M0 1010 L330 700 H520 L0 1190Z" fill="${C.or}" opacity=".95"/><path d="M1080 700 V860 L860 700Z" fill="${C.ink}"/>`+
[[640,'#1b7a4d'],[540,'#2aa06a'],[440,'#1b7a4d'],[340,'#17251f']].map(([r,f])=>`<path d="M${540-r} 1400 A${r} ${r} 0 0 1 ${540+r} 1400Z" fill="${f}"/>`).join('')+
`<rect x="290" y="800" width="500" height="250" rx="26" fill="${C.cream}" stroke="${C.ink}" stroke-width="12"/><rect x="316" y="826" width="448" height="198" rx="12" fill="${C.ink}"/><path d="M500 880 L500 970 L586 925Z" fill="${C.or}"/>`+
dots(300,13,[C.cream,C.or])+dots(400,17,[C.cream,'#d5e8c5',C.or])+dots(500,21,['#d5e8c5',C.cream,C.or])+`</g>`;
const logo=(x,y,w)=>`<image href="../assets/watchparty_logo_clean.png" x="${x}" y="${y}" width="${w}" height="${w*498/1539}"/>`;
const t=(x,y,s,w,f,txt,extra='')=>`<text x="${x}" y="${y}" font-size="${s}" font-weight="${w}" fill="${f}" ${extra}>${txt}</text>`;
const pill=(x,y,w,h,txt,s=38)=>`<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${h/2}" fill="${C.or}" stroke="${C.ink}" stroke-width="8"/>`+t(x+w/2,y+h/2+s*.35,s,700,C.cream,txt,'text-anchor="middle" letter-spacing="1.5"');
const row=(y,l,v)=>t(112,y,22,600,C.red,l,'letter-spacing="3"')+t(112,y+58,54,700,C.ink,v);
const slides={
1:logo(80,70,400)+t(80,360,150,800,C.cream,'Watchparty','letter-spacing="-3"')+t(84,442,52,600,C.ink,'in der')+t(80,545,96,800,C.cream,'GG Open Lobby','letter-spacing="-1"')+pill(80,590,500,80,'SAMSTAG · 14.11.2026'),
2:logo(80,70,400)+`<rect x="70" y="240" width="940" height="410" rx="34" fill="${C.cream}" stroke="${C.ink}" stroke-width="10"/>`+row(305,'DATUM','Samstag, 14.11.2026')+row(415,'UHRZEIT','19:00 / 20:00')+row(525,'ORT','Hauptstraße 240, Herne')+pill(650,92,330,76,'EINTRITT FREI',34),
3:logo(80,70,400)+t(80,370,128,800,C.cream,'Sei dabei.','letter-spacing="-2"')+t(84,440,40,600,C.ink,'Watchparty in der GG Open Lobby')+pill(80,480,380,84,'EINTRITT FREI',38)+t(82,628,40,700,C.cream,'Samstag, 14.11.2026 · 19:00 / 20:00')+t(82,682,34,600,C.ink,'Hauptstraße 240, Herne')};
// Fließender Hintergrund: ein Panorama (3×1080), pro Slide ein Ausschnitt → nahtloser Übergang im Karussell
const wave=(y,amp,per,fill,op,ph=0)=>{let d=`M0 ${y}`;for(let x=0;x<3240;x+=per)d+=(x?` T${x+per} ${y}`:` Q${per/2} ${y+(ph?amp:-amp)} ${per} ${y}`);return `<path d="${d} V1350 H0Z" fill="${fill}" opacity="${op}"/>`};
const pano=`<defs><linearGradient id="pg" x2="1"><stop offset="0" stop-color="#1b7a4d"/><stop offset=".35" stop-color="#218f5b"/><stop offset=".65" stop-color="#23985f"/><stop offset="1" stop-color="#1b7a4d"/></linearGradient><filter id="bl" x="-10%" y="-30%" width="120%" height="160%"><feGaussianBlur stdDeviation="28"/></filter></defs><rect width="3240" height="1350" fill="url(#pg)"/><g filter="url(#bl)">${wave(300,160,810,'#b7d966',.12)}${wave(520,130,1080,'#d5e8c5',.06,1)}${wave(760,170,720,'#17251f',.16)}${wave(980,150,1080,'#b7d966',.1,1)}<ellipse cx="1620" cy="1000" rx="520" ry="150" fill="#ef6b43" opacity=".22"/><ellipse cx="560" cy="110" rx="380" ry="110" fill="#d5e8c5" opacity=".18"/></g>`;
const svg=(b,i)=>`<svg xmlns="http://www.w3.org/2000/svg" width="1080" height="1350" viewBox="0 0 1080 1350" font-family="Poppins,sans-serif"><svg width="1080" height="1350" viewBox="${i*1080} 0 1080 1350">${pano}</svg>${b}${art}<rect y="1255" width="1080" height="95" fill="${C.ink}"/>${t(82,1311,20,600,C.cream,'GG OPEN · HAUPTSTRASSE 240 · HERNE','letter-spacing="1"')}</svg>`;
const html=(b,i)=>`<!doctype html><meta charset=utf-8><style>@font-face{font-family:Poppins;font-weight:600;src:url(../../fonts/Poppins/Poppins-SemiBold.ttf)}@font-face{font-family:Poppins;font-weight:700;src:url(../../fonts/Poppins/Poppins-Bold.ttf)}@font-face{font-family:Poppins;font-weight:800;src:url(../../fonts/Poppins/Poppins-ExtraBold.ttf)}html,body{margin:0;background:${C.g}}svg{display:block}</style>${svg(b,i)}`;
mkdirSync('slides',{recursive:true});
const br=await chromium.launch(),pg=await br.newPage({viewport:{width:1080,height:1350}});
for(const[n,b]of Object.entries(slides)){writeFileSync(`slides/slide${n}.html`,html(b,n-1));await pg.goto(`file://${process.cwd()}/slides/slide${n}.html`);await pg.evaluate(()=>document.fonts.ready);await pg.screenshot({path:`slides/slide${n}.png`})}
await br.close();
