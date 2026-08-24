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
//    ── COU ÉPAISSI À LA REFONTE DU 24/08. Le premier jet donnait un cou de
//    12 unités de large (gorge x 208 / nuque x 196 à y 120) sous un crâne de
//    111 : la tête flottait sur une tige et le comparateur lisait une girafe.
//    Sur la référence plein pied, le cou d'un bébé dragon fait 0,7 de la LARGEUR
//    DE BASE DU CRÂNE et il est COURT. Gorge portée à x 217 et nuque à x 193,
//    soit 24 unités, et le torse remonté de 23 : la longueur de cou visible
//    passe de 47 à 23 unités, soit 0,25 hauteur de crâne au lieu de 0,52.
const CORPS = "M182 62"
  + "C182 38 202 20 230 20"
  + "C254 20 272 32 276 52"
  + "C280 60 286 66 290 72"
  + "C293 78 291 86 285 90"
  + "C278 94 268 96 260 96"
  + "C254 102 246 106 238 108"
  + "C230 110 223 109 219 107"
  + "C216 112 216 120 220 128"    // gorge — cou ÉPAISSI et RACCOURCI (cf. en-tête)
  + "C226 136 232 144 236 152"
  + "C240 161 240 169 238 175"
  + "C239 190 233 202 223 209"
  + "C215 214 205 215 197 213"
  + "C185 210 177 202 175 191"
  + "C173 179 174 167 177 157"
  + "C180 147 187 136 192 126"    // nuque — cou ÉPAISSI et RACCOURCI
  + "C196 119 194 111 192 103"
  + "C190 96 187 90 186 84"
  + "C184 78 182 70 182 62Z";

// ── VENTRE clair, sur l'avant du torse. Deux bords : celui de gauche épouse
//    l'intérieur du poitrail, celui de droite la silhouette du ventre.
// REMONTÉ de 14 unités à la refonte du 24/08 : il commençait à y 126 alors que
// le menton est à y 107, ce qui laissait 19 unités de robe nue sous la gorge et
// rallongeait visuellement le cou d'autant — la vraie cause de l'effet girafe,
// autant que la finesse du cou. Sur la référence le plastron démarre juste sous
// la mâchoire.
const VENTRE = "M206 112C199 126 197 146 203 162"
  + "C211 178 217 194 213 207"
  + "C222 213 232 208 237 198"
  + "C242 186 240 170 232 156"
  + "C222 140 211 124 206 112Z";

// ── CRÊTE, REFAITE SUR RÉFÉRENCE PLEIN PIED (24/08/2026) :
//    `File:Spike ID S4E24.png` — https://mlp.fandom.com/wiki/File:Spike_ID_S4E24.png
//    Le premier jet posait QUATRE petites pointes de 6 unités de haut le long du
//    crâne : au comparateur ça faisait une scie, pas une crête de dragon. Relevé
//    sur la référence : ce sont TROIS grandes palmes en flamme, larges de 0,25 à
//    0,37 longueur de crâne, qui montent à 0,57 HAUTEUR DE CRÂNE au-dessus du
//    sommet de la tête — la plus haute à l'AVANT, la plus courte à l'arrière et
//    couchée vers l'arrière. C'est le trait qui fait « dragon » avant même les
//    yeux. Elles sont LARGES (la palme avant fait 48 unités à la base pour 57 de
//    haut) et PENCHÉES EN ARRIÈRE : dressées droit et pointues, comme au
//    deuxième tour, les trois pointes se lisaient comme une couronne en papier
//    posée sur le crâne.
//    Elles ne tiennent dans la fenêtre de portrait qu'au prix du `CADRE_SPIKE`
//    plus bas : à l'échelle 1 leurs pointes seraient à y −18, soit 24 unités
//    au-dessus du bord haut de la fenêtre.
const CRETE = "M270 38"
  + "C266 20 252 0 240 -19"
  + "C232 -14 226 -2 222 8"
  + "C216 -6 208 -14 200 -17"
  + "C193 -8 187 2 183 8"
  + "C179 0 173 -4 167 -3"
  + "C167 12 172 25 178 35"
  + "C185 28 195 22 205 19"
  + "C220 13 244 17 258 25"
  + "C263 29 268 34 270 38Z";

// ── AILERON D'OREILLE : palme à l'arrière du crâne, pas l'oreille en feuille
//    des poneys. REFAIT SUR RÉFÉRENCE : il est deux fois plus grand que le
//    premier jet (0,42 longueur de crâne au lieu de 0,22), il pointe vers
//    l'arrière-bas, et il est du VERT PÂLE du ventre — pas du vert soutenu de la
//    crête. C'est le seul relevé de couleur qui contredisait l'intuition sur
//    Spike : les deux verts sont bien distincts sur la référence, la crête est
//    saturée et l'aileron délavé, comme la face interne d'une aile.
const AILERON = "M192 52C184 44 168 38 150 42"
  + "C154 54 162 66 172 76"
  + "C180 83 188 84 191 78"
  + "C194 70 193 60 192 52Z";

