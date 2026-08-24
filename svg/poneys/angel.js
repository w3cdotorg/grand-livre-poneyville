// ───────────────────────────────────────────────────────────────────────────────
// ANGEL — le lapin blanc de Fluttershy. Lapin ASSIS, tête aux trois quarts vers
// la droite (la pose du livre), air déterminé et un peu exigeant.
//
// RÉFÉRENCES PLEIN PIED (API MediaWiki, dans `refs/`) :
//   · `refs/v4-angel-pp.png` — File:Angel ID S3E10.png (302 × 368)
//     https://mlp.fandom.com/wiki/File:Angel_ID_S3E10.png
//     assis, oreilles dressées, sourcils baissés : LA référence.
//   · `refs/v4-angel-2.png`  — File:Angel ID S4E03.png (328 × 412)
//
// RELEVÉ MÉTRIQUE de la référence (scan par ligne, blanc du pelage et noir des
// yeux) — silhouette x 74 → 286, y 16 → 351 ; tête x 75 → 235, y 145 → 265.
// La référence a la tête tournée à GAUCHE : toutes les fractions en x sont donc
// MIROIR de celles ci-dessous, qui sont déjà retournées pour notre pose.
//   | mesure                        | fraction de la tête (160 × 120 px)     |
//   | œil proche                    | 0,19 large × 0,25 haut, centre (,53 ; ,54) |
//   | œil lointain                  | 0,11 × 0,20, centre (,84 ; ,36)        |
//   | nez rose                      | 0,14 × 0,15, centre (,74 ; ,46)        |
//   | oreille (longueur)            | 1,13 hauteur de tête                   |
//   | corps assis                   | 1,23 large × 0,84 haut                 |
//   | tête / hauteur totale          | 0,36                                   |
//
// TROIS RELEVÉS QUI CONTREDISAIENT L'INTUITION, et les trois comptent :
//   1. **L'œil d'Angel est PLUS HAUT QUE LARGE** (30 × 29 px pour le proche,
//      18 × 24 pour le lointain, contre 39 × 33 pour l'amande de poney). Un
//      `scale` uniforme donne un œil trop couché ; d'où les `scale(x y)`
//      dissociés plus bas.
//   2. **Le NEZ est plus haut que le centre de l'œil proche et il TOUCHE l'œil
//      lointain** (chevauchement de 5 × 10 px sur la référence). Angel a le
//      menton rentré et regarde vers le haut : c'est de là que vient son air
//      exigeant, pas des sourcils seuls. Les yeux sont donc dessinés APRÈS le
//      nez, pour que le coin d'amande recouvre le rose.
//   3. **Son œil n'est pas un œil de poney** : amande NOIRE PLEINE à reflet
//      blanc (relevé #030303), sans blanc d'œil ni iris. `oeil()` de
//      `_commun.js` ne s'applique pas ; `data.js` porte le noir dans `yeux`.
//
// DEUX ÉCARTS ASSUMÉS, même cause — la fenêtre de portrait `171 6 124 124` :
//   1. LES OREILLES SONT RACCOURCIES à 0,55 hauteur de tête au lieu de 1,13.
//      À l'échelle exacte, avec une tête qui remplit la fenêtre, leur pointe
//      tombe à y −70 : hors du viewBox, donc purement invisible. Même inclinées
//      à 30°, elles n'y rentrent pas. Le raccourci n'est pas un choix, c'est la
//      seule solution ; elles restent ÉTROITES, ce qui suffit à les lire.
//   2. LE CORPS est agrandi à 1,0 hauteur de tête au lieu de 0,84. Un lapin est
//      compact : à proportions exactes la silhouette entière ne fait que
//      1,4 bloc de tête, et le dessin flotterait dans le tiers haut de sa fiche
//      (même tension que le gabarit de pouliche, NOTES.md § vague 2).
//
// Pas de marque de beauté (`cutieMark: null` dans `data.js`) : ce module n'en
// exporte pas. Le groupe `class="paupieres"` reste obligatoire.
// ───────────────────────────────────────────────────────────────────────────────
import { ton, derivesAnimal, AMANDE } from "./_commun.js";

