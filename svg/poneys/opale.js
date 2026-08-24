// ───────────────────────────────────────────────────────────────────────────────
// OPALE (Opalescence) — la chatte persane de Rarity. ASSISE de face, tête aux
// trois quarts vers la droite, nœud violet sur la houppe, panache de queue
// dressé à gauche, et l'air pincé de duchesse qui est toute sa personnalité.
//
// RÉFÉRENCE PLEIN PIED (API MediaWiki, dans `refs/`) :
//   · `refs/z-opale-corps.png` — recadrage ×2 de
//     File:Gummy, Winona, and Opalescence appear S6E22.png (1280 × 720)
//     https://mlp.fandom.com/wiki/File:Gummy,_Winona,_and_Opalescence_appear_S6E22.png
//     assise de face, nœud, collier, panache complet : LA référence.
//   · `refs/v4-opale-pp.png` — File:Opalescence id S1E14.png (500 × 450)
//     https://mlp.fandom.com/wiki/File:Opalescence_id_S1E14.png
//     gros plan du visage : c'est lui qui donne les paupières et les cils.
//
// RELEVÉ MÉTRIQUE (tête x 792 → 1100, y 355 → 500 dans l'image d'origine, soit
// 308 × 145 ; la référence regarde de face, les fractions en x ci-dessous sont
// comptées DEPUIS LE BORD DROIT pour notre pose) :
//   | œil            | 0,29 large × 0,31 haut ; centres à 0,25 et 0,84 du bord droit |
//   | nez            | 0,11 × 0,12 ; centre à 0,56 du bord droit, y 0,26     |
//   | nœud           | 0,44 × 0,62 de la tête                                |
//   | corps assis    | 0,81 × 0,62 de la LARGEUR de tête (250 × 190 px)      |
//   | panache        | 220 × 435 px, soit 1,5 fois la hauteur de tête        |
//
// TROIS RELEVÉS QUI CONTREDISAIENT L'INTUITION :
//   1. **LE NEZ EST AU-DESSUS DES YEUX.** Sur une tête de persan, la truffe est
//      haute et rentrée : elle est à 0,26 de la hauteur de tête, les centres
//      d'yeux à 0,43 et 0,48. Un nez posé « comme sur un chat normal », entre et
//      sous les yeux, donne un museau de chaton et efface tout l'air pincé.
//   2. **LES CILS PENDENT VERS LE BAS**, au coin bas-externe de chaque œil, cinq
//      par œil. C'est l'inverse de la convention du livre (cils au coin
//      haut-arrière, cf. NOTES.md § vague 2) — et sur les deux références c'est
//      sans ambiguïté. Ce sont eux, avec la paupière lilas, qui font le regard
//      lourd de duchesse.
//   3. **LA PAUPIÈRE EST LILAS, PAS BLANCHE.** Un vrai fard, comme celui de
//      Rarity (NOTES.md § refonte), et pour la même raison il doit être visible
//      YEUX OUVERTS : il est donc peint en paupière mi-close fixe, et le
//      clignement reprend la même teinte.
//
// ÉCART ASSUMÉ : **la tête est arrondie à 1,46 de large pour 1 de haut au lieu
// de 2,12.** Une tête au rapport exact fait 118 × 56 dans la fenêtre de portrait
// `171 6 124 124` : une crêpe, où ni le nœud ni la houppe ne tiennent au-dessus,
// et qui à 60 px de vignette ne se lit plus comme une tête. C'est le même
// arbitrage que la crinière-ruban des princesses : la fenêtre est fixe, c'est la
// cote la plus extrême qui cède.
//
// Pas de marque de beauté (`cutieMark: null`) ; `class="paupieres"` obligatoire.
// ───────────────────────────────────────────────────────────────────────────────
import { ton, derivesAnimal } from "./_commun.js";

// ── TÊTE : large, basse, joues renflées. x 182 → 290, y 50 → 124 (108 × 74).
const TETE = "M186 84"
  + "C186 64 206 50 236 50"
  + "C266 50 288 62 289 82"
  + "C290 100 280 116 262 122"
  + "C244 128 222 128 206 122"
  + "C190 116 186 100 186 84Z";
