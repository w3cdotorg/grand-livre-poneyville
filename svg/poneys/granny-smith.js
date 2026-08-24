// ───────────────────────────────────────────────────────────────────────────────
// Granny Smith — poney terrestre, l'aïeule de la famille Apple et la fondatrice
// de Poneyville.
//
// RÉFÉRENCE PLEIN PIED : `refs/granny-smith-id.png`
//   https://static.wikia.nocookie.net/mlp/images/3/38/Granny_Smith_ID_S2E06.png
// Complément : `refs/granny-smith-sourire.png`
//   (Applejack_and_Granny_Smith_smile_S03E08.png).
//
// VÉRIFIÉ SUR LA RÉFÉRENCE (le brief demandait de contrôler) : elle ne porte
// PAS de lunettes. Ce qu'elle porte, et qui n'est pas repris ici, c'est un châle
// à pommes — hors périmètre, et il masquerait le poitrail.
//
// Ce qui fait l'âge, dans l'ordre d'importance relevé sur la référence :
//   1. LES PAUPIÈRES. Lourdes, tombantes : la hauteur d'œil visible ne fait que
//      0,31 de la hauteur de tête (0,44 chez une jeune jument). D'où `.56`.
//   2. LES RIDES. Trois plis : sous l'œil, sur la joue, et le fanon de la
//      mâchoire. Ils sont FINS (1,6-1,8) et suivent la courbe du museau ; épais,
//      ils font des balafres.
//   3. LE DOS ENSELLÉ. Croupe haute (y 127), garrot bas (y 136) et creux à
//      y 141 au milieu : c'est ce S, et non un simple abaissement, qui fait la
//      voûture. Plus un ventre qui pend (y 196 au lieu de 185).
//   4. LES PATTES un peu plus courtes et fléchies (sabots à y 258).
//   5. LE CHIGNON BLANC, une grosse masse roulée en arrière plus un chignon de
//      nuque, avec deux mèches folles qui s'en échappent.
// ───────────────────────────────────────────────────────────────────────────────
import {
  ton, derives, OREILLE, PATTE_AR_FOND, PATTE_AV_FOND, PATTE_AR_BORD,
  PATTE_AV_BORD, PATTE_AR_CLOS, PATTE_AV_CLOS, naseau, oeil, paupiereHaute,
  paupieres, joue, cilsHauts,
} from "./_commun.js";

// ── ŒIL : taille pleine, descendu de 4 unités comme sur toutes les références
//    de la vague (centre à 0,53 de la hauteur de tête au lieu de 0,48).
const OEIL_P_GS = "translate(235.5 82)";
const OEIL_L_GS = "translate(266 69) scale(-.41 .81)";

// ── SILHOUETTE VOÛTÉE. Le segment crâne → chanfrein → menton → mâchoire est le
//    tracé canonique de `CORPS`, à la virgule près : sa tête longue est déjà
//    celle du personnage. Tout le reste est repris — dos ensellé, ventre
//    pendant, encolure tendue vers l'avant et vers le bas.
const CORPS_VOUTE = "M192 136C196 124 200 112 201 100 200 86 200 74 202 62"
  + "C206 52 218 45 238 42 256 45 265 53 269 62"
  + "C272 68 274 74 278 79 281 83 282 87 281 89"
  + "C279 92 273 95 271 98 271 102 275 104 279 106"
  + "C277 108 273 110 268 112 264 113 259 114.5 255 115"
  + "C250 115.5 246 115.5 243 116"
  + "C242 122 241 128 239 134"
  + "C236 146 231 158 225 169"
  + "C220 178 215 185 211 190"        // poitrail poussé vers l'avant et le bas
  + "C202 195 192 196 182 196"
  + "C173 196 166 195 160 193"
  + "C150 191 141 189 134 185"        // ventre pendant
  + "C127 179 124 170 124 160"
  + "C124 148 127 138 133 132"
  + "C139 127 146 126 153 127"        // croupe HAUTE
  + "C161 131 170 139 177 141"        // creux d'ensellure
  + "C182 142 188 139 192 136Z";

// ── PATTES : les quatre tracés canoniques, raccourcis de 6 % en hauteur et
//    reposés (sabots à y 258 au lieu de 266). Passer par un `transform` garde
//    exactement le galbe et le sabot du template.
const VIEUX = 'transform="translate(0 8) scale(1 .94)"';

// ── QUEUE : petite houppe blanche, courte et ébouriffée — pas la vague d'une
//    jeune jument. Trois pointes en bas.
const QUEUE = "M142 132C130 136 120 145 115 158"
  + "C110 170 109 182 111 192"
  + "C114 188 117 183 120 178"
  + "C120 185 121 191 123 196"
  + "C127 189 131 182 135 176"
  + "C136 182 138 187 140 191"
  + "C143 182 145 170 146 158"
  + "C147 147 145 138 142 132Z";

