// ───────────────────────────────────────────────────────────────────────────────
// La Carousel Boutique — l'atelier de couture de Rarity.
//
// RÉFÉRENCE (dans `refs/`, API MediaWiki de mlp.fandom.com) :
//   · refs/lieu-boutique.png
//     https://mlp.fandom.com/wiki/File:Carousel_Boutique_exterior_at_midday_S7E5.png
//
// L'ARCHITECTURE SIGNATURE, relevée sur la référence — trois étages empilés :
//   1. un REZ-DE-CHAUSSÉE ROND à panneaux lilas et blancs, percé de DEUX GRANDES
//      FENÊTRES OVALES et d'une porte violette centrale sous un lambrequin rose ;
//   2. un TOIT CONIQUE À LOSANGES (l'arlequin rose et lilas), cerclé d'une bande
//      d'or, avec le médaillon au cheval de manège sur le devant ;
//   3. et surtout le MANÈGE OUVERT tout en haut : trois chevaux de bois sur leurs
//      barres torsadées sous un dais festonné d'or, plus le petit cône à losanges
//      et son épi. C'est ce troisième étage qui fait « manège » et pas « maison » :
//      il est donc dessiné en grand, et les chevaux se lisent en silhouette.
//
// La robe en vitrine reprend les couleurs de Rarity (`js/data.js`) : c'est le seul
// endroit du livre où un lieu emprunte la palette d'un personnage, et il vaut la
// peine — l'enfant retrouve le violet de sa crinière dans sa boutique.
// ───────────────────────────────────────────────────────────────────────────────
import { PERSONNAGE } from '../../js/data.js';
import { C, n, cielFond, nuage, volute, oiseau, arbre, buisson, fleurs, herbes, papillon } from './_decor.js';

const R = PERSONNAGE.rarity.couleurs;
const LILAS = '#e2d2f2';       // le lilas pâle des panneaux
const LILAS_F = '#c9aee6';     // le lilas des losanges
const OR_C = '#ffe9a8';        // l'or clair du dais

// Un losange d'arlequin posé sur le cône.
const losange = (x, y, w, h, f) => `<path d="M${x} ${n(y - h)}L${n(x + w)} ${y}L${x} ${n(y + h)}L${n(x - w)} ${y}Z"
    fill="${f}" stroke="${LILAS_F}" stroke-width="1"/>`;

// Le cheval de manège : silhouette pleine, crinière et queue relevées.
const chevalDeBois = (x, y, s, f) => `<g transform="translate(${x} ${y}) scale(${n(s)})">
    <path d="M0 26L0 -22" stroke="${C.orT}" stroke-width="${n(2.2 / s)}" stroke-linecap="round"/>
    <path d="M-13 12C-16 4 -14 -4 -8 -8C-2 -12 8 -12 12 -6C14 -10 18 -12 20 -16C21 -12 20 -7 16 -3C15 4 14 9 12 12
      C10 8 8 6 5 6C2 6 0 8 -1 12C-3 8 -6 6 -9 7C-11 8 -12 10 -13 12Z"
      fill="${f}" stroke="${C.orT}" stroke-width="${n(1.4 / s)}" stroke-linejoin="round"/>
    <path d="M-13 -2C-18 -4 -22 -1 -21 4C-19 2 -16 1 -13 2Z" fill="${f}" stroke="${C.orT}" stroke-width="${n(1.2 / s)}" stroke-linejoin="round"/>
  </g>`;

// La vitrine : buste de couturière et robe aux couleurs de Rarity.
// La robe est en `R.robe` (le blanc lavande de sa robe de poney) et la ceinture
// en `R.criniere[0]` : peinte en violet plein, elle bouchait l'ovale d'une masse
// sombre et la boutique devenait lourde du bas.
const mannequin = (x, y, s = 1) => `<g transform="translate(${x} ${y}) scale(${n(s)})">
    <path d="M-3 0L-2 -8L2 -8L3 0Z" fill="${C.orT}"/>
    <path d="M-12 -8C-12 -22 -6 -30 0 -30C6 -30 12 -22 12 -8Z"
      fill="${R.robe}" stroke="${C.lilasT}" stroke-width="${n(1.3 / s)}" stroke-linejoin="round"/>
    <path d="M-10 -14C-4 -17 4 -17 10 -14" fill="none" stroke="${R.criniere[0]}" stroke-width="${n(2.4 / s)}"/>
    <path d="M-8 -21C-3 -24 3 -24 8 -21" fill="none" stroke="${C.rose}" stroke-width="${n(1.6 / s)}"/>
    <circle cx="0" cy="-33" r="4" fill="${R.criniere[0]}" stroke="${C.lilasT}" stroke-width="${n(1.2 / s)}"/>
  </g>`;

