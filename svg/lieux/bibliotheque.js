// ───────────────────────────────────────────────────────────────────────────────
// La bibliothèque Golden Oak — un chêne vivant habité.
//
// RÉFÉRENCES (téléchargées dans `refs/`, API MediaWiki de mlp.fandom.com) :
//   · refs/lieu-bibliotheque.png   https://mlp.fandom.com/wiki/File:Golden_Oak_Library_S3E1.png
//   · refs/lieu-bibliotheque-b.png https://mlp.fandom.com/wiki/File:Golden_Oak_Library_exterior_S4E23.png
//
// L'ARCHITECTURE SIGNATURE, relevée sur les deux plans :
//   · un tronc massif à GROSSES NERVURES verticales, évasé en racines au sol ;
//   · des FENÊTRES RONDES ET OVALES à carreaux rayonnants, teintées de rose —
//     c'est le détail qui distingue le chêne-bibliothèque d'un arbre ordinaire,
//     et il survit à la réduction en vignette ;
//   · une PORTE ROUGE en plein cintre au pied du tronc ;
//   · des AUVENTS DE FEUILLAGE clair posés en visière au-dessus de chaque
//     ouverture, fleuris de blanc ;
//   · un BALCON à garde-corps rouge, tout en haut, avec la lunette de Twilight ;
//   · une lanterne jaune pendue à une potence de fer forgé, et le petit panneau
//     au livre ouvert planté devant la porte.
// La couronne reste le vert de la carte (`C.feuille`) et le tronc son brun
// (`C.tronc`) : sur la carte d'accueil, le même chêne est dessiné avec ces deux
// aplats, et c'est à cela que l'enfant le reconnaît.
// ───────────────────────────────────────────────────────────────────────────────
import {
  C, n, cielFond, nuage, volute, oiseau, buisson, fleurs, herbes, papillon, arbre,
} from './_decor.js';

const VITRE = '#f5dcee';       // le rose pâle des carreaux, relevé sur la référence
const VITRE_T = '#c08db1';

// Fenêtre ronde à carreaux rayonnants : quatre rayons + un arc de traverse.
const fenetreRonde = (x, y, r) => `<g transform="translate(${x} ${y})">
    <circle r="${r}" fill="${VITRE}" stroke="${C.troncT}" stroke-width="2"/>
    <path d="M${-r} 0L${r} 0M0 ${-r}L0 ${r}" stroke="${VITRE_T}" stroke-width="1.3"/>
    <path d="M${n(-r * 0.71)} ${n(-r * 0.71)}L${n(r * 0.71)} ${n(r * 0.71)}M${n(r * 0.71)} ${n(-r * 0.71)}L${n(-r * 0.71)} ${n(r * 0.71)}"
      stroke="${VITRE_T}" stroke-width="1.1"/>
  </g>`;

const fenetreOvale = (x, y, rx, ry) => `<g transform="translate(${x} ${y})">
    <ellipse rx="${rx}" ry="${ry}" fill="${VITRE}" stroke="${C.troncT}" stroke-width="2"/>
    <path d="M${-rx} 0L${rx} 0M0 ${-ry}L0 ${ry}" stroke="${VITRE_T}" stroke-width="1.3"/>
    <path d="M${n(-rx * 0.7)} ${n(-ry * 0.7)}L${n(rx * 0.7)} ${n(ry * 0.7)}M${n(rx * 0.7)} ${n(-ry * 0.7)}L${n(-rx * 0.7)} ${n(ry * 0.7)}"
      stroke="${VITRE_T}" stroke-width="1.1"/>
  </g>`;

// L'auvent de feuilles posé en visière au-dessus d'une ouverture.
const auvent = (x, y, s = 1) => `<g transform="translate(${x} ${y}) scale(${n(s)})">
    <path d="M-24 0C-26 -12 -16 -18 -6 -14C-2 -22 12 -22 16 -14C26 -16 30 -6 24 0C10 4 -10 4 -24 0Z"
      fill="${C.feuilleC}" stroke="${C.feuilleT}" stroke-width="${n(1.8 / s)}" stroke-linejoin="round"/>
    <circle cx="-12" cy="-4" r="2.6" fill="#ffffff"/><circle cx="4" cy="-8" r="2.6" fill="#ffffff"/>
    <circle cx="16" cy="-3" r="2.2" fill="#ffffff"/>
  </g>`;

