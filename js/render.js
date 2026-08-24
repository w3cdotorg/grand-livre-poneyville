import { PERSONNAGES, LIEUX, PERSONNAGE, LIEU } from './data.js';

const app = document.getElementById('app');
const ESPECES = {
  terrestre: "Poney terrestre 🍎", pegase: "Pégase 🪽", licorne: "Licorne 🦄",
  alicorne: "Alicorne 👑", dragon: "Dragon 🔥", zebre: "Zèbre 🌿",
  draconequus: "Draconequus 🌀", lapin: "Lapin 🥕", alligator: "Alligator 🦷",
  chien: "Chien 🦴", chat: "Chat 🧶", tortue: "Tortue 🚁", hibou: "Hibou 🌙",
};

const svgDe = async (p) => (await import(`../svg/poneys/${p.id}.js`)).default(p.couleurs);
const svgLieu = async (l) => (await import(`../svg/lieux/${l.id}.js`)).default();
// Fenêtre de recadrage des portraits de galerie : elle cadre la tête du modèle
// show-accurate (voir NOTES.md § « Guide de style poneys »).
const portrait = (svg) => svg.replace('viewBox="0 0 300 300"', 'viewBox="171 6 124 124"');

const vignettePoney = async (id) => {
  const p = PERSONNAGE[id];
  return `<a class="vignette" href="#/poney/${id}">${portrait(await svgDe(p))}<span>${p.nom}</span></a>`;
};
const vignetteLieu = async (id) => {
  const l = LIEU[id];
  return `<a class="vignette vignette-lieu" href="#/lieu/${id}">${await svgLieu(l)}<span>${l.nom}</span></a>`;
};
const toutes = (ids, fab) => Promise.all(ids.map(fab)).then(v => v.join(''));
const entete = (titre) => `<header><a class="maison" href="#/" aria-label="Accueil">🏠</a><h1>${titre}</h1></header>`;

const ECRANS = {
  async accueil() {
    const carte = (await import('../svg/carte.js')).default();
    const lieux = LIEUX.map(l =>
      `<a class="sur-carte" href="#/lieu/${l.id}" style="left:${l.carte.x}%;top:${l.carte.y}%"><span>${l.nom}</span></a>`).join('');
    const poneys = await toutes(PERSONNAGES.filter(p => p.carte).map(p => p.id), async (id) => {
      const p = PERSONNAGE[id];
      return `<a class="sur-carte poney-carte" href="#/poney/${id}" style="left:${p.carte.x}%;top:${p.carte.y - 8}%">${portrait(await svgDe(p))}</a>`;
    });
    return `<header class="accueil-titre"><h1>Le Grand livre de Poneyville</h1></header>
      <nav class="gros-boutons">
        <a href="#/poneys">🦄 Les poneys</a>
        <a href="#/lieux">🏡 Les lieux</a>
      </nav>
      <div class="carte-cadre">${carte}${lieux}${poneys}</div>`;
  },
  async poneys() {
    const poneys = PERSONNAGES.filter(p => !p.liens.proprietaire);
    const animaux = PERSONNAGES.filter(p => p.liens.proprietaire);
    return `${entete('Les poneys')}
      <div class="grille">${await toutes(poneys.map(p => p.id), vignettePoney)}</div>
      <h2>Les animaux</h2>
      <div class="grille">${await toutes(animaux.map(p => p.id), vignettePoney)}</div>`;
  },
  async lieux() {
    return `${entete('Les lieux')}<div class="grille grille-lieux">${await toutes(LIEUX.map(l => l.id), vignetteLieu)}</div>`;
  },
  async poney(id) {
    const p = PERSONNAGE[id];
    if (!p) return ECRANS.accueil();
    const mod = await import(`../svg/poneys/${id}.js`);
    const compagnon = p.liens.animal ?? p.liens.proprietaire;
    const proches = [...(p.liens.famille ?? []), ...(p.liens.amis ?? []), ...(compagnon ? [compagnon] : [])];
    return `${entete(p.nom)}
      <div class="fiche">
        <figure class="fiche-dessin">${mod.default(p.couleurs)}</figure>
        <div class="fiche-infos">
          <p class="espece">${ESPECES[p.espece]}</p>
          ${p.cutieMark ? `<p class="medaillon">${mod.cutieMark(p.couleurs)}<span>Sa marque de beauté : ${p.cutieMark}.</span></p>` : ''}
          <p class="texte">${p.texte}</p>
          ${p.leSaisTu ? `<p class="le-sais-tu">💡 Le sais-tu ? ${p.leSaisTu}</p>` : ''}
        </div>
      </div>
      ${p.lieuId ? `<h2>Où ça se passe</h2><div class="grille">${await vignetteLieu(p.lieuId)}</div>` : ''}
      ${proches.length ? `<h2>Sa famille et ses amis</h2><div class="grille">${await toutes(proches, vignettePoney)}</div>` : ''}`;
  },
  async lieu(id) {
    const l = LIEU[id];
    if (!l) return ECRANS.accueil();
    return `${entete(l.nom)}
      <figure class="fiche-dessin fiche-lieu">${await svgLieu(l)}</figure>
      <p class="texte">${l.texte}</p>
      <h2>Qui habite ici</h2>
      <div class="grille">${await toutes(l.habitants, vignettePoney)}</div>`;
  },
};

export async function render(ecran, id) {
  const fab = ECRANS[ecran] ?? ECRANS.accueil;
  app.innerHTML = await fab(id);
}