// Fenêtre ovale à petits carreaux, sous son store d'or plissé.
const vitrine = (x, y, dedans) => `<g transform="translate(${x} ${y})">
    <ellipse rx="21" ry="29" fill="${C.mur}" stroke="${C.lilasT}" stroke-width="2.4"/>
    <ellipse rx="16" ry="24" fill="${C.vitre}" stroke="${C.lilasT}" stroke-width="1.6"/>
    <path d="M-15 -8L15 -8M-16 4L16 4M0 -24L0 24" stroke="${C.vitreT}" stroke-width="1.1" opacity=".8"/>
    ${dedans}
    <path d="M-16 -12C-14 -26 14 -26 16 -12C11 -18 7 -14 5 -12C3 -18 -3 -18 -5 -12C-7 -16 -12 -17 -16 -12Z"
      fill="${C.or}" stroke="${C.orT}" stroke-width="1.4" stroke-linejoin="round"/>
    <ellipse rx="21" ry="29" fill="none" stroke="${C.lilasT}" stroke-width="2.4"/>
  </g>`;

const boutique = () => `<g>
    <ellipse cx="200" cy="264" rx="86" ry="12" fill="${C.pres}" stroke="${C.herbeT}" stroke-width="1.8"/>
    <path d="M144 264C140 236 142 214 148 194L252 194C258 214 260 236 256 264Z"
      fill="${C.mur}" stroke="${C.lilasT}" stroke-width="2.4" stroke-linejoin="round"/>
    <path d="M156 264C153 236 155 214 159 194L173 194C169 214 167 236 169 264Z" fill="${LILAS}"/>
    <path d="M231 264C233 236 231 214 227 194L241 194C245 214 247 236 244 264Z" fill="${LILAS}"/>
    <path d="M186 194C184 210 183 226 183 240M214 194C216 210 217 226 217 240"
      fill="none" stroke="${LILAS_F}" stroke-width="1.2" opacity=".8"/>
    <path d="M144 258C176 252 224 252 256 258" fill="none" stroke="${LILAS_F}" stroke-width="2"/>

    ${vitrine(172, 224, mannequin(0, 20, 0.9))}
    ${vitrine(228, 224, mannequin(0, 20, 0.9))}

    <path d="M186 264L186 224C186 210 214 210 214 224L214 264Z"
      fill="${C.lilas}" stroke="${R.criniere[0]}" stroke-width="2.2" stroke-linejoin="round"/>
    <path d="M200 232L207 242L200 252L193 242Z" fill="${C.mur}" stroke="${R.criniere[0]}" stroke-width="1.3" stroke-linejoin="round"/>
    <circle cx="209" cy="246" r="2.2" fill="${C.or}"/>
    <path d="M180 214C186 202 214 202 220 214C214 210 206 210 200 212C194 210 186 210 180 214Z"
      fill="${C.rose}" stroke="${C.roseT}" stroke-width="1.6" stroke-linejoin="round"/>

    <path d="M126 196C140 174 170 166 200 166C230 166 260 174 274 196C246 188 154 188 126 196Z"
      fill="${C.rose}" stroke="${C.roseT}" stroke-width="2.2" stroke-linejoin="round"/>
    <path d="M132 189C148 181 168 177 200 177C232 177 252 181 268 189" fill="none" stroke="${OR_C}" stroke-width="3.4"/>
    <path d="M134 193C138 199 146 199 150 193M150 193C154 198 162 198 166 192M166 192C170 197 178 197 182 191
      M182 191C186 196 196 196 200 190M200 190C204 196 214 196 218 191M218 191C222 197 230 197 234 192
      M234 192C238 198 246 198 250 193M250 193C254 199 262 199 266 193"
      fill="none" stroke="${C.mur}" stroke-width="2.6" stroke-linecap="round"/>

    <path d="M154 176L200 110L246 176Z" fill="${LILAS}" stroke="${C.lilasT}" stroke-width="2.2" stroke-linejoin="round"/>
    ${losange(200, 124, 6, 8, C.rose)}
    ${losange(187, 140, 7, 9, LILAS_F)}${losange(213, 140, 7, 9, LILAS_F)}
    ${losange(174, 156, 7, 9, C.rose)}${losange(226, 156, 7, 9, C.rose)}
    <path d="M154 176L246 176" stroke="${C.or}" stroke-width="4.4" stroke-linecap="round"/>
    <g transform="translate(200 162)">
      <circle r="13" fill="${C.mur}" stroke="${C.or}" stroke-width="2"/>
      ${chevalDeBois(0, -1, 0.5, C.or)}
    </g>

    <path d="M168 110L232 110L236 114L164 114Z" fill="${C.or}" stroke="${C.orT}" stroke-width="1.6" stroke-linejoin="round"/>
    <path d="M172 110L172 92M200 110L200 92M228 110L228 92" stroke="${C.orT}" stroke-width="1.6"/>
    ${chevalDeBois(172, 98, 0.44, C.rose)}
    ${chevalDeBois(200, 96, 0.5, C.mur)}
    ${chevalDeBois(228, 98, 0.44, LILAS_F)}
    <path d="M162 92C170 80 186 74 200 74C214 74 230 80 238 92C230 86 224 90 220 92C216 86 208 86 204 92
      C200 86 192 86 188 92C184 88 170 88 162 92Z"
      fill="${C.or}" stroke="${C.orT}" stroke-width="2" stroke-linejoin="round"/>
    <path d="M176 84L224 84" stroke="${OR_C}" stroke-width="2.4" stroke-linecap="round"/>
    <path d="M182 76L200 54L218 76Z" fill="${LILAS_F}" stroke="${C.lilasT}" stroke-width="1.8" stroke-linejoin="round"/>
    ${losange(200, 68, 6, 7, C.rose)}
    <path d="M200 54L200 44" stroke="${C.orT}" stroke-width="1.8" stroke-linecap="round"/>
    <circle cx="200" cy="41" r="4.5" fill="${C.or}" stroke="${C.orT}" stroke-width="1.4"/>
  </g>`;

