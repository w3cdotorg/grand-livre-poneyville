// ---------------------------------------------------------------------------
// Le Grand livre de Poneyville — la carte d'accueil.
//
// viewBox 1000 × 700. Les pastilles-liens (js/render.js, écran « accueil ») sont
// posées en pourcentage du cadre : un `carte: { x, y }` de js/data.js tombe donc
// sur le point SVG (x · 10, y · 7). Les pastilles sont larges (jusqu'à 330 unités
// SVG) et hautes (~90) : le dessin reste volontairement calme là où elles se
// posent, et chaque bâtiment est placé dans une bande libre juste sous sa
// pastille. Voir NOTES.md § « Carte d'accueil ».
//
// Repères des dix lieux (pastille → bâtiment dessiné) :
//   Cloudsdale        (200,  70) → cité de nuages   (198–396, 105–200)
//   Canterlot         (840,  70) → château          (760–960, 100–215)
//   Sweet Apple Acres (130, 189) → grange + verger  (135–265, 215–315)
//   Carousel Boutique (480, 189) → manège           (359–471, 229–345)
//   Sugarcube Corner  (740, 189) → pâtisserie       (608–708, 245–345)
//   bibliothèque      (300, 413) → chêne Golden Oak (228–372, 388–556)
//   école             (620, 413) → école + cloche   (558–672, 420–518)
//   hutte de Zecora   (180, 525) → hutte            (139–241, 528–650)
//   forêt             (460, 525) → sapins           (bande y 500–700)
//   chaumière         (780, 525) → chaumière        (726–854, 512–604)
//
// Les six mini-portraits des Mane 6 (posés à `carte.y − 8`, donc 56 unités SVG
// plus haut que leur point) : Rainbow Dash (360, 70) au-dessus de Cloudsdale,
// Applejack (100, 301) dans le verger, Twilight (300, 301) sur son chêne,
// Rarity (520, 301) près du manège, Pinkie (740, 301) au coin de la pâtisserie,
// Fluttershy (880, 413) au-dessus de sa chaumière.
// ---------------------------------------------------------------------------

const C = {
  cielHaut: '#8fd3f4', cielBas: '#e2f4fd',
  soleil: '#ffe27a', halo: '#fff5c6',
  nuage: '#ffffff', nuageT: '#bad4e8', nuageO: '#dfeaf5',
  mont: '#b3a8c9', montT: '#8a7ea6', neige: '#f7f4fc',
  mur: '#fffaf2', murT: '#cdb9a0', or: '#f7c948', orT: '#c1901c',
  loin: '#c6e6a0', mid: '#abd985', pres: '#96cd6a', herbeT: '#6faa4a',
  eau: '#8ed6f0', eauT: '#57add4',
  feuille: '#5aa844', feuilleT: '#3b7a2b', tronc: '#a5764a', troncT: '#77502e',
  pomme: '#cf3b32', grange: '#c8483c', grangeT: '#8f2f2a',
  bois: '#c79a5e', boisT: '#9a6f39', paille: '#e0bd6f', pailleT: '#b08c3f',
  foret: '#2f5f56', foretT: '#1d443f', sapinA: '#38736a', sapinB: '#2b5b55',
  clairiere: '#6fae63', luciole: '#ffef9f',
  rose: '#f4a6c8', lilas: '#c39be0', ciel2: '#7fc6ea', creme: '#ffeccd',
};
const TOITS = ['#e0625b', '#f0a24a', '#6fb7de', '#b98adf', '#f5cf5a'];
const n = (v) => Math.round(v * 10) / 10;

// --- briques réutilisables -------------------------------------------------

const nuage = (x, y, s = 1, o = 1) => `<g transform="translate(${x} ${y}) scale(${n(s)})" opacity="${o}">
    <path d="M-70 20C-96 20 -98 -6 -74 -12C-78 -38 -44 -50 -26 -32C-14 -56 26 -54 34 -28C60 -38 82 -14 64 6C78 14 70 20 52 20Z"
      fill="${C.nuage}" stroke="${C.nuageT}" stroke-width="3" stroke-linejoin="round"/>
    <path d="M-58 20C-40 8 -8 6 14 14C28 19 40 20 52 20Z" fill="${C.nuageO}"/>
  </g>`;

