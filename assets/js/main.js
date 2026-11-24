/* =========================================================
   Portfolio — Cyprien Vincent
   Menu mobile, apparition au scroll, visionneuse photo
   ========================================================= */
(function () {
  "use strict";

  /* ---------- Menu mobile ---------- */
  var menu = document.querySelector(".menu");
  var openBtn = document.querySelector(".nav__toggle");
  var closeBtn = document.querySelector(".menu__close");

  function setMenu(open) {
    if (!menu) return;
    menu.classList.toggle("is-open", open);
    menu.setAttribute("aria-hidden", open ? "false" : "true");
    if (openBtn) openBtn.setAttribute("aria-expanded", open ? "true" : "false");
    document.body.classList.toggle("no-scroll", open);
  }
  if (openBtn) openBtn.addEventListener("click", function () { setMenu(true); });
  if (closeBtn) closeBtn.addEventListener("click", function () { setMenu(false); });

  /* ---------- Vidéo de fond : on ne charge que celle qui est visible ---------- */
  document.querySelectorAll("video[data-autoplay]").forEach(function (v) {
    if (v.offsetParent === null) { v.removeAttribute("autoplay"); v.preload = "none"; return; }
    v.muted = true;
    var p = v.play();
    if (p && p.catch) p.catch(function () {});
  });

  /* ---------- Apparition au scroll ---------- */
  var reveals = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) { e.target.classList.add("is-visible"); io.unobserve(e.target); }
      });
    }, { rootMargin: "0px 0px -8% 0px" });
    reveals.forEach(function (el) { io.observe(el); });
  } else {
    reveals.forEach(function (el) { el.classList.add("is-visible"); });
  }

  /* ---------- Visionneuse photo ----------
     - toute image avec [data-lightbox] s'ouvre en grand ;
     - un bouton [data-series="nom"] ouvre la série <template data-series="nom">. */
  var lb = document.createElement("div");
  lb.className = "lightbox";
  lb.setAttribute("role", "dialog");
  lb.setAttribute("aria-modal", "true");
  lb.setAttribute("aria-hidden", "true");
  lb.innerHTML =
    '<button class="lightbox__btn lightbox__close" aria-label="Fermer">Fermer</button>' +
    '<button class="lightbox__btn lightbox__prev" aria-label="Photo précédente">&#8249;</button>' +
    '<img alt="">' +
    '<button class="lightbox__btn lightbox__next" aria-label="Photo suivante">&#8250;</button>' +
    '<div class="lightbox__count"></div>';
  document.body.appendChild(lb);

  var lbImg = lb.querySelector("img");
  var lbCount = lb.querySelector(".lightbox__count");
  var list = [];
  var index = 0;

  function show(i) {
    index = (i + list.length) % list.length;
    lbImg.src = list[index].src;
    lbImg.alt = list[index].alt || "";
    lbCount.textContent = list.length > 1 ? (index + 1) + " / " + list.length : "";
    var multi = list.length > 1;
    lb.querySelector(".lightbox__prev").style.display = multi ? "" : "none";
    lb.querySelector(".lightbox__next").style.display = multi ? "" : "none";
  }
  function open(items, i) {
    list = items; show(i || 0);
    lb.classList.add("is-open"); lb.setAttribute("aria-hidden", "false");
    document.body.classList.add("no-scroll");
  }
  function close() {
    lb.classList.remove("is-open"); lb.setAttribute("aria-hidden", "true");
    document.body.classList.remove("no-scroll");
  }

  var pageImgs = Array.prototype.slice.call(document.querySelectorAll("img[data-lightbox]"));
  var pageItems = pageImgs.map(function (img) { return { src: img.currentSrc || img.src, alt: img.alt }; });
  pageImgs.forEach(function (img, i) {
    img.addEventListener("click", function () {
      pageItems[i].src = img.currentSrc || img.src;
      open(pageItems, i);
    });
  });

  document.querySelectorAll("[data-series]").forEach(function (btn) {
    if (btn.tagName === "TEMPLATE") return;
    btn.addEventListener("click", function (e) {
      e.preventDefault();
      var tpl = document.querySelector('template[data-series="' + btn.dataset.series + '"]');
      if (!tpl) return;
      var imgs = tpl.content.querySelectorAll("img");
      var items = Array.prototype.map.call(imgs, function (im) { return { src: im.getAttribute("src"), alt: im.alt }; });
      if (items.length) open(items, 0);
    });
  });

  lb.querySelector(".lightbox__close").addEventListener("click", close);
  lb.querySelector(".lightbox__prev").addEventListener("click", function () { show(index - 1); });
  lb.querySelector(".lightbox__next").addEventListener("click", function () { show(index + 1); });
  lb.addEventListener("click", function (e) { if (e.target === lb) close(); });

  var touchX = null;
  lb.addEventListener("touchstart", function (e) { touchX = e.touches[0].clientX; }, { passive: true });
  lb.addEventListener("touchend", function (e) {
    if (touchX === null) return;
    var dx = e.changedTouches[0].clientX - touchX;
    if (Math.abs(dx) > 50 && list.length > 1) show(index + (dx < 0 ? 1 : -1));
    touchX = null;
  });

  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape") { close(); setMenu(false); }
    if (!lb.classList.contains("is-open")) return;
    if (e.key === "ArrowRight") show(index + 1);
    if (e.key === "ArrowLeft") show(index - 1);
  });
})();