// ── TÊTE : masse ronde, un peu plus large que haute, museau à droite et arrière
//    de crâne renflé à gauche. x 178 → 284, y 32 → 128 (106 × 96).
//    TROISIÈME TOUR : la tête est POSÉE SUR LE CORPS, pas à côté. Relevé sur la
//    référence, les deux centres ne sont décalés que de 12 px, soit 8 unités
//    ici ; aux deux premiers tours le décalage valait 57 et le dessin se lisait
//    comme une boule blanche à côté d'une pomme de terre couchée. C'est la
//    contrepartie assumée : Angel occupe les deux tiers DROITS du viewBox, ce
//    qui est exactement la composition de la référence (un lapin assis est un
//    animal VERTICAL, pas un quadrupède allongé comme les poneys).
const TETE = "M182 62"
  + "C186 44 204 32 230 32"
  + "C256 32 276 44 282 66"
  + "C286 86 280 108 264 120"
  + "C248 130 222 130 204 121"
  + "C186 112 178 84 182 62Z";

// ── OREILLES : deux feuilles longues et ÉTROITES (18 unités de large pour 55 de
//    long). Leurs pointes sont calées à y 11 et 12 : la fenêtre de portrait
//    commence à y 6 et le contour fait 3 unités, donc sous y 10 la pointe est
//    rognée.
const OREILLE_PROCHE = "M196 58"
  + "C188 44 181 26 181 14"
  + "C183 9 190 9 195 15"
  + "C204 28 212 44 215 58"
  + "C210 62 201 62 196 58Z";
const OREILLE_LOIN = "M240 46"
  + "C240 30 244 17 250 11"
  + "C255 8 261 10 263 18"
  + "C264 31 261 44 257 54"
  + "C251 55 243 52 240 46Z";
// Le pli interne de chaque oreille : UNE ligne, pas un second tracé fermé — un
// tracé fermé à l'intérieur se lit comme une doublure cousue (même piège que le
// rouleau de frange de Cheerilee, NOTES.md § vague 3).
const PLIS_OREILLES = ["M197 52C192 40 188 29 187 20", "M245 44C244 33 247 23 251 18"];

// ── CORPS ASSIS. Il n'est PAS une masse ronde unique : la référence donne un
//    poitrail étroit sous la tête, une grosse croupe à gauche et un arrière-train
//    posé à plat.
//    ── DEUX TOURS PERDUS SUR SA TAILLE, et la cause est un relevé qu'on ne
//    croit pas en le lisant : SUR LA RÉFÉRENCE, LA TÊTE EST PLUS GROSSE QUE LE
//    CORPS (160 × 120 px contre 137 × 101). Un corps de la taille de la tête,
//    même bien découpé, donne un MOUTON à petite tête — et aucun retravail de
//    la silhouette ne le rattrape. Le corps est donc borné : plus étroit que la
//    tête (126 contre 108… en largeur il la dépasse un peu, comme la référence)
//    et surtout MOINS HAUT qu'elle (98 contre 96, à égalité).
const CORPS = "M276 124"
  + "C282 148 278 176 266 196"          // poitrail, descendant sous la tête
  + "C254 212 238 220 220 222"
  + "C200 224 180 218 168 206"
  + "C156 194 152 174 156 156"          // croupe, en bas à GAUCHE
  + "C160 138 172 126 188 122"
  + "C210 118 236 116 256 116"
  + "C268 118 274 120 276 124Z";
// Grande PATTE ARRIÈRE posée à plat : c'est elle, et pas la forme du corps, qui
// fait lire « assis » plutôt que « debout de face ».
const PATTE_AR = "M168 198"
  + "C156 206 155 222 170 228"
  + "C190 235 216 230 223 219"
  + "C228 211 223 200 212 197Z";
