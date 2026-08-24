// ───────────────────────────────────────────────────────────────────────────────
// Sugarcube Corner — la pâtisserie de Poneyville.
//
// RÉFÉRENCES (dans `refs/`, API MediaWiki de mlp.fandom.com) :
//   · refs/lieu-sugarcube.png   https://mlp.fandom.com/wiki/File:Sugarcube_Corner_S1E18.png
//   · refs/lieu-sugarcube-b.png https://mlp.fandom.com/wiki/File:Sugarcube_Corner_exterior_S1E04.png
//
// L'ARCHITECTURE SIGNATURE, relevée sur les deux plans — c'est une maison à
// colombages sur laquelle on a posé un GÂTEAU :
//   · le CORPS À COLOMBAGES crème, poutres brunes, fenêtres roses à losanges ;
//   · le TOIT EN PAIN D'ÉPICES : tuiles écailles chocolat, PÉPITES, et surtout la
//     FRANGE DE GLAÇAGE BLANC en boucles tout le long du bord — le détail qui dit
//     « pâtisserie » et pas « chaumière » ;
//   · la TOUR-GÂTEAU centrale : cylindre à colombages, étage de glaçage rose à
//     pastilles, cordon de perles, second cylindre, puis la GRANDE ROSACE DE
//     CRÈME ROSE coiffée de TROIS BOUGIES allumées ;
//   · la porte jaune entre DEUX COLONNES SUCRE D'ORGE rose et blanc, sur son
//     perron rose, et l'enseigne au cupcake pendue à sa potence.
// ───────────────────────────────────────────────────────────────────────────────
import { C, n, cielFond, nuage, volute, oiseau, fleurs, buisson, papillon } from './_decor.js';

const CHOCO = '#8f5330';       // les tuiles-biscuit
const CHOCO_T = '#69381f';
const PEPITE = '#5e3018';
const GLACAGE = '#fffdf7';     // le blanc du glaçage
const GLACAGE_T = '#d9d0e4';
const CREME_M = '#fbf0d8';     // le crème des murs
const POUTRE = '#a9764c';
const ROSE_G = '#f39ac2';      // le rose de la crème
const ROSE_GT = '#d1618f';
const VITRE_R = '#f7c9df';

// La frange de glaçage : une file de boucles blanches sous le bord du toit.
const feston = (x, y, k, p = 15) => {
  const boucles = Array.from({ length: k }, (_, i) =>
    `M${n(x + i * p)} ${y}C${n(x + i * p + 2)} ${y + 11} ${n(x + i * p + p - 2)} ${y + 11} ${n(x + i * p + p)} ${y}`).join('');
  return `<path d="${boucles}" fill="none" stroke="${GLACAGE}" stroke-width="7" stroke-linecap="round"/>
    <path d="${boucles}" fill="none" stroke="${GLACAGE_T}" stroke-width="1.2" opacity=".55"/>`;
};

const pepites = (pts) => pts.map(([x, y, r]) => `<circle cx="${x}" cy="${y}" r="${r}" fill="${PEPITE}" opacity=".55"/>`).join('');

// Les écailles du biscuit : une rangée d'arcs concaves, comme des tuiles rondes.
const ecailles = (x, y, k, p = 15) => {
  const d = Array.from({ length: k }, (_, i) =>
    `M${n(x + i * p)} ${y}C${n(x + i * p + 1)} ${y + 6} ${n(x + i * p + p - 1)} ${y + 6} ${n(x + i * p + p)} ${y}`).join('');
  return `<path d="${d}" fill="none" stroke="${CHOCO_T}" stroke-width="1.7" opacity=".6"/>`;
};

const fenetreRose = (x, y, w, h) => `<g transform="translate(${x} ${y})">
    <path d="M${n(-w / 2)} ${h}L${n(-w / 2)} ${n(-h * 0.4)}C${n(-w / 2)} ${-h} ${n(w / 2)} ${-h} ${n(w / 2)} ${n(-h * 0.4)}L${n(w / 2)} ${h}Z"
      fill="${VITRE_R}" stroke="${POUTRE}" stroke-width="2" stroke-linejoin="round"/>
    <path d="M${n(-w / 2)} ${n(h * 0.2)}L0 ${n(-h * 0.5)}L${n(w / 2)} ${n(h * 0.2)}M${n(-w / 2)} ${n(-h * 0.5)}L0 ${n(h * 0.2)}L${n(w / 2)} ${n(-h * 0.5)}"
      fill="none" stroke="${ROSE_GT}" stroke-width="1" opacity=".7"/>
  </g>`;

