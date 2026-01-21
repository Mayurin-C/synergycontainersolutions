const overlay=document.getElementById("pageTransition");

document.querySelectorAll("a[href]").forEach(link=>{
  const href=link.getAttribute("href");
  if(!href || href.startsWith("#") || href.startsWith("mailto")) return;

  link.addEventListener("click",e=>{
    e.preventDefault();
    overlay.classList.add("show");
    setTimeout(()=>window.location.href=href,350);
  });
});

window.addEventListener("pageshow",()=>{
  setTimeout(()=>overlay.classList.remove("show"),50);
});

document.getElementById("year").textContent=new Date().getFullYear();
