// ───────────────────────────────────────────────────────────────────────────────
// L'école de Poneyville — la petite école à la cloche.
//
// RÉFÉRENCES (dans `refs/`, API MediaWiki de mlp.fandom.com) :
//   · refs/lieu-ecole.png    https://mlp.fandom.com/wiki/File:Ponyville_Schoolhouse_S4E05.png
//   · refs/lieu-ecole-b.png  https://mlp.fandom.com/wiki/File:Ponyville_Schoolhouse_exterior_S6E14.png
//
// L'ARCHITECTURE SIGNATURE, relevée sur la référence :
//   · l'école est ROUGE-ROSE, pas lilas : murs framboise couverts de VOLUTES
//     CLAIRES, toit d'écailles rouge foncé ;
//   · la rive du pignon est une DENTELLE BLANCHE festonnée semée de PETITS CŒURS ;
//   · les fenêtres sont HAUTES ET ÉTROITES, chacune coiffée d'un CŒUR ROSE ;
//   · un PORCHE blanc à colonnes et à marches, avec le FER À CHEVAL doré ;
//   · le CLOCHER sur le faîtage, et sa CLOCHE ROUGE — le texte de la fiche dit
//     « reconnaissable à sa cloche rouge » et la carte d'accueil en met une, elle
//     aussi : c'est le point d'ancrage entre les deux dessins ;
//   · dans la cour : le MÂT au drapeau rouge, la barrière blanche, et le panneau
//     au livre ouvert.
//
// NOTE DE COHÉRENCE : la mini-école de la carte d'accueil a des murs crème et un
// toit bleu. La référence tranche pour le rouge ; seule la cloche rouge est
// commune aux deux (voir NOTES.md).
// ───────────────────────────────────────────────────────────────────────────────
import { C, n, cielFond, nuage, volute, oiseau, arbre, buisson, fleurs, herbes, cloture, papillon } from './_decor.js';

const MUR_R = '#e0596b';       // le framboise des murs
const MUR_RT = '#a83a52';
const TOIT = '#c03a48';        // les écailles du toit
const TOIT_T = '#8e2637';
const DENTELLE = '#fff4f2';
const COEUR = '#f9a8c6';
const VITRE_E = '#fff2c9';

const coeur = (x, y, s = 1, f = COEUR) => `<path transform="translate(${x} ${y}) scale(${n(s)})"
    d="M0 6C-8 0 -10 -6 -6 -9C-3 -11 -1 -9 0 -7C1 -9 3 -11 6 -9C10 -6 8 0 0 6Z"
    fill="${f}" stroke="${MUR_RT}" stroke-width="${n(1.2 / s)}" stroke-linejoin="round"/>`;

// La dentelle de rive : des festons blancs le long d'un rampant, semés de cœurs.
const rive = (x1, y1, x2, y2, k) => {
  const dx = (x2 - x1) / k, dy = (y2 - y1) / k;
  const d = Array.from({ length: k }, (_, i) => {
    const ax = x1 + i * dx, ay = y1 + i * dy;
    return `M${n(ax)} ${n(ay)}C${n(ax + dx * 0.2 - dy * 0.5)} ${n(ay + dy * 0.2 + dx * 0.5)} ${n(ax + dx * 0.8 - dy * 0.5)} ${n(ay + dy * 0.8 + dx * 0.5)} ${n(ax + dx)} ${n(ay + dy)}`;
  }).join('');
  return `<path d="${d}" fill="none" stroke="${DENTELLE}" stroke-width="6" stroke-linecap="round"/>`;
};

// Fenêtre haute et étroite, sous son cœur.
const fenetre = (x, y, w, h) => `<g transform="translate(${x} ${y})">
    <path d="M${n(-w / 2)} 0L${n(-w / 2)} ${-h}L${n(w / 2)} ${-h}L${n(w / 2)} 0Z"
      fill="${VITRE_E}" stroke="${DENTELLE}" stroke-width="2.2" stroke-linejoin="round"/>
    <path d="M0 0L0 ${-h}" stroke="${C.orT}" stroke-width="1.1" opacity=".5"/>
    <path d="M${n(-w / 2)} ${n(-h / 2)}L${n(w / 2)} ${n(-h / 2)}" stroke="${C.orT}" stroke-width="1.1" opacity=".5"/>
    ${coeur(0, n(-h - 8), 1.1)}
  </g>`;

