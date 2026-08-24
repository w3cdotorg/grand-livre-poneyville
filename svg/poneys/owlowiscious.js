// ───────────────────────────────────────────────────────────────────────────────
// OWLOWISCIOUS — le hibou de Twilight Sparkle. PERCHÉ sur une branche, de face,
// gros yeux ronds jaunes, disques de face crème, aigrettes, bec doré, aile
// repliée sur le côté et serres qui agrippent la branche.
//
// RÉFÉRENCES PLEIN PIED (API MediaWiki, dans `refs/`) :
//   · `refs/z-owl-jour.png` — recadrage ×4 de File:Tank S2E7.png (1280 × 720)
//     https://mlp.fandom.com/wiki/File:Tank_S2E7.png
//     Owlowiscious perché EN PLEIN JOUR, entier et bien éclairé : LA référence.
//     C'est elle qui donne les vraies couleurs (le plan d'infobox est nocturne).
//   · `refs/v4-owl-pp.png` — File:Owlowiscious id S3E11.png (254 × 302)
//     https://mlp.fandom.com/wiki/File:Owlowiscious_id_S3E11.png
//     plan d'infobox, yeux mi-clos : utile pour les cils et les aigrettes.
//
// RELEVÉ MÉTRIQUE (silhouette 97 × 115 px sans la queue, tête 57 px de haut) :
//   | tête / silhouette entière | 0,33 (queue et serres comprises)        |
//   | œil (iris jaune)          | 0,29 de la largeur de tête, ROND        |
//   | disque de face            | ~2 fois l'iris, crème, les deux se recouvrent |
//   | bec                       | losange, 0,12 × 0,18 de la tête         |
//   | aile repliée              | 0,26 de large, du haut du dos à mi-corps |
//
// TROIS RELEVÉS QUI COMPTENT :
//   1. **LA TÊTE ET LE CORPS SONT UNE SEULE MASSE.** Un hibou n'a pas de cou
//      visible : dessiner une tête ronde POSÉE sur un corps ovale donne un
//      bonhomme de neige. C'est une seule silhouette en forme de goutte, dont
//      les « épaules » sont juste un léger étranglement.
//   2. **LE VENTRE CRÈME REMONTE JUSQU'ENTRE LES YEUX** et fusionne avec les
//      deux disques de face : le brun ne couvre que la calotte, le dos, l'aile
//      et la queue. Peint en simple plastron, le hibou devient un moineau.
//   3. **LES DEUX DISQUES DE FACE SE RECOUVRENT AU MILIEU**, et le bec est posé
//      pile sur leur intersection. C'est ce chevauchement qui donne la tête en
//      8 caractéristique du hibou de dessin animé.
//
// Les cils (trois par œil, au coin haut-externe) sont sur les deux références :
// c'est la convention du livre depuis la vague 2, ici elle tombe juste.
//
// Pas de marque de beauté (`cutieMark: null`) ; `class="paupieres"` obligatoire.
// ───────────────────────────────────────────────────────────────────────────────
import { ton, derivesAnimal } from "./_commun.js";

// ── SILHOUETTE : tête + corps en UNE SEULE masse en goutte (cf. en-tête).
//    x 174 → 292, y 16 → 246.
const CORPS = "M186 72"
  + "C186 38 210 16 240 16"
  + "C272 16 292 38 292 72"
  + "C292 96 290 120 288 146"
  + "C286 176 280 208 268 226"
  + "C256 242 236 250 218 246"
  + "C198 242 184 226 178 202"
  + "C172 176 176 146 180 116"
  + "C183 96 185 82 186 72Z";