// Le toit de pain d'épices monte jusqu'à y 170 : la tour est donc remontée de
// 12 unités en bloc, sinon ses fenêtres passaient DERRIÈRE le glaçage.
const tourGateau = () => `<g transform="translate(0 -12)">
    <path d="M178 196L178 150L222 150L222 196Z" fill="${CREME_M}" stroke="${POUTRE}" stroke-width="2.2" stroke-linejoin="round"/>
    <path d="M178 150L178 196M222 150L222 196M200 150L200 196" stroke="${POUTRE}" stroke-width="2"/>
    ${fenetreRose(189, 168, 13, 11)}${fenetreRose(211, 168, 13, 11)}
    <path d="M172 150C172 128 228 128 228 150Z" fill="${ROSE_G}" stroke="${ROSE_GT}" stroke-width="2.2" stroke-linejoin="round"/>
    <path d="M172 150C176 143 224 143 228 150" fill="none" stroke="${GLACAGE}" stroke-width="3"/>
    <circle cx="186" cy="140" r="3.4" fill="${GLACAGE}" opacity=".85"/>
    <circle cx="200" cy="136" r="3.4" fill="${GLACAGE}" opacity=".85"/>
    <circle cx="214" cy="140" r="3.4" fill="${GLACAGE}" opacity=".85"/>
    <path d="M174 130C182 124 218 124 226 130C218 134 182 134 174 130Z"
      fill="${C.creme}" stroke="${C.pailleT}" stroke-width="1.6" stroke-linejoin="round"/>
    <path d="M186 126L186 106L214 106L214 126Z" fill="${CREME_M}" stroke="${POUTRE}" stroke-width="2" stroke-linejoin="round"/>
    <circle cx="200" cy="116" r="6" fill="${VITRE_R}" stroke="${POUTRE}" stroke-width="1.6"/>
    <path d="M194 116L206 116M200 110L200 122" stroke="${ROSE_GT}" stroke-width="1"/>
    <path d="M182 106C178 92 190 84 200 88C210 84 222 92 218 106C212 100 206 102 200 100C194 102 188 100 182 106Z"
      fill="${ROSE_G}" stroke="${ROSE_GT}" stroke-width="2.2" stroke-linejoin="round"/>
    <path d="M186 98C192 94 208 94 214 98" fill="none" stroke="${GLACAGE}" stroke-width="2.4" opacity=".9"/>
    <g>
      <path d="M188 88L188 72L193 72L193 88Z" fill="${C.lilas}" stroke="${C.lilasT}" stroke-width="1.4" stroke-linejoin="round"/>
      <path d="M197.5 84L197.5 64L202.5 64L202.5 84Z" fill="${C.lilas}" stroke="${C.lilasT}" stroke-width="1.4" stroke-linejoin="round"/>
      <path d="M207 88L207 70L212 70L212 88Z" fill="${C.lilas}" stroke="${C.lilasT}" stroke-width="1.4" stroke-linejoin="round"/>
      <path d="M190.5 72C186 66 194 62 190.5 58C196 62 195 68 190.5 72Z" fill="${C.soleil}" stroke="${C.orT}" stroke-width="1.2" stroke-linejoin="round"/>
      <path d="M200 64C195.5 58 203.5 54 200 50C205.5 54 204.5 60 200 64Z" fill="${C.soleil}" stroke="${C.orT}" stroke-width="1.2" stroke-linejoin="round"/>
      <path d="M209.5 70C205 64 213 60 209.5 56C215 60 214 66 209.5 70Z" fill="${C.soleil}" stroke="${C.orT}" stroke-width="1.2" stroke-linejoin="round"/>
    </g>
  </g>`;