const sapin = (x, y, h, f) => {
  const w = h * 0.44;
  const t = (a, b) => `<path d="M0 ${n(-h * a)}L${n(w * b)} ${n(-h * (a - 0.26))}L${n(-w * b)} ${n(-h * (a - 0.26))}Z"
      fill="${f}" stroke="${C.foretT}" stroke-width="2.6" stroke-linejoin="round"/>`;
  return `<g transform="translate(${x} ${y})">
    <rect x="-5" y="-12" width="10" height="18" fill="${C.troncT}"/>
    ${t(1, 0.58)}${t(0.76, 0.8)}${t(0.52, 1)}
  </g>`;
};

const pommier = (x, y, s = 1) => `<g transform="translate(${x} ${y}) scale(${n(s)})">
    <path d="M-6 0L-4 -24L4 -24L6 0Z" fill="${C.tronc}" stroke="${C.troncT}" stroke-width="2.4" stroke-linejoin="round"/>
    <circle cx="0" cy="-40" r="26" fill="${C.feuille}" stroke="${C.feuilleT}" stroke-width="3"/>
    <circle cx="-11" cy="-36" r="4.6" fill="${C.pomme}"/>
    <circle cx="9" cy="-45" r="4.6" fill="${C.pomme}"/>
    <circle cx="3" cy="-29" r="4.6" fill="${C.pomme}"/>
  </g>`;

// Petite maison de village : murs crème, toit de couleur, porte et fenêtre.
const maison = (x, y, w, h, toit) => `<g transform="translate(${x} ${y})">
    <rect x="${n(-w / 2)}" y="${n(-h)}" width="${w}" height="${h}" rx="4"
      fill="${C.mur}" stroke="${C.murT}" stroke-width="3"/>
    <path d="M${n(-w / 2 - 8)} ${n(-h)}L0 ${n(-h - w * 0.5)}L${n(w / 2 + 8)} ${n(-h)}Z"
      fill="${toit}" stroke="${C.murT}" stroke-width="3" stroke-linejoin="round"/>
    <rect x="-7" y="${n(-h * 0.62)}" width="14" height="${n(h * 0.62)}" rx="3" fill="${C.bois}" stroke="${C.boisT}" stroke-width="2.2"/>
    <rect x="${n(-w / 2 + 7)}" y="${n(-h * 0.8)}" width="12" height="12" rx="3" fill="${C.ciel2}" stroke="${C.murT}" stroke-width="2.2"/>
    <rect x="${n(w / 2 - 19)}" y="${n(-h * 0.8)}" width="12" height="12" rx="3" fill="${C.ciel2}" stroke="${C.murT}" stroke-width="2.2"/>
  </g>`;

// Touffes de fleurs : elles habillent les pentes que les pastilles laissent nues.
const fleurs = (x, y, s = 1) => `<g transform="translate(${x} ${y}) scale(${n(s)})">
    <path d="M-16 0C-14 -10 -6 -12 -2 -4" fill="none" stroke="${C.herbeT}" stroke-width="2.4" stroke-linecap="round"/>
    <path d="M14 0C13 -12 6 -16 1 -8" fill="none" stroke="${C.herbeT}" stroke-width="2.4" stroke-linecap="round"/>
    <circle cx="-2" cy="-6" r="4.6" fill="${C.rose}" stroke="${C.murT}" stroke-width="1.8"/>
    <circle cx="1" cy="-11" r="4.6" fill="${C.soleil}" stroke="${C.murT}" stroke-width="1.8"/>
    <circle cx="-15" cy="-4" r="4" fill="${C.lilas}" stroke="${C.murT}" stroke-width="1.8"/>
  </g>`;

const buisson = (x, y, s = 1) => `<g transform="translate(${x} ${y}) scale(${n(s)})">
    <path d="M-22 0C-30 -4 -28 -18 -16 -18C-14 -30 4 -32 8 -20C22 -22 28 -8 20 0Z"
      fill="${C.feuille}" stroke="${C.feuilleT}" stroke-width="2.8" stroke-linejoin="round"/>
  </g>`;

const luciole = (x, y) => `<g transform="translate(${x} ${y})">
    <circle r="9" fill="${C.luciole}" opacity=".22"/><circle r="4.4" fill="${C.luciole}" opacity=".55"/>
    <circle r="2" fill="#fffdf0"/>
  </g>`;

// --- les grandes zones -----------------------------------------------------

