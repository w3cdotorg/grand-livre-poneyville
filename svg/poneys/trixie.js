// ───────────────────────────────────────────────────────────────────────────────
// Trixie — licorne magicienne. Structure licorne standard (`_commun.js`), plus
// le CHAPEAU et la CAPE étoilés par-dessus.
//
// RÉFÉRENCES PLEIN PIED (règle « aucun visage ne se dessine de mémoire ») :
//   `File:Trixie id S1E06.png` — https://mlp.fandom.com/wiki/File:Trixie_id_S1E06.png
//     (612 × 612, avec la CAPE, tête à droite ; `refs/w3-trixie-pp.png`)
//   `File:Trixie ID S6E6.png` — https://mlp.fandom.com/wiki/File:Trixie_ID_S6E6.png
//     (686 × 706, sans chapeau ni cape : crinière, queue et marque de beauté
//     dégagées ; `refs/w3-trixie-2.png`)
//
// Ce que les références ont corrigé ou imposé :
//   · sa robe est un bleu NETTEMENT plus soutenu que le bleu clair du fichier de
//     données (#74b7e9 à la pipette), et il le faut : sa crinière est un
//     gris-bleu très pâle, et sur une robe pâle les deux se confondent ;
//   · l'œil est MI-CLOS sous une paupière à ligne très marquée, avec des cils
//     longs et épais au coin haut-arrière, et un SOURCIL ARQUÉ HAUT. C'est le
//     sourcil qui fait la fierté théâtrale : sans lui, la paupière seule donne
//     juste un regard endormi ;
//   · le sourcil n'est possible que parce que le BORD du chapeau reste haut
//     (y ≤ 48) : il reste alors 12 unités de front nu entre le feutre et le
//     sommet de l'amande (y 61), soit la même fenêtre que chez Rarity ;
//   · la cape RECOUVRE le flanc : sur la référence costumée sa marque de beauté
//     n'est pas visible du tout. Elle n'est donc pas dessinée sur le corps —
//     seul le médaillon la porte. Ce n'est pas un oubli.
// ───────────────────────────────────────────────────────────────────────────────
import {
  ton, derives, OREILLE, CORPS, membresFond, membresProches, naseau,
  sourireCoin, oeil, OEIL_PROCHE, OEIL_LOIN, paupieres, paupiereHaute,
  joue, cilsCoinHaut, sourcil, museauLisse, corne,
} from "./_commun.js";

// ── ÉTOILE à cinq branches (rayon extérieur 10, intérieur 4,1), centrée (0,0).
const ETOILE = "M0 -10L2.41 -3.32L9.51 -3.09L3.9 1.27L5.88 8.09L0 4.1"
  + "L-5.88 8.09L-3.9 1.27L-9.51 -3.09L-2.41 -3.32Z";
// ── CROISSANT DE LUNE, ouvert vers l'avant (rayon 12).
const CROISSANT = "M-1 -12C6 -12 11 -6.6 11 0 11 6.6 6 12-1 12"
  + "C4 8.6 7 4.6 7 0 7 -4.6 4 -8.6-1 -12Z";

const ETOILE_C = "#a9dcf7";        // bleu ciel des étoiles du costume
const ETOILE_T = "#5f9dcb";
const etoile = (x, y, e, r = 0) =>
  `<path transform="translate(${x} ${y}) rotate(${r}) scale(${e})" d="${ETOILE}"
     fill="${ETOILE_C}" stroke="${ETOILE_T}" stroke-width="${1.6 / e}"/>`;

// ── CHAPEAU. Cône + bord, tous deux du violet de la cape.
//    Bornes de la fenêtre de portrait (`171 6 124 124`) : la pointe ne peut pas
//    monter au-dessus de y 11 — à y 8 elle affleure le cadre du mini-portrait de
//    la carte d'accueil (leçon du chapeau d'Applejack). Et le BORD doit rester
//    au-dessus de y 48 côté œil proche, sinon il n'y a plus de front nu pour le
//    sourcil (voir en-tête).
//    ── DEUX CORRECTIONS DE LA BOUCLE DE COMPARAISON :
//    1. le bord DOIT se dessiner AVANT le cône. Posé après (sa place naturelle,
//       « le bord ferme le cône », qui marche pour le chapeau d'Applejack), il
//       avalait le cône de y 24 à y 41 et il ne restait qu'un moignon de dix
//       unités : le chapeau se lisait comme une SOUCOUPE.
//    2. tout le chapeau est reculé de 18 unités (`translate(-18 1)`). À sa place
//       naturelle, le cône occupait exactement la boîte de la corne
//       (233 → 248 / 19 → 46) et la corne, même dessinée par-dessus, se lisait
//       comme une décoration PEINTE SUR le feutre. Sur les deux références le
//       chapeau est porté en arrière et la corne se dresse devant lui.
const CONE = "M210 44"
  + "C212 33 219 21 229 14"
  + "C234 10 240 11 243 16"
  + "C249 26 256 35 262 43"
  + "C248 48 224 49 210 44Z";
