// ───────────────────────────────────────────────────────────────────────────────
// WINONA — la chienne de berger d'Applejack. Colley ASSIS, tête aux trois quarts
// vers la droite, langue sortie, air franchement joyeux.
//
// RÉFÉRENCES PLEIN PIED (API MediaWiki, dans `refs/`) :
//   · `refs/v4-winona-pp.png` — File:Winona id S3E11.png (385 × 403)
//     https://mlp.fandom.com/wiki/File:Winona_id_S3E11.png
//     ASSISE, TÊTE À DROITE : la pose du gabarit, exactement. LA référence.
//   · `refs/z-winona-assise.png` — recadrage de
//     File:Gummy, Winona, and Opalescence appear S6E22.png (1280 × 720)
//     https://mlp.fandom.com/wiki/File:Gummy,_Winona,_and_Opalescence_appear_S6E22.png
//     même pose en miroir, utile pour les oreilles et le collier.
//
// RELEVÉ MÉTRIQUE (scan des aplats ; le fond de grange de la référence est brun
// lui aussi, seuls le NOIR des yeux et le ROSE de la langue se scannent
// proprement — le reste est relevé à la grille). Tête x 190 → 375, y 20 → 160,
// soit 185 × 140 ; museau pointant à droite, truffe en (375, 100).
//   | mesure                | valeur                    | fraction de la tête  |
//   | œil proche            | 37 × 34 px                | 0,20 × 0,24, centre (,44 ; ,50) |
//   | œil lointain          | 27 × 38 px                | 0,15 × 0,27, centre (,66 ; ,34) |
//   | museau blanc          | x 307 → 375               | 0,63 → 1,0 en x      |
//   | corps assis           | 170 × 190 px              | 1,21 × 1,36          |
//   | queue                 | 120 px de large           | 0,65                 |
//   | tête / hauteur totale  | 140 / 380                 | 0,37                 |
//
// TROIS RELEVÉS QUI COMPTENT :
//   1. **L'ŒIL DE WINONA EST NOIR**, comme celui d'Angel : une amande sombre
//      pleine avec un GROS reflet blanc ROND (et non la goutte des poneys), plus
//      trois cils au coin haut-arrière. Pas de blanc d'œil, pas d'iris coloré —
//      `oeil()` de `_commun.js` ne s'applique donc pas. `data.js` porte ce noir
//      chaud dans `yeux` ; c'était un brun moyen (#6b4a2b), qui donnait un œil
//      délavé.
//   2. **Le contour est le MÊME brun sombre sur le brun et sur le blanc.** Un
//      contour dérivé du blanc (gris pâle) découpe la bavette et les pattes du
//      reste de la chienne : sur les deux références, une seule ligne cerne
//      toute la silhouette.
//   3. **Les mouchetures du museau sont plus SOMBRES que le blanc** (quatre
//      petits tirets, pas des points) : ce sont les racines des moustaches.
//
// Le rapport tête / hauteur totale de 0,37 tombe juste : avec une tête de
// 102 unités dans la fenêtre de portrait, la silhouette entière fait 275 unités
// et remplit le viewBox. Winona est le seul des six animaux pour lequel les
// deux contraintes (tête dans la fenêtre, corps dans le viewBox) sont
// compatibles sans écart.
//
// Pas de marque de beauté (`cutieMark: null`) ; `class="paupieres"` obligatoire.
// ───────────────────────────────────────────────────────────────────────────────
import { ton, derivesAnimal, AMANDE, cilsHauts } from "./_commun.js";

// ── TÊTE : crâne rond à gauche, museau long et pointu à droite. x 186 → 292,
//    y 20 → 130 (116 × 110). La truffe est en (288, 82) — à 0,57 de la hauteur,
//    comme sur la référence.
const TETE = "M186 64"
  + "C190 40 210 20 238 21"                 // crâne, sommet à y 20
  + "C256 22 268 32 272 46"                 // DÉCROCHEMENT : fin du crâne
  + "C280 56 288 68 292 78"                 // dessus du museau, en coin
  + "C294 84 291 90 285 92"                 // truffe
  + "C275 96 262 98 252 100"                // dessous du museau
  + "C244 110 234 118 224 122"              // mâchoire / menton
  + "C210 127 196 124 190 114"              // joue
  + "C183 102 182 80 186 64Z";