const oiseau = (x, y, s = 1) => `<path transform="translate(${x} ${y}) scale(${n(s)})"
    d="M-12 0C-8 -7 -4 -7 0 -2C4 -7 8 -7 12 0" fill="none" stroke="${C.montT}" stroke-width="2.6" stroke-linecap="round"/>`;

const ciel = () => `<rect width="1000" height="700" fill="url(#c-ciel)"/>
  <circle cx="560" cy="72" r="54" fill="${C.halo}" opacity=".55"/>
  <circle cx="560" cy="72" r="36" fill="${C.soleil}"/>
  ${nuage(400, 150, 0.55, 0.85)}${nuage(660, 128, 0.45, 0.7)}${nuage(920, 168, 0.4, 0.6)}
  ${nuage(120, 236, 0.34, 0.5)}
  ${oiseau(84, 128, 1)}${oiseau(120, 144, 0.8)}${oiseau(700, 118, 0.9)}${oiseau(732, 134, 0.7)}`;

// Cloudsdale : plateformes de nuages, colonnades, et l'arc-en-ciel qu'on y fabrique.
// La cité est décalée de 20 vers la droite (le `translate` du groupe) : posée plus à
// gauche, elle passait sous la pastille « Sweet Apple Acres » de la rangée suivante.
const cloudsdale = () => {
  const arc = ['#ee5b52', '#f4954a', '#ffdc63', '#71c065', '#5aabdd', '#a077cf']
    .map((c, i) => `<path d="M318 ${132 + i * 10}Q474 ${50 + i * 10} 624 ${178 + i * 10}"
      fill="none" stroke="${c}" stroke-width="11" stroke-linecap="round"/>`).join('');
  const tour = (x, y, h) => `<g transform="translate(${x} ${y})">
      <rect x="-13" y="${-h}" width="26" height="${h}" fill="${C.mur}" stroke="${C.nuageT}" stroke-width="3"/>
      <path d="M-20 ${-h}L0 ${n(-h - 26)}L20 ${-h}Z" fill="${C.rose}" stroke="${C.nuageT}" stroke-width="3" stroke-linejoin="round"/>
      <rect x="-6" y="${n(-h * 0.6)}" width="12" height="14" rx="4" fill="${C.ciel2}"/>
    </g>`;
  return `${arc}
  <g transform="translate(20 0)">
    ${nuage(268, 160, 1.35)}${nuage(186, 146, 0.8)}${nuage(356, 152, 0.7)}
    ${tour(216, 142, 50)}${tour(268, 134, 70)}${tour(318, 144, 44)}
    <path d="M178 152C230 142 306 142 356 152" fill="none" stroke="${C.nuageT}" stroke-width="3"/>
    ${nuage(298, 182, 1.1)}
  </g>`;
};

// Canterlot : le massif, les tours blanches à toits d'or, les cascades.
const canterlot = () => {
  const tour = (x, y, h, r) => `<g transform="translate(${x} ${y})">
      <rect x="${n(-r)}" y="${-h}" width="${n(r * 2)}" height="${h}" fill="${C.mur}" stroke="${C.murT}" stroke-width="3"/>
      <path d="M${n(-r - 7)} ${-h}L0 ${n(-h - r * 2.1)}L${n(r + 7)} ${-h}Z" fill="${C.or}" stroke="${C.orT}" stroke-width="3" stroke-linejoin="round"/>
      <rect x="${n(-r * 0.42)}" y="${n(-h * 0.66)}" width="${n(r * 0.84)}" height="${n(r * 1.1)}" rx="5" fill="${C.ciel2}"/>
    </g>`;
  return `<path d="M596 344L742 96L806 148L866 44L926 128L1000 88L1000 344Z"
    fill="${C.mont}" stroke="${C.montT}" stroke-width="3.4" stroke-linejoin="round"/>
  <path d="M742 96L772 122L742 138L716 132Z" fill="${C.neige}"/>
  <path d="M866 44L900 92L866 104L838 84Z" fill="${C.neige}"/>
  <path d="M752 214C812 200 900 202 960 216L946 226C888 214 818 212 762 224Z" fill="${C.nuageO}" opacity=".8"/>
  ${tour(780, 214, 58, 15)}${tour(838, 214, 92, 19)}${tour(898, 214, 64, 16)}
  <rect x="806" y="176" width="66" height="40" fill="${C.mur}" stroke="${C.murT}" stroke-width="3"/>
  <path d="M806 176L839 152L872 176Z" fill="${C.or}" stroke="${C.orT}" stroke-width="3" stroke-linejoin="round"/>
  <path d="M826 200C826 190 852 190 852 200L852 216L826 216Z" fill="${C.ciel2}"/>
  <path d="M866 220C880 262 878 290 862 316" fill="none" stroke="${C.eau}" stroke-width="9" stroke-linecap="round" opacity=".85"/>
  <path d="M792 220C784 250 786 274 796 296" fill="none" stroke="${C.eau}" stroke-width="7" stroke-linecap="round" opacity=".85"/>`;
};

