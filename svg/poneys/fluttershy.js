// ───────────────────────────────────────────────────────────────────────────────
// Fluttershy — pégase. Dérivée du TEMPLATE CANON `twilight.js` via `_commun.js`
// (carcasse, œil, museau, oreille, membres).
//
// Singularités : AILE REPLIÉE sur le flanc, crinière LONGUE et lisse qui tombe
// jusqu'au poitrail et s'y enroule, queue longue au ras du sol, bouche fermée
// (sourire doux plutôt que le rire de Twilight) et cils allongés.
// Crinière monochrome : reflets `CRIN_H` et séparations `CRIN_S2` au lieu des
// bandes de couleur du template. Marque de beauté = trois papillons.
// ───────────────────────────────────────────────────────────────────────────────
// ── EXPRESSION SIGNATURE, REFAITE SUR RÉFÉRENCE PLEIN PIED (24/08/2026) :
//    `File:Fluttershy ID S1E17.png`
//    — https://mlp.fandom.com/wiki/File:Fluttershy_ID_S1E17.png
//    (plein pied, tête à GAUCHE : les cotes sont donc lues en miroir ;
//    complément : `File:Fluttershy ID S4E6.png`).
//    Paupière tombante, cils très longs et petit sourire qui ne remonte pas :
//    tout cela reste. Mais la référence contredit la conclusion de la passe
//    expressions sur DEUX points, et les deux comptent :
//      · **elle a bien un SOURCIL, et il y a la place de le poser.** La passe
//        expressions avait conclu que non, parce que la ligne de cheveux du
//        premier jet descendait en diagonale de (254,44) à (214,84) et couvrait
//        tout l'arrière de l'œil. Sur la référence, la ligne de cheveux court
//        HAUT sur le crâne et laisse 11 unités de front nu au-dessus de l'œil —
//        c'est le trait le plus caractéristique du visage de Fluttershy, l'arc
//        doux qui la rend inquiète et tendre. La crinière est donc remontée.
//        Bénéfice collatéral : elle cesse de se lire comme un bonnet de bain ;
//      · les CILS sortent du coin HAUT-arrière, pas du coin bas.
//    Le regard reste BAISSÉ par l'iris poussé vers le bas dans l'amande : c'est
//    la seule façon de baisser les yeux sans baisser la tête (le port de tête
//    est celui de la référence de Twilight, menton relevé, et redessiner `CORPS`
//    sortirait du périmètre).
import {
  ton, derives, OREILLE, CORPS, membresFond, membresProches, naseau,
  sourireTimide, oeil, OEIL_PROCHE, OEIL_LOIN, paupieres, paupiereHaute,
  joue, cilsCoinHaut, sourcil, museauLisse, ailePliee,
} from "./_commun.js";

// ── CRINIÈRE : UN SEUL tracé, de la pointe de la frange sur le front jusqu'au
//    crochet du bas, à hauteur de poitrail. C'est l'enseignement de la vague :
//    découper la crinière de Fluttershy en « frange » + « masse » donne
//    infailliblement un BÉRET posé sur la tête, avec une couture entre les deux.
//    Le tracé suit, dans l'ordre : ligne de cheveux du front (212,64) → (252,43)
//    — REMONTÉE de 20 unités à la refonte du 24/08, pour dégager le front —,
//    bord extérieur par-dessus le crâne puis le long de la nuque, crochet
//    d'extrémité qui revient vers l'avant, bord intérieur qui remonte l'encolure.
//    Borne : le bord bas doit rester au-dessus de y 52 entre x 216 et x 250,
//    sinon il mange le front nu et le sourcil disparaît.
const MANE = "M210 63"
  + "C217 57 225 52 233 48 239 45 245 43 249 42"
  + "C250 38 250 34 249 31"
  + "C244 26 234 24 222 25"
  + "C208 27 195 33 187 43"
  + "C179 54 175 71 174 91"
  + "C174 118 175 146 177 170"
  + "C179 188 182 198 187 208"
  + "C193 220 205 224 216 221"
  + "C227 218 232 209 229 199"
  + "C226 190 217 187 210 191"
  + "C211 180 213 166 214 150"
  + "C215 126 214 100 210 70Z";

// ── QUEUE : longue, presque droite, qui balaie jusqu'au sol et s'enroule à peine.
const QUEUE = "M143 122"
  + "C124 125 108 134 98 150"
  + "C88 166 84 186 83 206"
  + "C82 224 85 240 90 252"
  + "C95 262 105 265 114 261"
  + "C123 257 127 248 124 238"
  + "C121 230 114 227 107 230"
  + "C106 216 108 200 112 184"
  + "C117 164 124 144 132 132"
  + "C136 126 140 123 143 122Z";

