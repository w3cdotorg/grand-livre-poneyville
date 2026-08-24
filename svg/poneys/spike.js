// ───────────────────────────────────────────────────────────────────────────────
// Spike — bébé dragon BIPÈDE. Seule la machinerie de l'œil et les dérivés de
// couleur viennent de `_commun.js` : la carcasse de poney (corps à quatre
// pattes, museau, oreille en feuille, marque de beauté) ne s'applique pas.
//
// CADRAGE. La galerie recadre chaque dessin en viewBox "171 6 124 124". Spike
// est petit dans l'univers, mais sa tête doit remplir cette fenêtre comme celle
// des poneys : il est donc dessiné À GRANDE ÉCHELLE dans le viewBox — crâne
// x 184 → 293, y 20 → 111, exactement la boîte que la tête de Twilight occupe.
// Le corps entier ne fait que ~2,5 hauteurs de tête, ce qui est le canon du
// personnage (bébé) et pas un accident de composition.
//
// Pas de marque de beauté : `data.js` donne `cutieMark: null`, donc `render.js`
// n'appelle jamais `cutieMark` — ce module n'en exporte pas. Le groupe
// `class="paupieres"` reste obligatoire (les tests l'exigent, et le clignement
// est le même que pour les poneys).
// ───────────────────────────────────────────────────────────────────────────────
import { ton, derives, AMANDE, oeil } from "./_commun.js";

// ── SILHOUETTE : tête + cou + torse en UN SEUL tracé fermé, comme la robe des
//    poneys — c'est ce qui interdit toute couture entre le crâne, la gorge et
//    la poitrine. Crâne → museau → mâchoire → menton → gorge → poitrail →
//    ventre → hanche → flanc → épaule → nuque → arrière du crâne.
//    Le MUSEAU est un vrai décrochement (276,52) → (290,72) → (260,96). Il doit
//    saillir BAS, sous la ligne des yeux : posé à hauteur d'œil il se lit comme
//    une bosse sur la joue, et sans lui du tout la tête reste une boule et
//    Spike se lit comme un chat violet.
const CORPS = "M182 62"
  + "C182 38 202 20 230 20"
  + "C254 20 272 32 276 52"
  + "C280 60 286 66 290 72"
  + "C293 78 291 86 285 90"
  + "C278 94 268 96 260 96"
  + "C254 102 246 106 238 108"
  + "C230 110 223 109 219 107"
  + "C212 111 208 117 208 124"
  + "C208 132 212 138 218 143"
  + "C229 151 237 161 238 175"
  + "C239 190 233 202 223 209"
  + "C215 214 205 215 197 213"
  + "C185 210 177 202 175 191"
  + "C173 179 174 167 177 157"
  + "C180 147 185 139 190 132"
  + "C194 127 196 122 196 117"
  + "C194 107 189 97 186 87"
  + "C184 78 182 70 182 62Z";

// ── VENTRE clair, sur l'avant du torse. Deux bords : celui de gauche épouse
//    l'intérieur du poitrail, celui de droite la silhouette du ventre.
const VENTRE = "M208 126C201 138 199 154 205 168"
  + "C213 182 218 196 214 208"
  + "C222 214 232 209 237 199"
  + "C242 187 240 172 232 159"
  + "C223 145 213 134 208 126Z";

// ── CRÊTE : la rangée de pointes vertes du crâne, posée SUR la tête (et non
//    derrière). Quatre pointes, du front (258,30) vers la nuque (182,20), puis
//    un bord bas qui redescend le long du crâne. Les pointes culminent à y 10 :
//    la fenêtre de portrait commence à y 6, il reste quatre unités de marge.
const CRETE = "M252 26"
  + "C252 14 250 12 248 12"
  + "C246 18 244 24 240 28"
  + "C238 16 234 10 230 10"
  + "C228 16 224 22 220 26"
  + "C218 14 212 8 208 10"
  + "C206 18 200 26 194 32"
  + "C190 22 186 18 182 20"
  + "C182 30 184 42 188 52"
  + "C194 46 202 40 210 36"
  + "C220 30 238 26 252 26Z";