// ── AIGRETTES : deux touffes pointues sur la calotte. Elles sont COURTES et
//    ÉCARTÉES ; longues et droites, ce sont des oreilles de lapin, et rapprochées
//    elles font une couronne.
const AIGRETTE_G = "M204 44C200 32 198 20 200 12C206 16 214 28 220 40C216 46 208 48 204 44Z";
const AIGRETTE_D = "M262 40C266 28 272 16 278 12C280 20 278 32 274 44C270 48 264 46 262 40Z";
// ── VENTRE CRÈME : il remonte JUSQU'ENTRE LES YEUX et se fond dans les deux
//    disques de face (cf. en-tête, relevé n° 2).
const VENTRE = "M240 44"
  + "C264 44 280 60 280 82"
  + "C280 108 278 136 274 164"
  + "C270 192 262 214 250 226"
  + "C238 236 222 234 212 222"
  + "C200 206 194 180 192 152"
  + "C190 122 190 90 196 68"
  + "C202 52 220 44 240 44Z";
// ── AILE repliée sur le flanc droit, en brun SOMBRE. C'est la seule masse
//    franchement contrastée du personnage : sans elle, il est uni.
const AILE = "M258 108"
  + "C274 104 288 114 290 132"
  + "C292 158 286 190 274 206"
  + "C264 216 252 210 250 194"
  + "C248 166 250 128 258 108Z";
// ── QUEUE : un éventail de trois rectrices sous le corps.
const QUEUE = "M204 232C198 250 196 272 200 288"
  + "C214 292 240 292 256 286"
  + "C258 268 254 246 246 230"
  + "C232 236 216 236 204 232Z";
// ── BRANCHE : elle traverse tout le bas du cadre. Sans branche, les serres
//    agrippent le vide et le hibou a l'air de tomber.
const BRANCHE = "M20 236C70 230 150 228 220 232C258 234 288 238 300 242"
  + "L300 258C288 254 258 250 220 248C150 244 70 246 20 252Z";

