// node varianten.mjs → varianten/<a|b|c>/slide1-3.png + varianten/<x>_sheet.png
// Editorial/Swiss. Grün + Kreis-Proportionen aus Referenz (Ton-in-Ton), Poppins. Fakten nur aus HANDOFF §1.
import {writeFileSync,mkdirSync} from 'node:fs';
import {createRequire} from 'node:module';const {chromium}=createRequire(import.meta.url)('playwright');
const G='#1b905c',D1='#1a8456',D2='#177a4f',L='#23a068',CR='#f5efdf',INK='#13241b',OR='#ef6b43',RED='#c8432a';
const LR=1539/498, logo=(x,y,w)=>`<image href="../../assets/watchparty_logo_clean.png" x="${x}" y="${y}" width="${w}" height="${(w/LR).toFixed(1)}"/>`;
const t=(x,y,s,w,f,txt,a='')=>`<text x="${x}" y="${y}" font-size="${s}" font-weight="${w}" fill="${f}" ${a}>${txt}</text>`;
const c=(x,y,r,f,o=1)=>`<circle cx="${x}" cy="${y}" r="${r}" fill="${f}" opacity="${o}"/>`;
const ring=(x,y,r,f,sw=3,o=1)=>`<circle cx="${x}" cy="${y}" r="${r}" fill="none" stroke="${f}" stroke-width="${sw}" opacity="${o}"/>`;
const hr=(x1,x2,y,f=CR,o=.5,w=2)=>`<path d="M${x1} ${y}H${x2}" stroke="${f}" stroke-width="${w}" opacity="${o}"/>`;
const spark=(x,y,s=14)=>`<path d="M${x} ${y-s}Q${x} ${y} ${x+s} ${y}Q${x} ${y} ${x} ${y+s}Q${x} ${y} ${x-s} ${y}Q${x} ${y} ${x} ${y-s}Z" fill="${CR}"/>`;
const pill=(x,y,w,h,txt,s,bg=OR,fg=CR,anchor='middle')=>`<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${h/2}" fill="${bg}"/>`+t(x+w/2,y+h/2+s*.36,s,700,fg,txt,`text-anchor="${anchor}"`);
const V={
// A · RASTER: Swiss-Raster, Haarlinien, Ton-in-Ton-Kreise laufen über die Nahtstellen
a:{pano:c(1080,1230,360,D1)+c(1300,1010,120,D2)+c(860,1320,60,D2)+c(2160,140,300,D1)+c(2010,330,95,D2)+c(2390,40,60,L,.6)+c(960,90,140,D1,.8)+c(110,1240,90,D1)+c(3150,1180,230,D1)+c(2990,1310,70,D2)+spark(2290,620,10)+spark(190,1080,10)+spark(3020,420),
 s:[hr(80,1000,128)+t(80,108,26,600,CR,'GG Open Lobby')+t(1000,108,26,600,CR,'14.11.2026','text-anchor="end"')+logo(70,250,940)+t(84,880,52,600,INK,'in der')+t(80,990,112,800,CR,'GG Open Lobby','letter-spacing="-2"')+hr(80,1000,1110)+t(80,1170,30,700,CR,'Samstag, 14.11.2026')+t(1000,1170,30,700,CR,'19:00 / 20:00','text-anchor="end"')+t(80,1222,30,600,INK,'Hauptstraße 240, Herne')+t(1000,1222,30,700,CR,'Eintritt frei','text-anchor="end"'),
  hr(80,1000,128)+t(80,108,26,600,CR,'Datum, Zeit, Ort')+logo(760,50,240)+t(68,470,300,800,CR,'14.11.','letter-spacing="-12"')+t(84,600,100,800,INK,'2026')+[['Tag','Samstag'],['Zeit','19:00 / 20:00'],['Ort','Hauptstraße 240, Herne']].map(([l,v],i)=>hr(80,1000,720+i*150)+t(80,790+i*150,26,600,INK,l)+t(300,800+i*150,54,700,CR,v)).join('')+hr(80,1000,1170)+t(80,1240,40,800,CR,'Eintritt frei'),
  hr(80,1000,128)+t(80,108,26,600,CR,'Eintritt frei')+t(80,380,180,800,CR,'Sei dabei.','letter-spacing="-6"')+t(84,470,44,600,INK,'Watchparty in der GG Open Lobby')+hr(80,1000,560)+t(80,640,46,700,CR,'Samstag, 14.11.2026')+t(80,705,46,700,CR,'19:00 / 20:00')+t(80,770,46,600,INK,'Hauptstraße 240, Herne')+pill(80,850,420,100,'Eintritt frei',44)+logo(520,1060,480)]},
// B · BÜHNE: symmetrisch, zentrierte Achse, Kreis als Bühne hinter dem Schriftzug
b:{pano:c(540,560,470,D1)+c(540,560,330,D2,.55)+c(1080,1180,210,D1)+c(1180,1300,90,D2)+c(1620,700,500,D1,.7)+c(2160,230,250,D1)+c(2040,80,80,D2)+c(2700,640,470,D1)+c(3240,1100,260,D1)+c(-20,1250,180,D1)+spark(170,260)+spark(940,980,10)+spark(2000,1150)+spark(2950,190,10)+spark(1300,180,11),
 s:[logo(110,360,860)+t(540,860,60,600,INK,'in der','text-anchor="middle"')+t(540,965,100,800,CR,'GG Open Lobby','text-anchor="middle" letter-spacing="-2"')+pill(330,1060,420,84,'Samstag · 14.11.2026',34),
  logo(390,110,300)+t(540,430,40,600,INK,'Samstag','text-anchor="middle"')+t(540,560,140,800,CR,'14.11.2026','text-anchor="middle" letter-spacing="-4"')+c(540,640,6,CR)+t(540,790,130,800,CR,'19:00 / 20:00','text-anchor="middle" letter-spacing="-4"')+c(540,870,6,CR)+t(540,980,56,700,CR,'Hauptstraße 240','text-anchor="middle"')+t(540,1050,44,600,INK,'Herne','text-anchor="middle"')+pill(370,1140,340,80,'Eintritt frei',34),
  t(540,420,190,800,CR,'Sei dabei.','text-anchor="middle" letter-spacing="-6"')+t(540,510,44,600,INK,'Watchparty in der GG Open Lobby','text-anchor="middle"')+pill(290,600,500,110,'Eintritt frei',50)+t(540,830,44,700,CR,'Samstag, 14.11.2026 · 19:00 / 20:00','text-anchor="middle"')+t(540,895,40,600,INK,'Hauptstraße 240, Herne','text-anchor="middle"')+logo(340,1030,400)]},
// C · BAND: durchlaufendes Creme-Band, Kreise wölben die Kante über die Nähte, asymmetrische Typo-Blöcke
c:{pano:`<rect y="880" width="3240" height="470" fill="${CR}"/>`+c(1080,880,170,CR)+c(1280,880,70,CR)+c(2160,880,120,CR)+c(2600,880,240,CR)+c(400,880,90,CR)+c(1080,880,90,OR)+c(2600,880,60,G)+c(2160,140,320,D1)+c(980,60,130,D1)+c(3100,250,200,D1)+c(200,130,60,D2)+ring(1620,360,260,CR,2,.35)+ring(1620,360,180,CR,2,.25),
 s:[logo(60,150,960)+t(84,650,52,600,INK,'in der')+t(80,760,108,800,CR,'GG Open Lobby','letter-spacing="-2"')+t(80,1110,70,800,INK,'Samstag, 14.11.2026','letter-spacing="-1"')+t(80,1200,70,800,RED,'19:00 / 20:00','letter-spacing="-1"')+t(80,1280,30,600,INK,'Hauptstraße 240, Herne'),
  t(64,420,330,800,CR,'19:00','letter-spacing="-14"')+t(80,560,120,800,INK,'/ 20:00','letter-spacing="-3"')+logo(640,640,340)+t(80,1110,64,800,INK,'Samstag, 14.11.2026')+t(80,1190,64,800,INK,'Hauptstraße 240, Herne')+t(80,1270,64,800,RED,'Eintritt frei'),
  t(70,380,190,800,CR,'Sei dabei.','letter-spacing="-6"')+t(84,470,44,600,INK,'Watchparty in der GG Open Lobby')+logo(70,520,340)+t(80,1100,110,800,RED,'Eintritt frei','letter-spacing="-3"')+t(80,1190,40,700,INK,'Samstag, 14.11.2026 · 19:00 / 20:00')+t(80,1250,36,600,INK,'Hauptstraße 240, Herne')]}};