const collines = () => `<path d="M0 214C140 176 250 210 330 224C440 244 520 206 620 200C740 194 850 232 1000 224L1000 700L0 700Z"
    fill="${C.loin}" stroke="${C.herbeT}" stroke-width="3"/>
  <path d="M0 306C160 258 320 300 470 316C640 334 820 288 1000 306L1000 700L0 700Z"
    fill="${C.mid}" stroke="${C.herbeT}" stroke-width="3"/>
  <path d="M0 442C240 396 500 434 700 452C840 464 920 440 1000 430L1000 700L0 700Z"
    fill="${C.pres}" stroke="${C.herbeT}" stroke-width="3"/>`;

// La rivière traverse la carte dans la bande laissée libre par les pastilles.
const riviere = () => {
  const d = 'M1000 290C880 300 790 332 700 350C600 370 470 364 360 386C250 408 110 404 0 434';
  return `<path d="${d}" fill="none" stroke="${C.eauT}" stroke-width="32" stroke-linecap="round"/>
  <path d="${d}" fill="none" stroke="${C.eau}" stroke-width="24" stroke-linecap="round"/>
  <path d="M880 306C800 322 720 344 640 358" fill="none" stroke="#ffffff" stroke-width="4" opacity=".5" stroke-linecap="round"/>
  <path d="M300 392C230 400 150 402 80 414" fill="none" stroke="#ffffff" stroke-width="4" opacity=".5" stroke-linecap="round"/>
  <g transform="translate(452 372)">
    <path d="M-34 6C-14 -8 14 -8 34 6" fill="none" stroke="${C.boisT}" stroke-width="7" stroke-linecap="round"/>
    <path d="M-30 -2L-30 12M-14 -8L-14 8M2 -10L2 8M18 -8L18 8M32 -2L32 12" stroke="${C.bois}" stroke-width="4" stroke-linecap="round"/>
  </g>`;
};

// Sweet Apple Acres : la grange rouge et les rangs de pommiers.
const sweetAppleAcres = () => `<g>
    <path d="M18 300C90 282 200 288 300 302" fill="none" stroke="${C.herbeT}" stroke-width="3" opacity=".5"/>
    <g transform="translate(200 315)">
      <rect x="-62" y="-72" width="124" height="72" fill="${C.grange}" stroke="${C.grangeT}" stroke-width="3.4"/>
      <path d="M-72 -72L-40 -104L40 -104L72 -72Z" fill="${C.grangeT}" stroke="${C.grangeT}" stroke-width="3.4" stroke-linejoin="round"/>
      <path d="M-16 0L-16 -46L16 -46L16 0Z" fill="${C.creme}" stroke="${C.grangeT}" stroke-width="3"/>
      <path d="M-16 -46L16 0M16 -46L-16 0" stroke="${C.grangeT}" stroke-width="2.6"/>
      <rect x="-8" y="-96" width="16" height="16" rx="4" fill="${C.creme}" stroke="${C.grangeT}" stroke-width="2.4"/>
    </g>
    ${pommier(70, 300, 0.9)}${pommier(132, 314, 0.8)}${pommier(40, 336, 1)}
    ${pommier(108, 352, 0.95)}${pommier(288, 322, 0.85)}${pommier(300, 366, 1)}
    ${pommier(226, 356, 0.8)}${pommier(164, 372, 0.9)}${pommier(46, 264, 0.6)}
    ${pommier(112, 258, 0.55)}${pommier(272, 268, 0.6)}
    <g transform="translate(96 402)">
      <rect x="-30" y="-38" width="60" height="38" rx="4" fill="${C.creme}" stroke="${C.murT}" stroke-width="3"/>
      <path d="M-36 -38L0 -62L36 -38Z" fill="${TOITS[1]}" stroke="${C.murT}" stroke-width="3" stroke-linejoin="round"/>
    </g>
  </g>`;

