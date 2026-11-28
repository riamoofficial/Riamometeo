(function(){var t;try{t=localStorage.theme}catch(e){}
if(!t)t=matchMedia("(prefers-color-scheme: light)").matches?"light":"dark";
if(t=="light")document.documentElement.classList.add("light")})();