export default () => `<svg viewBox="0 0 400 300" xmlns="http://www.w3.org/2000/svg" role="img"
  aria-label="La Carousel Boutique, la maison-manège de Rarity">
  ${cielFond('cb-ciel', '#a5dcf2', '#e8f6fb')}
  ${volute(70, 56, 1)}${volute(330, 66, 0.9)}${volute(300, 34, 0.7)}
  ${nuage(78, 44, 0.28, 0.85)}${nuage(330, 100, 0.24, 0.7)}
  ${oiseau(122, 40, 0.9)}${oiseau(146, 52, 0.7)}
  <path d="M0 236C60 224 130 232 200 236C270 240 340 230 400 224L400 300L0 300Z"
    fill="${C.mid}" stroke="${C.herbeT}" stroke-width="2.2"/>
  ${arbre(58, 246, 0.72)}${arbre(346, 244, 0.78)}${arbre(108, 240, 0.5)}
  <path d="M0 266C90 254 300 256 400 264L400 300L0 300Z" fill="${C.pres}" stroke="${C.herbeT}" stroke-width="2.2"/>
  ${boutique()}
  ${buisson(102, 272, 0.7)}${buisson(300, 274, 0.65)}${buisson(56, 284, 0.6)}
  ${fleurs(146, 280, 0.95)}${fleurs(252, 284, 0.9)}${fleurs(340, 290, 0.85)}${fleurs(30, 294, 0.8)}
  ${herbes(200, 278, 0.9)}${herbes(88, 292, 0.9)}
  ${papillon(120, 216, 0.62, C.rose)}${papillon(296, 200, 0.55, C.lilas)}
</svg>`;