// Deux PETITES PATTES AVANT jointes sous le poitrail, comme sur la référence.
const PATTE_AV_1 = "M232 198C223 203 221 213 228 218C235 223 245 222 248 215C251 208 246 199 239 197Z";
const PATTE_AV_2 = "M256 192C248 197 246 207 253 212C260 217 270 216 273 209C276 202 271 193 264 191Z";
// QUEUE : un pompon à trois lobes. Un disque simple se lit comme une balle posée
// contre le lapin.
const QUEUE = "M152 152"
  + "C140 148 128 154 126 164"
  + "C124 175 131 185 142 186"
  + "C154 187 163 180 163 169"
  + "C163 160 159 154 152 152Z";

export default (c) => {
  const d = derivesAnimal(c);
  // CONTOUR. Le `TRAIT` du gabarit (`ton(robe, .64, -.21)`) donne exactement le
  // vert-gris pâle relevé sur la référence (#c0d8d8), mais sur une silhouette
  // aussi grande et aussi blanche il disparaît à la taille de la vignette. On
  // descend de 5 points de plus : c'est la même exception que la robe presque
  // blanche de Zecora (NOTES.md § contours dérivés).
  const TRAIT = ton(c.robe, .85, -.26);
  const NOIR = c.yeux;             // l'œil est un aplat noir, cf. en-tête
  const ROSE = "#d471bc";          // constante documentée : le nez (relevé #d471bc)
  const FOURRURE = ton(c.robe, .8, -.075);   // creux de poil, à peine plus sombre
  // L'œil : amande noire pleine, reflet en goutte au coin haut-arrière et petit
  // point à l'avant. Ce sont eux qui empêchent l'aplat noir de se lire comme un
  // trou — les deux sont sur la référence.
  const oeil = (t, point) => `<g transform="${t}">
    <path d="${AMANDE}" fill="${NOIR}"/>
    <ellipse cx="-5.5" cy="-6.6" rx="4.8" ry="7.2" fill="#fff"
             transform="rotate(-16 -5.5 -6.6)"/>
    ${point ? '<circle cx="7" cy="3.4" r="2.4" fill="#fff"/>' : ''}
  </g>`;
  // Placements, reportés du relevé de l'en-tête sur la tête x 186 → 294 /
  // y 32 → 128. Les `scale` sont DISSOCIÉS : l'œil d'Angel est plus haut que
  // large, l'amande de poney plus large que haute.
  const OEIL_P = "translate(228 84) scale(.66 .84)";
  const OEIL_L = "translate(265 62) scale(-.34 .62)";

  return `<svg viewBox="0 0 300 300" xmlns="http://www.w3.org/2000/svg" role="img">
  <g stroke-linejoin="round" stroke-linecap="round">

  <!-- 1. QUEUE en pompon, derrière tout -->
  <path d="${QUEUE}" fill="${c.robe}" stroke="${TRAIT}" stroke-width="3"/>

  <!-- 2. MOUSTACHES DE LA JOUE LOINTAINE : elles sortent DERRIÈRE la tête, à
       gauche, comme sur la référence (où le groupe opposé sort de l'autre côté
       du crâne). Posées après la tête elles se liraient comme des griffures. -->
  <g fill="none" stroke="${TRAIT}" stroke-width="2" stroke-opacity=".8">
    <path d="M196 70C184 66 170 64 158 65"/>
    <path d="M194 78C182 78 168 80 156 84"/>
  </g>

  <!-- 3. CORPS ASSIS, grande patte arrière, deux pattes avant -->
  <path d="${CORPS}" fill="${c.robe}" stroke="${TRAIT}" stroke-width="3.4"/>
  <path d="${PATTE_AR}" fill="${c.robe}" stroke="${TRAIT}" stroke-width="3"/>
  <!-- ligne de cuisse : un seul trait interne, pas un tracé fermé -->
  <path d="M176 210C187 201 198 196 210 194" fill="none" stroke="${TRAIT}"
        stroke-width="2.2"/>
  <path d="${PATTE_AV_1}" fill="${c.robe}" stroke="${TRAIT}" stroke-width="2.8"/>
  <path d="${PATTE_AV_2}" fill="${c.robe}" stroke="${TRAIT}" stroke-width="2.8"/>
  <g fill="none" stroke="${TRAIT}" stroke-width="1.6">
    <path d="M231 214C236 212 241 211 244 211"/>
    <path d="M255 208C260 206 265 205 269 205"/>
  </g>
  <!-- poitrail : deux creux de poil, pour que le corps ne soit pas un aplat -->
  <g fill="none" stroke="${FOURRURE}" stroke-width="2.4">
    <path d="M262 138C253 150 246 164 244 178"/>
    <path d="M190 140C181 151 176 165 178 179"/>
  </g>

  <!-- 4. OREILLES, AVANT la tête : c'est le contour de la tête, tracé ensuite,
       qui creuse leur attache (la règle de l'oreille des poneys). -->
  <path d="${OREILLE_LOIN}" fill="${c.robe}" stroke="${TRAIT}" stroke-width="3"/>
  <path d="${OREILLE_PROCHE}" fill="${c.robe}" stroke="${TRAIT}" stroke-width="3"/>

  <!-- 5. TÊTE -->
  <path d="${TETE}" fill="${c.robe}" stroke="${TRAIT}" stroke-width="3.4"/>
  <g fill="none" stroke="${TRAIT}" stroke-width="2">
    ${PLIS_OREILLES.map(p => `<path d="${p}"/>`).join('')}
  </g>

  <!-- 6. NEZ rose en demi-disque + bouche TOMBANTE, sous le nez. Le trait
       vertical du philtrum relie les deux : sans lui le nez flotte sur la joue.
       Dessinés AVANT les yeux — le nez touche l'œil lointain sur la référence,
       et c'est le coin d'amande qui doit recouvrir le rose. -->
  <path d="M241 90C244 88 251 88 254 91C254 96 249 100 247 100C244 100 240 95 241 90Z"
        fill="${ROSE}" stroke="${ton(ROSE, 1, -.16)}" stroke-width="1.6"/>
  <g fill="none" stroke="${TRAIT}" stroke-width="2.8">
    <path d="M247 100C247 104 247 106 247 109"/>
    <path d="M247 109C244 114 239 115 236 113"/>
    <path d="M247 109C250 114 255 115 258 113"/>
  </g>

  <!-- 7. MOUSTACHES DE LA JOUE PROCHE : trois brins qui partent du museau et
       balaient vers le bas-avant. Elles restent dans le viewBox (la référence
       les envoie hors cadre, ce qu'on ne peut pas se permettre ici). -->
  <g fill="none" stroke="${TRAIT}" stroke-width="2" stroke-opacity=".85">
    <path d="M238 104C228 106 218 110 210 116"/>
    <path d="M240 108C232 113 224 120 218 128"/>
  </g>

  <!-- 8. YEUX : amandes noires pleines, reflet blanc en goutte -->
  ${oeil(OEIL_P, true)}${oeil(OEIL_L, false)}

  <!-- 9. PAUPIÈRES du clignement : les deux amandes agrandies de 7 %, dans
       EXACTEMENT les repères des yeux (facteur par facteur, scale dissocié
       compris). Blanches comme la robe : sur un lapin blanc, c'est la
       disparition du noir qui fait le clignement. -->
  <g class="paupieres">
    <path d="${AMANDE}" transform="translate(228 84) scale(.706 .899)" fill="${c.robe}"/>
    <path d="${AMANDE}" transform="translate(265 62) scale(-.364 .663)" fill="${c.robe}"/>
  </g>

  <!-- 10. SOURCILS : deux arcs COURTS qui descendent vers le nez — c'est là que
       se joue l'air déterminé d'Angel, et la référence les montre sur les deux
       yeux. Ils sont en TRAIT et non en noir : sombres au-dessus de l'œil
       lointain, ils donneraient l'air FÂCHÉ (piège documenté dans NOTES.md). -->
  <g fill="none" stroke="${TRAIT}" stroke-width="3.4">
    <path d="M214 70C222 66 234 68 242 74"/>
    <path d="M256 47C260 44 266 44 271 48"/>
  </g>

  </g>
</svg>`;
};
