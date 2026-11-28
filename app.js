const $=id=>document.getElementById(id);
const ico=c=>c==0?"☀️":c<3?"🌤️":c==3?"☁️":c<50?"🌫️":c<60?"🌦️":c<70?"🌧️":c<80?"❄️":c<90?"🌦️":"⛈️";
let F=localStorage.u=="F",cur={},res=[];
const T=v=>Math.round(F?v*9/5+32:v)+"°";
const dir=d=>["N","NE","E","SE","S","SO","O","NO"][Math.round(d/45)%8];
const fav=()=>{try{return JSON.parse(localStorage.favs||"[]")}catch(e){return[]}};
function drawFavs(){$("favs").innerHTML=fav().map((p,i)=>"<button data-f='"+i+"'>"+p.name+"</button>").join("")||"Aucun favori"}
async function load(lat,lon,name){
 try{
  if(name=="Ma position"){try{const g=await(await fetch("https://api.bigdatacloud.net/data/reverse-geocode-client?latitude="+lat+"&longitude="+lon+"&localityLanguage=fr")).json();name=(g.city||g.locality||"Ma position")+", "+(g.countryName||"")}catch(e){}}
  cur={lat,lon,name};
  const u="https://api.open-meteo.com/v1/forecast?latitude="+lat+"&longitude="+lon+"&current=temperature_2m,apparent_temperature,relative_humidity_2m,wind_speed_10m,wind_direction_10m,wind_gusts_10m,pressure_msl,visibility,uv_index,weather_code&hourly=temperature_2m,weather_code,precipitation_probability&forecast_hours=24&daily=weather_code,temperature_2m_max,temperature_2m_min,sunrise,sunset,precipitation_probability_max&timezone=auto";
  const j=await(await fetch(u)).json(),n=j.current,D=j.daily;
  $("now").innerHTML="<h2>"+name+"</h2><div class='big'>"+ico(n.weather_code)+" "+T(n.temperature_2m)+"</div><p>Ressenti "+T(n.apparent_temperature)+"</p>";
  $("det").innerHTML="<div class='grid'><div>💧 Humidité<br>"+n.relative_humidity_2m+"%</div><div>💨 Vent<br>"+Math.round(n.wind_speed_10m)+" km/h "+dir(n.wind_direction_10m)+"</div><div>🌬️ Rafales<br>"+Math.round(n.wind_gusts_10m)+" km/h</div><div>🔽 Pression<br>"+Math.round(n.pressure_msl)+" hPa</div><div>☀️ UV<br>"+Math.round(n.uv_index)+"</div><div>👁️ Visibilité<br>"+Math.round(n.visibility/1000)+" km</div><div>🌅 Lever<br>"+D.sunrise[0].slice(11,16)+"</div><div>🌇 Coucher<br>"+D.sunset[0].slice(11,16)+"</div><div>🌧️ Pluie aujourd'hui<br>"+D.precipitation_probability_max[0]+"%</div></div>";
  $("hours").innerHTML=j.hourly.time.map((t,i)=>"<div class='h'>"+t.slice(11,13)+"h<br>"+ico(j.hourly.weather_code[i])+"<br>"+T(j.hourly.temperature_2m[i])+"<br><small>"+j.hourly.precipitation_probability[i]+"%</small></div>").join("");
  $("days").innerHTML=D.time.map((t,i)=>"<div class='row'><span>"+new Date(t).toLocaleDateString("fr-FR",{weekday:"short",day:"numeric"})+"</span><span>"+ico(D.weather_code[i])+" "+D.precipitation_probability_max[i]+"%</span><span>"+T(D.temperature_2m_min[i])+" / "+T(D.temperature_2m_max[i])+"</span></div>").join("");
  try{const a=(await(await fetch("https://air-quality-api.open-meteo.com/v1/air-quality?latitude="+lat+"&longitude="+lon+"&current=european_aqi,pm10,pm2_5")).json()).current;
   const q=a.european_aqi,l=q<=20?"Très bon":q<=40?"Bon":q<=60?"Moyen":q<=80?"Médiocre":"Mauvais";
   $("aq").innerHTML="<h3>🌫️ Qualité de l'air</h3><div class='big'>"+q+"</div>"+l+"<p>PM2.5 : "+a.pm2_5+" · PM10 : "+a.pm10+"</p>"}catch(e){$("aq").innerHTML=""}
 }catch(e){$("now").textContent="Erreur de chargement."}
}
$("f").onsubmit=e=>{e.preventDefault();if(res[0])pick(0)};
$("q").oninput=async()=>{const v=$("q").value.trim();if(v.length<2){$("sug").innerHTML="";return}
 try{const j=await(await fetch("https://geocoding-api.open-meteo.com/v1/search?count=5&language=fr&name="+encodeURIComponent(v))).json();res=j.results||[];
 $("sug").innerHTML=res.map((p,i)=>"<button type='button' data-s='"+i+"'>"+p.name+(p.admin1?", "+p.admin1:"")+", "+(p.country||"")+"</button>").join("")}catch(e){}};
