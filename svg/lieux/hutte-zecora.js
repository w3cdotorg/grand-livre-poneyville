// ───────────────────────────────────────────────────────────────────────────────
// La hutte de Zecora — l'arbre creux au cœur de la forêt Désenchantée.
//
// RÉFÉRENCES (dans `refs/`, API MediaWiki de mlp.fandom.com) :
//   · refs/lieu-hutte.png    https://mlp.fandom.com/wiki/File:Zecora's_hut_exterior_S7E19.png
//   · refs/lieu-hutte-b.png  https://mlp.fandom.com/wiki/File:Zecora's_house_S6E4.png
//
// L'ARCHITECTURE SIGNATURE, relevée sur les deux plans :
//   · ce n'est PAS une cabane à toit de paille mais un ÉNORME TRONC CREUX, brun
//     chaud, à nervures verticales très marquées, largement évasé en racines ;
//   · la PORTE EN OGIVE bordeaux à gros bouton rond, en haut de trois marches ;
//   · une FENÊTRE RONDE dorée barrée d'une CROIX, plus une lucarne plus haut :
//     les deux sont toujours allumées, c'est ce qui rend la hutte accueillante ;
//   · le MASQUE tribal au-dessus de la porte, et un grand masque posé sur une
//     pierre à droite ;
//   · les FIOLES DE POTION pendues aux branches par des cordons jaunes — une
//     douzaine, de toutes les couleurs : c'est la signature du lieu ;
//   · le sous-bois : feuilles violettes, crosses de fougères, champignons bleus.
// La forêt derrière reprend le bleu-vert `C.foret` de la carte d'accueil et de la
// fiche « forêt Désenchantée » — les deux lieux doivent se répondre.
//
// NOTE DE COHÉRENCE : sur la carte d'accueil, la hutte est coiffée d'un toit de
// paille. La référence dit un arbre creux sans toit rapporté ; la fiche tranche
// pour l'arbre (voir NOTES.md).
// ───────────────────────────────────────────────────────────────────────────────
import { C, n, cielFond, sapin, luciole, champignon, herbes, pierre } from './_decor.js';

const CIEL_H = '#41537a';
const CIEL_B = '#7f96ad';
const BOIS = '#a06b40';         // le brun chaud du tronc
const BOIS_C = '#b98253';
const BOIS_T = '#6d4426';
const PORTE = '#8d3a4f';
const PORTE_T = '#5f2434';
const FEUILLE = '#3e7a5c';
const FEUILLE_C = '#57a074';
const FEUILLE_T = '#255440';
const LUEUR = '#ffd873';        // les carreaux toujours allumés
const VIOLET = '#7a5fa8';
const SOL = '#3f5f52';
const CORDON = '#e8d16b';

// Fiole de potion pendue à sa ficelle : bouchon, panse colorée, reflet.
const fiole = (x, y, l, f, s = 1) => `<g transform="translate(${x} ${y}) scale(${n(s)})">
    <path d="M0 0L0 ${l}" stroke="${CORDON}" stroke-width="${n(1.4 / s)}"/>
    <path d="M-2.5 ${l}L2.5 ${l}L2.5 ${l + 4}L-2.5 ${l + 4}Z" fill="${CORDON}" stroke="${BOIS_T}" stroke-width="${n(1 / s)}"/>
    <path d="M-3 ${l + 4}C-9 ${l + 8} -9 ${l + 18} 0 ${l + 18}C9 ${l + 18} 9 ${l + 8} 3 ${l + 4}Z"
      fill="${f}" stroke="${BOIS_T}" stroke-width="${n(1.3 / s)}" stroke-linejoin="round"/>
    <path d="M-4 ${l + 10}C-5 ${l + 13} -4 ${l + 15} -2 ${l + 16}" fill="none" stroke="#ffffff" stroke-width="${n(1.4 / s)}" opacity=".55"/>
  </g>`;

// Masque zébré : ovale clair, deux yeux en amande, bandes et petites cornes.
const masque = (x, y, s = 1, f = '#e3d27a') => `<g transform="translate(${x} ${y}) scale(${n(s)})">
    <path d="M0 22C-11 22 -16 8 -16 -4C-16 -16 -8 -22 0 -22C8 -22 16 -16 16 -4C16 8 11 22 0 22Z"
      fill="${f}" stroke="${BOIS_T}" stroke-width="${n(1.6 / s)}" stroke-linejoin="round"/>
    <path d="M-9 -6C-9 -12 -3 -12 -3 -6C-3 -1 -9 -1 -9 -6Z" fill="${FEUILLE_T}"/>
    <path d="M9 -6C9 -12 3 -12 3 -6C3 -1 9 -1 9 -6Z" fill="${FEUILLE_T}"/>
    <path d="M-13 4C-8 6 8 6 13 4M-11 12C-6 14 6 14 11 12" fill="none" stroke="${FEUILLE}" stroke-width="${n(1.8 / s)}"/>
    <path d="M-16 -12C-22 -18 -22 -24 -18 -28C-16 -22 -14 -18 -11 -16Z"
      fill="${FEUILLE_C}" stroke="${BOIS_T}" stroke-width="${n(1.4 / s)}" stroke-linejoin="round"/>
    <path d="M16 -12C22 -18 22 -24 18 -28C16 -22 14 -18 11 -16Z"
      fill="${FEUILLE_C}" stroke="${BOIS_T}" stroke-width="${n(1.4 / s)}" stroke-linejoin="round"/>
  </g>`;

