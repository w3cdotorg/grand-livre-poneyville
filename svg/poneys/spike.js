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

// ── CORPS (bras, jambes, queue) — REPRIS SUR RÉFÉRENCE LE 25/08/2026, finding
//    de revue : « bras mal rattaché à l'épaule, jambe en fût de botte, queue
//    d'un autre style que le reste ». Les trois défauts avaient la même cause :
//    ces quatre membres étaient des TRACÉS FERMÉS dont l'attache au torse ne
//    faisait que 7 à 10 unités de large. Un membre attaché sur 10 unités se lit
//    comme un bâton collé, quelle que soit sa forme.
//
//    Ils sont maintenant dessinés comme des TUBES — trait épais à bouts ronds
//    passé deux fois, contour large puis remplissage plus fin, la technique des
//    volutes de Rarity et du corps de Discord. Trois bénéfices, et c'est
//    exactement ce que le finding demandait :
//      · l'attache disparaît : le bout rond du tube démarre À L'INTÉRIEUR du
//        torse et le contour du corps, retracé après, la recouvre ;
//      · le membre peut S'AFFINER en chaînant des segments de largeur
//        décroissante (impossible sur un tracé fermé sans le recroiser) ;
//      · la queue prend le même vocabulaire graphique que le reste du dessin.
//
//    Cotes relevées sur `refs/v1-spike-pp.png` (341 × 487), en fraction de la
//    LARGEUR DU TORSE (130 px sur la référence) :
//      | bras (épaisseur)        | 0,21 |  attache juste sous la mâchoire |
//      | jambe (épaisseur)       | 0,34 |  courte : 23 % de la hauteur totale |
//      | pied (largeur)          | 0,42 |  PLUS LARGE que la jambe, 3 orteils |
//      | queue (base / pointe)   | 0,26 → 0,14 | fer de lance au bout |
const BRAS_FOND_SEG = [["M198 138C188 146 180 154 177 164", 22], ["M177 164C174 172 175 180 179 186", 17]];
const BRAS_SEG = [["M222 140C236 146 248 152 252 164", 25], ["M252 164C255 176 250 186 245 190", 19]];
const JAMBE_FOND_SEG = [["M196 200C193 216 192 232 194 246", 27]];
const JAMBE_SEG = [["M220 200C223 218 224 236 224 252", 31]];
// La queue part de la CROUPE et file en ARRIÈRE avant de descendre. Au premier
// tour du reprise elle plongeait à 45° dès la sortie du torse et se lisait comme
// une TROISIÈME JAMBE ; sur la référence elle sort presque à l'horizontale.
const QUEUE_SEG = [
  ["M198 190C182 192 166 196 154 202", 33],
  ["M154 202C142 208 133 216 128 226", 25],
  ["M128 226C125 232 124 238 124 244", 17],
];
// FER DE LANCE du bout de queue : la queue de Spike ne s'effile pas en cône, elle
// finit sur une pointe élargie en losange (relevé). Sans elle, le tube se lit
// comme un boudin coupé net.
const FER = "M124 238L135 250 124 266 113 250Z";
// PIEDS : plus LARGES que les jambes, à trois orteils. Sans eux les jambes se
// lisent comme deux fûts de botte — c'est le deuxième point du finding.
const PIED_FOND = "M181 240C176 246 176 254 183 256"
  + "C192 259 203 258 207 252 210 247 208 240 202 239Z";
const PIED = "M206 246C200 253 200 264 210 267"
  + "C223 270 237 268 242 261 246 254 243 245 236 244Z";
// Les trois pointes vertes du DOS suivent maintenant le dessus du tube de queue.
const POINTES_DOS = [
  "M188 174L180 190 162 172Z",
  "M170 180L164 197 143 182Z",
  "M152 190L148 208 126 196Z",
];

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
  // TUBE : le membre passé deux fois, contour large puis remplissage plus fin,
  // à bouts ronds. Chaîner des segments de largeur décroissante affine le
  // membre, et les jonctions disparaissent sous les bouts ronds.
  const tube = (segs, colT, col) =>
    segs.map(([t, w]) => `<path d="${t}" fill="none" stroke="${colT}"
        stroke-width="${w}" stroke-linecap="round"/>`).join('')
    + segs.map(([t, w]) => `<path d="${t}" fill="none" stroke="${col}"
        stroke-width="${w - 6}" stroke-linecap="round"/>`).join('');
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

  <!-- 1. QUEUE et POINTES DU DOS, derrière tout. La queue est un TUBE de largeur
       décroissante (33 → 17) terminé par un fer de lance ; son bout rond de
       départ est noyé dans la croupe. -->
  <g fill="${M0}" stroke="${CRIN_T}" stroke-width="3">
    ${POINTES_DOS.map(p => `<path d="${p}"/>`).join('')}
  </g>
  <path d="${FER}" fill="${c.robe}" stroke="${TRAIT}" stroke-width="3"/>
  ${tube(QUEUE_SEG, TRAIT, c.robe)}

  <!-- 2. MEMBRES DU FOND, en robe assombrie : pied d'abord, puis les tubes -->
  <path d="${PIED_FOND}" fill="${FOND}" stroke="${FOND_T}" stroke-width="3"/>
  ${tube(BRAS_FOND_SEG, FOND_T, FOND)}
  ${tube(JAMBE_FOND_SEG, FOND_T, FOND)}

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

  <!-- 6. MEMBRES PROCHES : bras et jambe, tubes affinés, pieds larges. Le PIED
       se dessine AVANT le tube de jambe pour que le tube en recouvre le haut :
       c'est ce recouvrement qui fait la cheville. -->
  <path d="${PIED}" fill="${c.robe}" stroke="${TRAIT}" stroke-width="3.2"/>
  ${tube(JAMBE_SEG, TRAIT, c.robe)}
  ${tube(BRAS_SEG, TRAIT, c.robe)}
  <circle cx="247" cy="192" r="10.5" fill="${c.robe}" stroke="${TRAIT}" stroke-width="3"/>
  <!-- griffes : trois doigts sur la main, trois orteils sur chaque pied -->
  <g fill="none" stroke="${TRAIT}" stroke-width="2.2">
    <path d="M251 184C254 185 257 186 259 186"/>
    <path d="M255 191C258 192 261 193 263 193"/>
    <path d="M252 199C255 201 258 202 260 202"/>
    <path d="M217 262C217 265 217 267 218 269"/>
    <path d="M226 262C227 265 228 267 229 269"/>
    <path d="M235 259C236 262 237 264 238 266"/>
  </g>
  <g fill="none" stroke="${FOND_T}" stroke-width="2">
    <path d="M188 253C188 255 188 257 189 258"/>
    <path d="M196 253C197 255 197 257 198 258"/>
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