function pick(i){const p=res[i];$("sug").innerHTML="";$("q").value="";load(p.latitude,p.longitude,p.name+", "+(p.country||""))}
$("sug").onclick=e=>{if(e.target.dataset.s)pick(e.target.dataset.s)};
$("favs").onclick=e=>{const p=fav()[e.target.dataset.f];if(p)load(p.lat,p.lon,p.name)};
$("addfav").onclick=()=>{const f=fav();if(cur.name&&!f.some(p=>p.name==cur.name)){f.push(cur);localStorage.favs=JSON.stringify(f);drawFavs()}};
$("unit").onclick=()=>{F=!F;localStorage.u=F?"F":"C";load(cur.lat,cur.lon,cur.name)};
function gps(){if(!navigator.geolocation)return load(48.85,2.35,"Paris");
 navigator.geolocation.getCurrentPosition(p=>load(p.coords.latitude,p.coords.longitude,"Ma position"),()=>load(48.85,2.35,"Paris"),{enableHighAccuracy:true,timeout:10000})}
$("loc").onclick=gps;drawFavs();gps();
let dp;
window.addEventListener("beforeinstallprompt",e=>{e.preventDefault();dp=e});
$("install").onclick=async()=>{if(dp){dp.prompt();await dp.userChoice;dp=null}else alert("Pour installer : menu ⋮ de Chrome, puis Installer l’application ou Ajouter à l’écran d’accueil.")};
if(matchMedia("(display-mode: standalone)").matches)$("install").style.display="none";
let outT=null,lastK="";
function indoor(){let s={};try{s=JSON.parse(localStorage.indoor||"{}")}catch(e){}
 if(s.t)$("it").value=s.t;if(s.h)$("ih").value=s.h;
 const t=parseFloat(s.t),h=parseFloat(s.h),m=[];
 if(!isNaN(t)){m.push(t<18?"🥶 Trop froid : chauffez un peu":t>25?"🥵 Trop chaud : aérez ou ventilez":"✅ Température confortable");if(outT!==null)m.push("Dehors : "+Math.round(outT)+"° (écart "+Math.round(t-outT)+"°)")}
 if(!isNaN(h))m.push(h<40?"🏜️ Air sec : un bol d'eau près du radiateur aide":h>60?"💧 Trop humide : aérez 10 minutes":"✅ Humidité idéale");
 $("imsg").innerHTML=m.join("<br>")}
$("isave").onclick=()=>{localStorage.indoor=JSON.stringify({t:$("it").value,h:$("ih").value});indoor()};
function moon(){const P=29.530588,d=Date.now()/864e5+2440587.5-2451550.26,p=((d%P)+P)%P;
 const e=["🌑","🌒","🌓","🌔","🌕","🌖","🌗","🌘"][Math.round(p/P*8)%8],il=Math.round((1-Math.cos(2*Math.PI*p/P))/2*100);
 $("moon").innerHTML="<div class='big'>"+e+"</div>Illuminée à "+il+"%"}
async function extra(){try{
 const j=await(await fetch("https://api.open-meteo.com/v1/forecast?latitude="+cur.lat+"&longitude="+cur.lon+"&current=temperature_2m,apparent_temperature,wind_speed_10m,uv_index&daily=precipitation_probability_max&timezone=auto")).json();
 const n=j.current,a=n.apparent_temperature,r=j.daily.precipitation_probability_max[0],L=[];outT=n.temperature_2m;
 L.push(a<=0?"🧥 Très froid : manteau, gants, bonnet":a<=8?"🧥 Froid : manteau chaud":a<=15?"🧥 Frais : veste":a<=22?"👕 Doux : pull léger":a<=28?"👕 Chaud : t-shirt":"🥵 Très chaud : vêtements légers, buvez de l'eau");
 if(r>=50)L.push("☔ Parapluie conseillé ("+r+"% de pluie)");
 if(n.uv_index>=6)L.push("🧴 UV forts : crème solaire et lunettes");
 if(n.wind_speed_10m>=40)L.push("🌬️ Vent fort : coupe-vent");
 $("adv").innerHTML=L.join("<br>");indoor()}catch(e){$("adv").textContent="Indisponible"}}
setInterval(()=>{const k=cur.lat+","+cur.lon;if(cur.lat&&k!=lastK){lastK=k;extra()}},1000);
indoor();moon();
$("theme").onclick=()=>{const l=document.documentElement.classList.toggle("light");try{localStorage.theme=l?"light":"dark"}catch(e){}};
$("share").onclick=async()=>{const d={title:"Riamo Météo",text:(cur.name||"")+" – Riamo Météo",url:location.href};try{if(navigator.share)await navigator.share(d);else{await navigator.clipboard.writeText(d.url);alert("OK")}}catch(e){}};
let rk="";
setInterval(()=>{const k=cur.lat+","+cur.lon;if(cur.lat&&k!=rk){rk=k;$("radar").src="https://embed.windy.com/embed2.html?lat="+cur.lat+"&lon="+cur.lon+"&zoom=7&level=surface&overlay=radar&product=radar&menu=&message=&marker=true&calendar=now&type=map&location=coordinates&detail=&metricWind=km%2Fh&metricTemp=%C2%B0C&radarRange=-1"}},1500);
