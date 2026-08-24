// ───────────────────────────────────────────────────────────────────────────────
// Diamond Tiara — POULICHE terrestre, élève de l'école de Poneyville.
//
// RÉFÉRENCE PLEIN PIED : `refs/diamond-tiara-plein-pied.png`
//   https://static.wikia.nocookie.net/mlp/images/d/de/Diamond_Tiara_ID_S2E06.png
// Compléments : `refs/diamond-tiara-id.png` (Diamond_Tiara_ID_S5E18.png) et
// `refs/diamond-tiara-smug.png` (Diamond_Tiara_smug_smile_S2E23.png) pour
// l'expression.
//
// Gabarit de pouliche de `_commun.js`. À la différence des trois Chercheuses,
// elle A sa marque de beauté (une tiare d'argent) — et elle porte une VRAIE
// tiare sur la tête, ce qui fait deux tiares à dessiner.
//
// Relevés propres au personnage :
//   · CRINIÈRE BICOLORE à large MÈCHE BLANCHE (`criniere[1]` = #f5f2fa) qui
//     court au milieu du toupet, du front vers la nuque. Sur la référence elle
//     est LARGE (un bon tiers de la masse) et bordée des deux côtés de violet.
//   · TIARE d'argent posée sur le toupet, cinq pointes à perles.
//
// ── EXPRESSION SIGNATURE : SOURIRE SATISFAIT, un brin hautain, mais qui reste
//    sympathique — le public a 4-5 ans et elle « apprend à devenir plus
//    gentille ». Trois ingrédients relevés sur `diamond-tiara-smug.png` :
//    paupière haute à .74 (le regard mi-clos de celle qui sait), SOURCIL ARQUÉ
//    (elle est le seul personnage de la vague dont le toupet dégage assez le
//    front pour en porter un), et un sourire FERMÉ en coin dont le crochet
//    avant reste court. Quatre cils, plus longs que ceux des Chercheuses.
//    Ce qui a été volontairement ÉCARTÉ de la référence : le sourcil BAISSÉ vers
//    l'avant et la bouche pincée, qui la rendent méprisante.
// ───────────────────────────────────────────────────────────────────────────────
import {
  ton, derives, OREILLE_P, CORPS_POULICHE, membresFondPouliche,
  membresProchesPouliche, naseauPouliche, oeil, OEIL_PROCHE_P, OEIL_LOIN_P,
  OEIL_P, CADRE_MINI, paupiereHaute, paupieres, jouePouliche, cilsHauts,
  sourcil,
} from "./_commun.js";

// ── QUEUE : longue mèche tombante à pointe recourbée, bande blanche au milieu.
const QUEUE = "M152 128C137 132 125 143 118 158"
  + "C111 173 109 188 113 200"
  + "C118 211 129 216 139 212"
  + "C149 208 152 197 148 188"
  + "C145 181 137 178 131 182"
  + "C126 185 125 190 128 195"
  + "C122 193 119 187 120 179"
  + "C122 167 128 156 136 147"
  + "C142 140 149 133 152 128Z";

// ── TOUPET : masse arrondie balayée en arrière, bord bas remonté au-dessus de
//    l'amande pour dégager le front (c'est là que se pose le sourcil).
const FRANGE = "M196 48C199 54 202 58 205 61 207 62 209 62 210 61"
  + "C214 55 220 49 227 43 235 37 244 33 252 31"
  + "C255 29 256 26 255 23"
  + "C250 19 240 18 229 20 214 23 200 36 196 48Z";
// ── MÈCHE d'encolure, longue et lisse (pas en pointe : elle est coiffée).
const MECHE = "M200 72C194 84 189 98 187 112"
  + "C186 119 188 125 193 127"
  + "C199 129 204 125 205 119"
  + "C206 110 208 98 211 88"
  + "C213 80 214 75 215 72"
  + "C211 69 204 69 200 72Z";

