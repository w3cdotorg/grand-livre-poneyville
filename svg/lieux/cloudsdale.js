// ───────────────────────────────────────────────────────────────────────────────
// Cloudsdale — la ville des pégases, posée sur les nuages.
//
// RÉFÉRENCES (dans `refs/`, API MediaWiki de mlp.fandom.com) :
//   · refs/lieu-cloudsdale.png    https://mlp.fandom.com/wiki/File:Cloudsdale_S01E16.png
//   · refs/lieu-cloudsdale-b.png  https://mlp.fandom.com/wiki/File:Cloudsdale_and_the_rainbow_overhead_S1E16.png
//
// L'ARCHITECTURE SIGNATURE — le second plan la donne d'un seul coup d'œil :
//   · un TEMPLE GREC posé sur un nuage : colonnade de COLONNES ROSES à volutes,
//     entablement blanc, et une rangée de PETITS FANIONS JAUNES sur le toit ;
//   · l'ARC-EN-CIEL qui l'enjambe en entier ;
//   · et, sur le plan large, ce qui fait vraiment Cloudsdale : les nuages sont
//     dessinés en VOLUTES au trait, les plates-formes flottent à des hauteurs
//     différentes, et des CASCADES D'ARC-EN-CIEL tombent de leurs bords — c'est
//     là qu'on fabrique la météo.
// Les deux petites tours à toit rose des nuages latéraux sont celles de la carte
// d'accueil : c'est par elles qu'on reconnaît Cloudsdale d'un écran à l'autre.
// ───────────────────────────────────────────────────────────────────────────────
import { C, n, cielFond, nuage, volute, oiseau } from './_decor.js';

const ARC = ['#ee5b52', '#f4954a', '#ffdc63', '#71c065', '#5aabdd', '#a077cf'];
const COLONNE = '#f6c6d9';
const COLONNE_T = '#d189a6';
const FOND_T = '#8fa4c8';      // l'ombre entre les colonnes
const FANION = '#ffc94d';

// Le grand arc-en-ciel : six bandes parallèles.
const arcEnCiel = () => ARC.map((c, i) =>
  `<path d="M18 ${n(196 + i * 9)}C${60 + i * 3} ${n(58 + i * 9)} ${340 - i * 3} ${n(58 + i * 9)} 382 ${n(196 + i * 9)}"
    fill="none" stroke="${c}" stroke-width="9" stroke-linecap="round" opacity=".92"/>`).join('');

// La cascade d'arc-en-ciel qui tombe du bord d'un nuage.
const cascade = (x, y, h, s = 1) => ARC.map((c, i) =>
  `<path d="M${n(x + i * 3.4 * s)} ${y}L${n(x + i * 3.4 * s - h * 0.06)} ${n(y + h)}"
    stroke="${c}" stroke-width="${n(3.2 * s)}" stroke-linecap="round" opacity=".85"/>`).join('');

// La colonne rose à chapiteau en volutes.
const colonne = (x, y, h) => `<g transform="translate(${x} ${y})">
    <path d="M-4 0L-3.2 ${-h}L3.2 ${-h}L4 0Z" fill="${COLONNE}" stroke="${COLONNE_T}" stroke-width="1.4" stroke-linejoin="round"/>
    <path d="M-1 0L-0.8 ${-h}L1 ${-h}L1.2 0Z" fill="#ffffff" opacity=".55"/>
    <path d="M-6 ${-h}C-6 ${n(-h - 5)} -1 ${n(-h - 5)} 0 ${n(-h - 2)}C1 ${n(-h - 5)} 6 ${n(-h - 5)} 6 ${-h}Z"
      fill="${COLONNE}" stroke="${COLONNE_T}" stroke-width="1.4" stroke-linejoin="round"/>
    <path d="M-6 1L6 1" stroke="${COLONNE_T}" stroke-width="2.6" stroke-linecap="round"/>
  </g>`;

// Le temple : socle, colonnade, entablement, fanions.
// LE TEMPLE EST BLANC SUR UN NUAGE BLANC : sans le liseré d'ombre bleutée sous
// son socle, il flotte et on ne voit plus qu'une masse laiteuse.
const temple = () => `<g>
    <ellipse cx="200" cy="204" rx="76" ry="10" fill="${C.nuageT}" opacity=".35"/>
    <path d="M132 200L268 200L262 190L138 190Z" fill="#ffffff" stroke="${C.nuageT}" stroke-width="1.8" stroke-linejoin="round"/>
    <path d="M140 190L260 190L260 148L140 148Z" fill="${FOND_T}"/>
    ${[152, 176, 200, 224, 248].map((x) => colonne(x, 190, 42)).join('')}
    <path d="M132 148L268 148L268 138L132 138Z" fill="#ffffff" stroke="${C.nuageT}" stroke-width="1.8" stroke-linejoin="round"/>
    <path d="M136 134L264 134L268 138L132 138Z" fill="#f4f8ff" stroke="${C.nuageT}" stroke-width="1.8" stroke-linejoin="round"/>
    <path d="M142 146L146 142L150 146M158 146L162 142L166 146M174 146L178 142L182 146
      M190 146L194 142L198 146M206 146L210 142L214 146M222 146L226 142L230 146
      M238 146L242 142L246 146M254 146L258 142L262 146"
      fill="none" stroke="${C.nuageT}" stroke-width="1.3"/>
    ${[148, 172, 200, 228, 252].map((x, i) => `<g transform="translate(${x} 134)">
      <path d="M0 0L0 ${-18 - (i % 2) * 5}" stroke="${C.nuageT}" stroke-width="1.6" stroke-linecap="round"/>
      <path d="M0 ${-18 - (i % 2) * 5}C7 ${-21 - (i % 2) * 5} 11 ${-15 - (i % 2) * 5} 18 ${-18 - (i % 2) * 5}L18 ${-12 - (i % 2) * 5}
        C11 ${-9 - (i % 2) * 5} 7 ${-15 - (i % 2) * 5} 0 ${-12 - (i % 2) * 5}Z"
        fill="${FANION}" stroke="${C.orT}" stroke-width="1.2" stroke-linejoin="round"/>
    </g>`).join('')}
  </g>`;