// Le village : manège de Rarity, pâtisserie, mairie ronde, école, quelques maisons.
const village = () => `<g>
    <g transform="translate(415 345)">
      <path d="M-48 0C-52 -30 -50 -50 -44 -66L44 -66C50 -50 52 -30 48 0Z"
        fill="${C.mur}" stroke="${C.murT}" stroke-width="3.4" stroke-linejoin="round"/>
      <path d="M-52 -66C-46 -76 -34 -80 -22 -74C-14 -80 -2 -80 6 -74C18 -80 30 -76 36 -66Z"
        fill="${C.rose}" stroke="${C.murT}" stroke-width="3" stroke-linejoin="round"/>
      <path d="M-56 -66L0 -116L56 -66Z" fill="${C.rose}" stroke="${C.murT}" stroke-width="3.4" stroke-linejoin="round"/>
      <path d="M-36 -66L-14 -116L0 -116L-14 -66Z" fill="${C.lilas}"/>
      <path d="M8 -66L20 -104L30 -90L26 -66Z" fill="${C.lilas}"/>
      <path d="M0 -116L0 -138M0 -138L24 -130L0 -122Z" fill="${C.or}" stroke="${C.orT}" stroke-width="2.4" stroke-linejoin="round"/>
      <rect x="-12" y="-36" width="24" height="36" rx="10" fill="${C.bois}" stroke="${C.boisT}" stroke-width="2.6"/>
      <circle cx="-30" cy="-46" r="8" fill="${C.ciel2}" stroke="${C.murT}" stroke-width="2.4"/>
      <circle cx="30" cy="-46" r="8" fill="${C.ciel2}" stroke="${C.murT}" stroke-width="2.4"/>
      <path d="M-44 -20C-16 -26 16 -26 44 -20" fill="none" stroke="${C.lilas}" stroke-width="4"/>
    </g>
    <g transform="translate(658 345)">
      <rect x="-50" y="-64" width="100" height="64" rx="5" fill="${C.creme}" stroke="${C.murT}" stroke-width="3.4"/>
      <path d="M-58 -64C-40 -78 -22 -60 0 -74C22 -88 40 -70 58 -64Z" fill="${TOITS[0]}" stroke="${C.murT}" stroke-width="3.4" stroke-linejoin="round"/>
      <path d="M-58 -64C-36 -56 -18 -68 0 -60C20 -51 38 -60 58 -64" fill="none" stroke="${C.mur}" stroke-width="7" stroke-linecap="round"/>
      <rect x="-12" y="-32" width="24" height="32" rx="4" fill="${C.bois}" stroke="${C.boisT}" stroke-width="2.6"/>
      <rect x="-42" y="-44" width="18" height="16" rx="4" fill="${C.ciel2}" stroke="${C.murT}" stroke-width="2.4"/>
      <rect x="24" y="-44" width="18" height="16" rx="4" fill="${C.ciel2}" stroke="${C.murT}" stroke-width="2.4"/>
      <g transform="translate(0 -92)">
        <path d="M-16 8C-16 -6 16 -6 16 8Z" fill="${C.rose}" stroke="${C.murT}" stroke-width="2.6" stroke-linejoin="round"/>
        <circle cx="0" cy="-8" r="6" fill="${C.pomme}"/>
      </g>
    </g>
    <g transform="translate(858 352)">
      <path d="M-46 0C-48 -24 -46 -42 -40 -58L40 -58C46 -42 48 -24 46 0Z"
        fill="${C.mur}" stroke="${C.murT}" stroke-width="3.4" stroke-linejoin="round"/>
      <path d="M-30 0L-30 -46M30 0L30 -46" stroke="${C.murT}" stroke-width="2.4" opacity=".6"/>
      <path d="M-50 -58L0 -104L50 -58Z" fill="${TOITS[0]}" stroke="${C.murT}" stroke-width="3.4" stroke-linejoin="round"/>
      <path d="M0 -104L0 -122M0 -122L20 -115L0 -108Z" fill="${C.or}" stroke="${C.orT}" stroke-width="2.4" stroke-linejoin="round"/>
      <circle cx="0" cy="-38" r="12" fill="${C.creme}" stroke="${C.murT}" stroke-width="2.6"/>
      <path d="M0 -44L0 -38L5 -34" fill="none" stroke="${C.murT}" stroke-width="2.4" stroke-linecap="round"/>
      <rect x="-10" y="-24" width="20" height="24" rx="4" fill="${C.bois}" stroke="${C.boisT}" stroke-width="2.6"/>
    </g>
    <g transform="translate(615 518)">
      <rect x="-56" y="-62" width="112" height="62" rx="5" fill="${C.creme}" stroke="${C.murT}" stroke-width="3.4"/>
      <path d="M-64 -62L0 -98L64 -62Z" fill="${TOITS[2]}" stroke="${C.murT}" stroke-width="3.4" stroke-linejoin="round"/>
      <g transform="translate(0 -100)">
        <rect x="-13" y="-24" width="26" height="24" rx="4" fill="${C.mur}" stroke="${C.murT}" stroke-width="2.6"/>
        <path d="M-8 -6C-8 -18 8 -18 8 -6Z" fill="${C.pomme}" stroke="${C.grangeT}" stroke-width="2.2" stroke-linejoin="round"/>
      </g>
      <rect x="-14" y="-34" width="28" height="34" rx="4" fill="${C.bois}" stroke="${C.boisT}" stroke-width="2.6"/>
      <rect x="-46" y="-48" width="20" height="18" rx="4" fill="${C.ciel2}" stroke="${C.murT}" stroke-width="2.4"/>
      <rect x="26" y="-48" width="20" height="18" rx="4" fill="${C.ciel2}" stroke="${C.murT}" stroke-width="2.4"/>
      <g transform="translate(0 -46)">
        <path d="M-15 4C-15 -12 15 -12 15 4Z" fill="${C.mur}" stroke="${C.murT}" stroke-width="2.6" stroke-linejoin="round"/>
        <path d="M-8 2C-8 -8 8 -8 8 2Z" fill="${C.pomme}" stroke="${C.grangeT}" stroke-width="2.2" stroke-linejoin="round"/>
        <circle cx="0" cy="4" r="2.6" fill="${C.grangeT}"/>
      </g>
    </g>
    ${maison(524, 262, 52, 34, TOITS[3])}${maison(724, 264, 46, 30, TOITS[4])}
    ${maison(772, 452, 62, 40, TOITS[1])}${maison(486, 470, 54, 36, TOITS[4])}
  </g>`;

