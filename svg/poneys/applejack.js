// ───────────────────────────────────────────────────────────────────────────────
// Applejack — poney terrestre. Dérivée du TEMPLATE CANON `twilight.js` via
// `_commun.js` (carcasse, œil, museau, oreille, membres).
//
// Singularités : chapeau de cow-boy (`c.chapeau`), crinière et queue LIÉES
// (une seule couleur, donc reflets `CRIN_H` + séparations `CRIN_S2` au lieu des
// bandes de couleur du template), ni corne ni ailes, marque = trois pommes.
// ───────────────────────────────────────────────────────────────────────────────
// ── EXPRESSION SIGNATURE (relevée sur `refs/applejack-id.png`) : regard franc,
//    grand ouvert et parfaitement de niveau — aucune paupière rabattue, c'est
//    l'assurance tranquille et non la fanfaronnade ; sourire FERMÉ en coin, dont
//    le crochet avant reste bas ; cils SOBRES (deux, courts) ; et les TACHES DE
//    ROUSSEUR, qui sont sa vraie signature. Contre-intuitif et vérifié sur la
//    référence : elles sont plus CLAIRES que la robe, pas plus foncées.
import {
  ton, derives, OREILLE, CORPS, membresFond, membresProches, naseau,
  sourireCoin, oeil, OEIL_PROCHE, OEIL_LOIN, paupieres, joue, cils, taches,
} from "./_commun.js";

// ── QUEUE liée : elle descend sous la croupe, se PINCE vers y 205 (la ligature)
//    puis s'évase en touffe jusqu'au sol. Son bord interne reste à x < 122 entre
//    y 150 et 200 pour ne pas passer sous la marque de beauté (centrée x 141).
const QUEUE = "M141 122C124 126 110 137 101 154"
  + "C93 169 89 184 90 197"
  + "C91 204 93 209 95 214"
  + "C86 231 81 250 84 264"
  + "C88 270 92 268 95 262"
  + "C97 268 101 271 105 268"
  + "C110 272 116 271 119 265"
  + "C126 256 129 240 127 222"
  + "C126 214 124 208 122 204"
  + "C120 186 119 167 121 151"
  + "C126 138 133 128 141 122Z";

// ── FRANGE : trois pointes qui descendent sous le bord du chapeau. Le bord bas
//    est DENTELÉ (deux crans) et la pointe de gauche mord sur le coin de l'œil
//    proche — sans elle la frange se lit comme un casque. Bord bas repris des
//    cotes de la référence : au-delà de x 224 il doit remonter à y < 62, sinon
//    la frange recouvre la pupille.
const FRANGE = "M196 47C197 55 200 61 204 66 207 70 210 73 212 75"
  + "C213 73 214 71 216 70"
  + "C217 71 219 72 220 73"
  + "C225 66 232 60 238 56 244 52 249 50 252 48"
  + "C247 43 238 40 229 40"
  + "C216 40 204 43 196 47Z";

// ── MÈCHE D'ENCOLURE liée : même pincement que la queue (y ≈ 163) puis touffe
//    au niveau du poitrail.
const MECHE = "M199 90C193 104 188 120 186 138"
  + "C185 149 186 158 190 166"
  + "C183 176 179 188 181 199"
  + "C187 207 198 207 205 200"
  + "C212 193 214 181 211 170"
  + "C209 165 208 161 207 158"
  + "C213 148 218 138 221 130"
  + "C215 114 207 100 199 90Z";

// ── CHAPEAU. Le bord est une ellipse vue de trois quarts (x 190 → 294, plate),
//    la calotte un tronc arrondi posé dessus (y 14 → 44). Le bord est dessiné
//    APRÈS la calotte : c'est son arête avant qui masque la base de la calotte.
const CALOTTE = "M212 46C210 36 212 26 218 20 224 15 234 13 246 13"
  + "C258 13 268 15 274 21 280 27 282 37 281 47"
  + "C266 51 226 51 212 46Z";
const BORD = "M192 46C192 40 204 34 221 31 240 28 259 29 273 33 285 37 291 42 290 47"
  + "C289 52 278 56 262 58 244 59 224 56 209 52 197 48 192 47 192 46Z";