// ── LA TIARE (motif partagé par la marque de beauté et le bijou de tête).
//    Cinq pointes en zigzag, trois perles, un bandeau. Dessinée centrée sur
//    (0,0) pour pouvoir être posée deux fois à deux échelles.
const TIARE = "M-15 6-11 -4-6 2 0 -9 6 2 11 -4 15 6C9 9-9 9-15 6Z";
const ARGENT = "#dfe3ea";                  // argent clair   (constante documentée)
const ARGENT_T = "#98a2b4";                // son contour    (idem)
const tiare = (x, y, e) => `<g transform="translate(${x} ${y}) scale(${e})">
    <path d="${TIARE}" fill="${ARGENT}" stroke="${ARGENT_T}" stroke-width="1.8"/>
    <circle cx="-11" cy="-5.5" r="2.1" fill="${ARGENT}" stroke="${ARGENT_T}" stroke-width="1.2"/>
    <circle cx="0" cy="-10.5" r="2.3" fill="${ARGENT}" stroke="${ARGENT_T}" stroke-width="1.2"/>
    <circle cx="11" cy="-5.5" r="2.1" fill="${ARGENT}" stroke="${ARGENT_T}" stroke-width="1.2"/>
    <path d="M-12 5C-7 7 7 7 12 5" fill="none" stroke="${ARGENT_T}" stroke-width="1.2"/>
  </g>`;

