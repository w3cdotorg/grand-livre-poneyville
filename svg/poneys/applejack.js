// ───────────────────────────────────────────────────────────────────────────────
// Applejack — poney terrestre. Dérivée du TEMPLATE CANON `twilight.js` via
// `_commun.js` (carcasse, œil, museau, oreille, membres).
//
// Singularités : chapeau de cow-boy (`c.chapeau`), crinière et queue LIÉES
// (une seule couleur, donc reflets `CRIN_H` + séparations `CRIN_S2` au lieu des
// bandes de couleur du template), ni corne ni ailes, marque = trois pommes.
// ───────────────────────────────────────────────────────────────────────────────
// ── EXPRESSION SIGNATURE, REFAITE SUR RÉFÉRENCE PLEIN PIED (24/08/2026) :
//    `File:Applejack id S3E1.png` — https://mlp.fandom.com/wiki/File:Applejack_id_S3E1.png
//    (complément : `File:Applejack ID S3E12.png`, `refs/applejack-sourire.png`).
//    Le regard franc et les taches de rousseur sont conservés, mais leurs formes
//    viennent maintenant du relevé et non du template :
//      · les CILS sortent du coin HAUT-arrière (trois, en éventail) et non du
//        coin bas, où ils se lisaient comme deux griffures sur la joue ;
//      · le sourire est OUVERT, avec une bande de dents blanches : la référence
//        ne montre jamais Applejack la bouche fermée, et le trait fermé du
//        premier jet tombait pile dans l'encoche du museau, où il se lisait
//        comme une lèvre fendue ;
//      · les taches sont resserrées en petit triangle sous le coin arrière-bas
//        de l'œil (relevé : 7 unités de côté, 3,4 de diamètre), au lieu du grand
//        triangle bas du premier jet ;
//      · le FRONT ARRIÈRE est nu — c'est ce que montre la référence, la frange
//        couvrant le front AVANT et retombant en mèches sur le museau. C'est
//        aussi ce qui laisse sortir les cils.
//    Contre-intuitif et revérifié à la pipette : les taches sont plus CLAIRES
//    que la robe (#fff8d3 sur une robe #f5b765), pas plus foncées.
import {
  ton, derives, OREILLE, CORPS, membresFond, membresProches, naseau,
  sourireDents, oeil, OEIL_PROCHE, OEIL_LOIN, paupieres, joue, cilsCoinHaut,
  taches, TACHES_JOUE,
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

// ── FRANGE, REFAITE SUR RÉFÉRENCE. Le premier jet la faisait descendre sur le
//    front ARRIÈRE (bord bas à (212,75)) et laissait le front avant nu : c'est
//    l'inverse de la référence. Sur `Applejack_id_S3E1.png`, la ligne de cheveux
//    court haut sur le crâne, le front ARRIÈRE est nu (une plage de robe entre
//    l'oreille et la frange, où sortent les cils du coin haut), et la masse
//    blonde retombe sur le front AVANT en un grand lobe dentelé qui file jusque
//    sur le haut du museau. Cotes, en fraction de la hauteur de tête : bord bas
//    à 0,13 h.t. au-dessus de l'œil arrière, 0,09 au-dessus de l'œil avant, et
//    la mèche de tête descend jusqu'à 0,36 (ici y 69).
//    Borne DÉCOUVERTE À L'ITÉRATION 2 : la frange ne peut pas filer jusque sur le
//    museau, parce que l'ŒIL LOINTAIN occupe exactement x 258 → 274 / y 52 → 79.
//    Poussée jusqu'à x 272 elle l'avalait aux trois quarts et n'en laissait
//    qu'un triangle vert qui se lisait comme une écaille. C'est la raison pour
//    laquelle la frange du template s'arrête elle aussi à x 251 : dans cette
//    pose, le front AVANT appartient à l'œil de l'autre côté de la tête.
//    Contrainte dure : le bord bas doit rester AU-DESSUS de y 58 entre x 213 et
//    x 230, sinon il recouvre les trois cils du coin haut (x 215 → 228,
//    y 57,7 → 66,4). Et pas de point sous y 62 au-delà de x 224 : la pupille de
//    l'œil proche est dans l'amande 216 → 255 / 61 → 94.
const FRANGE = "M186 47"
  + "C190 51 197 53 205 54"
  + "C212 55 220 57 227 62"
  + "C232 61 237 60 241 61"
  + "C245 64 249 67 252 69"
  + "C254 63 255 57 254 51"
  + "C253 44 250 39 244 36"
  + "C234 32 221 32 209 35"
  + "C196 38 188 42 186 47Z";

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

// ── CHAPEAU, RELEVÉ SUR RÉFÉRENCE. Le premier jet en faisait un melon posé à
//    plat : bord horizontal descendant jusqu'à y 59, donc tout le front couvert,
//    et pas une mèche visible devant. Sur la référence le chapeau est posé EN
//    ARRIÈRE et BASCULÉ, son bord remonte franchement vers l'avant (l'arête
//    avant passe au-dessus de l'œil, à 0,05 hauteur de tête sous le crâne), la
//    calotte est HAUTE, et c'est la frange qui occupe le front sous le bord.
//    Cotes : bord x 184 → 288, arête basse arrière y 46, arête basse avant y 41
//    (soit 12 unités plus haut que le premier jet) ; calotte y 10 → 40.
//    Borne dure : la fenêtre de portrait commence à y 6. Calé à y 8, le sommet de
//    la calotte n'avait plus que 2 unités de marge sur 124 — sur le
//    mini-portrait de la carte d'accueil (76 px) il affleurait le bord du cadre
//    et se lisait comme coupé. Tout le chapeau est donc descendu de 3 : sommet à
//    y 11, cinq unités de marge.
const CALOTTE = "M211 42C207 32 209 22 216 17 223 12 233 11 244 11"
  + "C256 11 265 14 271 20 277 27 278 35 277 44"
  + "C263 48 225 47 211 42Z";
const BORD = "M195 39C195 32 205 27 219 23 235 19 252 20 265 24 276 28 282 32 282 37"
  + "C281 42 271 46 256 48 239 49 221 46 208 42 199 39 195 40 195 39Z";

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

  <!-- 7. NASEAU + SOURIRE OUVERT À BANDE DE DENTS. Relevé sur la référence :
       Applejack sourit toujours la bouche ouverte, coin ARRIÈRE relevé, et la
       bande de dents blanches occupe le haut de l'ouverture (rapport mesuré :
       deux fois plus longue que haute). Le trait fermé du premier jet tombait
       dans l'encoche du museau et s'y lisait comme une lèvre fendue. -->
  ${naseau(d)}${sourireDents(d, 1.25)}

  <!-- 8. YEUX grands ouverts, iris au contact du bord haut : le regard franc. -->
  ${oe(OEIL_PROCHE)}${oe(OEIL_LOIN)}

  <!-- 8 bis. TACHES DE ROUSSEUR, resserrées sur relevé : petit triangle de
       7 unités de côté COLLÉ sous le coin arrière-bas de l'amande (point bas
       (244 ; 94,3)), diamètre 3,4. Le triangle large et bas du premier jet se
       lisait comme trois miettes tombées sur la joue. Pas de paupière rabattue
       ici, c'est voulu : le regard franc est celui de la référence. -->
  ${taches(c.robe, TACHES_JOUE)}

  <!-- 9. PAUPIÈRES -->
  ${paupieres(c)}

  <!-- 10. contour de la joue, par-dessus l'œil lointain -->
  ${joue(d)}

  <!-- 11. (ni corne ni aile : poney terrestre) -->

  <!-- 12. CRINIÈRE : frange dentelée + mèche d'encolure liée -->
  <path d="${FRANGE}" fill="${M0}" stroke="${CRIN_T}" stroke-width="3.2"/>
  <!-- reflet et séparations : ils suivent la nouvelle ligne de cheveux, du crâne
       arrière vers la mèche qui retombe sur le museau -->
  <path d="M199 43C209 39 221 37 232 40 242 43 249 50 252 58" fill="none"
        stroke="${CRIN_H}" stroke-width="6"/>
  <g fill="none" stroke="${CRIN_S2}" stroke-width="1.5">
    <path d="M200 47C210 43 222 42 233 47 242 51 248 58 250 65"/>
    <path d="M212 51C222 50 231 54 239 60 245 65 249 68 251 70"/>
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
  <path d="M219 23C226 27 237 29 248 27 257 25 264 22 268 19" fill="none"
        stroke="${CHAP_T}" stroke-width="2.4"/>
  <path d="M221 18C228 15 236 14 244 15 251 16 257 18 262 21" fill="none"
        stroke="${CHAP_H}" stroke-width="4"/>
  <path d="M216 32C227 37 258 37 271 32" fill="none" stroke="${CHAP_T}" stroke-width="3.5"/>
  <path d="${BORD}" fill="${CHAPEAU}" stroke="${CHAP_T}" stroke-width="3"/>
  <path d="M202 36C214 30 231 26 247 27 263 28 275 32 280 35" fill="none"
        stroke="${CHAP_H}" stroke-width="4"/>

  <!-- 13. CILS AU COIN HAUT-ARRIÈRE (convention de la vague 2, désormais
       partagée) : la référence en montre TROIS, en éventail vers le haut et
       l'arrière, noirs. Les deux cils du coin bas du premier jet se lisaient
       comme deux griffures vertes sur la joue. Ils sortent sous la frange, dont
       le bord bas arrière remonte à y 51 exprès. -->
  ${cilsCoinHaut(d, 3, 2.4)}

  </g>
</svg>`;
};

// Médaillon : les pommes sont autoportantes (rouges sur fond clair), mais on
// garde le disque de robe pour lire la marque « telle qu'elle est sur le flanc ».
export const cutieMark = (c) => `<svg viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg" role="img">
  <circle cx="30" cy="30" r="30" fill="${c.robe}"/>
  ${TROIS_POMMES(30, 31, 1.25)}
</svg>`;
