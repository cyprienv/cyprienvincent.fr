# cyprienvincent.fr

# Portfolio — Cyprien Vincent

Photographe, vidéaste et directeur artistique.

## Structure

```
index.html            → Home
projets.html          → liste des projets
concerts.html         → concerts
galerie.html          → liste des shootings
contact.html          → contact

projets/              → pages de chaque projet
  marcus-bleu-de-chanel.html
  matheus.html
  eleonore-la-petite-robe-noire.html
galerie/              → pages de chaque shooting
  marcus.html

assets/css/style.css  → tout le style (couleurs et police en haut du fichier)
assets/js/main.js     → menu mobile, animations, visionneuse photo
assets/media/         → photos et vidéos, rangées par page
```

## Mise en ligne (GitHub Pages)

1. Mettre tout le contenu de ce dossier à la racine du dépôt.
2. **Settings → Pages → Build and deployment → Source : Deploy from a branch**, branche `main`, dossier `/ (root)` → **Save**.

## À compléter

- Liens des boutons « Post instagram / Post photos » dans les pages `projets/` (repère : `<!-- À REMPLACER -->`).
- Liens TikTok et YouTube dans `contact.html` (à vérifier).
- Ajouter un concert : déposer la photo dans `assets/media/concerts/` et copier une ligne `<img>` dans `concerts.html`.