export default (c) => {
  const d = derives(c);
  const { M0, M1, TRAIT, CRIN_T, CRIN_S2 } = d;
  // Cils et sourcil : `PUPILLE` dérive ici d'un bleu très clair (#8fc9ee) et
  // donne un bleu vif — trois traits de crayon bleu au-dessus de l'œil. Sur la
  // référence, cils et sourcil sont du violet SOMBRE de la crinière.
  const CRAYON = ton(M0, 1.1, -.34);
  const oe = oeil(c, d);

  return `<svg viewBox="0 0 300 300" xmlns="http://www.w3.org/2000/svg" role="img">
  <g ${CADRE_MINI} stroke-linejoin="round" stroke-linecap="round">

  <!-- 1. QUEUE : masse violette, large bande blanche au milieu, contour retracé -->
  <path d="${QUEUE}" fill="${M0}" stroke="${CRIN_T}" stroke-width="3.2"/>
  <path d="M144 141C133 152 126 167 124 182 123 194 127 203 136 206" fill="none"
        stroke="${M1}" stroke-width="10"/>
  <g fill="none" stroke="${CRIN_S2}" stroke-width="1.5">
    <path d="M148 137C136 148 128 164 126 180 125 193 129 203 138 207"/>
    <path d="M136 150C127 161 121 175 120 188 120 197 123 203 129 206"/>
  </g>
  <path d="${QUEUE}" fill="none" stroke="${CRIN_T}" stroke-width="3.2"/>

  <!-- 2. MEMBRES DU FOND, gabarit pouliche -->
  ${membresFondPouliche(d)}

  <!-- 3. (l'OREILLE passe en 12 ter : le toupet couvre sa zone.) -->

  <!-- 4. CORPS DE POULICHE : une seule silhouette, museau court compris -->
  <path d="${CORPS_POULICHE}" fill="${c.robe}" stroke="${TRAIT}" stroke-width="3.4"/>

  <!-- 5. MARQUE DE BEAUTÉ : la tiare d'argent, haut sur la croupe. La ligne de
       cuisse de la patte arrière proche monte à (160,148) : tout ce qui descend
       sous y 155 disparaît dessous. -->
  ${tiare(174, 142, .85)}

  <!-- 6. MEMBRES PROCHES, gabarit pouliche -->
  ${membresProchesPouliche(c, d)}

  <!-- 7. NASEAU + SOURIRE EN COIN FERMÉ, dans la fenêtre de bouche de la tête de
       pouliche. Le crochet avant reste COURT (trois unités de relevé au plus) :
       plus haut, il sort du chanfrein et dessine un bec. -->
  ${naseauPouliche(d)}
  <path d="M254 87C258 92.5 263.5 94 268 90.5
           C269.2 89.5 269.8 88.4 269.6 87" fill="none"
        stroke="${TRAIT}" stroke-width="2.6"/>

  <!-- 8. YEUX de pouliche -->
  ${oe(`${OEIL_PROCHE_P} scale(${OEIL_P})`)}${oe(`${OEIL_LOIN_P} scale(${OEIL_P})`)}

  <!-- 8 bis. PAUPIÈRE HAUTE à .74 : mi-close, l'air satisfait. Sous .5 l'œil
       devient une fente en vignette de galerie. -->
  ${paupiereHaute(c, d, .74, c.robe, OEIL_P, OEIL_PROCHE_P, OEIL_LOIN_P)}

  <!-- 9. PAUPIÈRES du clignement, calées sur l'amande de pouliche -->
  ${paupieres(c, OEIL_P, c.robe, OEIL_PROCHE_P, OEIL_LOIN_P)}

  <!-- 10. contour de la joue, par-dessus l'œil lointain -->
  ${jouePouliche(d)}

  <!-- 11. (ni corne ni aile : poney terrestre) -->

  <!-- 12. CRINIÈRE : masse violette, LARGE MÈCHE BLANCHE au milieu du toupet -->
  <path d="${FRANGE}" fill="${M0}" stroke="${CRIN_T}" stroke-width="3.2"/>
  <path d="M201 45C207 38 215 32 224 28 233 24 242 23 248 24" fill="none"
        stroke="${M1}" stroke-width="11"/>
  <g fill="none" stroke="${CRIN_S2}" stroke-width="1.5">
    <path d="M199 51C206 42 215 35 225 31 234 27 243 26 249 27"/>
    <path d="M205 58C212 48 221 40 231 36"/>
  </g>
  <path d="${FRANGE}" fill="none" stroke="${CRIN_T}" stroke-width="3.2"/>

  <path d="${MECHE}" fill="${M0}" stroke="${CRIN_T}" stroke-width="3.2"/>
  <path d="M203 79C198 90 194 102 193 113 193 119 194 123 196 125" fill="none"
        stroke="${M1}" stroke-width="8"/>
  <g fill="none" stroke="${CRIN_S2}" stroke-width="1.5">
    <path d="M208 77C202 89 198 101 197 113"/>
  </g>
  <path d="${MECHE}" fill="none" stroke="${CRIN_T}" stroke-width="3.2"/>

  <!-- 12 bis. LA TIARE sur la tête, posée sur le toupet. Sa pointe centrale
       monte à y 20 (soit 14,5 dans la fenêtre de portrait, bord haut à 6). -->
  ${tiare(236, 30, .95)}

  <!-- 12 ter. OREILLE DE POULICHE par-dessus le toupet, puis le PLI INTERNE -->
  <path d="${OREILLE_P}" fill="${c.robe}" stroke="${TRAIT}" stroke-width="3.2"/>
  <path d="M202 62C200 70 200 78 201 88" fill="none" stroke="${TRAIT}" stroke-width="3.4"/>

  <!-- 13. SOURCIL ARQUÉ + quatre CILS au coin haut-arrière. Le sourcil est
       COURT (une demi-largeur d'œil), FIN, de la couleur des cils, et il monte
       vers l'AVANT : vers l'arrière il donnerait l'air inquiet, et posé plus bas
       il deviendrait un pli au-dessus de l'œil lointain, c'est-à-dire l'air
       fâché (piège documenté). -->
  ${sourcil(CRAYON, "M222 58C227 54.5 234 53.5 240 55", 2.8)}
  <g transform="${OEIL_PROCHE_P} scale(${OEIL_P})">${cilsHauts({ PUPILLE: CRAYON }, 3, 2.8 / OEIL_P)}</g>

  </g>
</svg>`;
};

// Médaillon : l'argent est clair, il a besoin du disque de robe derrière.
export const cutieMark = (c) => `<svg viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg" role="img">
  <circle cx="30" cy="30" r="30" fill="${c.robe}"/>
  ${tiare(30, 32, 1.7)}
</svg>`;
