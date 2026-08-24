// ───────────────────────────────────────────────────────────────────────────────
// La forêt Désenchantée — mystérieuse, jamais effrayante.
//
// RÉFÉRENCE (dans `refs/`, API MediaWiki de mlp.fandom.com) :
//   · refs/lieu-foret.png  https://mlp.fandom.com/wiki/File:Everfree_Forest_S4E02.png
//
// CE QU'ON GARDE de la référence : les TRONCS TORDUS qui se penchent l'un vers
// l'autre, le feuillage en larges palmes retombantes, le ciel violet, la brume
// froide et le chemin clair qui s'enfonce.
// CE QU'ON JETTE, et c'est délibéré : la référence est un plan de NUIT hérissé de
// lianes noires à ÉPINES cyan, sans une seule source de lumière chaude. Pour un
// lecteur de 4-5 ans, chaque épine devient une griffe. On garde donc la palette
// froide (le bleu-vert `C.foret` de la bande de forêt de la carte d'accueil) mais :
//   · AUCUNE épine, aucune branche griffue, aucun œil dans le noir ;
//   · les deux gros troncs forment une ARCHE au-dessus du chemin — une porte,
//     pas une barrière ;
//   · une grosse lune douce, des lucioles, des champignons lumineux et des fleurs
//     bleues éclairent le sous-bois : on doit avoir envie d'y entrer.
// Les lucioles et les sapins du fond sont exactement ceux de la carte.
// ───────────────────────────────────────────────────────────────────────────────
import { C, n, cielFond, sapin, luciole, champignon, herbes, pierre } from './_decor.js';

const CIEL_H = '#3f3c72';      // le violet profond du haut du ciel
const CIEL_B = '#7d7fb4';      // il s'éclaircit vers l'horizon : la forêt reste ouverte
const ECORCE = '#3a4f63';
const ECORCE_T = '#22364a';
const PALME = '#2f5f56';       // = C.foret, la bande de forêt de la carte
const PALME_C = '#3e7a6c';
const PALME_T = '#1d443f';
const SOL = '#3c5a52';
const SOL_C = '#4e7063';
const SENTIER = '#b6a9a0';
const LUNE = '#f2eaff';

// LE TRONC EST UNE FORME PLEINE, PAS UN TRAIT. Tracé au `stroke`, il gardait une
// épaisseur constante et se lisait comme un TUYAU d'arrosage bleu ; il faut le
// galbe (large en bas, fin en haut) qu'un contour ne sait pas donner.
const troncPlein = (d, f = ECORCE) => `<path d="${d}" fill="${f}" stroke="${ECORCE_T}"
    stroke-width="2.4" stroke-linejoin="round"/>`;

// Une branche, elle, reste un trait : elle est fine d'un bout à l'autre.
const branche = (d, w) => `<path d="${d}" fill="none" stroke="${ECORCE_T}" stroke-width="${n(w + 2.4)}" stroke-linecap="round"/>
  <path d="${d}" fill="none" stroke="${ECORCE}" stroke-width="${w}" stroke-linecap="round"/>`;

// La palme retombante : un feuillage à LOBES, jamais de pointe (une pointe, dans
// une forêt sombre, se lit comme une griffe).
const palme = (x, y, s = 1, f = PALME) => `<g transform="translate(${x} ${y}) scale(${n(s)})">
    <path d="M0 0C-16 0 -30 -6 -38 -14C-46 -22 -40 -34 -28 -36C-30 -46 -14 -52 -2 -46
      C6 -54 24 -50 26 -40C40 -42 48 -30 40 -20C36 -8 18 0 0 0Z"
      fill="${f}" stroke="${PALME_T}" stroke-width="${n(2.2 / s)}" stroke-linejoin="round"/>
    <path d="M-32 -28C-16 -20 18 -22 32 -30" fill="none" stroke="${PALME_C}" stroke-width="${n(2 / s)}" opacity=".65"/>
    <path d="M-22 -10C-16 -6 -10 -4 -4 -3" fill="none" stroke="${PALME_T}" stroke-width="${n(1.6 / s)}" opacity=".45"/>
  </g>`;

const brume = (x, y, rx, ry, o) => `<ellipse cx="${x}" cy="${y}" rx="${rx}" ry="${ry}" fill="#cfe2ea" opacity="${o}"/>`;

const etoile = (x, y, r) => `<circle cx="${x}" cy="${y}" r="${r}" fill="#fdfbff" opacity=".8"/>`;

// Petite fleur bleue lumineuse du sous-bois.
const fleurBleue = (x, y, s = 1) => `<g transform="translate(${x} ${y}) scale(${n(s)})">
    <path d="M0 0C-1 -6 -3 -9 -6 -11" fill="none" stroke="${SOL_C}" stroke-width="${n(1.6 / s)}" stroke-linecap="round"/>
    <circle cx="-6" cy="-13" r="3.4" fill="#8fd8ee" stroke="#4f93ad" stroke-width="${n(1.1 / s)}"/>
    <circle cx="1" cy="-9" r="3" fill="#b5c8f2" stroke="#5f6fa8" stroke-width="${n(1.1 / s)}"/>
  </g>`;

