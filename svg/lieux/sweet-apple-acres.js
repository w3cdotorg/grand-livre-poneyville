// ───────────────────────────────────────────────────────────────────────────────
// Sweet Apple Acres — la ferme de la famille Apple.
//
// RÉFÉRENCES (dans `refs/`, API MediaWiki de mlp.fandom.com) :
//   · refs/lieu-saa.png    https://mlp.fandom.com/wiki/File:Sweet_Apple_Acres_S2E5.png
//   · refs/lieu-saa-b.png  https://mlp.fandom.com/wiki/File:Sweet_Apple_Acres_S4E17.png
//
// L'ARCHITECTURE SIGNATURE de la grange, relevée sur les deux plans :
//   · un CLOCHETON BLANC à flèche pointue planté sur le faîtage, coiffé de la
//     GIROUETTE À POMME — c'est le seul détail de la ferme qui reste lisible en
//     vignette, il est donc dessiné grand ;
//   · une grande PORTE EN ARC sombre au centre, encadrée de blanc, et sa lucarne
//     de fenil juste au-dessus ;
//   · un APPENTIS plus bas côté gauche, à porte croisée en X ;
//   · des débords de toit larges et une menuiserie CRÈME sur des murs ROUGES ;
//   · devant : la barrière blanche, les bottes de paille, le vieux puits, et les
//     rangs de pommiers qui montent sur la colline.
// Le rouge `C.grange` et le toit `C.grangeT` sont ceux de la mini-grange de la
// carte d'accueil.
// ───────────────────────────────────────────────────────────────────────────────
import {
  C, cielFond, nuage, volute, soleil, oiseau, pommier, buisson, fleurs, herbes, cloture,
} from './_decor.js';

const CREME = '#fdf3e2';       // la menuiserie claire de la grange
const SOMBRE = '#5e2b33';      // le fond des portes ouvertes

// Le clocheton et sa girouette à pomme : la signature de la ferme. Il reste
// PETIT (28 unités de fût) — grandi, la grange se lit comme une chapelle.
const clocheton = () => `<g transform="translate(200 174)">
    <path d="M-11 0L-11 -20L11 -20L11 0Z" fill="${CREME}" stroke="${C.murT}" stroke-width="1.6" stroke-linejoin="round"/>
    <path d="M-14 -20L0 -40L14 -20Z" fill="${C.grangeT}" stroke="${C.grangeT}" stroke-width="1.6" stroke-linejoin="round"/>
    <path d="M-6 -4L-6 -13C-6 -18 6 -18 6 -13L6 -4Z" fill="${SOMBRE}" stroke="${C.murT}" stroke-width="1.4" stroke-linejoin="round"/>
    <path d="M0 -40L0 -54" stroke="${C.boisT}" stroke-width="2" stroke-linecap="round"/>
    <path d="M-11 -49L11 -49" stroke="${C.boisT}" stroke-width="1.6" stroke-linecap="round"/>
    <path d="M11 -49L6 -52L6 -46Z" fill="${C.boisT}" stroke="${C.boisT}" stroke-width="1.2" stroke-linejoin="round"/>
    <circle cx="0" cy="-59" r="5.5" fill="${C.pomme}" stroke="${C.grangeT}" stroke-width="1.4"/>
    <path d="M0 -64C1 -68 5 -69 6 -67C4 -64 2 -64 0 -64Z" fill="${C.feuille}" stroke="${C.feuilleT}" stroke-width="1.1" stroke-linejoin="round"/>
  </g>`;

// LE PIGNON EST ROUGE, PAS LE TOIT. Sur la référence, la façade monte jusqu'au
// faîtage en rouge ; le toit ne se voit que par ses DEUX BANDEAUX de rampant et
// le débord de l'égout. Un grand triangle sombre à la place du pignon donnait
// une chapelle et non une grange.
const grange = () => `<g>
    ${clocheton()}
    <path d="M146 252L146 200L200 164L254 200L254 252Z"
      fill="${C.grange}" stroke="${C.grangeT}" stroke-width="2.4" stroke-linejoin="round"/>
    <path d="M138 204L200 162L262 204" fill="none" stroke="${C.grangeT}" stroke-width="9" stroke-linejoin="round"/>
    <path d="M141 202L200 163L259 202" fill="none" stroke="${CREME}" stroke-width="2.4" stroke-linejoin="round"/>
    <path d="M146 200L254 200" stroke="${CREME}" stroke-width="2.4"/>
    <path d="M190 196L190 186C190 180 210 180 210 186L210 196Z" fill="${SOMBRE}" stroke="${CREME}" stroke-width="1.8" stroke-linejoin="round"/>
    <path d="M200 181L200 196" stroke="${CREME}" stroke-width="1.3"/>
    <path d="M180 252L180 224C180 208 220 208 220 224L220 252Z" fill="${SOMBRE}" stroke="${CREME}" stroke-width="2.4" stroke-linejoin="round"/>
    <path d="M200 211L200 252" stroke="${CREME}" stroke-width="1.6"/>
    <path d="M184 230L198 248M216 230L202 248" stroke="${CREME}" stroke-width="1.4" opacity=".8"/>
    <path d="M156 214L156 230L170 230L170 214Z" fill="${C.creme}" stroke="${CREME}" stroke-width="1.8" stroke-linejoin="round"/>
    <path d="M156 214L170 230M170 214L156 230" stroke="${C.grangeT}" stroke-width="1.3"/>
    <path d="M230 214L230 230L244 230L244 214Z" fill="${C.creme}" stroke="${CREME}" stroke-width="1.8" stroke-linejoin="round"/>
    <path d="M230 214L244 230M244 214L230 230" stroke="${C.grangeT}" stroke-width="1.3"/>
    <path d="M146 252L254 252" stroke="${C.grangeT}" stroke-width="2.4"/>

    <path d="M104 252L104 218L146 218L146 252Z" fill="${C.grange}" stroke="${C.grangeT}" stroke-width="2.2" stroke-linejoin="round"/>
    <path d="M104 218L125 202L146 218" fill="none" stroke="${C.grangeT}" stroke-width="8" stroke-linejoin="round"/>
    <path d="M106 217L125 203L144 217" fill="none" stroke="${CREME}" stroke-width="2.2" stroke-linejoin="round"/>
    <path d="M115 252L115 234C115 226 135 226 135 234L135 252Z" fill="${SOMBRE}" stroke="${CREME}" stroke-width="2" stroke-linejoin="round"/>
    <path d="M117 236L133 250M133 236L117 250" stroke="${CREME}" stroke-width="1.3"/>
  </g>`;

