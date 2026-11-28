(function(){
var L="fr";try{L=localStorage.lang||"fr"}catch(e){}
var T={fr:["Nous affichons de la publicité (Monetag) pour financer l’application. Elle peut utiliser des cookies.","Accepter","Refuser"],en:["We show ads (Monetag) to fund the app. They may use cookies.","Accept","Decline"],ar:["نعرض إعلانات (Monetag) لتمويل التطبيق. قد تستخدم ملفات تعريف الارتباط.","قبول","رفض"],es:["Mostramos publicidad (Monetag) para financiar la app. Puede usar cookies.","Aceptar","Rechazar"],it:["Mostriamo pubblicità (Monetag) per finanziare l’app. Può usare cookie.","Accetta","Rifiuta"],de:["Wir zeigen Werbung (Monetag) zur Finanzierung der App. Sie kann Cookies nutzen.","Akzeptieren","Ablehnen"],pt:["Exibimos anúncios (Monetag) para financiar o app. Eles podem usar cookies.","Aceitar","Recusar"]};
var t=T[L]||T.fr,c;try{c=localStorage.consent}catch(e){}
function set(v){try{localStorage.consent=v}catch(e){}}
function add(src,zone){var s=document.createElement("script");if(zone)s.dataset.zone=zone;s.src=src;s.async=true;s.dataset.cfasync="false";document.body.appendChild(s)}
function load(){
add("https://5gvci.com/act/files/tag.min.js?z=12373283");
add("https://n6wxm.com/vignette.min.js","12373205");
add("https://nap5k.com/tag.min.js","12373183")}
function ask(){var b=document.createElement("div");b.id="cb";var p=document.createElement("p");p.textContent=t[0];var y=document.createElement("button"),n=document.createElement("button");y.textContent=t[1];n.textContent=t[2];b.append(p,y,n);document.body.appendChild(b);
y.onclick=function(){set("yes");b.remove();load()};n.onclick=function(){set("no");b.remove()}}
if(c=="yes")load();else if(c!="no")ask();
var f=document.getElementById("cc");if(f)f.onclick=function(e){e.preventDefault();set("");location.reload()};
})();
