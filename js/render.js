import { PERSONNAGES, LIEUX, PERSONNAGE, LIEU, ESPECES } from './data.js';

const app = document.getElementById('app');

const svgLieu = async (l) => (await import(`../svg/lieux/${l.id}.js`)).default();
// Les personnages ne sont plus dessinés : ce sont des IMAGES OFFICIELLES détourées
// (`img/poneys/<id>.png`, fond transparent, plein pied) — amendement du 25/08, voir
// README § Visuels. Les lieux et la carte restent des SVG dessinés.
// `alt` vide quand le nom est déjà écrit juste à côté : sinon un lecteur d'écran
// annonce deux fois le même nom.
const imgPoney = (p, alt = p.nom, attrs = '') =>
  `<img src="img/poneys/${p.id}.png" alt="${alt}"${attrs}>`;

const vignettePoney = (id) => {
  const p = PERSONNAGE[id];
  return `<a class="vignette" href="#/poney/${id}">${imgPoney(p, '', ' loading="lazy"')}<span>${p.nom}</span></a>`;
};
const vignetteLieu = async (id) => {
  const l = LIEU[id];
  return `<a class="vignette vignette-lieu" href="#/lieu/${id}">${await svgLieu(l)}<span>${l.nom}</span></a>`;
};
const grillePoneys = (ids) => ids.map(vignettePoney).join('');
const tousLesLieux = (ids) => Promise.all(ids.map(vignetteLieu)).then(v => v.join(''));
const entete = (titre) => `<header><a class="maison" href="#/" aria-label="Accueil">🏠</a><h1>${titre}</h1></header>`;

const ECRANS = {
  async accueil() {
    const carte = (await import('../svg/carte.js')).default();
    const lieux = LIEUX.map(l =>
      `<a class="sur-carte" href="#/lieu/${l.id}" style="left:${l.carte.x}%;top:${l.carte.y}%"><span>${l.nom}</span></a>`).join('');
    // `- 8` : décale le mini-portrait de 8 % vers le haut, sinon il recouvre
    // la pastille de lieu posée au même point de la carte.
    const poneys = PERSONNAGES.filter(p => p.carte).map(p =>
      `<a class="sur-carte poney-carte" href="#/poney/${p.id}" style="left:${p.carte.x}%;top:${p.carte.y - 8}%">${imgPoney(p)}</a>`).join('');
    return `<header class="accueil-titre"><h1>Le Grand livre de Poneyville</h1></header>
      <nav class="gros-boutons">
        <a href="#/poneys">🦄 Les poneys</a>
        <a href="#/lieux">🏡 Les lieux</a>
      </nav>
      <div class="carte-cadre">${carte}${lieux}${poneys}</div>
      <p class="mention">Images des personnages © Hasbro — projet de fan non commercial</p>`;
  },
  async poneys() {
    const poneys = PERSONNAGES.filter(p => !p.liens.proprietaire);
    const animaux = PERSONNAGES.filter(p => p.liens.proprietaire);
    return `${entete('Les poneys')}
      <div class="grille">${grillePoneys(poneys.map(p => p.id))}</div>
      <h2>Les animaux</h2>
      <div class="grille">${grillePoneys(animaux.map(p => p.id))}</div>`;
  },
  async lieux() {
    return `${entete('Les lieux')}<div class="grille grille-lieux">${await tousLesLieux(LIEUX.map(l => l.id))}</div>`;
  },
  async poney(id) {
    const p = PERSONNAGE[id];
    if (!p) return ECRANS.accueil();
    const compagnon = p.liens.animal ?? p.liens.proprietaire;
    const proches = [...(p.liens.famille ?? []), ...(p.liens.amis ?? []), ...(compagnon ? [compagnon] : [])];
    return `${entete(p.nom)}
      <div class="fiche">
        <figure class="fiche-dessin">${imgPoney(p)}</figure>
        <div class="fiche-infos">
          <p class="espece">${ESPECES[p.espece]}</p>
          ${p.cutieMark ? `<p class="marque">Sa marque de beauté : ${p.cutieMark}.</p>` : ''}
          <p class="texte">${p.texte}</p>
          ${p.leSaisTu ? `<p class="le-sais-tu">💡 Le sais-tu ? ${p.leSaisTu}</p>` : ''}
        </div>
      </div>
      ${p.lieuId ? `<h2>Où ça se passe</h2><div class="grille">${await vignetteLieu(p.lieuId)}</div>` : ''}
      ${proches.length ? `<h2>${p.liens.proprietaire ? 'Son poney' : 'Sa famille et ses amis'}</h2><div class="grille">${grillePoneys(proches)}</div>` : ''}`;
  },
  async lieu(id) {
    const l = LIEU[id];
    if (!l) return ECRANS.accueil();
    return `${entete(l.nom)}
      <figure class="fiche-dessin fiche-lieu">${await svgLieu(l)}</figure>
      <p class="texte">${l.texte}</p>
      <h2>Qui habite ici</h2>
      <div class="grille">${grillePoneys(l.habitants)}</div>`;
  },
};

export async function render(ecran, id) {
  // `Object.hasOwn` (et non `ECRANS[ecran] ?? ECRANS.accueil`) : sinon une route
  // comme `#/toString` ou `#/constructor` résout une clé héritée d'Object.prototype
  // au lieu de retomber sur l'accueil.
  const fab = Object.hasOwn(ECRANS, ecran) ? ECRANS[ecran] : ECRANS.accueil;
  app.innerHTML = await fab(id);
}