// ── POMME de la marque de beauté (rayon ≈ 10, centrée sur 0,0) : disque à
//    creux supérieur, plus une petite feuille. Rouge, vert et brun sont des
//    constantes documentées — ils ne dérivent d'aucune couleur de `c`.
const POMME = "M0 -7C-3 -10-7 -9.5-9 -6"
  + "C-11 -2.5-10.5 3-7.5 6.5"
  + "C-5 9.5-2.5 10.5 0 9.5"
  + "C2.5 10.5 5 9.5 7.5 6.5"
  + "C10.5 3 11 -2.5 9 -6"
  + "C7 -9.5 3 -10 0 -7Z";
const FEUILLE = "M1.5 -8.5C3 -11 5.5 -12 7.5 -11.5 7 -9.5 5 -8 2.5 -7.5Z";
const ROUGE = "#c9302c";
const ROUGE_T = ton(ROUGE, 1, -.11);
const VERT = "#5aa844";
const VERT_T = ton(VERT, 1, -.11);
const pomme = (x, y, e) => `<g transform="translate(${x} ${y}) scale(${e})">
    <path d="${POMME}" fill="${ROUGE}" stroke="${ROUGE_T}" stroke-width="1.8"/>
    <path d="M0.5 -8C0.5 -10 0.5 -11 0.5 -12" fill="none" stroke="${VERT_T}" stroke-width="1.8"/>
    <path d="${FEUILLE}" fill="${VERT}" stroke="${VERT_T}" stroke-width="1.4"/>
  </g>`;
// Trois pommes en triangle pointe en bas — c'est l'arrangement officiel.
const TROIS_POMMES = (x, y, e) =>
  pomme(x - 10 * e, y - 9 * e, e) + pomme(x + 10 * e, y - 9 * e, e) + pomme(x, y + 10 * e, e);