// ── QUEUE : trapue, en arrière-bas, avec deux pointes vertes sur le dessus.
// ── QUEUE : trapue, en arrière-bas, terminée par un FER DE LANCE. Relevé sur la
//    référence : la queue de Spike ne s'effile pas en cône, elle finit sur une
//    pointe élargie en losange. Sans elle, la queue se lisait comme un simple
//    boudin coupé net.
const QUEUE = "M190 190C176 197 157 208 143 220"
  + "C136 226 131 233 130 240"
  + "C124 240 118 242 114 246"
  + "C120 250 126 252 132 252"
  + "C131 258 133 264 137 267"
  + "C142 262 146 255 147 248"
  + "C160 241 178 228 189 216"
  + "C195 209 196 197 190 190Z";
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
  // Agrandis à la refonte du 24/08 : sur la référence les deux yeux occupent à
  // eux seuls 0,55 de la largeur du crâne. Le lointain suit, mais moins.
  const OEIL_L = "translate(212 65) scale(.80 1)";
  const OEIL_P = "translate(254 61) scale(1.16)";

  return `<svg viewBox="0 0 300 300" xmlns="http://www.w3.org/2000/svg" role="img">
  <!-- CADRE_SPIKE : tout le dragon est posé dans un groupe translate(31 25.4)
       scale(.87). Deux raisons, et la seconde est la vraie :
        · la CRÊTE refaite sur référence monte à y −18 dans le repère local
          (0,57 hauteur de crâne au-dessus du sommet de la tête, cote relevée) ;
          à l'échelle 1 elle sortirait de 24 unités par le haut de la fenêtre de
          portrait, qui commence à y 6 ;
        · les deux nombres sont bornés par cette fenêtre : pointe de crête à
          y 8 (25,4 + 0,87 × −18 = 9,7) et menton à y 122 (25,4 + 0,87 × 111),
          soit tête + crête = 114 unités dans une fenêtre de 124. Le tx = 31
          recentre la tête, que le scale seul ramenait à x 158 → 255, hors de la
          fenêtre x 171 → 295 ; elle retombe sur x 189 → 286. Les pointes sont
       calées à y −19 et non plus bas : à −22, la pointe médiane retombait à
       y 6,3 et son contour de 3 unités était rogné par le bord de la fenêtre.
       Le groupe englobe class="paupieres" sans casser le clignement : le CSS
       animait déjà le transform DU GROUPE des paupières, et un transform parent
       se compose (déjà vérifié au navigateur sur les pouliches de la vague 2). -->
  <g transform="translate(31 25.4) scale(.87)" stroke-linejoin="round" stroke-linecap="round">

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
       dessiné ensuite, qui creuse son attache. Vert PÂLE (celui du ventre) et
       nervuré, comme sur la référence. -->
  <path d="${AILERON}" fill="${VENTRE_C}" stroke="${VENTRE_T}" stroke-width="3"/>
  <g fill="none" stroke="${VENTRE_T}" stroke-width="1.6">
    <path d="M188 56C178 50 166 46 156 46"/>
    <path d="M187 66C178 60 168 53 160 50"/>
  </g>

  <!-- 4. TÊTE + COU + TORSE : une seule silhouette -->
  <path d="${CORPS}" fill="${c.robe}" stroke="${TRAIT}" stroke-width="3.4"/>

  <!-- 5. VENTRE clair, avec ses ÉCAILLES. Relevé sur la référence : le plastron
       de Spike est barré de cinq bandes horizontales, et sans elles il se lit
       comme une bavette. -->
  <path d="${VENTRE}" fill="${VENTRE_C}" stroke="${VENTRE_T}" stroke-width="2.6"/>
  <g fill="none" stroke="${VENTRE_T}" stroke-width="1.5">
    <path d="M201 126C208 130 216 131 222 129"/>
    <path d="M199 141C207 146 216 147 225 144"/>
    <path d="M199 156C208 161 218 162 228 159"/>
    <path d="M205 172C213 177 224 177 233 174"/>
    <path d="M211 188C219 192 228 192 236 189"/>
  </g>

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
  <!-- NASEAU : une virgule enroulée, relevée sur la référence. Le simple point
       du premier jet se lisait comme un grain de beauté sur la joue. -->
  <path d="M285 74C288 75 289 78 287 80 285 81.5 283 80.5 283 78.5" fill="none"
        stroke="${TRAIT}" stroke-width="2.4"/>
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
    <path d="${AMANDE}" transform="translate(212 65) scale(.856 1.07)" fill="${c.robe}"/>
    <path d="${AMANDE}" transform="translate(254 61) scale(1.24)" fill="${c.robe}"/>
  </g>

  <!-- 10. le contour du chanfrein repasse par-dessus l'œil lointain -->
  <path d="M276 52C280 60 286 66 290 72" fill="none" stroke="${TRAIT}" stroke-width="3.4"/>

  <!-- 11. CRÊTE de pointes vertes, sur le crâne -->
  <path d="${CRETE}" fill="${M0}" stroke="${CRIN_T}" stroke-width="3"/>
  <g fill="none" stroke="${ton(M0, 1, -.09)}" stroke-width="1.8">
    <path d="M240 -13C246 1 255 17 263 31"/>
    <path d="M201 -11C205 2 212 15 218 26"/>
    <path d="M169 2C171 11 174 22 177 31"/>
  </g>

  </g>
</svg>`;
};