// Feuille de sous-bois violette.
const feuilleViolette = (x, y, s = 1, r = 0) => `<path transform="translate(${x} ${y}) rotate(${r}) scale(${n(s)})"
    d="M0 0C-14 -2 -22 -10 -22 -18C-22 -26 -12 -30 0 -30C12 -30 22 -26 22 -18C22 -10 14 -2 0 0Z"
    fill="${VIOLET}" stroke="#4d3a71" stroke-width="${n(1.8 / s)}" stroke-linejoin="round"/>`;

// Crosse de fougère : la petite volute claire du sous-bois.
const crosse = (x, y, s = 1) => `<path transform="translate(${x} ${y}) scale(${n(s)})"
    d="M0 0C0 -12 4 -20 12 -22C20 -24 24 -18 20 -14C17 -11 13 -13 14 -17"
    fill="none" stroke="#8dc46f" stroke-width="${n(2 / s)}" stroke-linecap="round"/>`;

const arbreCreux = () => `<g>
    <path d="M118 268C114 240 118 206 132 182C144 164 154 156 160 146L240 146C246 156 256 164 268 182
      C282 206 286 240 282 268Z"
      fill="${BOIS}" stroke="${BOIS_T}" stroke-width="2.4" stroke-linejoin="round"/>
    <path d="M118 268C98 268 84 260 88 246C98 258 108 262 120 262Z"
      fill="${BOIS}" stroke="${BOIS_T}" stroke-width="2.2" stroke-linejoin="round"/>
    <path d="M282 268C302 268 316 260 312 246C302 258 292 262 280 262Z"
      fill="${BOIS}" stroke="${BOIS_T}" stroke-width="2.2" stroke-linejoin="round"/>
    <path d="M136 266C132 236 136 210 142 190M158 266C154 236 157 212 162 192M244 266C247 236 244 212 239 192
      M266 266C269 238 265 212 259 192M200 200C199 216 199 224 199 232"
      fill="none" stroke="${BOIS_T}" stroke-width="1.5" opacity=".45"/>
    <path d="M122 232C136 226 150 226 160 230M280 232C266 226 252 226 242 230"
      fill="none" stroke="${BOIS_C}" stroke-width="2" opacity=".5"/>

    <path d="M182 268L182 224C182 202 218 202 218 224L218 268Z"
      fill="${PORTE}" stroke="${PORTE_T}" stroke-width="2.4" stroke-linejoin="round"/>
    <path d="M191 210L191 266M200 206L200 266M209 210L209 266" stroke="${PORTE_T}" stroke-width="1.2" opacity=".55"/>
    <circle cx="211" cy="240" r="3" fill="${CORDON}" stroke="${PORTE_T}" stroke-width="1.1"/>
    <path d="M172 274L228 274L224 268L176 268Z" fill="${BOIS_C}" stroke="${BOIS_T}" stroke-width="1.8" stroke-linejoin="round"/>
    <path d="M164 282L236 282L232 274L168 274Z" fill="${BOIS_C}" stroke="${BOIS_T}" stroke-width="1.8" stroke-linejoin="round"/>

    <circle cx="152" cy="230" r="12" fill="${LUEUR}" stroke="${BOIS_T}" stroke-width="2"/>
    <path d="M140 230L164 230M152 218L152 242" stroke="${BOIS_T}" stroke-width="1.6"/>
    <circle cx="252" cy="222" r="8" fill="${LUEUR}" stroke="${BOIS_T}" stroke-width="1.8"/>
    <path d="M244 222L260 222M252 214L252 230" stroke="${BOIS_T}" stroke-width="1.4"/>
    ${masque(200, 190, 0.6)}
  </g>`;