// Le voisinage : deux toits de chaume mordus par le cadre, comme sur la référence.
const voisins = () => `<g>
    <path d="M-10 250C6 214 34 198 62 250Z" fill="${C.paille}" stroke="${C.pailleT}" stroke-width="2.2" stroke-linejoin="round"/>
    <rect x="6" y="244" width="40" height="18" fill="${C.mur}" stroke="${C.murT}" stroke-width="1.8"/>
    <rect x="16" y="248" width="12" height="12" rx="3" fill="${C.rose}" stroke="${C.murT}" stroke-width="1.4"/>
    <path d="M338 250C356 210 388 198 412 250Z" fill="${C.paille}" stroke="${C.pailleT}" stroke-width="2.2" stroke-linejoin="round"/>
    <rect x="352" y="244" width="42" height="18" fill="${C.mur}" stroke="${C.murT}" stroke-width="1.8"/>
    <rect x="368" y="248" width="12" height="12" rx="3" fill="${C.rose}" stroke="${C.murT}" stroke-width="1.4"/>
  </g>`;

const chene = () => `<g>
    <ellipse cx="200" cy="266" rx="102" ry="15" fill="${C.pres}" stroke="${C.herbeT}" stroke-width="2"/>
    <path d="M166 268C154 268 147 264 149 257C155 263 159 264 167 264Z"
      fill="${C.tronc}" stroke="${C.troncT}" stroke-width="2" stroke-linejoin="round"/>
    <path d="M234 268C246 268 253 264 251 257C245 263 241 264 233 264Z"
      fill="${C.tronc}" stroke="${C.troncT}" stroke-width="2" stroke-linejoin="round"/>
    <path d="M164 268C162 226 168 184 178 150L222 150C232 184 238 226 236 268Z"
      fill="${C.tronc}" stroke="${C.troncT}" stroke-width="2.4" stroke-linejoin="round"/>
    <path d="M176 264C173 222 176 186 183 158M200 264C199 218 200 186 201 156M224 264C227 224 224 188 217 158"
      fill="none" stroke="${C.troncT}" stroke-width="1.4" opacity=".45"/>

    <circle cx="200" cy="104" r="68" fill="${C.feuille}" stroke="${C.feuilleT}" stroke-width="2.4"/>
    <circle cx="136" cy="122" r="42" fill="${C.feuille}" stroke="${C.feuilleT}" stroke-width="2.4"/>
    <circle cx="266" cy="120" r="44" fill="${C.feuille}" stroke="${C.feuilleT}" stroke-width="2.4"/>
    <circle cx="152" cy="70" r="34" fill="${C.feuille}" stroke="${C.feuilleT}" stroke-width="2.4"/>
    <circle cx="248" cy="66" r="36" fill="${C.feuille}" stroke="${C.feuilleT}" stroke-width="2.4"/>
    <circle cx="200" cy="52" r="42" fill="${C.feuille}" stroke="${C.feuilleT}" stroke-width="2.4"/>
    <path d="M166 88C188 74 216 74 236 86" fill="none" stroke="${C.feuilleT}" stroke-width="2" opacity=".3"/>

    ${fenetreOvale(140, 128, 15, 12)}${auvent(140, 114, 0.72)}
    ${fenetreOvale(264, 124, 14, 11)}${auvent(264, 111, 0.68)}
    ${fenetreRonde(176, 188, 11)}${auvent(176, 176, 0.6)}
    ${fenetreRonde(224, 192, 10)}${auvent(224, 181, 0.55)}

    <path d="M186 268L186 230C186 212 214 212 214 230L214 268Z"
      fill="${C.grange}" stroke="${C.grangeT}" stroke-width="2.2" stroke-linejoin="round"/>
    <path d="M200 216L200 268" stroke="${C.grangeT}" stroke-width="1.4" opacity=".6"/>
    <circle cx="207" cy="242" r="2.4" fill="${C.or}" stroke="${C.grangeT}" stroke-width="1"/>
    ${auvent(200, 212, 0.85)}
    <path d="M180 268L220 268L224 274L176 274Z" fill="${C.bois}" stroke="${C.boisT}" stroke-width="1.8" stroke-linejoin="round"/>

    <g transform="translate(238 34)">
      <path d="M-26 0L26 0" stroke="${C.grangeT}" stroke-width="4" stroke-linecap="round"/>
      <path d="M-24 -9L-24 0M-12 -9L-12 0M0 -9L0 0M12 -9L12 0M24 -9L24 0" stroke="${C.grange}" stroke-width="2.4" stroke-linecap="round"/>
      <path d="M-26 -9L26 -9" stroke="${C.grange}" stroke-width="2.6" stroke-linecap="round"/>
      <path d="M6 -11L27 -27" stroke="${C.nuageT}" stroke-width="5" stroke-linecap="round"/>
      <path d="M25 -25L31 -30" stroke="${C.ciel2}" stroke-width="8" stroke-linecap="round"/>
    </g>

    <g transform="translate(166 162)">
      <path d="M0 0C-12 -4 -22 0 -24 8" fill="none" stroke="${C.troncT}" stroke-width="1.8" stroke-linecap="round"/>
      <path d="M-24 8L-24 13" stroke="${C.troncT}" stroke-width="1.4"/>
      <path d="M-31 13L-17 13L-20 27L-28 27Z" fill="${C.or}" stroke="${C.orT}" stroke-width="1.6" stroke-linejoin="round"/>
      <path d="M-30 13L-18 13" stroke="${C.orT}" stroke-width="1.4"/>
    </g>
  </g>`;