// ── OREILLES : deux oreilles pointues brunes, la proche RABATTUE vers
//    l'arrière-gauche (le pli du colley), la lointaine dressée vers l'arrière.
//    Dressées toutes les deux, elles font des oreilles de berger allemand ;
//    rabattues toutes les deux, un épagneul. Il faut les deux lectures.
const OREILLE_PROCHE = "M198 54"
  + "C186 42 176 28 176 16"
  + "C178 11 187 11 194 18"
  + "C208 28 224 37 232 47"
  + "C228 57 210 60 198 54Z";
const OREILLE_LOIN = "M232 32"
  + "C236 20 244 12 252 11"
  + "C259 10 263 16 262 24"
  + "C260 35 255 45 251 51"
  + "C243 50 233 41 232 32Z";

// ── MUSEAU BLANC : la flamme qui monte entre les yeux, plus le dessous de la
//    mâchoire. Relevé : elle occupe le tiers avant de la tête (x 0,63 → 1,0).
const MUSEAU = "M270 64"
  + "C280 68 288 76 292 84"
  + "C294 89 291 94 285 96"
  + "C276 100 264 102 256 102"
  + "C252 102 250 101 249 100"
  + "C250 92 253 82 257 74"
  + "C261 67 265 62 270 64Z";

// ── CORPS ASSIS. Poitrail haut sous la tête, croupe posée à gauche, deux pattes
//    avant tendues. Bord haut à y 118, donc sous la tête (dessinée avant lui —
//    ici l'ordre est inverse de celui d'Angel, la tête d'un chien assis est
//    DEVANT le poitrail).
const CORPS = "M258 124"
  + "C268 148 270 178 266 206"              // poitrail et avant-bras
  + "C264 228 258 250 250 264"
  + "C236 270 218 270 206 264"
  + "C196 256 192 242 192 228"
  + "C182 242 168 252 152 256"
  + "C138 258 128 252 126 240"
  + "C124 218 130 192 142 172"              // croupe
  + "C154 150 174 132 196 124"
  + "C216 118 240 116 258 124Z";
// BAVETTE blanche : elle descend de la gorge au poitrail. Sans elle, Winona est
// une chienne unie et le collier flotte sur du brun.
const BAVETTE = "M238 116"
  + "C248 130 256 152 258 176"
  + "C260 198 258 224 252 244"
  + "C242 250 228 250 218 244"
  + "C212 228 212 206 216 184"
  + "C220 158 228 130 238 116Z";
// PATTES AVANT blanches, deux colonnes, celle du fond décalée. Les pieds sont
// PLUS LARGES que la patte : sans ça, deux fûts de botte (piège de Spike).
const PATTE_AV_FOND = "M204 212C200 230 200 248 204 260C212 266 222 266 228 260"
  + "C230 246 230 228 226 212C220 206 210 206 204 212Z";
const PATTE_AV = "M232 216C228 234 228 252 232 264C240 270 252 270 258 264"
  + "C260 250 260 232 256 216C250 210 238 210 232 216Z";
// PATTE ARRIÈRE : la cuisse posée à plat, le pied blanc devant.
const PIED_AR = "M148 242C138 246 136 256 144 260C156 264 172 262 178 256"
  + "C181 251 178 244 170 242Z";
// QUEUE : panache large, à bout BLANC, balayant vers le bas-gauche. Une queue de
// largeur constante se lit comme une feuille (NOTES.md § vague 3) : celle-ci
// part large à la croupe et s'affine, puis s'évase en pointe blanche.
const QUEUE = "M144 190"
  + "C126 188 106 196 90 210"
  + "C74 224 64 242 66 254"
  + "C76 262 94 258 110 248"
  + "C126 238 140 222 148 208"
  + "C152 199 150 191 144 190Z";
const QUEUE_BOUT = "M100 220C86 228 72 242 66 254"
  + "C74 261 90 257 104 246C114 238 120 229 119 222C114 216 106 216 100 220Z";