// ── OREILLES : deux petits triangles aux coins hauts de la tête. Sur un persan
//    elles sont PETITES et écartées ; grandes et dressées, on obtient un chat de
//    gouttière et l'air pincé disparaît.
const OREILLE_LOIN = "M192 68C188 58 188 48 191 42C197 46 203 54 207 62C203 66 196 68 192 68Z";
const OREILLE_PROCHE = "M272 62C276 52 282 44 288 40C290 48 289 58 285 68C280 68 275 66 272 62Z";
// ── HOUPPE : le toupet de poil qui se dresse entre les oreilles et porte le
//    nœud. Trois mèches, pas une seule masse — en masse pleine elle se lit comme
//    un bonnet.
const HOUPPE = "M222 52"
  + "C220 40 222 26 228 16"
  + "C232 12 236 14 236 20"
  + "C238 14 244 12 248 16"
  + "C252 22 250 32 246 40"
  + "C252 34 258 34 259 40"
  + "C259 48 252 54 244 56"
  + "C236 58 226 58 222 52Z";
// ── CORPS assis, fourrure longue : le bord bas est FESTONNÉ, pas lisse. Un bord
//    lisse sur un poil long se lit comme un fourreau.
const CORPS = "M276 128"
  + "C284 148 286 174 280 196"
  + "C274 214 262 226 246 232"
  + "C230 238 208 238 192 232"
  + "C172 224 158 208 152 188"
  + "C146 166 150 144 162 128"
  + "C182 122 254 122 276 128Z";
const PATTE_1 = "M200 216C194 228 194 240 200 246C208 251 218 251 224 246"
  + "C227 238 226 226 221 214C214 209 206 210 200 216Z";
const PATTE_2 = "M228 218C222 230 222 242 228 248C236 253 246 253 252 248"
  + "C255 240 254 228 249 216C242 211 234 212 228 218Z";
// ── PANACHE DE QUEUE : décrit par son AXE et sa demi-largeur (la technique du
//    corps de Gummy). Un panache écrit en tracé fermé sort systématiquement trop
//    mince ; ici l'épaisseur est un paramètre.
const AXE_QUEUE = [
  [176, 200, 15],
  [156, 182, 21],
  [136, 154, 25],
  [122, 120, 26],
  [116, 86, 25],
  [120, 56, 22],
  [134, 36, 18],
  [154, 30, 12],
  [168, 34, 6],
];