// Une petite tour de nuage à toit rose — celle de la mini-Cloudsdale de la carte.
const tourNuage = (x, y, h, r) => `<g transform="translate(${x} ${y})">
    <path d="M${-r} 0L${-r} ${-h}L${r} ${-h}L${r} 0Z" fill="${C.mur}" stroke="${C.nuageT}" stroke-width="1.8" stroke-linejoin="round"/>
    <path d="M${n(-r - 5)} ${-h}L0 ${n(-h - r * 1.6)}L${n(r + 5)} ${-h}Z"
      fill="${C.rose}" stroke="${C.nuageT}" stroke-width="1.8" stroke-linejoin="round"/>
    <path d="M${n(-r * 0.5)} ${n(-h * 0.55)}C${n(-r * 0.5)} ${n(-h * 0.75)} ${n(r * 0.5)} ${n(-h * 0.75)} ${n(r * 0.5)} ${n(-h * 0.55)}L${n(r * 0.5)} ${n(-h * 0.25)}L${n(-r * 0.5)} ${n(-h * 0.25)}Z"
      fill="${C.ciel2}" stroke="${C.nuageT}" stroke-width="1.3" stroke-linejoin="round"/>
  </g>`;

// Plate-forme de nuage : la masse blanche, l'ombre, et les volutes au trait.
const plateforme = (x, y, s) => `<g transform="translate(${x} ${y}) scale(${n(s)})">
    <path d="M-88 16C-116 16 -122 -8 -96 -14C-102 -40 -66 -56 -44 -38C-32 -62 12 -64 24 -34
      C52 -46 84 -22 68 0C86 8 78 16 56 16Z"
      fill="${C.nuage}" stroke="${C.nuageT}" stroke-width="${n(2.2 / s)}" stroke-linejoin="round"/>
    <path d="M-74 16C-52 4 -8 2 20 10C36 15 46 16 56 16Z" fill="${C.nuageO}"/>
    <path d="M-70 -14C-78 -20 -70 -30 -60 -26C-52 -23 -54 -13 -62 -15" fill="none"
      stroke="${C.nuageT}" stroke-width="${n(1.6 / s)}" stroke-linecap="round" opacity=".7"/>
    <path d="M28 -30C20 -36 28 -46 38 -42C46 -39 44 -29 36 -31" fill="none"
      stroke="${C.nuageT}" stroke-width="${n(1.6 / s)}" stroke-linecap="round" opacity=".7"/>
  </g>`;

export default () => `<svg viewBox="0 0 400 300" xmlns="http://www.w3.org/2000/svg" role="img"
  aria-label="Cloudsdale, la cité des pégases sur les nuages, sous son arc-en-ciel">
  ${cielFond('cd-ciel', '#5fb3e2', '#d6eefb')}
  ${volute(52, 82, 1)}${volute(352, 92, 0.9)}${volute(84, 40, 0.7)}
  ${arcEnCiel()}
  ${nuage(46, 128, 0.3, 0.8)}${nuage(356, 116, 0.26, 0.75)}
  ${oiseau(120, 62, 0.9, '#8fb8d8')}${oiseau(146, 74, 0.7, '#8fb8d8')}${oiseau(272, 66, 0.8, '#8fb8d8')}

  ${plateforme(76, 214, 0.68)}
  ${tourNuage(62, 200, 34, 13)}
  ${cascade(34, 218, 76, 0.7)}

  ${plateforme(330, 228, 0.66)}
  ${tourNuage(342, 214, 30, 12)}
  ${cascade(296, 230, 64, 0.7)}

  ${plateforme(200, 240, 1.5)}
  ${temple()}
  ${tourNuage(128, 272, 20, 9)}
  ${tourNuage(272, 274, 18, 8)}
  ${volute(96, 258, 1.1, C.nuageT, 0.55)}${volute(200, 268, 1.2, C.nuageT, 0.5)}
  ${volute(308, 256, 1, C.nuageT, 0.55)}${volute(168, 240, 0.8, C.nuageT, 0.45)}
  ${cascade(146, 278, 22, 0.9)}
  ${cascade(232, 280, 20, 0.9)}
  ${nuage(200, 292, 0.42, 0.95)}
  ${nuage(66, 288, 0.3, 0.85)}${nuage(340, 294, 0.32, 0.85)}
</svg>`;