export default (c) => {
  const d = derivesAnimal(c);
  const { TRAIT } = d;
  const BLANC = c.blanc ?? "#fbf8f2";       // gardé : la clé est optionnelle
  const NOIR = c.yeux;                      // l'œil est un aplat noir, cf. en-tête
  const POIL = ton(c.robe, .9, -.10);       // séparations de poil dans le brun
  const TRUFFE = ton(c.robe, .7, -.28);     // truffe, plus sombre que le contour
  const MOUCHE = ton(BLANC, .5, -.20);      // racines de moustaches sur le museau
  // CONSTANTES DOCUMENTÉES — aucune ne dérive d'une entrée de `c` :
  const COLLIER = "#ae1526";                // collier rouge (relevé #ae1526)
  const GRELOT = "#e0b74a";                 // grelot doré (relevé #c7ae67, remonté)
  const LANGUE = "#f371b8";                 // langue rose vif (relevé #f371b8)
  const GUEULE = "#7d2233";                 // intérieur de gueule sombre
  // L'œil : amande noire pleine + un GROS reflet ROND (relevé) au coin
  // haut-arrière. Le reflet en goutte des poneys donne un œil de poney.
  const oeil = (t) => `<g transform="${t}">
    <path d="${AMANDE}" fill="${NOIR}"/>
    <circle cx="-4.5" cy="-4.5" r="6.4" fill="#fff"/>
    <circle cx="6" cy="4" r="2.4" fill="#fff"/>
  </g>`;
  // Placements relevés (cf. tableau de l'en-tête) reportés sur la tête
  // x 186 → 292 / y 26 → 128. Les deux amandes sont MOINS LARGES que celle d'un
  // poney (0,24 de la largeur de tête contre 0,39) : c'est le museau long qui
  // prend la place, et un œil de poney sur cette tête donne un chien hébété.
  const OEIL_P = "translate(230 76) scale(.69 .90)";
  const OEIL_L = "translate(256 58) scale(-.52 .84)";

  return `<svg viewBox="0 0 300 300" xmlns="http://www.w3.org/2000/svg" role="img">
  <g stroke-linejoin="round" stroke-linecap="round">

  <!-- 1. QUEUE en panache, derrière tout, bout blanc -->
  <path d="${QUEUE}" fill="${c.robe}" stroke="${TRAIT}" stroke-width="3.2"/>
  <path d="${QUEUE_BOUT}" fill="${BLANC}" stroke="${TRAIT}" stroke-width="2.6"/>
  <g fill="none" stroke="${POIL}" stroke-width="2">
    <path d="M136 196C122 202 108 212 98 224"/>
    <path d="M140 204C128 212 116 224 108 236"/>
  </g>

  <!-- 2. CORPS ASSIS, puis la bavette blanche, les pattes et le pied arrière -->
  <path d="${CORPS}" fill="${c.robe}" stroke="${TRAIT}" stroke-width="3.4"/>
  <path d="${PIED_AR}" fill="${BLANC}" stroke="${TRAIT}" stroke-width="2.8"/>
  <!-- ligne de cuisse : un seul trait interne -->
  <path d="M148 228C162 218 176 210 190 206" fill="none" stroke="${POIL}"
        stroke-width="2.4"/>
  <path d="${BAVETTE}" fill="${BLANC}" stroke="${TRAIT}" stroke-width="2.8"/>
  <path d="${PATTE_AV_FOND}" fill="${ton(BLANC, .4, -.09)}" stroke="${TRAIT}" stroke-width="2.8"/>
  <path d="${PATTE_AV}" fill="${BLANC}" stroke="${TRAIT}" stroke-width="2.8"/>
  <g fill="none" stroke="${TRAIT}" stroke-width="1.8">
    <path d="M238 262C242 258 246 256 250 256"/>
    <path d="M210 258C214 254 218 252 222 252"/>
    <path d="M154 254C158 250 162 248 166 248"/>
  </g>

  <!-- 3. OREILLES, AVANT la tête -->
  <path d="${OREILLE_LOIN}" fill="${ton(c.robe, .95, -.06)}" stroke="${TRAIT}" stroke-width="2.8"/>
  <path d="${OREILLE_PROCHE}" fill="${c.robe}" stroke="${TRAIT}" stroke-width="2.8"/>
  <path d="M206 50C198 40 190 30 185 20" fill="none" stroke="${POIL}" stroke-width="2.4"/>
  <path d="M242 44C243 34 246 24 251 17" fill="none" stroke="${POIL}" stroke-width="2.2"/>

  <!-- 4. TÊTE, puis le MUSEAU BLANC en flamme -->
  <path d="${TETE}" fill="${c.robe}" stroke="${TRAIT}" stroke-width="3.4"/>
  <path d="${MUSEAU}" fill="${BLANC}" stroke="${TRAIT}" stroke-width="2.6"/>

  <!-- 4 bis. TOUFFES DE POIL sur la joue et la nuque. C'est le détail qui
       manquait aux deux premiers tours : sans elles, une tête brune ronde à
       museau court se lit comme un RONGEUR, quelle que soit la taille des
       oreilles. Les deux références les montrent en pointes franches. -->
  <g fill="${c.robe}" stroke="${TRAIT}" stroke-width="2.6">
    <path d="M190 78C180 76 172 71 166 64C172 74 176 82 184 88Z"/>
    <path d="M186 96C176 98 167 97 159 93C167 101 174 107 184 108Z"/>
    <path d="M196 116C190 124 182 130 173 132C184 134 194 132 202 126Z"/>
  </g>

  <!-- 5. COLLIER rouge + grelot doré, posés sur la gorge. Le collier passe
       DEVANT la bavette et DERRIÈRE la tête : c'est ce qui le fait tenir au
       cou au lieu de flotter sur le poitrail. -->
  <path d="M202 122C214 136 232 144 250 142C258 140 260 134 258 128"
        fill="none" stroke="${COLLIER}" stroke-width="14"/>
  <circle cx="232" cy="154" r="9.5" fill="${GRELOT}" stroke="${ton(GRELOT, 1, -.22)}"
          stroke-width="2"/>
  <path d="M225 154C230 156 235 156 239 154" fill="none"
        stroke="${ton(GRELOT, 1, -.22)}" stroke-width="1.8"/>

  <!-- 6. GUEULE OUVERTE + LANGUE qui pend. C'est la langue qui fait la JOIE :
       gueule fermée, Winona n'est qu'une chienne attentive. La gueule reste
       bien à l'intérieur de la mâchoire — posée sur le contour, elle s'y
       confond et la langue pend dans le vide (piège de Spike). -->
  <path d="M254 98C260 110 272 114 282 107C275 99 263 96 254 98Z"
        fill="${GUEULE}" stroke="${TRAIT}" stroke-width="1.8"/>
  <path d="M264 106C259 114 261 126 270 128C278 129 281 120 276 111C272 105 267 103 264 106Z"
        fill="${LANGUE}" stroke="${ton(LANGUE, 1, -.16)}" stroke-width="1.8"/>
  <path d="M271 110C271 116 271 120 272 124" fill="none"
        stroke="${ton(LANGUE, 1, -.16)}" stroke-width="1.5"/>

  <!-- 7. TRUFFE + mouchetures. Les quatre tirets sont plus SOMBRES que le
       museau (relevé) : ce sont les racines des moustaches, pas des taches. -->
  <path d="M280 74C289 76 293 82 290 88C286 93 278 93 273 88C270 82 273 73 280 74Z"
        fill="${TRUFFE}"/>
  <path d="M254 96C264 99 274 99 282 96" fill="none" stroke="${TRAIT}"
        stroke-width="2"/>
  <g fill="none" stroke="${MOUCHE}" stroke-width="2.2">
    <path d="M266 88C266 91 266 93 266 96"/>
    <path d="M273 92C273 95 273 97 273 99"/>
    <path d="M259 90C259 93 259 95 259 97"/>
  </g>

  <!-- 8. YEUX : amandes noires, gros reflet rond -->
  ${oeil(OEIL_P)}${oeil(OEIL_L)}

  <!-- 9. PAUPIÈRES du clignement : les deux amandes agrandies de 7 %, dans les
       repères EXACTS des yeux, scale dissocié compris. -->
  <g class="paupieres">
    <path d="${AMANDE}" transform="translate(230 76) scale(.738 .963)" fill="${c.robe}"/>
    <path d="${AMANDE}" transform="translate(256 58) scale(-.556 .899)" fill="${c.robe}"/>
  </g>

  <!-- 10. CILS au coin haut-arrière de l'œil proche, la convention du livre
       depuis la vague 2. cilsHauts les écrit dans le repère LOCAL de
       l'amande, donc ils suivent le placement dérogatoire de Winona. -->
  <g transform="${OEIL_P}">${cilsHauts({ PUPILLE: "#141014" }, 3, 3.2, 1.15)}</g>

  </g>
</svg>`;
};
