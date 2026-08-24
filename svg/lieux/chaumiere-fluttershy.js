// ───────────────────────────────────────────────────────────────────────────────
// La chaumière de Fluttershy — la maison-colline au bord de la forêt.
//
// RÉFÉRENCE (dans `refs/`, API MediaWiki de mlp.fandom.com) :
//   · refs/lieu-chaumiere.png
//     https://mlp.fandom.com/wiki/File:Fluttershy's_cottage_exterior_S6E11.png
//
// L'ARCHITECTURE SIGNATURE, relevée sur la référence :
//   · le TOIT N'EST PAS DE CHAUME MAIS D'HERBE : une grosse motte verte bombée,
//     bordée de touffes, qui retombe très bas sur les murs — la maison a l'air
//     d'être une colline percée de fenêtres ;
//   · les murs sont d'un BEIGE TRÈS CLAIR, presque sable, et n'apparaissent que
//     par plaques entre les retombées du toit ;
//   · les FENÊTRES SONT DES ARCHES à carreaux JAUNE CHAUD (elles sont toujours
//     éclairées) et la PORTE EST ROUGE, en plein cintre ;
//   · une petite CHEMINÉE à chapeau rouge sort de la motte ;
//   · tout autour, des NICHOIRS : sur perche, pendus aux branches, en grappe sur
//     un poteau — c'est la marque du lieu autant que la maison ;
//   · devant, le CHEMIN qui passe sur un PETIT PONT de pierre, et les terriers
//     ouverts dans le talus.
//
// NOTE DE COHÉRENCE : sur la carte d'accueil la chaumière a un toit de PAILLE
// (`C.paille`). La référence et le brief disent tous deux « toit d'herbe » ; la
// fiche tranche pour le vert, et la carte reste à corriger (voir NOTES.md).
// ───────────────────────────────────────────────────────────────────────────────
import { C, n, cielFond, nuage, volute, oiseau, arbre, buisson, fleurs, herbes, papillon, pierre } from './_decor.js';

const MUR = '#f0e2c4';         // le beige sable des murs
const MUR_T = '#c2a878';
const VITRE_J = '#ffdf8e';     // les carreaux toujours allumés
const VITRE_JT = '#c99a3e';
const MOUSSE = '#63b04a';      // le vert de la motte
const MOUSSE_C = '#7fc45f';
const MOUSSE_T = '#3f7f31';
const TOIT_N = '#d0574e';      // les toitures des nichoirs

// Fenêtre en arche à carreaux rayonnants, toujours éclairée.
const fenetre = (x, y, w, h) => `<g transform="translate(${x} ${y})">
    <path d="M${n(-w / 2)} ${n(h / 2)}L${n(-w / 2)} 0C${n(-w / 2)} ${n(-h * 0.75)} ${n(w / 2)} ${n(-h * 0.75)} ${n(w / 2)} 0L${n(w / 2)} ${n(h / 2)}Z"
      fill="${VITRE_J}" stroke="${MUR_T}" stroke-width="2" stroke-linejoin="round"/>
    <path d="M0 ${n(h / 2)}L0 ${n(-h * 0.45)}M${n(-w / 2)} 0L${n(w / 2)} 0" stroke="${VITRE_JT}" stroke-width="1.1"/>
    <path d="M${n(-w * 0.36)} ${n(-h * 0.28)}L${n(w * 0.36)} ${n(-h * 0.28)}" stroke="${VITRE_JT}" stroke-width="1.1"/>
  </g>`;

// Nichoir : cabane minuscule à toit pointu et trou rond, sur perche ou pendue.
const nichoir = (x, y, s = 1, h = 26) => `<g transform="translate(${x} ${y}) scale(${n(s)})">
    <path d="M-1.6 0L-1.6 ${-h}L1.6 ${-h}L1.6 0Z" fill="${C.boisT}"/>
    <path d="M-9 ${-h}L-9 ${n(-h - 13)}L9 ${n(-h - 13)}L9 ${-h}Z" fill="${C.mur}" stroke="${MUR_T}" stroke-width="${n(1.5 / s)}" stroke-linejoin="round"/>
    <path d="M-12 ${n(-h - 13)}L0 ${n(-h - 24)}L12 ${n(-h - 13)}Z" fill="${TOIT_N}" stroke="${C.grangeT}" stroke-width="${n(1.5 / s)}" stroke-linejoin="round"/>
    <circle cx="0" cy="${n(-h - 7)}" r="3.2" fill="${C.troncT}"/>
    <path d="M0 ${n(-h - 4)}L0 ${n(-h + 1)}" stroke="${C.boisT}" stroke-width="${n(1.6 / s)}" stroke-linecap="round"/>
  </g>`;