// LE HOUPPIER NE DOIT PAS FAIRE UN CHAPEAU. Une bande brune horizontale posée en
// travers du tronc (première version) donnait un champignon : la couronne part
// donc EN POINTE du fût, plus étroite que lui, et ce sont les BRANCHES qui vont
// chercher le feuillage sur les côtés.
const houppier = () => `<g>
    <path d="M158 158C132 150 96 148 68 154" fill="none" stroke="${BOIS_T}" stroke-width="8" stroke-linecap="round"/>
    <path d="M158 158C132 150 96 148 68 154" fill="none" stroke="${BOIS}" stroke-width="5" stroke-linecap="round"/>
    <path d="M242 158C264 150 286 148 300 152" fill="none" stroke="${BOIS_T}" stroke-width="8" stroke-linecap="round"/>
    <path d="M242 158C264 150 286 148 300 152" fill="none" stroke="${BOIS}" stroke-width="5" stroke-linecap="round"/>
    <path d="M60 152C40 130 66 108 92 118C104 96 152 92 168 114C186 96 226 100 236 118
      C270 104 316 120 314 148C332 152 334 168 310 172C270 162 130 160 78 170C60 172 52 160 60 152Z"
      fill="${FEUILLE}" stroke="${FEUILLE_T}" stroke-width="2.4" stroke-linejoin="round"/>
    <path d="M86 134C112 124 158 122 186 130" fill="none" stroke="${FEUILLE_C}" stroke-width="3" stroke-linecap="round" opacity=".7"/>
    <path d="M212 126C242 122 272 128 288 140" fill="none" stroke="${FEUILLE_C}" stroke-width="2.6" stroke-linecap="round" opacity=".6"/>
    <path d="M104 160C126 152 174 150 200 154" fill="none" stroke="${FEUILLE_T}" stroke-width="2" opacity=".4"/>
  </g>`;

export default () => `<svg viewBox="0 0 400 300" xmlns="http://www.w3.org/2000/svg" role="img"
  aria-label="La hutte de Zecora, un grand arbre creux couvert de fioles et de masques">
  ${cielFond('hz-ciel', CIEL_H, CIEL_B)}
  <circle cx="60" cy="52" r="26" fill="#f2eaff" opacity=".18"/>
  <circle cx="60" cy="52" r="17" fill="#f2eaff" opacity=".9"/>
  <path d="M0 172C60 162 130 168 200 170C270 172 340 164 400 158L400 300L0 300Z"
    fill="#2f5f56" stroke="#1d443f" stroke-width="2.2"/>
  ${[[18, 196, 56], [58, 190, 48], [340, 192, 50], [382, 198, 58], [96, 196, 40], [304, 196, 40]]
    .map(([x, y, h]) => sapin(x, y, h, C.sapinB, '#1d443f')).join('')}
  <ellipse cx="200" cy="216" rx="180" ry="30" fill="#cfe2ea" opacity=".1"/>

  <path d="M0 236C60 226 130 230 200 228C270 226 340 232 400 226L400 300L0 300Z"
    fill="${SOL}" stroke="#1d443f" stroke-width="2.2"/>
  <path d="M168 282C160 292 148 300 136 300L268 300C254 300 242 292 234 282Z"
    fill="#a89178" stroke="#7d6a55" stroke-width="1.8" stroke-linejoin="round" opacity=".9"/>

  ${houppier()}
  ${arbreCreux()}

  ${fiole(92, 130, 26, '#e05a8e', 1)}
  ${fiole(112, 138, 42, '#8f5fc4', 0.9)}
  ${fiole(70, 142, 18, '#f0913f', 0.85)}
  ${fiole(296, 132, 30, '#4fb2a6', 1)}
  ${fiole(308, 146, 42, '#e0507c', 0.9)}
  ${fiole(322, 158, 16, '#b7d24f', 0.85)}
  ${fiole(150, 116, 22, '#f0c23f', 0.8)}
  ${fiole(252, 118, 24, '#7fa8e0', 0.8)}

  ${masque(322, 254, 0.8)}
  ${pierre(322, 276, 1.1, '#5b6a6a')}
  ${feuilleViolette(76, 260, 0.85, -12)}${feuilleViolette(104, 268, 0.7, 14)}
  ${feuilleViolette(330, 236, 0.7, 18)}${feuilleViolette(354, 262, 0.85, -10)}
  ${crosse(122, 272, 1)}${crosse(288, 268, -1)}${crosse(58, 274, 0.8)}
  ${champignon(146, 284, 1.1)}${champignon(262, 288, 0.95)}${champignon(38, 262, 0.9)}
  ${herbes(240, 274, 0.9, '#6ea377')}${herbes(160, 292, 0.9, '#6ea377')}
  ${luciole(64, 214, 1)}${luciole(340, 210, 0.9)}${luciole(128, 200, 0.85)}
  ${luciole(276, 204, 0.9)}${luciole(200, 108, 0.8)}${luciole(96, 240, 0.8)}
</svg>`;