const panneau = () => `<g transform="translate(112 262)">
    <path d="M-2 14L-2 0L2 0L2 14Z" fill="${C.boisT}"/>
    <path d="M-19 0L-19 -23L19 -23L19 0Z" fill="${C.grange}" stroke="${C.grangeT}" stroke-width="1.8" stroke-linejoin="round"/>
    <path d="M-14 -6C-10 -17 -3 -17 0 -13C3 -17 10 -17 14 -6C10 -11 3 -11 0 -8C-3 -11 -10 -11 -14 -6Z"
      fill="#fffaf0" stroke="${C.boisT}" stroke-width="1.3" stroke-linejoin="round"/>
    <path d="M0 -13L0 -8" stroke="${C.boisT}" stroke-width="1.1"/>
  </g>`;

export default () => `<svg viewBox="0 0 400 300" xmlns="http://www.w3.org/2000/svg" role="img"
  aria-label="La bibliothèque Golden Oak, une maison creusée dans un grand chêne">
  ${cielFond('bib-ciel')}
  ${volute(56, 60, 0.9)}${volute(332, 48, 1.1)}${volute(300, 96, 0.7)}
  ${nuage(64, 52, 0.3, 0.9)}${nuage(340, 82, 0.24, 0.75)}
  ${oiseau(96, 34, 1)}${oiseau(120, 44, 0.8)}
  <path d="M0 234C70 224 140 232 210 236C280 240 340 232 400 226L400 300L0 300Z"
    fill="${C.mid}" stroke="${C.herbeT}" stroke-width="2.2"/>
  ${voisins()}
  <path d="M0 262C90 250 300 252 400 260L400 300L0 300Z" fill="${C.pres}" stroke="${C.herbeT}" stroke-width="2.2"/>
  ${arbre(352, 272, 0.62)}${arbre(44, 276, 0.5)}
  ${chene()}
  ${panneau()}
  ${buisson(286, 276, 0.62)}${buisson(84, 282, 0.55)}${buisson(330, 290, 0.5)}
  ${fleurs(150, 284, 0.9)}${fleurs(256, 288, 0.8)}${fleurs(58, 294, 0.85)}${fleurs(364, 296, 0.8)}
  ${herbes(150, 269, 0.85)}${herbes(240, 269, 0.85)}${herbes(216, 292, 1)}${herbes(310, 282, 0.8)}
  ${papillon(112, 214, 0.6, C.lilas)}${papillon(304, 178, 0.55, C.rose)}
</svg>`;