// ── PAPILLON de la marque de beauté : quatre lobes d'aile autour d'un corps
//    fuselé. Le rose du papillon est une constante documentée — il ne dérive
//    d'aucune couleur de `c` (la robe est jaune pâle, la crinière rose clair :
//    ni l'une ni l'autre ne se verrait sur le flanc).
//    Les ÉCHANCRURES entre aile haute et aile basse doivent revenir jusqu'à
//    x = ±6 : à ±10 (première version) les quatre lobes fusionnent en une
//    tache ronde dès qu'on descend à la taille du médaillon.
const PAPILLON = "M0 -6C-2 -12-9 -15-13 -12C-17 -9-15 -3-6 0"
  + "C-11 3-12 9-8 11C-4 13-1 10 0 5"
  + "C1 10 4 13 8 11C12 9 11 3 6 0"
  + "C15 -3 17 -9 13 -12C9 -15 2 -12 0 -6Z";
const ROSE = "#ef7ba9";
const ROSE_T = ton(ROSE, 1, -.15);
const papillon = (x, y, e) => `<g transform="translate(${x} ${y}) scale(${e})">
    <g fill="none" stroke="${ROSE_T}" stroke-width="1.4">
      <path d="M-1 -7C-3 -11-6 -13-8 -14"/><path d="M1 -7C3 -11 6 -13 8 -14"/>
    </g>
    <path d="${PAPILLON}" fill="${ROSE}" stroke="${ROSE_T}" stroke-width="1.8"/>
    <ellipse cx="0" cy="-1" rx="1.8" ry="6.5" fill="${ROSE_T}"/>
    <circle cx="0" cy="-7.5" r="2" fill="${ROSE_T}"/>
  </g>`;
// Les trois papillons doivent être ÉCARTÉS d'au moins 1,9 largeur de papillon,
// sinon leurs quatre lobes se touchent et la marque se lit comme une tache rose
// — c'était le cas dans le médaillon 60 × 60, où les trois se fondaient en un
// nœud de vermicelles (relu au comparateur le 24/08).
const TROIS_PAPILLONS = (x, y, e) =>
  papillon(x - 19 * e, y - 4 * e, e) + papillon(x + 18 * e, y - 9 * e, e) + papillon(x - 1 * e, y + 15 * e, e);