// ── AILERON D'OREILLE : palme verte à l'arrière du crâne, pas l'oreille en
//    feuille des poneys.
const AILERON = "M190 56C184 52 174 50 166 52"
  + "C170 58 174 64 180 70"
  + "C185 74 189 74 191 70"
  + "C192 65 191 60 190 56Z";

// ── QUEUE : trapue, en arrière-bas, avec deux pointes vertes sur le dessus.
const QUEUE = "M190 190C176 197 157 208 143 220"
  + "C133 229 127 238 128 246"
  + "C137 249 147 245 156 240"
  + "C169 232 183 223 191 213"
  + "C196 206 196 197 190 190Z";
const POINTES_DOS = [
  "M182 164L177 184 154 166Z",
  "M177 188L179 208 148 196Z",
  "M160 210L172 226 138 226Z",
];

// ── MEMBRES. Le bras et la jambe du fond sont en robe assombrie, comme les
//    membres du fond des poneys : c'est le voile plus sombre, pas la position,
//    qui les fait lire « derrière ».
const BRAS_FOND = "M194 134C184 140 176 152 174 165"
  + "C173 174 177 181 184 182"
  + "C191 183 195 178 196 170"
  + "C197 158 200 146 204 138Z";
const JAMBE_FOND = "M196 206C191 220 189 238 191 252"
  + "C192 261 197 266 206 266"
  + "C214 266 219 261 218 252"
  + "C217 238 216 220 218 208Z";
const BRAS = "M224 138C234 146 244 156 249 168"
  + "C253 177 251 186 243 188"
  + "C235 189 230 183 228 175"
  + "C225 163 220 151 215 144Z";
const JAMBE = "M216 210C211 226 209 242 212 256"
  + "C214 264 220 269 229 269"
  + "C239 269 245 264 244 255"
  + "C243 240 240 224 241 210Z";
// Pieds larges à trois orteils : sans eux les jambes se lisent comme deux
// tuyaux coupés net.
const PIED = "M209 250C203 257 203 268 214 271"
  + "C226 274 241 272 247 264"
  + "C251 257 248 249 241 248Z";

// Intérieur de gueule et langue : constantes documentées. Le `BOUCHE` rose du
// template (#c7096e) est un rose de poney, incohérent sur un dragon.
const GUEULE = "#8f3448";
const LANGUE_D = "#d9647a";

