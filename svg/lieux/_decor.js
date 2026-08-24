// ───────────────────────────────────────────────────────────────────────────────
// Décor partagé des dix scènes de lieux (viewBox 400 × 300).
//
// Ces briques sont l'équivalent, pour les lieux, de `svg/poneys/_commun.js` :
// elles garantissent que les dix fiches partagent une seule palette, un seul
// ciel, un seul feuillage — et que cette palette est CELLE DE LA CARTE
// (`svg/carte.js`), pour qu'un enfant reconnaisse le même endroit d'un écran à
// l'autre. Les hex sont donc recopiés tels quels du `C` de la carte, plus
// quelques dérivés propres aux gros plans.
//
// ÉCHELLE. La carte dessine dans 1000 × 700 des bâtiments de ~100 unités ; ici
// on est en 400 × 300 avec un bâtiment de ~160 unités, soit un rapport de
// grossissement d'environ 4. Les contours suivent : **2,4** pour les masses
// principales, **1,8** pour les volumes secondaires, **1,2-1,4** pour les
// détails. Une brique dessinée dans un `scale(s)` corrige son `stroke-width`
// par `1/s`, sinon un buisson à 0,5 perd la moitié de son trait.
//
// IDENTIFIANTS. Chaque scène passe son propre préfixe au dégradé de ciel : la
// galerie `#/lieux` affiche les dix SVG dans le MÊME document, et deux `<defs>`
// portant le même `id` se résolvent toutes les deux sur la première.
// ───────────────────────────────────────────────────────────────────────────────

export const C = {
  cielHaut: '#8fd3f4', cielBas: '#e2f4fd',
  soleil: '#ffe27a', halo: '#fff5c6',
  nuage: '#ffffff', nuageT: '#bad4e8', nuageO: '#dfeaf5',
  mont: '#b3a8c9', montT: '#8a7ea6', neige: '#f7f4fc',
  mur: '#fffaf2', murT: '#cdb9a0', or: '#f7c948', orT: '#c1901c',
  loin: '#c6e6a0', mid: '#abd985', pres: '#96cd6a', herbeT: '#6faa4a',
  eau: '#8ed6f0', eauT: '#57add4',
  feuille: '#5aa844', feuilleT: '#3b7a2b', feuilleC: '#7cc45c',
  tronc: '#a5764a', troncT: '#77502e',
  pomme: '#cf3b32', grange: '#c8483c', grangeT: '#8f2f2a',
  bois: '#c79a5e', boisT: '#9a6f39', paille: '#e0bd6f', pailleT: '#b08c3f',
  foret: '#2f5f56', foretT: '#1d443f', sapinA: '#38736a', sapinB: '#2b5b55',
  clairiere: '#6fae63', luciole: '#ffef9f',
  rose: '#f4a6c8', roseT: '#d4749f', lilas: '#c39be0', lilasT: '#9a6fbe',
  ciel2: '#7fc6ea', creme: '#ffeccd', chemin: '#e9d9b6', cheminT: '#c3ab7f',
  vitre: '#cfe9f7', vitreT: '#8fb8cf',
};

export const n = (v) => Math.round(v * 10) / 10;

// Fond pleine surface : le dégradé de ciel. `id` doit être unique par scène.
export const cielFond = (id, haut = C.cielHaut, bas = C.cielBas) => `<defs>
    <linearGradient id="${id}" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="${haut}"/><stop offset="1" stop-color="${bas}"/>
    </linearGradient>
  </defs>
  <rect width="400" height="300" fill="url(#${id})"/>`;

export const soleil = (x, y, r = 20) => `<circle cx="${x}" cy="${y}" r="${n(r * 1.5)}" fill="${C.halo}" opacity=".5"/>
  <circle cx="${x}" cy="${y}" r="${r}" fill="${C.soleil}"/>`;

export const nuage = (x, y, s = 1, o = 1) => `<g transform="translate(${x} ${y}) scale(${n(s)})" opacity="${o}">
    <path d="M-70 20C-96 20 -98 -6 -74 -12C-78 -38 -44 -50 -26 -32C-14 -56 26 -54 34 -28C60 -38 82 -14 64 6C78 14 70 20 52 20Z"
      fill="${C.nuage}" stroke="${C.nuageT}" stroke-width="${n(2.2 / s)}" stroke-linejoin="round"/>
    <path d="M-58 20C-40 8 -8 6 14 14C28 19 40 20 52 20Z" fill="${C.nuageO}"/>
  </g>`;