export default (c) => {
  const d = derives(c);
  const { M0, TRAIT, CRIN_T, CRIN_S2, CRIN_H } = d;
  // Liseré d'amande et pupille en CRAYON (presque noir) plutôt qu'en `PUPILLE`
  // (un vert-canard soutenu) : sur la référence l'œil de Fluttershy est cerné de
  // noir, l'iris turquoise étant la seule couleur.
  const oe = oeil(c, { ...d, PUPILLE: d.CRAYON }, { regard: [.6, 3.2] });  // regard baissé

  return `<svg viewBox="0 0 300 300" xmlns="http://www.w3.org/2000/svg" role="img">
  <g stroke-linejoin="round" stroke-linecap="round">

  <!-- 1. QUEUE longue -->
  <path d="${QUEUE}" fill="${M0}" stroke="${CRIN_T}" stroke-width="3.2"/>
  <path d="M130 134C117 149 107 170 102 192 97 214 97 234 100 250" fill="none"
        stroke="${CRIN_H}" stroke-width="13"/>
  <g fill="none" stroke="${CRIN_S2}" stroke-width="1.6">
    <path d="M137 129C122 145 110 167 105 192 100 216 100 238 103 254"/>
    <path d="M119 147C107 163 97 184 94 206 91 228 92 244 95 256"/>
  </g>
  <path d="${QUEUE}" fill="none" stroke="${CRIN_T}" stroke-width="3.2"/>

  <!-- 2. MEMBRES DU FOND -->
  ${membresFond(d)}

  <!-- 4. CORPS + COU + TÊTE + MUSEAU : une seule silhouette -->
  <path d="${CORPS}" fill="${c.robe}" stroke="${TRAIT}" stroke-width="3.4"/>

  <!-- 5. MARQUE DE BEAUTÉ : trois papillons sur la croupe. Elle est posée AVANT
       l'aile repliée, qui court de x 158 à x 209 : la marque doit donc tenir à
       gauche de x 158, sinon l'aile la recouvre. -->
  ${TROIS_PAPILLONS(139, 149, .58)}

  <!-- 5 bis. AILE REPLIÉE : après le corps, avant les membres proches -->
  ${ailePliee(c, d)}

  <!-- 6. MEMBRES PROCHES -->
  ${membresProches(c, d)}

  <!-- 6 ter. MUSEAU LISSE : bouche fermée, l'encoche de bouche de la silhouette
       restait vide et le bout du museau se lisait comme un bec (cf.
       _commun.js). Elle est rabotée de 10 unités à 3. -->
  ${museauLisse(c, d)}

  <!-- 7. NASEAU + PETIT SOURIRE TIMIDE : court, bas, presque horizontal. C'est
       de ne PAS remonter qui le rend timide. -->
  ${naseau(d)}${sourireTimide(d)}

  <!-- 8. YEUX, iris poussé vers le bas : le regard est baissé. -->
  ${oe(OEIL_PROCHE)}${oe(OEIL_LOIN)}

  <!-- 8 bis. PAUPIÈRE TOMBANTE, douce : .72 d'ouverture. Assez pour adoucir le
       regard, pas assez pour l'endormir (sous .55 elle a l'air triste). -->
  ${paupiereHaute(c, d, .72)}

  <!-- 8 ter. SOURCIL EN ARC DOUX — ajouté à la refonte du 24/08, et la
       conclusion inverse de la passe expressions. Le raisonnement d'alors était
       juste MAIS il portait sur une crinière fausse : avec la ligne de cheveux
       remontée sur relevé, il reste 11 unités de front nu au-dessus de l'œil
       proche (bord bas de la crinière y 50 à x 234, sommet de l'amande y 61) et
       le sourcil s'y pose sans être ni caché ni déporté au-dessus de l'œil
       lointain. Il est ARQUÉ, pas descendant : c'est ce qui fait la douceur
       inquiète et non la colère. Cotes : x 222 → 241 (une demi-largeur d'œil),
       épaisseur 2 et sommet à y 54,2 — à 2,4 d'épaisseur et 2 unités plus haut,
       il faisait un gros sourcil noir détaché du visage. -->
  ${sourcil(d.CRAYON, "M222 58.4C227.5 55 234.5 54.2 241 56.6", 2)}

  <!-- 9. PAUPIÈRES -->
  ${paupieres(c)}

  <!-- 10. contour de la joue, par-dessus l'œil lointain -->
  ${joue(d)}

  <!-- 11. (pas de corne : pégase — l'aile est posée en 5 bis) -->

  <!-- 12. CRINIÈRE : la masse, un reflet et deux séparations qui SUIVENT le
       balayage du front à la nuque puis la chute, enfin le contour retracé. -->
  <path d="${MANE}" fill="${M0}" stroke="${CRIN_T}" stroke-width="3.2"/>
  <path d="M241 47C226 35 207 36 194 50 185 61 184 83 184 107
           184 139 186 171 192 199" fill="none" stroke="${CRIN_H}" stroke-width="12"/>
  <g fill="none" stroke="${CRIN_S2}" stroke-width="1.7">
    <path d="M249 44C232 31 209 32 195 46 185 57 183 81 183 107
             183 141 185 173 191 203"/>
    <path d="M230 51C215 43 202 48 195 62 189 74 190 100 190 128
             190 158 192 186 198 210"/>
  </g>
  <path d="${MANE}" fill="none" stroke="${CRIN_T}" stroke-width="3.2"/>

  <!-- 12 bis. OREILLE, ici et pas en couche 3 : la longue masse de crinière
       passe par-dessus la zone de l'oreille (181 → 205, 56 → 101). L'oreille
       proche est en avant de la crinière rejetée derrière la tête ; le pli
       interne, que le contour du corps dessinait en couche 4, est retracé à la
       main juste après. -->
  <path d="${OREILLE}" fill="${c.robe}" stroke="${TRAIT}" stroke-width="3.2"/>
  <path d="M202 62C200 74 200 86 202 100" fill="none" stroke="${TRAIT}" stroke-width="3.4"/>

  <!-- 13. CILS très longs et FINS, au coin HAUT-arrière : trois, allongés de
       60 % (l = 1,6), minces (2,2) là où Rarity en a quatre et épais. Au coin
       bas, ces mêmes cils longs faisaient trois traits turquoise en travers de
       la joue — le défaut le plus voyant du personnage au comparateur. -->
  ${cilsCoinHaut(d, 3, 2.2, 1.6)}

  </g>
</svg>`;
};

export const cutieMark = (c) => `<svg viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg" role="img">
  <circle cx="30" cy="30" r="30" fill="${c.robe}"/>
  ${TROIS_PAPILLONS(30, 28, .82)}
</svg>`;