const patisserie = () => `<g>
    <path d="M140 262L140 200L260 200L260 262Z" fill="${CREME_M}" stroke="${POUTRE}" stroke-width="2.4" stroke-linejoin="round"/>
    <path d="M158 200L158 262M242 200L242 262M140 232L260 232" stroke="${POUTRE}" stroke-width="2.4"/>
    <path d="M158 232L176 200M242 232L224 200" stroke="${POUTRE}" stroke-width="2"/>
    ${fenetreRose(150, 216, 16, 13)}${fenetreRose(250, 216, 16, 13)}
    ${fenetreRose(150, 248, 16, 12)}${fenetreRose(250, 248, 16, 12)}
    ${tourGateau()}

    <path d="M124 210C132 182 158 170 200 170C242 170 268 182 276 210C256 200 232 204 216 208
      C208 210 192 210 184 208C168 204 144 200 124 210Z"
      fill="${CHOCO}" stroke="${CHOCO_T}" stroke-width="2.2" stroke-linejoin="round"/>
    ${ecailles(140, 188, 8, 15)}
    ${ecailles(132, 198, 9, 15)}
    ${pepites([[142, 200, 2.8], [160, 190, 2.4], [178, 196, 2.4], [200, 180, 2.4], [222, 196, 2.4],
      [240, 190, 2.4], [258, 200, 2.8], [190, 202, 2], [210, 202, 2]])}
    ${feston(126, 207, 10, 14.8)}
    <path d="M156 208C156 220 164 220 164 208M236 208C236 222 244 222 244 208" fill="none" stroke="${GLACAGE}" stroke-width="5" stroke-linecap="round"/>

    <path d="M186 262L186 224C186 212 214 212 214 224L214 262Z"
      fill="${C.soleil}" stroke="${POUTRE}" stroke-width="2.2" stroke-linejoin="round"/>
    <path d="M200 216L200 262" stroke="${C.orT}" stroke-width="1.3" opacity=".6"/>
    <path d="M180 262L180 220C180 216 186 216 186 220L186 262Z" fill="${GLACAGE}" stroke="${ROSE_GT}" stroke-width="1.6" stroke-linejoin="round"/>
    <path d="M214 262L214 220C214 216 220 216 220 220L220 262Z" fill="${GLACAGE}" stroke="${ROSE_GT}" stroke-width="1.6" stroke-linejoin="round"/>
    <path d="M180 226L186 222M180 236L186 232M180 246L186 242M180 256L186 252" stroke="${ROSE_G}" stroke-width="2.6"/>
    <path d="M214 226L220 222M214 236L220 232M214 246L220 242M214 256L220 252" stroke="${ROSE_G}" stroke-width="2.6"/>
    <path d="M178 218C182 206 218 206 222 218Z" fill="${ROSE_G}" stroke="${ROSE_GT}" stroke-width="1.8" stroke-linejoin="round"/>
    <circle cx="200" cy="212" r="4" fill="${GLACAGE}" stroke="${ROSE_GT}" stroke-width="1.3"/>
    <path d="M170 268L230 268L226 262L174 262Z" fill="${ROSE_G}" stroke="${ROSE_GT}" stroke-width="1.8" stroke-linejoin="round"/>
    <path d="M164 274L236 274L232 268L168 268Z" fill="${ROSE_G}" stroke="${ROSE_GT}" stroke-width="1.8" stroke-linejoin="round"/>

    <g transform="translate(276 208)">
      <path d="M-8 0C0 -6 10 -4 12 4" fill="none" stroke="${CHOCO_T}" stroke-width="1.8" stroke-linecap="round"/>
      <path d="M12 4L12 10" stroke="${CHOCO_T}" stroke-width="1.4"/>
      <path d="M2 10L22 10L22 28L12 34L2 28Z" fill="${GLACAGE}" stroke="${ROSE_GT}" stroke-width="1.8" stroke-linejoin="round"/>
      <path d="M7 24L17 24L15 18L9 18Z" fill="${C.soleil}" stroke="${C.orT}" stroke-width="1.2" stroke-linejoin="round"/>
      <path d="M7 18C7 12 17 12 17 18Z" fill="${ROSE_G}" stroke="${ROSE_GT}" stroke-width="1.2" stroke-linejoin="round"/>
    </g>
  </g>`;

