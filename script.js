// Menu mobile : bouton « Menu » / « Fermer »
(function () {
  var bouton = document.querySelector('.bouton-menu');
  if (!bouton) return;
  function basculer(ouvrir) {
    document.body.classList.toggle('menu-ouvert', ouvrir);
    bouton.setAttribute('aria-expanded', ouvrir);
    bouton.textContent = ouvrir ? 'Fermer' : 'Menu';
  }
  bouton.addEventListener('click', function () { basculer(!document.body.classList.contains('menu-ouvert')); });
  document.querySelectorAll('.menu a').forEach(function (a) { a.addEventListener('click', function () { basculer(false); }); });
  document.addEventListener('keydown', function (e) { if (e.key === 'Escape') basculer(false); });
})();