const BORD_CHAPEAU = "M192 44"
  + "C192 38 206 34 226 32"
  + "C248 30 268 33 279 38"
  + "C285 41 284 46 278 49"
  + "C267 54 246 56 226 54"
  + "C206 52 192 50 192 44Z";

// ── CAPE. Elle se boucle au poitrail et flotte vers l'arrière en recouvrant la
//    croupe. Bornes : elle ne doit pas remonter au-dessus du garrot (y 126) ni
//    entrer dans la fenêtre de portrait (x < 171 suffirait, mais son bord haut
//    à y 126 est de toute façon 4 unités sous le bas de la fenêtre).
const CAPE = "M206 128"
  + "C188 132 168 142 150 158"
  + "C128 178 110 206 100 236"
  + "C102 244 112 246 124 242"
  + "C142 236 160 224 174 208"
  + "C190 190 200 164 206 140"
  + "C208 134 208 130 206 128Z";
// Le col : une pièce plus sombre autour de la base du cou, avec le fermoir.
const COL = "M199 126C212 132 226 136 238 138"
  + "C239 145 235 152 228 157"
  + "C220 162 211 165 204 167"
  + "C198 158 196 141 199 126Z";

// ── MARQUE DE BEAUTÉ : la baguette magique croisée sur le croissant de lune.
const MARQUE = (x, y, e) => `<g transform="translate(${x} ${y}) scale(${e})">
    <path d="${CROISSANT}" transform="translate(-4 2) scale(.95)"
          fill="${ETOILE_C}" stroke="${ETOILE_T}" stroke-width="1.7"/>
    <path d="M-9 12L7 -7" fill="none" stroke="#f3f7fb" stroke-width="3.6"
          stroke-linecap="round"/>
    <path d="M-9 12L7 -7" fill="none" stroke="${ETOILE_T}" stroke-width="1.2"
          stroke-linecap="round" stroke-opacity=".5"/>
    <path transform="translate(9 -10) scale(.62)" d="${ETOILE}"
          fill="#fdfbe6" stroke="${ETOILE_T}" stroke-width="2.4"/>
  </g>`;