// Les voisins à colombages, mordus par le cadre — la pâtisserie fait un COIN de rue.
const voisins = () => `<g>
    <path d="M-8 258C0 226 22 212 44 212L44 258Z" fill="${C.paille}" stroke="${C.pailleT}" stroke-width="2.2" stroke-linejoin="round"/>
    <path d="M20 258L20 232L64 232L64 258Z" fill="${CREME_M}" stroke="${POUTRE}" stroke-width="2"/>
    <path d="M34 232L34 258M50 232L50 258" stroke="${POUTRE}" stroke-width="1.8"/>
    <path d="M20 232C28 214 52 208 70 218L64 232Z" fill="${C.paille}" stroke="${C.pailleT}" stroke-width="2.2" stroke-linejoin="round"/>
    <path d="M408 256C400 226 378 212 356 212L356 256Z" fill="${C.paille}" stroke="${C.pailleT}" stroke-width="2.2" stroke-linejoin="round"/>
    <path d="M336 256L336 230L380 230L380 256Z" fill="${CREME_M}" stroke="${POUTRE}" stroke-width="2"/>
    <path d="M350 230L350 256M366 230L366 256" stroke="${POUTRE}" stroke-width="1.8"/>
    <path d="M380 230C372 212 348 206 330 216L336 230Z" fill="${C.paille}" stroke="${C.pailleT}" stroke-width="2.2" stroke-linejoin="round"/>
  </g>`;

const reverbere = (x, y) => `<g transform="translate(${x} ${y})">
    <path d="M-6 0L6 0L4 -4L-4 -4Z" fill="${CHOCO_T}" stroke="${CHOCO_T}" stroke-width="1.4" stroke-linejoin="round"/>
    <path d="M0 -4L0 -34" stroke="${CHOCO_T}" stroke-width="2.6"/>
    <path d="M-6 -34L6 -34L4 -46L-4 -46Z" fill="${C.soleil}" stroke="${CHOCO_T}" stroke-width="1.6" stroke-linejoin="round"/>
    <path d="M-6 -46L6 -46L0 -52Z" fill="${CHOCO_T}" stroke="${CHOCO_T}" stroke-width="1.4" stroke-linejoin="round"/>
  </g>`;

export default () => `<svg viewBox="0 0 400 300" xmlns="http://www.w3.org/2000/svg" role="img"
  aria-label="Sugarcube Corner, la pâtisserie en pain d'épices de Poneyville">
  ${cielFond('sc-ciel', '#a8e0ee', '#eaf8f7')}
  ${volute(64, 52, 1)}${volute(330, 60, 0.9)}${volute(104, 96, 0.7)}
  ${nuage(72, 40, 0.28, 0.85)}${nuage(336, 96, 0.22, 0.65)}
  ${oiseau(300, 40, 0.9)}${oiseau(322, 52, 0.7)}
  <path d="M0 240C60 230 130 236 200 240C270 244 340 236 400 230L400 300L0 300Z"
    fill="#cfe4d8" stroke="#a8c4b6" stroke-width="2.2"/>
  ${voisins()}
  <path d="M0 268C90 258 300 260 400 266L400 300L0 300Z" fill="#dcebe0" stroke="#a8c4b6" stroke-width="2.2"/>
  ${patisserie()}
  ${reverbere(316, 274)}
  <g transform="translate(84 276)">
    <path d="M-18 0C-22 -14 -18 -20 0 -20C18 -20 22 -14 18 0Z" fill="${C.bois}" stroke="${C.boisT}" stroke-width="2" stroke-linejoin="round"/>
    <path d="M-19 -12L19 -12" stroke="${C.boisT}" stroke-width="1.4"/>
    <circle cx="-7" cy="-24" r="6" fill="${C.pomme}" stroke="${C.grangeT}" stroke-width="1.4"/>
    <circle cx="7" cy="-25" r="6" fill="${C.pomme}" stroke="${C.grangeT}" stroke-width="1.4"/>
    <circle cx="0" cy="-31" r="6" fill="${C.pomme}" stroke="${C.grangeT}" stroke-width="1.4"/>
  </g>
  ${buisson(268, 282, 0.6)}${fleurs(126, 282, 0.95)}${fleurs(252, 288, 0.85)}${fleurs(358, 288, 0.8)}
  ${papillon(112, 208, 0.6, ROSE_G)}${papillon(300, 174, 0.55, C.lilas)}
</svg>`;