// ── CHIGNON. Une grosse masse roulée en arrière (x 193 → 254, y 20 → 62) plus
//    un chignon de nuque, et deux mèches folles. Son bord bas reste AU-DESSUS
//    de y 58 sur l'œil : sinon elle recouvre les cils, qui sont ici un marqueur
//    d'âge (longs, tombants) qu'on ne peut pas perdre.
const ROULEAU = "M254 48C248 36 237 26 224 22"
  + "C210 18 199 23 195 33"
  + "C191 44 195 54 203 60"
  + "C212 62 224 60 232 54"
  + "C240 52 248 50 254 48Z";
const CHIGNON = "M204 60C196 58 189 61 187 68"
  + "C185 76 190 83 198 84"
  + "C206 85 212 80 212 73"
  + "C212 67 209 62 204 60Z";

// ── TARTE AUX POMMES (marque de beauté) : un dôme de croûte doré sur son plat,
//    trois fentes. Le plat n'est pas décoratif — sans lui le dôme se lit comme
//    un pain. Constantes documentées, elles ne dérivent d'aucune entrée de `c`.
const CROUTE = "#e2b163";
const CROUTE_T = ton(CROUTE, .95, -.19);
const CROUTE_H = ton(CROUTE, .9, .1);
const tarte = (x, y, e) => `<g transform="translate(${x} ${y}) scale(${e})">
    <path d="M-15 5C-15 -5-8 -11 0 -11 8 -11 15 -5 15 5Z"
          fill="${CROUTE}" stroke="${CROUTE_T}" stroke-width="1.8"/>
    <g fill="none" stroke="${CROUTE_T}" stroke-width="1.5">
      <path d="M-8 1C-6 -3-3 -5 0 -5"/>
      <path d="M-2 -7C1 -8 4 -7 6 -5"/>
      <path d="M4 2C6 -1 8 -2 10 -2"/>
    </g>
    <path d="M-16.5 5C-16.5 9-9 11.5 0 11.5 9 11.5 16.5 9 16.5 5
             C11 7.5-11 7.5-16.5 5Z"
          fill="${CROUTE_H}" stroke="${CROUTE_T}" stroke-width="1.8"/>
  </g>`;