export default (c) => {
  const d = derives(c);
  const { M0, TRAIT, FOND, FOND_T, CRIN_T } = d;
  const VENTRE_C = c.ventre ?? M0;                 // gardé : la clé est optionnelle
  const VENTRE_T = ton(VENTRE_C, .8, -.2);
  const oe = oeil(c, d);
  // Positions d'œil propres à Spike. La face d'un dragon bipède est FRONTALE
  // aux trois quarts, pas en profil comme un chanfrein de poney : les deux yeux
  // sont côte à côte sur l'avant du crâne, celui de gauche (le lointain)
  // simplement resserré en largeur par la perspective. Deux choses en
  // découlent, apprises en une itération ratée :
  //   · l'œil lointain n'est PAS mis en miroir. Le miroir place son iris du
  //     mauvais côté et Spike devient divergent.
  //   · posé comme celui d'un poney (à droite, sur le museau), il se lit comme
  //     un œil greffé sur la truffe.
  const OEIL_L = "translate(213 65) scale(.74 .95)";
  const OEIL_P = "translate(253 61) scale(1.08)";

  return `<svg viewBox="0 0 300 300" xmlns="http://www.w3.org/2000/svg" role="img">
  <g stroke-linejoin="round" stroke-linecap="round">

  <!-- 1. QUEUE et POINTES DU DOS, derrière tout -->
  <g fill="${M0}" stroke="${CRIN_T}" stroke-width="3">
    ${POINTES_DOS.map(p => `<path d="${p}"/>`).join('')}
  </g>
  <path d="${QUEUE}" fill="${c.robe}" stroke="${TRAIT}" stroke-width="3.2"/>

  <!-- 2. MEMBRES DU FOND, en robe assombrie -->
  <g fill="${FOND}" stroke="${FOND_T}" stroke-width="3.2">
    <path d="${BRAS_FOND}"/><path d="${JAMBE_FOND}"/>
  </g>

  <!-- 3. AILERON D'OREILLE, avant la tête : c'est le contour de la tête,
       dessiné ensuite, qui creuse son attache. -->
  <path d="${AILERON}" fill="${M0}" stroke="${CRIN_T}" stroke-width="3"/>

  <!-- 4. TÊTE + COU + TORSE : une seule silhouette -->
  <path d="${CORPS}" fill="${c.robe}" stroke="${TRAIT}" stroke-width="3.4"/>

  <!-- 5. VENTRE clair -->
  <path d="${VENTRE}" fill="${VENTRE_C}" stroke="${VENTRE_T}" stroke-width="2.6"/>

  <!-- 6. MEMBRES PROCHES : bras droit tendu et jambe droite -->
  <g fill="${c.robe}" stroke="${TRAIT}" stroke-width="3.2">
    <path d="${BRAS}"/><path d="${JAMBE}"/><path d="${PIED}"/>
    <circle cx="245" cy="183" r="10"/>
  </g>
  <!-- griffes : trois doigts sur la main, trois orteils sur le pied -->
  <g fill="none" stroke="${TRAIT}" stroke-width="2.2">
    <path d="M248 174C251 176 254 176 256 175"/>
    <path d="M253 181C256 182 259 182 261 181"/>
    <path d="M251 189C254 191 257 191 259 190"/>
    <path d="M222 262C222 266 223 269 224 271"/>
    <path d="M232 261C233 265 234 269 235 271"/>
  </g>

  <!-- 7. NASEAU + BOUCHE OUVERTE. Deux petits crocs pendent de la lèvre
       supérieure : c'est le détail qui fait lire « dragon » et pas « lézard ».
       La bouche doit rester bien À L'INTÉRIEUR du crâne : posée sur le bord de
       la mâchoire (y ≈ 100) elle se confond avec le contour et les crocs
       pendent dans le vide sous le menton. -->
  <circle cx="283" cy="77" r="2.4" fill="${TRAIT}"/>
  <path d="M232 82C240 95 258 95 272 79C260 74 243 75 232 82Z"
        fill="${GUEULE}" stroke="${TRAIT}" stroke-width="2.4"/>
  <path d="M241 88C249 95 257 94 263 88 257 91 248 92 241 88Z" fill="${LANGUE_D}"/>
  <g fill="#fff8f4" stroke="${TRAIT}" stroke-width="1.2">
    <path d="M239 78L246 79 242 87Z"/><path d="M258 76L265 75 261 84Z"/>
  </g>

  <!-- 8. YEUX -->
  ${oe(OEIL_P)}${oe(OEIL_L)}

  <!-- 9. PAUPIÈRES : l'amande des yeux de Spike, agrandie de 7 %, dessinée en
       position fermée. Mêmes transformations que les yeux, sinon le clignement
       laisse un croissant d'œil visible. -->
  <g class="paupieres">
    <path d="${AMANDE}" transform="translate(213 65) scale(.79 1.02)" fill="${c.robe}"/>
    <path d="${AMANDE}" transform="translate(253 61) scale(1.16)" fill="${c.robe}"/>
  </g>

  <!-- 10. le contour du chanfrein repasse par-dessus l'œil lointain -->
  <path d="M276 52C280 60 286 66 290 72" fill="none" stroke="${TRAIT}" stroke-width="3.4"/>

  <!-- 11. CRÊTE de pointes vertes, sur le crâne -->
  <path d="${CRETE}" fill="${M0}" stroke="${CRIN_T}" stroke-width="3"/>
  <g fill="none" stroke="${ton(M0, 1, -.09)}" stroke-width="1.6">
    <path d="M250 20C244 26 238 32 232 36"/>
    <path d="M228 18C222 24 216 30 210 34"/>
    <path d="M204 18C198 26 192 32 188 38"/>
  </g>

  </g>
</svg>`;
};