// Fleurs et buissons : le liant entre les zones, sur les pentes que les pastilles laissent nues.
const decor = () => `${buisson(120, 512, 0.9)}${buisson(688, 486, 0.85)}${buisson(944, 480, 0.9)}${buisson(258, 452, 0.7)}
  ${fleurs(56, 476, 1)}${fleurs(168, 498, 0.9)}${fleurs(226, 470, 0.8)}${fleurs(392, 494, 0.9)}
  ${fleurs(536, 476, 0.85)}${fleurs(722, 508, 1)}${fleurs(846, 470, 0.9)}${fleurs(910, 502, 0.8)}
  ${fleurs(468, 428, 0.7)}${fleurs(646, 420, 0.7)}`;

// La bibliothèque Golden Oak : un chêne habité, tronc à porte et fenêtres.
const goldenOak = () => `<ellipse cx="300" cy="552" rx="104" ry="34" fill="${C.pres}" stroke="${C.herbeT}" stroke-width="3"/>
  <g transform="translate(300 556)">
    <path d="M-30 0C-32 -46 -26 -80 -14 -104L14 -104C26 -80 32 -46 30 0Z"
      fill="${C.tronc}" stroke="${C.troncT}" stroke-width="3.4" stroke-linejoin="round"/>
    <path d="M-30 0C-46 -6 -54 -18 -50 -30C-42 -22 -36 -20 -28 -22Z" fill="${C.tronc}" stroke="${C.troncT}" stroke-width="3"/>
    <path d="M30 0C46 -6 54 -18 50 -30C42 -22 36 -20 28 -22Z" fill="${C.tronc}" stroke="${C.troncT}" stroke-width="3"/>
    <path d="M-15 0L-15 -34C-15 -46 15 -46 15 -34L15 0Z" fill="${C.boisT}" stroke="${C.troncT}" stroke-width="3" stroke-linejoin="round"/>
    <circle cx="0" cy="-64" r="11" fill="${C.or}" stroke="${C.troncT}" stroke-width="2.6"/>
    <circle cx="0" cy="-101" r="72" fill="${C.feuille}" stroke="${C.feuilleT}" stroke-width="3.4"/>
    <circle cx="-52" cy="-138" r="44" fill="${C.feuille}" stroke="${C.feuilleT}" stroke-width="3.4"/>
    <circle cx="50" cy="-140" r="46" fill="${C.feuille}" stroke="${C.feuilleT}" stroke-width="3.4"/>
    <circle cx="0" cy="-168" r="48" fill="${C.feuille}" stroke="${C.feuilleT}" stroke-width="3.4"/>
    <path d="M-58 -108C-30 -122 26 -122 58 -106" fill="none" stroke="${C.feuilleT}" stroke-width="3" opacity=".45"/>
    <circle cx="-36" cy="-92" r="12" fill="${C.creme}" stroke="${C.troncT}" stroke-width="2.6"/>
    <circle cx="38" cy="-96" r="12" fill="${C.creme}" stroke="${C.troncT}" stroke-width="2.6"/>
  </g>`;