// La volute : le petit tourbillon blanc qui signe les ciels de la série.
export const volute = (x, y, s = 1, c = '#ffffff', o = 0.55) => `<path
    transform="translate(${x} ${y}) scale(${n(s)})"
    d="M0 0C-16 -12 -6 -28 8 -23C20 -19 19 -4 9 -6C4 -7 3 -13 8 -14"
    fill="none" stroke="${c}" stroke-width="${n(2 / s)}" stroke-linecap="round" opacity="${o}"/>`;

export const oiseau = (x, y, s = 1, c = C.nuageT) => `<path transform="translate(${x} ${y}) scale(${n(s)})"
    d="M-9 0C-6 -6 -3 -6 0 -2C3 -6 6 -6 9 0" fill="none" stroke="${c}"
    stroke-width="${n(1.8 / s)}" stroke-linecap="round"/>`;

export const papillon = (x, y, s = 1, c = C.rose) => `<g transform="translate(${x} ${y}) scale(${n(s)})">
    <path d="M0 0C-10 -12 -18 -4 -9 3C-4 6 -1 4 0 0Z" fill="${c}" stroke="${C.murT}" stroke-width="${n(1.2 / s)}" stroke-linejoin="round"/>
    <path d="M0 0C10 -12 18 -4 9 3C4 6 1 4 0 0Z" fill="${c}" stroke="${C.murT}" stroke-width="${n(1.2 / s)}" stroke-linejoin="round"/>
    <path d="M0 -3L0 4" stroke="${C.murT}" stroke-width="${n(1.4 / s)}" stroke-linecap="round"/>
  </g>`;

// Arbre feuillu rond : le passe-partout du village (lobes superposés, comme le
// chêne de la carte — les arcs internes se lisent comme des touffes).
export const arbre = (x, y, s = 1, f = C.feuille) => `<g transform="translate(${x} ${y}) scale(${n(s)})">
    <path d="M-7 0L-5 -28L5 -28L7 0Z" fill="${C.tronc}" stroke="${C.troncT}" stroke-width="${n(2 / s)}" stroke-linejoin="round"/>
    <circle cx="0" cy="-44" r="24" fill="${f}" stroke="${C.feuilleT}" stroke-width="${n(2.2 / s)}"/>
    <circle cx="-17" cy="-56" r="16" fill="${f}" stroke="${C.feuilleT}" stroke-width="${n(2.2 / s)}"/>
    <circle cx="17" cy="-57" r="17" fill="${f}" stroke="${C.feuilleT}" stroke-width="${n(2.2 / s)}"/>
    <circle cx="0" cy="-66" r="17" fill="${f}" stroke="${C.feuilleT}" stroke-width="${n(2.2 / s)}"/>
  </g>`;

export const pommier = (x, y, s = 1) => `<g transform="translate(${x} ${y}) scale(${n(s)})">
    <path d="M-5 0L-3.5 -20L3.5 -20L5 0Z" fill="${C.tronc}" stroke="${C.troncT}" stroke-width="${n(1.8 / s)}" stroke-linejoin="round"/>
    <circle cx="0" cy="-34" r="21" fill="${C.feuille}" stroke="${C.feuilleT}" stroke-width="${n(2.2 / s)}"/>
    <circle cx="-9" cy="-30" r="3.8" fill="${C.pomme}"/>
    <circle cx="8" cy="-38" r="3.8" fill="${C.pomme}"/>
    <circle cx="2" cy="-24" r="3.8" fill="${C.pomme}"/>
  </g>`;

export const sapin = (x, y, h, f = C.sapinA, t = C.foretT) => {
  const w = h * 0.44;
  const e = (a, b) => `<path d="M0 ${n(-h * a)}L${n(w * b)} ${n(-h * (a - 0.26))}L${n(-w * b)} ${n(-h * (a - 0.26))}Z"
      fill="${f}" stroke="${t}" stroke-width="1.8" stroke-linejoin="round"/>`;
  return `<g transform="translate(${x} ${y})">
    <rect x="${n(-h * 0.05)}" y="${n(-h * 0.14)}" width="${n(h * 0.1)}" height="${n(h * 0.2)}" fill="${C.troncT}"/>
    ${e(1, 0.58)}${e(0.76, 0.8)}${e(0.52, 1)}
  </g>`;
};

export const buisson = (x, y, s = 1, f = C.feuille) => `<path transform="translate(${x} ${y}) scale(${n(s)})"
    d="M-22 0C-30 -4 -28 -18 -16 -18C-14 -30 4 -32 8 -20C22 -22 28 -8 20 0Z"
    fill="${f}" stroke="${C.feuilleT}" stroke-width="${n(2.2 / s)}" stroke-linejoin="round"/>`;