export default (c) => {
  const d = derives(c);
  const { M0, M1, TRAIT, CRIN_S2, CRIN_H } = d;
  const CAPE_C = c.cape ?? "#6157b5";
  const CAPE_T = ton(CAPE_C, .85, -.16);
  const CAPE_H = ton(CAPE_C, .8, .09);
  const COL_C = ton(CAPE_C, .9, -.07);
  // Contour de crinière : `CRIN_T` dérivé d'un gris-bleu très pâle (#c8cfe0)
  // n'est qu'un gris à peine plus foncé, invisible sur la robe bleue. Il faut
  // descendre nettement plus bas — même problème que la crinière blanche de
  // Granny Smith, même correctif.
  const CRIN_T = ton(M0, 1.2, -.3);
  // Crayon à cils : `CRAYON` dérive d'un œil MAGENTA et en tire un prune foncé
  // encore coloré. Sur les références les cils de Trixie sont noirs, et ce sont
  // les plus épais du livre après ceux de Rarity.
  const CRAYON = ton(c.yeux, .35, -.5);
  const oe = oeil(c, { ...d, PUPILLE: CRAYON });

  return `<svg viewBox="0 0 300 300" xmlns="http://www.w3.org/2000/svg" role="img">
  <g stroke-linejoin="round" stroke-linecap="round">

  <!-- 1. QUEUE : longue masse pâle à deux bandes, elle sort de sous la cape -->
  <path d="M141 124C120 129 102 144 92 166 82 188 78 208 80 224
           C85 231 93 230 99 223 104 229 112 228 116 221
           C122 212 125 196 128 180 132 158 137 140 148 130Z"
        fill="${M0}" stroke="${CRIN_T}" stroke-width="3.2"/>
  <g fill="none" stroke="${M1}" stroke-width="9">
    <path d="M130 132C110 144 96 164 89 186 82 205 81 218 84 226"/>
    <path d="M144 134C126 148 113 170 106 190 100 208 100 220 103 227"/>
  </g>
  <g fill="none" stroke="${CRIN_S2}" stroke-width="1.5">
    <path d="M124 136C104 150 91 172 85 192"/>
    <path d="M148 138C132 154 120 176 113 196"/>
  </g>
  <path d="M141 124C120 129 102 144 92 166 82 188 78 208 80 224
           C85 231 93 230 99 223 104 229 112 228 116 221
           C122 212 125 196 128 180 132 158 137 140 148 130Z"
        fill="none" stroke="${CRIN_T}" stroke-width="3.2"/>

  <!-- 2. MEMBRES DU FOND -->
  ${membresFond(d)}

  <!-- 4. CORPS + COU + TÊTE + MUSEAU : une seule silhouette -->
  <path d="${CORPS}" fill="${c.robe}" stroke="${TRAIT}" stroke-width="3.4"/>

  <!-- 5. (PAS de marque de beauté sur le flanc : la cape le recouvre
       entièrement, comme sur la référence costumée. Le médaillon la porte.) -->

  <!-- 6. MEMBRES PROCHES -->
  ${membresProches(c, d)}

  <!-- 6 bis. LA CAPE, par-dessus le corps et les membres : elle tombe jusqu'à
       y 246, les quatre sabots dépassent en dessous. -->
  <path d="${CAPE}" fill="${CAPE_C}" stroke="${CAPE_T}" stroke-width="3.2"/>
  <path d="M198 140C182 148 164 162 150 178 132 198 118 220 110 238" fill="none"
        stroke="${CAPE_H}" stroke-width="7" stroke-opacity=".55"/>
  <g fill="none" stroke="${CAPE_T}" stroke-width="1.8" stroke-opacity=".6">
    <path d="M188 146C170 158 152 176 138 196 126 214 116 230 110 240"/>
    <path d="M170 176C158 190 146 208 138 224"/>
  </g>
  ${etoile(176, 168, .95, 10)}${etoile(150, 196, 1.15, -14)}${etoile(128, 216, .8, 22)}
  ${etoile(186, 146, .62, -8)}${etoile(160, 226, .58, 6)}
  <circle cx="140" cy="180" r="2.6" fill="${ETOILE_C}"/>
  <circle cx="120" cy="234" r="2.2" fill="${ETOILE_C}"/>
  <circle cx="196" cy="164" r="2.2" fill="${ETOILE_C}"/>
  <path d="${CROISSANT}" transform="translate(115 200) scale(.5)"
        fill="${ETOILE_C}" stroke="${ETOILE_T}" stroke-width="3.2"/>

  <!-- 6 ter. LE COL de la cape et son fermoir en gemme -->
  <path d="${COL}" fill="${COL_C}" stroke="${CAPE_T}" stroke-width="2.8"/>
  <path d="M204 133C214 138 226 142 236 143" fill="none" stroke="${CAPE_H}"
        stroke-width="2.4" stroke-opacity=".6"/>
  <path d="M214 146C222 146 227 151 227 157 227 163 222 167 215 167
           C209 167 205 162 205 156 205 150 209 146 214 146Z"
        fill="#bfe9f5" stroke="#5f9dcb" stroke-width="2"/>
  <path d="M212 150C215 149 218 150 220 152" fill="none" stroke="#fff"
        stroke-width="2" stroke-linecap="round"/>

  <!-- 6 quater. MUSEAU LISSE : bouche presque fermée, l'encoche de bouche de la
       silhouette resterait vide et le museau se terminerait en bec. -->
  ${museauLisse(c, d)}

  <!-- 7. NASEAU + SOURIRE EN COIN à grand crochet (2), plus un ÉCLAT DE DENT au
       coin : sur les deux références Trixie ne sourit jamais tout à fait bouche
       fermée, on voit une dent au coin relevé. C'est ce détail, et la paupière,
       qui séparent son sourire de celui de Rainbow Dash, qui partage la même
       primitive. -->
  ${naseau(d)}${sourireCoin(d, 2)}
  <path d="M264 100.4C266.6 101.6 268.4 101.8 269.4 100.8
           C268.6 103 266 103.2 264 100.4Z" fill="#fff"/>

  <!-- 8. YEUX, iris magenta au contact du bord haut, liseré et pupille noirs -->
  ${oe(OEIL_PROCHE)}${oe(OEIL_LOIN)}

  <!-- 8 bis. PAUPIÈRE MI-CLOSE à .74, teintée de la robe : le regard de
       l'artiste sûre d'elle. Ligne de paupière peinte du CRAYON et non du
       contour de robe, comme sur la référence où c'est un trait noir franc. -->
  ${paupiereHaute(c, { TRAIT: CRAYON }, .74)}

  <!-- 8 ter. SOURCIL ARQUÉ HAUT, mince (1,9) : il tient dans les 12 unités de
       front nu que laisse le bord du chapeau. Arqué et non descendant —
       descendant vers l'avant, c'est l'air méprisant écarté pour Diamond
       Tiara, et Trixie doit rester sympathique. -->
  ${sourcil(CRAYON, "M219 59.4C225 54.4 234 53.8 242 56.6", 1.9)}

  <!-- 9. PAUPIÈRES du clignement -->
  ${paupieres(c)}

  <!-- 10. contour de la joue, par-dessus l'œil lointain -->
  ${joue(d)}

  <!-- 12. CRINIÈRE : elle sort de sous le bord du chapeau et descend le long du
       cou. Pas de frange : le feutre occupe tout le crâne. -->
  <path d="M205 44C195 54 189 74 188 96 187 117 192 136 201 150
           C205 158 208 164 210 170 214 161 216 149 217 136
           C219 118 216 98 211 82 207 70 205 56 208 46Z"
        fill="${M0}" stroke="${CRIN_T}" stroke-width="3.2"/>
  <path d="M206 56C198 70 194 90 195 110 196 130 200 148 206 160" fill="none"
        stroke="${M1}" stroke-width="8"/>
  <g fill="none" stroke="${CRIN_S2}" stroke-width="1.5">
    <path d="M200 58C192 74 189 94 190 114 191 133 195 150 202 162"/>
    <path d="M213 82C209 94 208 108 209 124 210 139 212 150 214 158"/>
  </g>
  <path d="M205 44C195 54 189 74 188 96 187 117 192 136 201 150
           C205 158 208 164 210 170 214 161 216 149 217 136
           C219 118 216 98 211 82 207 70 205 56 208 46Z"
        fill="none" stroke="${CRIN_T}" stroke-width="3.2"/>

  <!-- 12 bis. OREILLE, après la crinière (sa masse couvre la zone 181 → 205 /
       56 → 101) ; le pli interne est retracé à la main. -->
  <path d="${OREILLE}" fill="${c.robe}" stroke="${TRAIT}" stroke-width="3.2"/>
  <path d="M202 62C200 74 200 86 202 100" fill="none" stroke="${TRAIT}" stroke-width="3.4"/>

  <!-- 12 ter. LE CHAPEAU, tout en haut : cône, puis bord (dont l'arête avant
       ferme le cône), puis les étoiles. -->
  <g transform="translate(-18 1)">
  <path d="${BORD_CHAPEAU}" fill="${CAPE_C}" stroke="${CAPE_T}" stroke-width="3"/>
  <path d="M198 43C210 37 228 33 248 34 268 35 279 39 282 42" fill="none"
        stroke="${CAPE_H}" stroke-width="3.6" stroke-opacity=".6"/>
  ${etoile(206, 45, .5, 4)}${etoile(272, 44, .48, 16)}
  <path d="${CONE}" fill="${CAPE_C}" stroke="${CAPE_T}" stroke-width="3"/>
  <path d="M230 18C235 14 240 15 242 19C247 28 252 35 257 42" fill="none"
        stroke="${CAPE_H}" stroke-width="4" stroke-opacity=".6"/>
  ${etoile(234, 32, .72, -12)}${etoile(252, 41, .46, 16)}
  <path d="${CROISSANT}" transform="translate(224 38) scale(.34)"
        fill="${ETOILE_C}" stroke="${ETOILE_T}" stroke-width="4.6"/>
  </g>

  <!-- 12 quater. CORNE, APRÈS le chapeau : sur les deux références elle se
       dresse DEVANT le feutre, dégagée sur toute sa longueur. Posée en couche 11
       (sa place canonique) elle disparaissait entièrement sous le bord. -->
  ${corne(c, d)}

  <!-- 13. CILS AU COIN HAUT-ARRIÈRE : trois, LONGS (1,7) et ÉPAIS (2,7).
       Ils sortent sous le bord du chapeau et non dessous. -->
  ${cilsCoinHaut(d, 3, 2.7, 1.7, OEIL_PROCHE, 1, CRAYON)}

  </g>
</svg>`;
};

export const cutieMark = (c) => `<svg viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg" role="img">
  <circle cx="30" cy="30" r="30" fill="${c.robe}"/>
  ${MARQUE(30, 30, 1.55)}
</svg>`;