// La forêt Désenchantée : bande fraîche, jamais effrayante — lucioles amicales.
const foret = () => {
  const bord = 'M0 516C80 500 140 508 196 506C268 504 300 566 420 562C520 558 592 528 700 536C812 544 902 518 1000 528L1000 700L0 700Z';
  const rangs = [
    [[40, 596, 96], [104, 582, 78], [166, 604, 104], [246, 620, 92], [318, 606, 82], [386, 624, 100],
     [462, 610, 88], [534, 626, 104], [604, 606, 84], [676, 622, 96], [748, 604, 80], [820, 622, 98],
     [894, 606, 86], [958, 622, 100]],
    [[74, 556, 66], [214, 566, 60], [286, 590, 56], [356, 578, 62], [430, 592, 58], [500, 578, 66],
     [572, 566, 58], [648, 574, 62], [716, 562, 56], [790, 568, 60], [864, 558, 64], [938, 566, 58]],
    [[22, 684, 116], [140, 692, 104], [268, 696, 110], [400, 690, 100], [520, 698, 112],
     [648, 692, 106], [772, 698, 114], [900, 690, 102]],
  ];
  const lucioles = [[110, 646], [250, 664], [352, 646], [466, 668], [560, 648], [672, 664],
    [744, 642], [858, 660], [916, 636], [188, 676], [416, 682], [612, 686]];
  return `<path d="${bord}" fill="${C.foret}" stroke="${C.foretT}" stroke-width="3.4" stroke-linejoin="round"/>
  <path d="M700 578C760 566 820 570 880 562" fill="none" stroke="${C.sapinA}" stroke-width="4" opacity=".5"/>
  <ellipse cx="792" cy="600" rx="86" ry="46" fill="${C.clairiere}" stroke="${C.foretT}" stroke-width="3"/>
  <ellipse cx="186" cy="612" rx="62" ry="34" fill="${C.clairiere}" stroke="${C.foretT}" stroke-width="3"/>
  ${rangs[1].map(([x, y, h]) => sapin(x, y, h, C.sapinB)).join('')}
  ${rangs[0].filter(([x, y]) => !((x > 700 && x < 890 && y > 560) || (x > 120 && x < 250 && y > 570)))
    .map(([x, y, h]) => sapin(x, y, h, C.sapinA)).join('')}
  ${rangs[2].map(([x, y, h]) => sapin(x, y, h, C.sapinB)).join('')}
  ${lucioles.map(([x, y]) => luciole(x, y)).join('')}`;
};