export default (c) => {
  const d = derives(c);
  const { M0, TRAIT, CRIN_T, CRIN_S2, CRIN_H } = d;
  const CHAPEAU = c.chapeau ?? "#a9742f";       // gardé : la clé reste optionnelle
  const CHAP_T = ton(CHAPEAU, .8, -.17);        // contour du feutre
  const CHAP_H = ton(CHAPEAU, .9, .07);         // arête éclairée
  const oe = oeil(c, d);

  return `<svg viewBox="0 0 300 300" xmlns="http://www.w3.org/2000/svg" role="img">
  <g stroke-linejoin="round" stroke-linecap="round">

  <!-- 1. QUEUE liée. Crinière MONOCHROME : les « bandes » du template n'existent
       pas, ce sont des reflets CRIN_H + des séparations renforcées CRIN_S2. -->
  <path d="${QUEUE}" fill="${M0}" stroke="${CRIN_T}" stroke-width="3.2"/>
  <path d="M128 136C117 148 109 165 106 185 103 202 102 220 98 236" fill="none"
        stroke="${CRIN_H}" stroke-width="10"/>
  <g fill="none" stroke="${CRIN_S2}" stroke-width="1.6">
    <path d="M136 130C122 145 112 166 109 189 106 211 104 236 99 258"/>
    <path d="M120 145C110 162 103 182 102 200 101 220 99 242 95 260"/>
  </g>
  <!-- la LIGATURE : deux arcs serrés au pincement du tracé -->
  <g fill="none" stroke="${CRIN_T}" stroke-width="2">
    <path d="M91 200C99 204 110 203 119 198"/>
    <path d="M93 211C101 214 111 213 120 208"/>
  </g>
  <path d="${QUEUE}" fill="none" stroke="${CRIN_T}" stroke-width="3.2"/>

  <!-- 2. MEMBRES DU FOND -->
  ${membresFond(d)}

  <!-- 3. OREILLE, avant la tête -->
  <path d="${OREILLE}" fill="${c.robe}" stroke="${TRAIT}" stroke-width="3.2"/>

  <!-- 4. CORPS + COU + TÊTE + MUSEAU : une seule silhouette -->
  <path d="${CORPS}" fill="${c.robe}" stroke="${TRAIT}" stroke-width="3.4"/>

  <!-- 5. MARQUE DE BEAUTÉ : trois pommes sur la croupe -->
  ${TROIS_POMMES(141.3, 154.4, .8)}

  <!-- 6. MEMBRES PROCHES -->
  ${membresProches(c, d)}

  <!-- 7. NASEAU + SOURIRE EN COIN, fermé, crochet bas : Applejack ne fanfaronne
       pas, elle est sûre d'elle. Le rire ouvert du template lui donnait le même
       visage qu'à Twilight. -->
  ${naseau(d)}${sourireCoin(d, 1)}

  <!-- 8. YEUX grands ouverts, iris au contact du bord haut : le regard franc. -->
  ${oe(OEIL_PROCHE)}${oe(OEIL_LOIN)}

  <!-- 8 bis. TACHES DE ROUSSEUR : trois, en petit triangle sur la joue proche.
       Le point bas de l'amande est (244 ; 94,3) — elles se serrent 4 à 6 unités
       dessous, comme sur la référence. Posées dix unités plus bas (premier
       essai) elles se lisaient comme des miettes sur la joue. Bien en arrière du
       naseau (268). Pas de paupière rabattue ici, c'est voulu. -->
  ${taches(c.robe, [[238.5, 98.5, 2], [246.5, 100, 2], [242, 104.5, 1.8]])}

  <!-- 9. PAUPIÈRES -->
  ${paupieres(c)}

  <!-- 10. contour de la joue, par-dessus l'œil lointain -->
  ${joue(d)}

  <!-- 11. (ni corne ni aile : poney terrestre) -->

  <!-- 12. CRINIÈRE : frange dentelée + mèche d'encolure liée -->
  <path d="${FRANGE}" fill="${M0}" stroke="${CRIN_T}" stroke-width="3.2"/>
  <path d="M200 46C209 43 220 42 230 44 239 46 246 48 249 50" fill="none"
        stroke="${CRIN_H}" stroke-width="6"/>
  <g fill="none" stroke="${CRIN_S2}" stroke-width="1.5">
    <path d="M202 51C210 46 220 44 229 46"/>
    <path d="M206 61C212 55 219 51 226 48"/>
  </g>
  <path d="${FRANGE}" fill="none" stroke="${CRIN_T}" stroke-width="3.2"/>

  <path d="${MECHE}" fill="${M0}" stroke="${CRIN_T}" stroke-width="3.2"/>
  <path d="M200 102C194 116 192 132 193 148 194 160 194 170 192 180
           C190 189 188 194 186 197" fill="none" stroke="${CRIN_H}" stroke-width="8"/>
  <g fill="none" stroke="${CRIN_S2}" stroke-width="1.6">
    <path d="M205 104C197 119 194 136 195 152 196 168 195 184 191 196"/>
    <path d="M212 119C205 131 202 144 202 155 202 166 202 176 199 185"/>
  </g>
  <!-- la ligature de la crinière, au pincement du tracé -->
  <g fill="none" stroke="${CRIN_T}" stroke-width="2">
    <path d="M187 160C193 158 200 156 205 153"/>
    <path d="M190 170C196 167 203 164 208 161"/>
  </g>
  <path d="${MECHE}" fill="none" stroke="${CRIN_T}" stroke-width="3.2"/>

  <!-- 12 bis. CHAPEAU, par-dessus la crinière : la frange sort de sous le bord.
       Calotte d'abord, bord ensuite — l'arête avant du bord ferme la calotte. -->
  <path d="${CALOTTE}" fill="${CHAPEAU}" stroke="${CHAP_T}" stroke-width="3"/>
  <path d="M221 24C228 28 240 30 252 28 262 26 269 23 273 20" fill="none"
        stroke="${CHAP_T}" stroke-width="2.4"/>
  <path d="M223 19C230 16 239 15 247 16 255 17 262 19 267 22" fill="none"
        stroke="${CHAP_H}" stroke-width="4"/>
  <path d="M218 35C229 40 262 40 275 35" fill="none" stroke="${CHAP_T}" stroke-width="3.5"/>
  <path d="${BORD}" fill="${CHAPEAU}" stroke="${CHAP_T}" stroke-width="3"/>
  <path d="M200 45C214 38 234 35 253 36 271 37 285 41 291 45" fill="none"
        stroke="${CHAP_H}" stroke-width="4"/>

  <!-- 13. CILS SOBRES : deux seulement. Applejack est la seule de la vague à ne
       pas jouer du cil — trois ou plus la rapprochent de Rarity. -->
  ${cils(d, 1, 2)}

  </g>
</svg>`;
};

// Médaillon : les pommes sont autoportantes (rouges sur fond clair), mais on
// garde le disque de robe pour lire la marque « telle qu'elle est sur le flanc ».
export const cutieMark = (c) => `<svg viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg" role="img">
  <circle cx="30" cy="30" r="30" fill="${c.robe}"/>
  ${TROIS_POMMES(30, 31, 1.25)}
</svg>`;