export const fleurs = (x, y, s = 1) => `<g transform="translate(${x} ${y}) scale(${n(s)})">
    <path d="M-13 0C-11 -8 -5 -10 -2 -3" fill="none" stroke="${C.herbeT}" stroke-width="${n(1.8 / s)}" stroke-linecap="round"/>
    <path d="M11 0C10 -10 5 -13 1 -6" fill="none" stroke="${C.herbeT}" stroke-width="${n(1.8 / s)}" stroke-linecap="round"/>
    <circle cx="-2" cy="-5" r="3.6" fill="${C.rose}" stroke="${C.murT}" stroke-width="${n(1.2 / s)}"/>
    <circle cx="1" cy="-9" r="3.6" fill="${C.soleil}" stroke="${C.murT}" stroke-width="${n(1.2 / s)}"/>
    <circle cx="-12" cy="-3" r="3.2" fill="${C.lilas}" stroke="${C.murT}" stroke-width="${n(1.2 / s)}"/>
  </g>`;

export const herbes = (x, y, s = 1, c = C.herbeT) => `<g transform="translate(${x} ${y}) scale(${n(s)})">
    <path d="M0 0C-2 -8 -6 -11 -9 -12" fill="none" stroke="${c}" stroke-width="${n(1.6 / s)}" stroke-linecap="round"/>
    <path d="M2 0C2 -9 1 -13 0 -16" fill="none" stroke="${c}" stroke-width="${n(1.6 / s)}" stroke-linecap="round"/>
    <path d="M4 0C6 -8 9 -10 12 -11" fill="none" stroke="${c}" stroke-width="${n(1.6 / s)}" stroke-linecap="round"/>
  </g>`;

// La luciole de la carte, à l'échelle du gros plan : halo, cœur, point blanc.
export const luciole = (x, y, s = 1) => `<g transform="translate(${x} ${y}) scale(${n(s)})">
    <circle r="7" fill="${C.luciole}" opacity=".22"/><circle r="3.4" fill="${C.luciole}" opacity=".55"/>
    <circle r="1.5" fill="#fffdf0"/>
  </g>`;

// Clôture blanche : `k` intervalles de `p` unités, deux lisses et des piquets.
export const cloture = (x, y, k = 4, p = 26, c = '#ffffff', t = C.murT) => {
  const l = k * p;
  const piquets = Array.from({ length: k + 1 }, (_, i) =>
    `<path d="M${n(i * p)} 6L${n(i * p)} -18L${n(i * p + 3)} -21L${n(i * p + 6)} -18L${n(i * p + 6)} 6Z"
      fill="${c}" stroke="${t}" stroke-width="1.3" stroke-linejoin="round"/>`).join('');
  return `<g transform="translate(${x} ${y})">
    <rect x="0" y="-14" width="${l}" height="4.5" fill="${c}" stroke="${t}" stroke-width="1.2"/>
    <rect x="0" y="-4" width="${l}" height="4.5" fill="${c}" stroke="${t}" stroke-width="1.2"/>
    ${piquets}
  </g>`;
};

// Un galet / une pierre posée au sol.
export const pierre = (x, y, s = 1, f = '#c8c3d2') => `<path transform="translate(${x} ${y}) scale(${n(s)})"
    d="M-14 0C-18 -6 -12 -14 -3 -13C6 -12 14 -8 13 0Z"
    fill="${f}" stroke="${C.montT}" stroke-width="${n(1.6 / s)}" stroke-linejoin="round"/>`;

// Champignon lumineux de la forêt : chapeau glacé, halo froid.
export const champignon = (x, y, s = 1, f = '#9fe9e2') => `<g transform="translate(${x} ${y}) scale(${n(s)})">
    <circle cy="-9" r="13" fill="${f}" opacity=".18"/>
    <path d="M-2 0L-2 -7L2 -7L2 0Z" fill="#e8f7f4" stroke="#5f9c9a" stroke-width="${n(1.2 / s)}" stroke-linejoin="round"/>
    <path d="M-9 -7C-9 -15 9 -15 9 -7Z" fill="${f}" stroke="#5f9c9a" stroke-width="${n(1.3 / s)}" stroke-linejoin="round"/>
    <circle cx="-3" cy="-10" r="1.6" fill="#fbffff"/><circle cx="3.5" cy="-9" r="1.3" fill="#fbffff"/>
  </g>`;