export default (c) => {
  const d = derivesAnimal(c);
  const { TRAIT } = d;
  const CREME = c.ventre ?? ton(c.robe, .5, .38);   // gardé : la clé est optionnelle
  const CREME_T = ton(CREME, .7, -.22);
  const AILE_C = ton(c.robe, 1.05, -.15);           // aile et queue, brun sombre
  const AILE_T = ton(c.robe, 1.05, -.26);
  const OR = ton(c.yeux, 1.2, -.10);                // bec et serres (relevé #dfc438)
  const OR_T = ton(c.yeux, 1.2, -.28);
  const BOIS = ton(c.robe, .8, -.12);               // la branche
  const PUPILLE = "#241c14";                        // constante documentée
  const CILS = "#1a140e";                           // idem — les cils sont noirs
  // L'ŒIL : disque crème (le disque de face) → iris JAUNE → grosse pupille noire
  // → deux reflets. Repère local, iris de rayon 15.
  const oeil = (t, e) => `<g transform="${t}">
    <circle r="15" fill="${c.yeux}" stroke="${ton(c.yeux, 1.1, -.30)}" stroke-width="2"/>
    <circle r="8.6" fill="${PUPILLE}"/>
    <circle cx="-4" cy="-4.6" r="3.2" fill="#fff"/>
    <circle cx="4.4" cy="4" r="1.7" fill="#fff"/>
    <g fill="none" stroke="${CILS}" stroke-width="2.1" stroke-linecap="round"
       transform="scale(${e} 1)">
      <path d="M-11 -11C-14 -14 -17 -16 -19 -17"/>
      <path d="M-6 -14.5C-8 -18 -9 -21 -10 -23"/>
      <path d="M0 -15.6C0 -19 1 -22 2 -24"/>
    </g>
  </g>`;
  const OEIL_P = "translate(218 62)";
  const OEIL_L = "translate(266 58) scale(.86)";

  return `<svg viewBox="0 0 300 300" xmlns="http://www.w3.org/2000/svg" role="img">
  <g stroke-linejoin="round" stroke-linecap="round">

  <!-- 1. QUEUE en éventail, derrière tout -->
  <path d="${QUEUE}" fill="${AILE_C}" stroke="${AILE_T}" stroke-width="3"/>
  <g fill="none" stroke="${AILE_T}" stroke-width="2">
    <path d="M218 236C214 254 213 272 215 288"/>
    <path d="M236 238C236 256 237 272 239 288"/>
  </g>

  <!-- 2. AIGRETTES, avant le corps : c'est le contour du corps qui creuse leur
       attache (la règle de l'oreille des poneys). -->
  <g fill="${c.robe}" stroke="${TRAIT}" stroke-width="2.8">
    <path d="${AIGRETTE_G}"/><path d="${AIGRETTE_D}"/>
  </g>

  <!-- 3. SILHOUETTE en goutte : tête et corps d'un seul tenant -->
  <path d="${CORPS}" fill="${c.robe}" stroke="${TRAIT}" stroke-width="3.4"/>

  <!-- 4. VENTRE CRÈME, qui remonte jusqu'entre les yeux, puis les DEUX DISQUES
       DE FACE qui s'y fondent et se recouvrent au milieu. -->
  <path d="${VENTRE}" fill="${CREME}" stroke="${CREME_T}" stroke-width="2.4"/>
  <g fill="${CREME}" stroke="${CREME_T}" stroke-width="2.4">
    <circle cx="218" cy="62" r="30"/>
    <circle cx="266" cy="58" r="27"/>
  </g>
  <!-- les chevrons de plumage du ventre : sans eux, un aplat crème de 130 unités -->
  <g fill="none" stroke="${CREME_T}" stroke-width="2">
    <path d="M204 116C210 122 218 122 224 116"/>
    <path d="M232 122C238 128 246 128 252 122"/>
    <path d="M202 142C208 148 216 148 222 142"/>
    <path d="M230 150C236 156 244 156 250 150"/>
    <path d="M204 172C210 178 218 178 224 172"/>
    <path d="M232 180C238 186 246 186 252 180"/>
    <path d="M210 202C216 208 224 208 230 202"/>
  </g>

  <!-- 5. AILE repliée, brun sombre, avec ses trois rémiges -->
  <path d="${AILE}" fill="${AILE_C}" stroke="${AILE_T}" stroke-width="2.8"/>
  <g fill="none" stroke="${ton(c.robe, 1, -.05)}" stroke-width="2">
    <path d="M266 122C276 128 282 140 283 154"/>
    <path d="M264 146C274 152 280 164 281 178"/>
    <path d="M262 170C270 176 275 186 276 198"/>
  </g>

  <!-- 6. BEC en losange, posé PILE sur l'intersection des deux disques -->
  <path d="M243 64L253 78 243 94 233 78Z" fill="${OR}" stroke="${OR_T}"
        stroke-width="2"/>
  <path d="M243 78L243 92" fill="none" stroke="${OR_T}" stroke-width="1.6"/>

  <!-- 7. BRANCHE puis SERRES. Les doigts sont dessinés APRÈS la branche : ce
       sont eux qui doivent passer par-dessus, sinon le hibou est derrière son
       perchoir au lieu d'être posé dessus. -->
  <path d="${BRANCHE}" fill="${BOIS}" stroke="${ton(BOIS, 1, -.16)}" stroke-width="2.6"/>
  <g fill="${OR}" stroke="${OR_T}" stroke-width="2">
    ${[204, 218, 232, 246].map((x) =>
      `<path d="M${x} 226C${x - 5} 234 ${x - 5} 244 ${x} 250C${x + 6} 246 ${x + 6} 232 ${x + 3} 226Z"/>`
    ).join('')}
  </g>

  <!-- 8. LES DEUX GRANDS YEUX RONDS -->
  ${oeil(OEIL_L, -1)}${oeil(OEIL_P, 1)}

  <!-- 9. PAUPIÈRES du clignement : les deux iris agrandis de 7 %, dans les
       repères EXACTS des yeux. De la couleur du DISQUE DE FACE (crème) et non de
       la robe : c'est le crème qui entoure l'œil, un clignement brun ferait deux
       trous dans le visage. -->
  <g class="paupieres">
    <circle cx="218" cy="62" r="16.1" fill="${CREME}"/>
    <circle cx="266" cy="58" r="13.8" fill="${CREME}"/>
  </g>

  </g>
</svg>`;
};