export default (c) => {
  const d = derives(c);
  const { M0, TRAIT, CRIN_S2, CRIN_H } = d;
  // Contour de crinière : `CRIN_T` dérive de #efefef, une couleur SANS
  // saturation — il ne peut donner qu'un gris neutre, invisible sur une robe
  // vert pâle. La référence borde ses cheveux blancs d'un bleu-gris franc.
  const CRIN_G = "#a8bfca";              // constante documentée
  const RIDE = ton(c.robe, .8, -.24);    // plis : un peu plus sombre que TRAIT
  // Cils et ligne de paupière : `PUPILLE` dérive ici d'un orange clair
  // (#f5a65a) et donne un orange franc — deux traits de crayon orange sur la
  // paupière. Sur la référence, la ligne de paupière est un trait SOMBRE et
  // épais, et c'est le premier marqueur d'âge du visage.
  const CRAYON = ton(c.yeux, .85, -.46);
  const oe = oeil(c, d, { regard: [0, 1] });

  return `<svg viewBox="0 0 300 300" xmlns="http://www.w3.org/2000/svg" role="img">
  <g stroke-linejoin="round" stroke-linecap="round">

  <!-- 1. QUEUE : houppe blanche courte, reflet, séparations, contour retracé -->
  <path d="${QUEUE}" fill="${M0}" stroke="${CRIN_G}" stroke-width="3.2"/>
  <path d="M136 142C127 150 121 162 119 174 118 182 118 188 119 192" fill="none"
        stroke="${CRIN_H}" stroke-width="8"/>
  <g fill="none" stroke="${CRIN_S2}" stroke-width="1.5">
    <path d="M139 138C129 147 122 160 120 173"/>
    <path d="M130 148C123 157 118 168 117 178"/>
  </g>
  <path d="${QUEUE}" fill="none" stroke="${CRIN_G}" stroke-width="3.2"/>

  <!-- 2. MEMBRES DU FOND, raccourcis de 6 % -->
  <g ${VIEUX} fill="${d.FOND}" stroke="${d.FOND_T}" stroke-width="3.2">
    <path d="${PATTE_AR_FOND}"/><path d="${PATTE_AV_FOND}"/>
  </g>

  <!-- 3. (l'OREILLE passe en 12 ter : le chignon de nuque couvre sa zone.) -->

  <!-- 4. CORPS VOÛTÉ + tête canonique : une seule silhouette -->
  <path d="${CORPS_VOUTE}" fill="${c.robe}" stroke="${TRAIT}" stroke-width="3.4"/>

  <!-- 5. MARQUE DE BEAUTÉ : la tarte aux pommes, haut sur la croupe -->
  ${tarte(147, 148, .95)}

  <!-- 6. MEMBRES PROCHES, raccourcis de 6 % -->
  <g ${VIEUX}>
    <g fill="${c.robe}"><path d="${PATTE_AR_CLOS}"/><path d="${PATTE_AV_CLOS}"/></g>
    <g fill="none" stroke="${TRAIT}" stroke-width="3.2">
      <path d="${PATTE_AR_BORD}"/><path d="${PATTE_AV_BORD}"/>
    </g>
  </g>

  <!-- 7. NASEAU + SOURIRE DE VIEILLE DAME : une courbe longue et basse, doublée
       d'un PLI DE COIN vertical. C'est ce pli, et non la courbe, qui distingue
       son sourire de celui d'une jeune jument. -->
  ${naseau(d)}
  <path d="M262 98.5C267 102.5 272 104.5 277 103" fill="none"
        stroke="${TRAIT}" stroke-width="2.5"/>
  <path d="M261.5 98.5C260.5 100.5 260.5 102.5 261.5 104.5" fill="none"
        stroke="${RIDE}" stroke-width="1.8"/>

  <!-- 8. YEUX : taille pleine, descendus de 4, regard légèrement baissé -->
  ${oe(OEIL_P_GS)}${oe(OEIL_L_GS)}

  <!-- 8 bis. PAUPIÈRES LOURDES à .56 — la cote même de la référence (0,31 de
       hauteur d'œil visible). On ne descend pas plus bas : sous .5, en vignette
       de galerie de 60 px, l'œil devient une fente et le poney a l'air endormi
       au lieu d'âgé. -->
  ${paupiereHaute(c, { TRAIT: CRAYON }, .56, c.robe, 1, OEIL_P_GS, OEIL_L_GS)}

  <!-- 8 ter. LES RIDES : sous l'œil, sur la joue, et le fanon de mâchoire. -->
  <g fill="none" stroke="${RIDE}" stroke-width="1.7">
    <path d="M232 99C238 103 246 105.5 252 105.5"/>
    <path d="M237 107C243 110 249 111 254 110"/>
    <path d="M256 112.5C261 113.5 266 112.5 270 110.5"/>
  </g>

  <!-- 9. PAUPIÈRES du clignement, calées sur l'amande descendue -->
  ${paupieres(c, 1, c.robe, OEIL_P_GS, OEIL_L_GS)}

  <!-- 10. contour de la joue, par-dessus l'œil lointain -->
  ${joue(d)}

  <!-- 11. (ni corne ni aile : poney terrestre) -->

  <!-- 12. CHIGNON : la grosse masse roulée, sa spirale de rouleau, le chignon de
       nuque, puis deux mèches folles. Le contour est un BLEU-GRIS documenté :
       #efefef n'a aucune saturation, donc ton() n'en tire qu'un gris neutre,
       invisible sur la robe vert pâle. -->
  <path d="${ROULEAU}" fill="${M0}" stroke="${CRIN_G}" stroke-width="3.2"/>
  <g fill="none" stroke="${CRIN_G}" stroke-width="1.7">
    <path d="M246 45C238 36 227 30 216 31 207 32 202 38 203 46 204 53 211 58 219 58"/>
    <path d="M240 47C233 40 224 36 215 37 208 38 205 43 206 49"/>
  </g>
  <path d="${ROULEAU}" fill="none" stroke="${CRIN_G}" stroke-width="3.2"/>
  <path d="${CHIGNON}" fill="${M0}" stroke="${CRIN_G}" stroke-width="3.2"/>
  <path d="M206 66C201 64 196 66 195 70 194 75 197 79 202 79" fill="none"
        stroke="${CRIN_G}" stroke-width="1.7"/>
  <g fill="none" stroke="${CRIN_G}" stroke-width="2.2">
    <path d="M204 26C199 20 193 17 188 18 191 21 194 25 196 29"/>
    <path d="M250 42C255 38 259 37 262 38 259 41 256 44 254 47"/>
  </g>

  <!-- 12 ter. OREILLE par-dessus le chignon de nuque, puis le PLI INTERNE
       retracé à la main (c'est le contour du cou qui le dessinait en couche 4). -->
  <path d="${OREILLE}" fill="${c.robe}" stroke="${TRAIT}" stroke-width="3.2"/>
  <path d="M202 62C200 74 200 86 201 100" fill="none" stroke="${TRAIT}" stroke-width="3.4"/>

  <!-- 13. CILS : deux, longs, au coin haut-arrière. Sur la référence ce sont de
       longs cils tombants, un marqueur d'âge autant que la paupière. -->
  <g transform="${OEIL_P_GS}">${cilsHauts({ PUPILLE: CRAYON }, 2, 2.8)}</g>

  </g>
</svg>`;
};

// Médaillon : la croûte est claire, elle a besoin du disque de robe derrière.
export const cutieMark = (c) => `<svg viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg" role="img">
  <circle cx="30" cy="30" r="30" fill="${c.robe}"/>
  ${tarte(30, 30, 1.6)}
</svg>`;