const clocher = () => `<g transform="translate(200 164)">
    <path d="M-13 0L-13 -22L13 -22L13 0Z" fill="${DENTELLE}" stroke="${MUR_RT}" stroke-width="1.8" stroke-linejoin="round"/>
    <path d="M-16 -22L0 -34L16 -22Z" fill="${TOIT}" stroke="${TOIT_T}" stroke-width="1.8" stroke-linejoin="round"/>
    <path d="M-9 -4C-9 -16 9 -16 9 -4Z" fill="${C.pomme}" stroke="${TOIT_T}" stroke-width="1.8" stroke-linejoin="round"/>
    <path d="M-11 -4L11 -4" stroke="${TOIT_T}" stroke-width="1.8" stroke-linecap="round"/>
    <circle cx="0" cy="0" r="2.6" fill="${TOIT_T}"/>
    <path d="M0 -34L0 -40" stroke="${C.orT}" stroke-width="1.6" stroke-linecap="round"/>
  </g>`;

const ecole = () => `<g>
    ${clocher()}
    <path d="M138 262L138 202L200 164L262 202L262 262Z"
      fill="${MUR_R}" stroke="${MUR_RT}" stroke-width="2.4" stroke-linejoin="round"/>
    <path d="M152 246C144 236 148 224 158 224M248 246C256 236 252 224 242 224" fill="none"
      stroke="${DENTELLE}" stroke-width="2" opacity=".6" stroke-linecap="round"/>
    <path d="M176 200C168 192 172 180 182 182M224 200C232 192 228 180 218 182" fill="none"
      stroke="${DENTELLE}" stroke-width="2" opacity=".6" stroke-linecap="round"/>
    <path d="M132 206L200 164L268 206" fill="none" stroke="${TOIT}" stroke-width="10" stroke-linejoin="round"/>
    <path d="M132 206L200 164L268 206" fill="none" stroke="${TOIT_T}" stroke-width="1.8" stroke-linejoin="round" opacity=".5"/>
    ${rive(136, 205, 200, 165, 5)}
    ${rive(264, 205, 200, 165, 5)}
    ${coeur(200, 186, 1.2)}${coeur(170, 200, 0.9)}${coeur(230, 200, 0.9)}
    ${fenetre(154, 250, 15, 34)}
    ${fenetre(246, 250, 15, 34)}
    <path d="M180 262L180 232C180 220 220 220 220 232L220 262Z" fill="${VITRE_E}" stroke="${DENTELLE}" stroke-width="2.4" stroke-linejoin="round"/>
    <path d="M200 224L200 262" stroke="${C.orT}" stroke-width="1.2" opacity=".5"/>
    <path d="M170 232C176 216 224 216 230 232Z" fill="${DENTELLE}" stroke="${MUR_RT}" stroke-width="1.8" stroke-linejoin="round"/>
    <path d="M190 228C190 220 210 220 210 228C204 224 196 224 190 228Z" fill="${C.or}" stroke="${C.orT}" stroke-width="1.4" stroke-linejoin="round"/>
    <path d="M172 262L172 234M228 262L228 234" stroke="${DENTELLE}" stroke-width="5" stroke-linecap="round"/>
    <path d="M164 268L236 268L232 262L168 262Z" fill="${DENTELLE}" stroke="${MUR_RT}" stroke-width="1.6" stroke-linejoin="round"/>
    <path d="M158 274L242 274L238 268L162 268Z" fill="${DENTELLE}" stroke="${MUR_RT}" stroke-width="1.6" stroke-linejoin="round"/>
    <path d="M138 262L262 262" stroke="${MUR_RT}" stroke-width="2.2"/>
  </g>`;