export default () => `<svg viewBox="0 0 400 300" xmlns="http://www.w3.org/2000/svg" role="img"
  aria-label="La forêt Désenchantée, ses arbres tordus, sa brume douce et ses lucioles">
  ${cielFond('fd-ciel', CIEL_H, CIEL_B)}
  ${etoile(38, 30, 1.8)}${etoile(72, 58, 1.3)}${etoile(120, 26, 1.5)}${etoile(168, 52, 1.2)}
  ${etoile(246, 24, 1.4)}${etoile(300, 62, 1.2)}${etoile(360, 34, 1.7)}${etoile(198, 18, 1.2)}
  <circle cx="316" cy="58" r="34" fill="${LUNE}" opacity=".2"/>
  <circle cx="316" cy="58" r="23" fill="${LUNE}"/>
  <circle cx="308" cy="52" r="5" fill="#ded2f0" opacity=".8"/>
  <circle cx="322" cy="66" r="3.4" fill="#ded2f0" opacity=".7"/>

  ${brume(120, 168, 130, 26, 0.14)}${brume(300, 182, 120, 22, 0.12)}
  <path d="M0 178C60 168 120 174 200 176C280 178 340 170 400 164L400 300L0 300Z"
    fill="#31564f" stroke="${PALME_T}" stroke-width="2.2"/>
  ${[[24, 200, 62], [66, 196, 50], [110, 202, 56], [300, 198, 54], [344, 202, 62], [382, 196, 48]]
    .map(([x, y, h]) => sapin(x, y, h, C.sapinB, PALME_T)).join('')}
  ${[[46, 214, 44], [88, 216, 40], [322, 214, 44], [364, 218, 42], [150, 206, 34], [252, 206, 34]]
    .map(([x, y, h]) => sapin(x, y, h, C.sapinA, PALME_T)).join('')}
  ${brume(200, 206, 150, 18, 0.16)}

  <path d="M0 244C60 232 130 236 200 234C270 232 340 238 400 232L400 300L0 300Z"
    fill="${SOL}" stroke="${PALME_T}" stroke-width="2.2"/>
  <ellipse cx="200" cy="230" rx="58" ry="18" fill="#eaf6d8" opacity=".22"/>
  <path d="M172 234C168 254 150 276 118 300L272 300C248 274 234 254 230 234Z"
    fill="${SENTIER}" stroke="#8d8078" stroke-width="2" stroke-linejoin="round" opacity=".85"/>
  <path d="M196 244C194 258 186 274 172 290" fill="none" stroke="#cfc4bb" stroke-width="2" opacity=".6"/>

  ${branche('M96 232C76 224 58 226 44 234', 7)}
  ${branche('M304 232C324 224 342 226 356 234', 7)}
  ${troncPlein('M50 300C58 244 86 194 130 150L148 164C114 206 98 252 94 300Z')}
  <path d="M62 296C70 244 96 198 134 160" fill="none" stroke="${ECORCE_T}" stroke-width="1.6" opacity=".45"/>
  ${troncPlein('M350 300C342 244 314 194 270 150L252 164C286 206 302 252 306 300Z')}
  <path d="M338 296C330 244 304 198 266 160" fill="none" stroke="${ECORCE_T}" stroke-width="1.6" opacity=".45"/>
  ${branche('M120 190C140 186 158 190 170 198', 6)}
  ${branche('M280 190C260 186 242 190 230 198', 6)}
  ${palme(148, 148, 1.1)}${palme(252, 148, 1.1)}${palme(200, 136, 0.66)}
  ${palme(184, 168, 0.62)}${palme(216, 168, 0.62)}
  ${palme(40, 230, 0.7)}${palme(360, 230, 0.7)}

  ${brume(90, 282, 90, 16, 0.13)}${brume(330, 288, 86, 14, 0.12)}
  ${champignon(140, 268, 1.1)}${champignon(158, 278, 0.8)}${champignon(258, 264, 0.95)}
  ${champignon(276, 276, 1.2)}${champignon(58, 258, 0.9)}${champignon(346, 254, 0.85)}
  ${fleurBleue(112, 262, 1.1)}${fleurBleue(300, 254, 1)}${fleurBleue(214, 288, 1.1)}
  ${pierre(78, 276, 0.6, '#54606d')}${pierre(320, 268, 0.55, '#54606d')}
  ${herbes(180, 262, 0.9, SOL_C)}${herbes(238, 258, 0.85, SOL_C)}${herbes(36, 288, 1, SOL_C)}
  ${luciole(128, 206, 1.1)}${luciole(176, 190, 0.9)}${luciole(228, 200, 1)}${luciole(268, 186, 0.85)}
  ${luciole(96, 230, 0.9)}${luciole(304, 224, 1)}${luciole(202, 168, 0.8)}${luciole(150, 244, 0.85)}
  ${luciole(252, 240, 0.9)}${luciole(340, 236, 0.8)}${luciole(62, 240, 0.85)}
</svg>`;