const chaumiere = () => `<g>
    <path d="M148 250L148 216L246 216L246 250Z" fill="${MUR}" stroke="${MUR_T}" stroke-width="2.4" stroke-linejoin="round"/>
    ${fenetre(168, 232, 22, 26)}
    ${fenetre(232, 234, 20, 24)}
    <path d="M196 252L196 226C196 212 218 212 218 226L218 252Z"
      fill="${C.grange}" stroke="${C.grangeT}" stroke-width="2.2" stroke-linejoin="round"/>
    <path d="M202 218L202 250M208 216L208 250M214 218L214 250" stroke="${C.grangeT}" stroke-width="1.1" opacity=".55"/>
    <circle cx="213" cy="236" r="2" fill="${C.or}"/>

    <path d="M126 226C130 186 154 158 194 158C234 158 262 182 268 224
      C250 210 232 214 222 218C212 222 196 222 186 218C168 210 140 212 126 226Z"
      fill="${MOUSSE}" stroke="${MOUSSE_T}" stroke-width="2.4" stroke-linejoin="round"/>
    <path d="M140 196C158 178 184 172 208 176" fill="none" stroke="${MOUSSE_C}" stroke-width="3" stroke-linecap="round" opacity=".8"/>
    <path d="M216 172C238 178 252 194 258 210" fill="none" stroke="${MOUSSE_C}" stroke-width="2.6" stroke-linecap="round" opacity=".7"/>
    <path d="M128 222C136 214 148 212 158 216C152 220 140 222 128 222Z" fill="${MOUSSE_C}" opacity=".8"/>
    <path d="M244 216C252 212 262 214 266 220C256 222 248 220 244 216Z" fill="${MOUSSE_C}" opacity=".8"/>
    ${fenetre(196, 192, 22, 24)}
    <path d="M186 178C190 168 206 168 210 178C202 174 194 174 186 178Z" fill="${MOUSSE_C}" stroke="${MOUSSE_T}" stroke-width="1.4" stroke-linejoin="round"/>

    <g transform="translate(154 172)">
      <path d="M-6 24L-6 0L6 0L6 24Z" fill="${MUR}" stroke="${MUR_T}" stroke-width="1.8" stroke-linejoin="round"/>
      <path d="M-9 0C-9 -12 9 -12 9 0Z" fill="${TOIT_N}" stroke="${C.grangeT}" stroke-width="1.8" stroke-linejoin="round"/>
      <path d="M0 -12L0 -17" stroke="${C.grangeT}" stroke-width="1.6" stroke-linecap="round"/>
    </g>
    ${nichoir(258, 190, 0.7, 10)}
  </g>`;

