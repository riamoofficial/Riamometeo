const $=id=>document.getElementById(id);
const ico=c=>c==0?"☀️":c<3?"🌤️":c==3?"☁️":c<50?"🌫️":c<70?"🌧️":c<80?"❄️":c<90?"🌦️":"⛈️";
async function load(lat,lon,name){
 try{
  const u="https://api.open-meteo.com/v1/forecast?latitude="+lat+"&longitude="+lon+"&current=temperature_2m,apparent_temperature,relative_humidity_2m,wind_speed_10m,weather_code&hourly=temperature_2m,weather_code&forecast_hours=24&daily=weather_code,temperature_2m_max,temperature_2m_min&timezone=auto";
  const j=await (await fetch(u)).json(),n=j.current;
  $("now").innerHTML="<h2>"+name+"</h2><div class='big'>"+ico(n.weather_code)+" "+Math.round(n.temperature_2m)+"°</div><p>Ressenti "+Math.round(n.apparent_temperature)+"° · Humidité "+n.relative_humidity_2m+"% · Vent "+Math.round(n.wind_speed_10m)+" km/h</p>";
  $("hours").innerHTML=j.hourly.time.map((t,i)=>"<div class='h'>"+t.slice(11,13)+"h<br>"+ico(j.hourly.weather_code[i])+"<br>"+Math.round(j.hourly.temperature_2m[i])+"°</div>").join("");
  const D=j.daily;
  $("days").innerHTML=D.time.map((t,i)=>"<div class='row'><span>"+new Date(t).toLocaleDateString("fr-FR",{weekday:"short",day:"numeric"})+"</span><span>"+ico(D.weather_code[i])+"</span><span>"+Math.round(D.temperature_2m_min[i])+"° / "+Math.round(D.temperature_2m_max[i])+"°</span></div>").join("");
 }catch(e){$("now").textContent="Erreur de chargement."}
}
$("f").onsubmit=async e=>{e.preventDefault();
 const j=await (await fetch("https://geocoding-api.open-meteo.com/v1/search?count=1&language=fr&name="+encodeURIComponent($("q").value))).json();
 if(j.results){const p=j.results[0];load(p.latitude,p.longitude,p.name+", "+(p.country||""))}else $("now").textContent="Ville introuvable."};
function gps(){navigator.geolocation?navigator.geolocation.getCurrentPosition(p=>load(p.coords.latitude,p.coords.longitude,"Ma position"),()=>load(48.85,2.35,"Paris")):load(48.85,2.35,"Paris")}
$("loc").onclick=gps;gps();