// Bottes de paille et vieux puits : le premier plan de la cour.
const cour = () => `<g>
    <g transform="translate(84 254)">
      <rect x="-13" y="-15" width="26" height="15" rx="3" fill="${C.paille}" stroke="${C.pailleT}" stroke-width="1.8"/>
      <path d="M-13 -8L13 -8" stroke="${C.pailleT}" stroke-width="1.3"/>
      <rect x="-9" y="-27" width="22" height="12" rx="3" fill="${C.paille}" stroke="${C.pailleT}" stroke-width="1.8"/>
    </g>
    <g transform="translate(306 272)">
      <path d="M-14 0C-16 -10 -15 -16 -13 -20L13 -20C15 -16 16 -10 14 0Z"
        fill="#c3bccd" stroke="${C.montT}" stroke-width="1.8" stroke-linejoin="round"/>
      <path d="M-14 -12L14 -12M-7 -20L-7 0M7 -20L7 0" stroke="${C.montT}" stroke-width="1.2" opacity=".65"/>
      <path d="M-13 -20C-6 -24 6 -24 13 -20" fill="none" stroke="${C.montT}" stroke-width="1.6"/>
      <path d="M-10 -22L-10 -34M10 -22L10 -34" stroke="${C.boisT}" stroke-width="2.2"/>
      <path d="M-16 -34L0 -44L16 -34Z" fill="${C.grangeT}" stroke="${C.grangeT}" stroke-width="1.8" stroke-linejoin="round"/>
      <path d="M0 -34L0 -27" stroke="${C.boisT}" stroke-width="1.4"/>
      <path d="M-4 -27L4 -27L3 -20L-3 -20Z" fill="${C.bois}" stroke="${C.boisT}" stroke-width="1.3" stroke-linejoin="round"/>
    </g>
    <g transform="translate(146 272)">
      <path d="M-13 0C-16 -10 -12 -14 0 -14C12 -14 16 -10 13 0Z" fill="${C.bois}" stroke="${C.boisT}" stroke-width="1.8" stroke-linejoin="round"/>
      <path d="M-13 -8L13 -8" stroke="${C.boisT}" stroke-width="1.3"/>
      <circle cx="-5" cy="-17" r="5" fill="${C.pomme}" stroke="${C.grangeT}" stroke-width="1.4"/>
      <circle cx="5" cy="-18" r="5" fill="${C.pomme}" stroke="${C.grangeT}" stroke-width="1.4"/>
      <circle cx="0" cy="-24" r="5" fill="${C.pomme}" stroke="${C.grangeT}" stroke-width="1.4"/>
    </g>
  </g>`;

export default () => `<svg viewBox="0 0 400 300" xmlns="http://www.w3.org/2000/svg" role="img"
  aria-label="Sweet Apple Acres, la grange rouge de la famille Apple au milieu du verger">
  ${cielFond('saa-ciel')}
  ${soleil(52, 44, 17)}
  ${volute(300, 44, 1)}${volute(120, 70, 0.8)}
  ${nuage(316, 60, 0.3, 0.9)}${nuage(150, 44, 0.22, 0.7)}
  ${oiseau(240, 40, 0.9)}${oiseau(264, 52, 0.7)}
  <path d="M0 190C50 170 96 176 140 186C190 197 240 176 300 172C340 169 372 178 400 186L400 300L0 300Z"
    fill="${C.loin}" stroke="${C.herbeT}" stroke-width="2.2"/>
  <path d="M0 224C60 206 130 216 200 224C270 232 340 218 400 210L400 300L0 300Z"
    fill="${C.mid}" stroke="${C.herbeT}" stroke-width="2.2"/>
  ${pommier(322, 214, 0.62)}${pommier(360, 224, 0.7)}${pommier(292, 226, 0.55)}
  ${pommier(38, 214, 0.6)}${pommier(74, 222, 0.52)}
  ${grange()}
  <path d="M0 258C70 246 150 250 200 252C260 254 330 248 400 252L400 300L0 300Z"
    fill="${C.pres}" stroke="${C.herbeT}" stroke-width="2.2"/>
  ${pommier(348, 268, 0.9)}${pommier(286, 258, 0.72)}
  ${cour()}
  ${cloture(-6, 278, 4, 28)}${cloture(250, 276, 5, 28)}
  ${buisson(214, 288, 0.6)}${buisson(64, 284, 0.55)}
  ${fleurs(178, 284, 0.9)}${fleurs(258, 290, 0.85)}${fleurs(24, 292, 0.8)}
  ${herbes(108, 288, 0.9)}${herbes(324, 292, 0.9)}
</svg>`;