// La hutte de Zecora, dans un gros arbre creux, et ses masques.
const hutteZecora = () => `<g transform="translate(185 650)">
    <path d="M-46 0C-50 -38 -42 -66 -26 -86L26 -86C42 -66 50 -38 46 0Z"
      fill="${C.troncT}" stroke="#4f3620" stroke-width="3.4" stroke-linejoin="round"/>
    <path d="M-56 -86L0 -122L56 -86Z" fill="${C.paille}" stroke="${C.pailleT}" stroke-width="3.4" stroke-linejoin="round"/>
    <path d="M-40 -86C-20 -96 20 -96 40 -86" fill="none" stroke="${C.pailleT}" stroke-width="3"/>
    <path d="M-14 0L-14 -34C-14 -46 14 -46 14 -34L14 0Z" fill="#3f2b1a" stroke="#4f3620" stroke-width="3" stroke-linejoin="round"/>
    <circle cx="-28" cy="-54" r="10" fill="${C.creme}" stroke="${C.pailleT}" stroke-width="2.6"/>
    <path d="M-28 -58C-24 -54 -32 -54 -28 -50" fill="none" stroke="${C.pailleT}" stroke-width="2"/>
    <ellipse cx="28" cy="-54" rx="9" ry="12" fill="${C.or}" stroke="${C.pailleT}" stroke-width="2.6"/>
    <path d="M24 -58L24 -54M32 -58L32 -54M24 -48C28 -44 32 -48 32 -48" fill="none" stroke="${C.pailleT}" stroke-width="2" stroke-linecap="round"/>
    <path d="M-58 -8C-58 -20 -42 -20 -42 -8Z" fill="#5b4130" stroke="#4f3620" stroke-width="2.6" stroke-linejoin="round"/>
    <path d="M-56 -18C-52 -30 -46 -30 -44 -18" fill="none" stroke="${C.luciole}" stroke-width="3" stroke-linecap="round"/>
  </g>`;

// La chaumière de Fluttershy : toit de chaume, nichoirs, animaux.
const chaumiere = () => `<g transform="translate(790 604)">
    <path d="M-56 0C-58 -22 -52 -34 -44 -44L44 -44C52 -34 58 -22 56 0Z"
      fill="${C.creme}" stroke="${C.murT}" stroke-width="3.4" stroke-linejoin="round"/>
    <path d="M-64 -40C-52 -74 -28 -92 0 -92C28 -92 52 -74 64 -40C40 -50 -40 -50 -64 -40Z"
      fill="${C.paille}" stroke="${C.pailleT}" stroke-width="3.4" stroke-linejoin="round"/>
    <path d="M-44 -52C-24 -60 24 -60 44 -52" fill="none" stroke="${C.pailleT}" stroke-width="3"/>
    <path d="M-40 -70C-20 -78 20 -78 40 -70" fill="none" stroke="${C.pailleT}" stroke-width="2.6" opacity=".7"/>
    <path d="M-12 0L-12 -26C-12 -36 12 -36 12 -26L12 0Z" fill="${C.bois}" stroke="${C.boisT}" stroke-width="3" stroke-linejoin="round"/>
    <circle cx="-32" cy="-24" r="10" fill="${C.ciel2}" stroke="${C.murT}" stroke-width="2.6"/>
    <circle cx="32" cy="-24" r="10" fill="${C.ciel2}" stroke="${C.murT}" stroke-width="2.6"/>
    <path d="M-70 0C-70 -12 -58 -12 -58 0Z" fill="${C.rose}" stroke="${C.murT}" stroke-width="2.4" stroke-linejoin="round"/>
    <g transform="translate(58 -66)">
      <rect x="-11" y="-14" width="22" height="18" rx="3" fill="${C.bois}" stroke="${C.boisT}" stroke-width="2.4"/>
      <circle cx="0" cy="-4" r="4" fill="${C.boisT}"/>
      <path d="M0 4L0 16" stroke="${C.boisT}" stroke-width="3"/>
    </g>
    <g transform="translate(-52 -12)">
      <ellipse cx="0" cy="0" rx="10" ry="8" fill="#ffffff" stroke="${C.murT}" stroke-width="2.4"/>
      <circle cx="7" cy="-6" r="5" fill="#ffffff" stroke="${C.murT}" stroke-width="2.4"/>
      <path d="M-8 -6C-12 -14 -4 -14 -6 -7" fill="#ffffff" stroke="${C.murT}" stroke-width="2.2"/>
    </g>
  </g>`;

export default () => `<svg viewBox="0 0 1000 700" xmlns="http://www.w3.org/2000/svg" role="img"
  aria-label="Carte de Poneyville et de ses environs">
  <defs>
    <linearGradient id="c-ciel" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="${C.cielHaut}"/><stop offset="1" stop-color="${C.cielBas}"/>
    </linearGradient>
  </defs>
  ${ciel()}
  ${canterlot()}
  ${collines()}
  ${cloudsdale()}
  ${riviere()}
  ${sweetAppleAcres()}
  ${village()}
  ${decor()}
  ${foret()}
  ${goldenOak()}
  ${hutteZecora()}
  ${chaumiere()}
</svg>`;
