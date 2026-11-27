(function(){
const LN={fr:"Français",en:"English",ar:"العربية",es:"Español",it:"Italiano",de:"Deutsch",pt:"Português"};
const K=Object.keys(LN);
let L;try{L=localStorage.lang}catch(e){}
if(!LN[L]){const b=(navigator.language||"fr").slice(0,2);L=LN[b]?b:"fr"}
const f0=window.fetch.bind(window);
window.fetch=(u,o)=>f0(typeof u=="string"?u.replace("language=fr","language="+L).replace("localityLanguage=fr","localityLanguage="+L):u,o);
const d0=Date.prototype.toLocaleDateString;
Date.prototype.toLocaleDateString=function(l,o){return d0.call(this,L,o)};
const D=[
["Ville, pays...","City, country...","مدينة، دولة...","Ciudad, país...","Città, paese...","Stadt, Land...","Cidade, país..."],
["Installer l’application","Install the app","تثبيت التطبيق","Instalar la aplicación","Installa l’app","App installieren","Instalar o aplicativo"],
["Ma position","My location","موقعي","Mi ubicación","La mia posizione","Mein Standort","Minha localização"],
["Chargement…","Loading…","جارٍ التحميل…","Cargando…","Caricamento…","Wird geladen…","Carregando…"],
["Prochaines heures","Next hours","الساعات القادمة","Próximas horas","Prossime ore","Nächste Stunden","Próximas horas"],
["7 jours","7 days","7 أيام","7 días","7 giorni","7 Tage","7 dias"],
["Favoris","Favorites","المفضلة","Favoritos","Preferiti","Favoriten","Favoritos"],
["Ajouter cette ville","Add this city","أضف هذه المدينة","Añadir esta ciudad","Aggiungi questa città","Diese Stadt hinzufügen","Adicionar esta cidade"],
["Aucun favori","No favorites","لا توجد مفضلات","Sin favoritos","Nessun preferito","Keine Favoriten","Nenhum favorito"],
["À propos de nous","About us","من نحن","Acerca de nosotros","Chi siamo","Über uns","Sobre nós"],
["Confidentialité et sécurité","Privacy and security","الخصوصية والأمان","Privacidad y seguridad","Privacy e sicurezza","Datenschutz und Sicherheit","Privacidade e segurança"],
["Intérieur","Indoors","الداخل","Interior","Interno","Innen","Interior"],
["Température °C","Temperature °C","درجة الحرارة °C","Temperatura °C","Temperatura °C","Temperatur °C","Temperatura °C"],
["Humidité %","Humidity %","الرطوبة %","Humedad %","Umidità %","Luftfeuchtigkeit %","Umidade %"],
["Humidité idéale","Ideal humidity","رطوبة مثالية","Humedad ideal","Umidità ideale","Ideale Luftfeuchtigkeit","Umidade ideal"],
["Humidité","Humidity","الرطوبة","Humedad","Umidità","Luftfeuchtigkeit","Umidade"],
["Enregistrer","Save","حفظ","Guardar","Salva","Speichern","Salvar"],
["Que porter ?","What to wear?","ماذا ترتدي؟","¿Qué ponerse?","Cosa indossare?","Was anziehen?","O que vestir?"],
["Lune","Moon","القمر","Luna","Luna","Mond","Lua"],
["Ressenti","Feels like","الإحساس","Sensación","Percepita","Gefühlt","Sensação"],
["Vent","Wind","الرياح","Viento","Vento","Wind","Vento"],
["Rafales","Gusts","الهبات","Ráfagas","Raffiche","Böen","Rajadas"],
["Pression","Pressure","الضغط","Presión","Pressione","Luftdruck","Pressão"],
["Visibilité","Visibility","الرؤية","Visibilidad","Visibilità","Sichtweite","Visibilidade"],
["Lever","Sunrise","الشروق","Amanecer","Alba","Sonnenaufgang","Nascer do sol"],
["Coucher","Sunset","الغروب","Atardecer","Tramonto","Sonnenuntergang","Pôr do sol"],
["Pluie aujourd'hui","Rain today","مطر اليوم","Lluvia hoy","Pioggia oggi","Regen heute","Chuva hoje"],
["Qualité de l'air","Air quality","جودة الهواء","Calidad del aire","Qualità dell’aria","Luftqualität","Qualidade do ar"],
["Très bon","Very good","جيد جدًا","Muy buena","Ottima","Sehr gut","Muito boa"],
["Bon","Good","جيد","Buena","Buona","Gut","Boa"],
["Moyen","Moderate","متوسط","Moderada","Media","Mäßig","Moderada"],
["Médiocre","Poor","ضعيف","Mala","Scadente","Schlecht","Ruim"],
["Mauvais","Bad","سيئ","Muy mala","Pessima","Sehr schlecht","Muito ruim"],
["Erreur de chargement.","Loading error.","خطأ في التحميل.","Error de carga.","Errore di caricamento.","Ladefehler.","Erro de carregamento."],
["Indisponible","Unavailable","غير متاح","No disponible","Non disponibile","Nicht verfügbar","Indisponível"],
["Dehors","Outside","في الخارج","Fuera","Fuori","Draußen","Fora"],
["écart","difference","الفرق","diferencia","differenza","Unterschied","diferença"],
["Illuminée à","Illuminated","مضاء بنسبة","Iluminada al","Illuminata al","Beleuchtet zu","Iluminada em"],
["Trop froid : chauffez un peu","Too cold: heat it up a little","بارد جدًا: قم بالتدفئة قليلًا","Demasiado frío: caliente un poco","Troppo freddo: riscalda un po’","Zu kalt: etwas heizen","Muito frio: aqueça um pouco"],
["Trop chaud : aérez ou ventilez","Too hot: air out or use a fan","حار جدًا: قم بالتهوية أو استخدم مروحة","Demasiado calor: ventile o use un ventilador","Troppo caldo: arieggia o usa un ventilatore","Zu heiß: lüften oder Ventilator nutzen","Muito quente: ventile ou use um ventilador"],
["Température confortable","Comfortable temperature","درجة حرارة مريحة","Temperatura agradable","Temperatura confortevole","Angenehme Temperatur","Temperatura confortável"],
["Air sec : un bol d'eau près du radiateur aide","Dry air: a bowl of water near the radiator helps","هواء جاف: وعاء ماء قرب المدفأة يساعد","Aire seco: un bol de agua junto al radiador ayuda","Aria secca: una ciotola d’acqua vicino al termosifone aiuta","Trockene Luft: eine Schale Wasser an der Heizung hilft","Ar seco: uma tigela de água perto do radiador ajuda"],
["Trop humide : aérez 10 minutes","Too humid: air out for 10 minutes","رطوبة عالية: قم بالتهوية 10 دقائق","Demasiada humedad: ventile 10 minutos","Troppo umido: arieggia 10 minuti","Zu feucht: 10 Minuten lüften","Muito úmido: ventile 10 minutos"],
["Très froid : manteau, gants, bonnet","Very cold: coat, gloves, hat","بارد جدًا: معطف وقفازات وقبعة","Muy frío: abrigo, guantes y gorro","Freddissimo: cappotto, guanti, cappello","Sehr kalt: Mantel, Handschuhe, Mütze","Muito frio: casaco, luvas e gorro"],
["Froid : manteau chaud","Cold: warm coat","بارد: معطف دافئ","Frío: abrigo cálido","Freddo: cappotto pesante","Kalt: warmer Mantel","Frio: casaco quente"],
["Frais : veste","Cool: jacket","منعش: سترة","Fresco: chaqueta","Fresco: giacca","Kühl: Jacke","Fresco: jaqueta"],
["Doux : pull léger","Mild: light sweater","معتدل: كنزة خفيفة","Templado: jersey ligero","Mite: maglione leggero","Mild: leichter Pullover","Ameno: suéter leve"],
["Chaud : t-shirt","Warm: T-shirt","دافئ: قميص خفيف","Cálido: camiseta","Caldo: maglietta","Warm: T-Shirt","Quente: camiseta"],
["Très chaud : vêtements légers, buvez de l'eau","Very hot: light clothes, drink water","حار جدًا: ملابس خفيفة واشرب الماء","Mucho calor: ropa ligera, beba agua","Molto caldo: vestiti leggeri, bevi acqua","Sehr heiß: leichte Kleidung, Wasser trinken","Muito quente: roupas leves, beba água"],
["Parapluie conseillé","Umbrella recommended","يُنصح بالمظلة","Se recomienda paraguas","Ombrello consigliato","Regenschirm empfohlen","Guarda-chuva recomendado"],
["% de pluie","% chance of rain","% احتمال مطر","% de lluvia","% di pioggia","% Regen","% de chuva"],
["UV forts : crème solaire et lunettes","Strong UV: sunscreen and sunglasses","أشعة UV قوية: كريم واقٍ ونظارات","UV fuerte: protector solar y gafas","UV forti: crema solare e occhiali","Starke UV-Strahlung: Sonnencreme und Sonnenbrille","UV forte: protetor solar e óculos"],
["Vent fort : coupe-vent","Strong wind: windbreaker","رياح قوية: سترة واقية من الرياح","Viento fuerte: cortavientos","Vento forte: giacca antivento","Starker Wind: Windjacke","Vento forte: corta-vento"]
];
const M={};D.forEach(r=>M[r[0]]=r);
const RX=new RegExp(D.map(r=>r[0]).sort((a,b)=>b.length-a.length).map(s=>s.replace(/[.*+?^${}()|[\]\\]/g,"\\$&")).join("|"),"g");
const tx=(s,i)=>s.replace(RX,m=>M[m][i]);
function run(){
 const i=K.indexOf(L);
 document.documentElement.lang=L;
 document.documentElement.dir=L=="ar"?"rtl":"ltr";
 const w=document.createTreeWalker(document.body,NodeFilter.SHOW_TEXT);let n;
 while(n=w.nextNode()){
  const p=n.parentNode.nodeName;if(p=="SCRIPT"||p=="OPTION")continue;
  if(n.o===undefined)n.o=n.nodeValue;
  const v=tx(n.o,i);if(v!==n.nodeValue)n.nodeValue=v}
 document.querySelectorAll("[placeholder]").forEach(e=>{if(e.po===undefined)e.po=e.placeholder;e.placeholder=tx(e.po,i)})}
const s=document.createElement("select");s.id="lang";
s.innerHTML=K.map(k=>"<option value='"+k+"'>"+LN[k]+"</option>").join("");
s.value=L;
s.onchange=()=>{try{localStorage.lang=s.value}catch(e){}location.reload()};
document.querySelector("h1").after(s);
let t;
new MutationObserver(()=>{clearTimeout(t);t=setTimeout(run,40)}).observe(document.body,{childList:true,subtree:true});
run();
})();
