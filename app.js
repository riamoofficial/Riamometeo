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