// Le mât et son drapeau rouge, dans la cour.
const mat = (x, y) => `<g transform="translate(${x} ${y})">
    <path d="M-7 0C-7 -5 7 -5 7 0Z" fill="${C.montT}" stroke="${C.montT}" stroke-width="1.4" stroke-linejoin="round"/>
    <path d="M0 -2L0 -86" stroke="${C.boisT}" stroke-width="2.6" stroke-linecap="round"/>
    <path d="M0 -86C10 -90 16 -80 28 -84L28 -70C16 -66 10 -76 0 -72Z"
      fill="${C.pomme}" stroke="${C.grangeT}" stroke-width="1.6" stroke-linejoin="round"/>
    <circle cx="0" cy="-89" r="2.6" fill="${C.or}" stroke="${C.orT}" stroke-width="1.1"/>
  </g>`;

// Le panneau de la cour : un grand livre ouvert peint sur une planche.
const panneau = (x, y) => `<g transform="translate(${x} ${y})">
    <path d="M-16 0L-16 -14M16 0L16 -14" stroke="${C.boisT}" stroke-width="3.4" stroke-linecap="round"/>
    <path d="M-21 -14L-21 -40L21 -40L21 -14Z" fill="${C.bois}" stroke="${C.boisT}" stroke-width="2" stroke-linejoin="round"/>
    <path d="M-16 -18L-16 -36L16 -36L16 -18Z" fill="${COEUR}" stroke="${C.boisT}" stroke-width="1.4"/>
    <path d="M-13 -22C-9 -32 -2 -32 0 -29C2 -32 9 -32 13 -22C9 -26 2 -26 0 -24C-2 -26 -9 -26 -13 -22Z"
      fill="#fffaf0" stroke="${C.boisT}" stroke-width="1.3" stroke-linejoin="round"/>
    <path d="M0 -29L0 -24" stroke="${C.boisT}" stroke-width="1.1"/>
    <circle cx="-21" cy="-42" r="3" fill="${C.bois}" stroke="${C.boisT}" stroke-width="1.3"/>
    <circle cx="21" cy="-42" r="3" fill="${C.bois}" stroke="${C.boisT}" stroke-width="1.3"/>
  </g>`;

export default () => `<svg viewBox="0 0 400 300" xmlns="http://www.w3.org/2000/svg" role="img"
  aria-label="L'école de Poneyville, sa cloche rouge et sa cour">
  ${cielFond('ep-ciel', '#98dbf0', '#e8f7fb')}
  ${volute(60, 46, 1)}${volute(340, 40, 0.9)}${volute(276, 88, 0.7)}
  ${nuage(66, 36, 0.28, 0.85)}${nuage(330, 78, 0.24, 0.7)}
  ${oiseau(120, 52, 0.9)}${oiseau(144, 64, 0.7)}
  <path d="M0 218C60 204 130 212 200 216C270 220 340 208 400 200L400 300L0 300Z"
    fill="${C.loin}" stroke="${C.herbeT}" stroke-width="2.2"/>
  ${arbre(58, 244, 0.92)}${arbre(362, 242, 0.85)}${arbre(112, 232, 0.55)}
  <path d="M0 252C60 240 130 248 200 252C270 256 340 246 400 240L400 300L0 300Z"
    fill="${C.mid}" stroke="${C.herbeT}" stroke-width="2.2"/>
  ${ecole()}
  <path d="M0 276C80 266 300 268 400 274L400 300L0 300Z" fill="${C.pres}" stroke="${C.herbeT}" stroke-width="2.2"/>
  <path d="M172 274C168 284 152 294 128 300L272 300C248 294 232 284 228 274Z"
    fill="${C.chemin}" stroke="${C.cheminT}" stroke-width="1.8" stroke-linejoin="round"/>
  ${mat(300, 272)}
  ${panneau(84, 288)}
  ${cloture(-4, 286, 3, 28)}${cloture(300, 288, 3, 28)}
  ${buisson(132, 280, 0.6)}${buisson(268, 278, 0.6)}${buisson(360, 294, 0.55)}
  ${fleurs(240, 288, 0.9)}${fleurs(158, 290, 0.85)}${fleurs(38, 296, 0.8)}
  ${herbes(196, 288, 0.9)}${herbes(330, 296, 0.85)}
  ${papillon(114, 224, 0.6, C.rose)}${papillon(288, 200, 0.55, C.soleil)}
</svg>`;