// Le talus, ses terriers et le petit pont de pierre du premier plan.
const pont = () => `<g>
    <path d="M0 284C50 276 84 272 128 274C172 276 214 286 260 290C310 294 356 292 400 288L400 300L0 300Z"
      fill="${C.pres}" stroke="${C.herbeT}" stroke-width="2.2"/>
    <path d="M0 300C40 292 92 288 140 290C176 291 194 288 216 286C258 282 300 288 340 300"
      fill="none" stroke="${C.eauT}" stroke-width="20" stroke-linecap="round"/>
    <path d="M0 300C40 292 92 288 140 290C176 291 194 288 216 286C258 282 300 288 340 300"
      fill="none" stroke="${C.eau}" stroke-width="14" stroke-linecap="round"/>
    <path d="M60 294C88 290 112 289 136 290" fill="none" stroke="#ffffff" stroke-width="2.4" opacity=".55" stroke-linecap="round"/>
    <path d="M266 292C290 292 308 294 322 298" fill="none" stroke="#ffffff" stroke-width="2.4" opacity=".55" stroke-linecap="round"/>
    <path d="M166 300L166 288C166 274 258 274 258 288L258 300Z"
      fill="#c6bbad" stroke="#8e8377" stroke-width="2.2" stroke-linejoin="round"/>
    <path d="M196 300C196 290 204 284 212 284C220 284 228 290 228 300Z" fill="${C.eauT}"/>
    <path d="M172 292L186 292M240 292L254 292M180 300L180 292M244 300L244 292" stroke="#8e8377" stroke-width="1.3" opacity=".6"/>
    <path d="M160 278C184 264 240 264 264 278C240 272 184 272 160 278Z"
      fill="#ded4c6" stroke="#8e8377" stroke-width="2.2" stroke-linejoin="round"/>
    <path d="M112 268C112 260 124 256 132 260C138 263 136 270 130 270Z"
      fill="#6f5f4e" stroke="#54473a" stroke-width="1.8" stroke-linejoin="round"/>
    <path d="M290 262C290 254 302 250 310 254C316 257 314 264 308 264Z"
      fill="#6f5f4e" stroke="#54473a" stroke-width="1.8" stroke-linejoin="round"/>
  </g>`;

export default () => `<svg viewBox="0 0 400 300" xmlns="http://www.w3.org/2000/svg" role="img"
  aria-label="La chaumière de Fluttershy, sa maison au toit d'herbe et ses nichoirs">
  ${cielFond('fs-ciel', '#9ad9ee', '#e6f6f4')}
  ${volute(60, 46, 1)}${volute(324, 40, 0.9)}${volute(92, 92, 0.7)}
  ${nuage(66, 36, 0.28, 0.85)}${nuage(330, 74, 0.24, 0.7)}
  ${oiseau(268, 46, 0.9)}${oiseau(292, 58, 0.75)}${oiseau(120, 62, 0.7)}
  <path d="M0 214C50 196 110 202 168 208C230 214 300 200 400 194L400 300L0 300Z"
    fill="${C.loin}" stroke="${C.herbeT}" stroke-width="2.2"/>
  <path d="M0 252C60 238 130 246 200 250C270 254 340 244 400 238L400 300L0 300Z"
    fill="${C.mid}" stroke="${C.herbeT}" stroke-width="2.2"/>
  ${arbre(56, 250, 0.8)}${arbre(340, 244, 0.72)}
  ${nichoir(88, 250, 0.85, 34)}
  ${chaumiere()}
  <g>
    ${arbre(324, 252, 0.78)}
    <path d="M330 210C340 206 352 210 356 218" fill="none" stroke="${C.troncT}" stroke-width="2.4" stroke-linecap="round"/>
    <path d="M356 218L356 224" stroke="${C.boisT}" stroke-width="1.4"/>
    <g transform="translate(356 248) scale(0.6)">
      <path d="M-9 0L-9 -13L9 -13L9 0Z" fill="${C.mur}" stroke="${MUR_T}" stroke-width="2.5" stroke-linejoin="round"/>
      <path d="M-12 -13L0 -24L12 -13Z" fill="${TOIT_N}" stroke="${C.grangeT}" stroke-width="2.5" stroke-linejoin="round"/>
      <circle cx="0" cy="-7" r="3.2" fill="${C.troncT}"/>
      <path d="M0 -4L0 1" stroke="${C.boisT}" stroke-width="2.6" stroke-linecap="round"/>
    </g>
  </g>
  ${pont()}
  ${nichoir(64, 288, 0.72, 30)}
  ${pierre(280, 276, 0.5)}${pierre(158, 284, 0.45)}
  ${buisson(268, 258, 0.6)}${buisson(140, 262, 0.55)}${buisson(360, 274, 0.6)}
  ${fleurs(102, 276, 0.95)}${fleurs(292, 268, 0.85)}${fleurs(36, 284, 0.9)}${fleurs(372, 292, 0.8)}
  ${herbes(160, 268, 0.9)}${herbes(248, 272, 0.85)}${herbes(320, 296, 0.9)}
  ${papillon(112, 202, 0.65, C.rose)}${papillon(286, 168, 0.55, C.soleil)}
</svg>`;