const css=`@font-face{font-family:P;font-weight:600;src:url(../../../fonts/Poppins/Poppins-SemiBold.ttf)}@font-face{font-family:P;font-weight:700;src:url(../../../fonts/Poppins/Poppins-Bold.ttf)}@font-face{font-family:P;font-weight:800;src:url(../../../fonts/Poppins/Poppins-ExtraBold.ttf)}html,body{margin:0}svg{display:block}`;
const br=await chromium.launch(),pg=await br.newPage({viewport:{width:1080,height:1350}});
for(const[k,v]of Object.entries(V)){mkdirSync(`varianten/${k}`,{recursive:true});
 for(let i=0;i<3;i++){const f=`varianten/${k}/slide${i+1}.html`;
  writeFileSync(f,`<!doctype html><meta charset=utf-8><style>${css}</style><svg xmlns="http://www.w3.org/2000/svg" width="1080" height="1350" font-family="P,sans-serif"><svg width="1080" height="1350" viewBox="${i*1080} 0 1080 1350"><rect width="3240" height="1350" fill="${G}"/>${v.pano}</svg>${v.s[i]}</svg>`);
  await pg.goto(`file://${process.cwd()}/${f}`);await pg.evaluate(()=>document.fonts.ready);await pg.screenshot({path:f.replace('.html','.png')})}}
await br.close();