export default (c) => {
  const d = derivesAnimal(c);
  const { TRAIT, M0 } = d;
  const LILAS = M0;                            // la paupière et l'ombre de poil
  const LILAS_T = ton(LILAS, 1, -.20);
  const NOEUD = c.noeud ?? LILAS;              // gardé : la clé est optionnelle
  const NOEUD_T = ton(NOEUD, 1.05, -.18);
  const POIL = ton(c.robe, .75, -.10);         // séparations de fourrure
  // CONSTANTES DOCUMENTÉES — aucune ne dérive d'une entrée de `c` :
  const NEZ = "#f59e9e";                       // truffe saumon (relevé #f59e9e)
  const CILS = "#3a3a46";                      // cils et moustaches, gris très sombre
  const PUPILLE = "#12121a";                   // la fente de pupille
  const GEMME = "#8fe6d8";                     // le cœur de la broche-fleur
  // L'ŒIL : amande CHARTREUSE à pupille en FENTE HORIZONTALE (un chat), paupière
  // lilas peinte sur la moitié haute, ligne de cil sombre par-dessus, et cinq
  // cils qui PENDENT au coin bas-externe. Repère local : amande 31 × 23.
  const oeil = (t, sens) => `<g transform="${t}">
    <path d="M-15.5 -2C-12 -10 -4 -12 3 -11C10 -10 15 -5 15.5 2C13 8 6 11 -1 11C-8 11 -13 7 -15.5 -2Z"
          fill="${c.yeux}" stroke="${CILS}" stroke-width="1.6"/>
    <ellipse cx="1" cy="0" rx="7.4" ry="4.2" fill="${PUPILLE}"/>
    <circle cx="5" cy="-3.4" r="1.9" fill="#fff"/>
    <!-- paupière LILAS mi-close, visible yeux ouverts (cf. en-tête) -->
    <path d="M-15.5 -2C-12 -10 -4 -12 3 -11C10 -10 15 -5 15.5 2C11 -3 4 -5 -3 -5C-9 -5 -13 -3 -15.5 -2Z"
          fill="${LILAS}"/>
    <path d="M-15.5 -2C-11 -3 -4 -5 3 -5C9 -5 13 -3 15.5 2" fill="none"
          stroke="${CILS}" stroke-width="2.2"/>
    <g fill="none" stroke="${CILS}" stroke-width="1.9" stroke-linecap="round"
       transform="scale(${sens} 1)">
      <path d="M-3 10C-3.5 13 -4 15 -5 17"/>
      <path d="M2 10.5C2 13.5 2 15.5 1.5 18"/>
      <path d="M7 9C7.5 12 8 14 8 16.5"/>
      <path d="M11.5 6.5C12.5 9 13.5 11 14 13"/>
    </g>
  </g>`;
  // Placements relevés (cf. en-tête). La chatte est de FACE : les deux amandes
  // ont la même taille, seuls leurs cils sont en miroir.
  const OEIL_P = "translate(263 85)";
  const OEIL_L = "translate(199 89) scale(.94)";

  // Le panache, par décalage perpendiculaire de son axe (technique de Gummy).
  const bord = (k, f) => AXE_QUEUE.map(([x, y, w], i) => {
    const a = AXE_QUEUE[Math.max(0, i - 1)], b = AXE_QUEUE[Math.min(AXE_QUEUE.length - 1, i + 1)];
    const tx = b[0] - a[0], ty = b[1] - a[1];
    const n = Math.hypot(tx, ty) || 1;
    return [+(x + k * f * w * (ty / n)).toFixed(1), +(y - k * f * w * (tx / n)).toFixed(1)];
  });
  const lisse = (pts, ouvre) => {
    let s = `${ouvre ? 'M' : 'L'}${pts[0][0]} ${pts[0][1]}`;
    for (let i = 1; i < pts.length - 1; i++) {
      const [x, y] = pts[i], [x2, y2] = pts[i + 1];
      s += `Q${x} ${y} ${+((x + x2) / 2).toFixed(1)} ${+((y + y2) / 2).toFixed(1)}`;
    }
    return `${s}L${pts.at(-1)[0]} ${pts.at(-1)[1]}`;
  };
  const inv = (pts) => [...pts].reverse();
  const QUEUE = `${lisse(bord(1, 1), true)}${lisse(inv(bord(-1, 1)), false)}Z`;
  // Les mèches du panache : la ligne médiane et deux lignes à 0,55, en poil un
  // cran plus sombre. Sans elles, le panache est un gros haricot blanc.
  const MECHES = [0, .55, -.55].map((f) =>
    `<path d="${lisse(bord(1, f), true)}"/>`).join('');

  return `<svg viewBox="0 0 300 300" xmlns="http://www.w3.org/2000/svg" role="img">
  <g stroke-linejoin="round" stroke-linecap="round">

  <!-- 1. PANACHE DE QUEUE, derrière tout, dressé et recourbé vers la droite -->
  <path d="${QUEUE}" fill="${c.robe}" stroke="${TRAIT}" stroke-width="3.2"/>
  <g fill="none" stroke="${POIL}" stroke-width="2">${MECHES}</g>

  <!-- 2. CORPS ASSIS + les deux pattes avant -->
  <path d="${CORPS}" fill="${c.robe}" stroke="${TRAIT}" stroke-width="3.4"/>
  <g fill="none" stroke="${POIL}" stroke-width="2.2">
    <path d="M180 140C172 158 170 180 176 200"/>
    <path d="M262 142C270 160 272 182 266 202"/>
  </g>
  <path d="${PATTE_1}" fill="${c.robe}" stroke="${TRAIT}" stroke-width="2.8"/>
  <path d="${PATTE_2}" fill="${c.robe}" stroke="${TRAIT}" stroke-width="2.8"/>
  <g fill="none" stroke="${TRAIT}" stroke-width="1.7">
    <path d="M206 242C210 240 214 239 217 239"/>
    <path d="M234 244C238 242 242 241 245 241"/>
  </g>

  <!-- 3. COLLIER violet, posé sur la gorge AVANT la tête : c'est la tête,
       dessinée ensuite, qui le termine proprement au ras de la mâchoire. -->
  <path d="M198 124C210 140 232 146 254 142C264 140 270 134 270 128"
        fill="none" stroke="${NOEUD_T}" stroke-width="11"/>

  <!-- 4. OREILLES puis TÊTE. Les oreilles passent avant : c'est le contour de la
       tête qui creuse leur attache. -->
  <path d="${OREILLE_LOIN}" fill="${c.robe}" stroke="${TRAIT}" stroke-width="2.6"/>
  <path d="${OREILLE_PROCHE}" fill="${c.robe}" stroke="${TRAIT}" stroke-width="2.6"/>
  <path d="${TETE}" fill="${c.robe}" stroke="${TRAIT}" stroke-width="3.4"/>
  <g fill="${ton(NEZ, .6, .06)}" stroke="${TRAIT}" stroke-width="1.4">
    <path d="M194 62C192 56 192 50 193 46C196 50 200 56 202 61Z"/>
    <path d="M275 60C278 52 282 46 286 43C287 49 286 56 283 63Z"/>
  </g>

  <!-- 5. BROCHE-FLEUR du collier, sous la mâchoire -->
  <g transform="translate(228 140)">
    <g fill="${NOEUD}" stroke="${NOEUD_T}" stroke-width="1.6">
      ${Array.from({ length: 7 }, (_, i) => {
        const a = (i / 7) * Math.PI * 2;
        return `<circle cx="${(Math.cos(a) * 7.6).toFixed(1)}" cy="${(Math.sin(a) * 7.6).toFixed(1)}" r="4.6"/>`;
      }).join('')}
    </g>
    <circle r="6.4" fill="${GEMME}" stroke="${ton(GEMME, 1, -.24)}" stroke-width="1.4"/>
  </g>

  <!-- 6. TRUFFE saumon + bouche en Y. Le nez est HAUT, au-dessus des yeux
       (relevé) : c'est le museau rentré du persan, et c'est de là que vient l'air
       pincé. Sans le trait vertical du philtrum, la bouche flotte. -->
  <path d="M224 64C227 62 235 62 238 64C238 70 232 74 231 74C230 74 224 70 224 64Z"
        fill="${NEZ}" stroke="${ton(NEZ, 1, -.18)}" stroke-width="1.5"/>
  <g fill="none" stroke="${CILS}" stroke-width="2.2">
    <path d="M231 74C231 78 231 80 231 83"/>
    <path d="M231 83C228 89 224 90 221 88"/>
    <path d="M231 83C234 89 238 90 241 88"/>
  </g>

  <!-- 7. MOUSTACHES : trois brins de chaque côté, qui partent des joues et
       balaient vers le bas. Elles sortent du contour de la tête, comme sur les
       deux références. -->
  <g fill="none" stroke="${CILS}" stroke-width="1.8" stroke-opacity=".8">
    <path d="M216 96C204 104 194 114 188 124"/>
    <path d="M214 100C204 110 196 122 192 134"/>
    <path d="M246 96C258 104 268 114 274 124"/>
    <path d="M248 100C258 110 266 122 270 134"/>
  </g>

  <!-- 8. YEUX -->
  ${oeil(OEIL_L, -1)}${oeil(OEIL_P, 1)}

  <!-- 9. PAUPIÈRES du clignement : les deux amandes agrandies de 7 %, dans les
       repères EXACTS des yeux, peintes du LILAS du fard (comme Rarity, pour que
       le clignement soit cohérent avec la paupière fixe). -->
  <g class="paupieres">
    <path d="M-15.5 -2C-12 -10 -4 -12 3 -11C10 -10 15 -5 15.5 2C13 8 6 11 -1 11C-8 11 -13 7 -15.5 -2Z"
          transform="translate(263 85) scale(1.07)" fill="${LILAS}"/>
    <path d="M-15.5 -2C-12 -10 -4 -12 3 -11C10 -10 15 -5 15.5 2C13 8 6 11 -1 11C-8 11 -13 7 -15.5 -2Z"
          transform="translate(199 89) scale(1.006)" fill="${LILAS}"/>
  </g>

  <!-- 10. HOUPPE et NŒUD, en dernier : la houppe pousse DEVANT le crâne et le
       nœud est noué à sa base. Posé plus bas dans la pile, le nœud passait
       derrière la houppe et il n'en restait que deux bouts. -->
  <path d="${HOUPPE}" fill="${c.robe}" stroke="${TRAIT}" stroke-width="2.8"/>
  <g fill="none" stroke="${POIL}" stroke-width="1.8">
    <path d="M230 50C229 40 231 28 235 20"/>
    <path d="M242 50C245 42 248 34 250 28"/>
  </g>
  <g fill="${NOEUD}" stroke="${NOEUD_T}" stroke-width="2.4">
    <path d="M232 38C224 28 212 24 208 30C204 38 208 50 216 54C224 57 231 50 232 44Z"/>
    <path d="M240 38C248 28 260 24 264 30C268 38 264 50 256 54C248 57 241 50 240 44Z"/>
    <ellipse cx="236" cy="41" rx="7" ry="9"/>
  </g>

  </g>
</svg>`;
};
