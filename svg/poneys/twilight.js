// ───────────────────────────────────────────────────────────────────────────────
// Twilight Sparkle — dessin « show-accurate », d'après la référence vectorielle
// fournie le 24/08/2026 :
//   .superpowers/sdd/2026-08-24-grand-livre-poneyville/reference-twilight.png
//
// Ce fichier est le TEMPLATE ANATOMIQUE des 24 autres personnages.
// Lire NOTES.md § « Guide de style poneys » avant d'en dériver un nouveau poney.
//
// Repère : la référence (905 × 813 px) se projette sur le viewBox 300 × 300 par
//     x_svg = 0,31 · x_ref + 8        y_svg = 0,31 · y_ref + 18
// Toutes les coordonnées ci-dessous sont donc relisables directement sur le PNG.
// ───────────────────────────────────────────────────────────────────────────────

// ── Dérivés de couleur ────────────────────────────────────────────────────────
// La référence n'utilise que des variations de la robe et des mèches : un contour
// plus foncé, un voile pour les membres du fond, un contour de crinière très
// sombre. On les calcule en HSL depuis `c`, pour que n'importe quelle palette
// (orange, cyan, vert…) reste cohérente. `fS` multiplie la saturation, `dL`
// décale la luminosité (en fraction de 0→1).
const ton = (hex, fS, dL) => {
  const n = parseInt(hex.slice(1), 16);
  const r = (n >> 16) / 255, g = ((n >> 8) & 255) / 255, b = (n & 255) / 255;
  const mx = Math.max(r, g, b), mn = Math.min(r, g, b), d = mx - mn;
  const l = (mx + mn) / 2;
  const s = d ? d / (1 - Math.abs(2 * l - 1)) : 0;
  let h = 0;
  if (d) h = mx === r ? (g - b) / d + (g < b ? 6 : 0) : mx === g ? (b - r) / d + 2 : (r - g) / d + 4;
  const pince = (v) => Math.max(0, Math.min(1, v));
  return `hsl(${Math.round(h * 60)} ${Math.round(pince(s * fS) * 100)}% ${Math.round(pince(l + dL) * 100)}%)`;
};

// ── Formes réutilisables ──────────────────────────────────────────────────────
// Œil MLP : amande inclinée dessinée dans un repère local centré (39 × 33 unités).
// Le même tracé sert de blanc de l'œil ET de paupière.
const AMANDE = "M-19.5 -3.9C-16 -11.5-9.5 -16.8-1.5 -16.5 8.5 -16 17.5 -3 19.9 9.5"
  + "C18 14 14 16.5 8.5 16.4 -1 16-13 10-19.5 -3.9Z";
// Iris : disque aplati le long du bord haut-droit de l'amande, qu'il affleure.
// C'est ce contact qui produit le liseré sombre caractéristique du regard MLP.
const IRIS = "M-12 -2C-11.2 -9-6 -14.6-1 -15 7 -14 15.2 -6 17.6 2"
  + "C18.1 7.2 14 10.4 8 11.6 0 12.6-8.2 8-12 -2Z";
// Étoile à 6 branches (marque de beauté), centrée sur (0,0) : pointes verticales
// longues (r 29), pointes latérales courtes (r 21), cœur r 7.
const ETOILE6 = "M0 -29 3.5 -6.1 18.2 -10.5 7 0 18.2 10.5 3.5 6.1 0 29"
  + "-3.5 6.1-18.2 10.5-7 0-18.2 -10.5-3.5 -6.1Z";
// Étincelle à 4 branches, centrée sur (0,0).
const ETINCELLE = "M0 -10 1.9 -2.6 5.2 0 1.9 2.6 0 10-1.9 2.6-5.2 0-1.9 -2.6Z";
const etincelle = (x, y, e) => `<path transform="translate(${x} ${y}) scale(${e})" d="${ETINCELLE}" fill="#fff"/>`;

// ── OREILLE : longue feuille pointue, en arrière de la tête. Son bord externe
//    prolonge la joue ; c'est le contour de la tête, dessiné par-dessus, qui
//    creuse le pli interne. Pointe (187,53) → pointe basse (205,101).
const OREILLE = "M188 56C183 59 181.5 63 181.5 68"
  + "C182 75 185 81 190 88 195 94 201 98 205 101"
  + "C203 91 201 79 200 69 199 62 194 58 188 56Z";

// ── SILHOUETTE DE LA ROBE : croupe → dos → encolure → crâne → chanfrein →
//    bouche → menton → mâchoire → gorge → poitrail → ventre → croupe.
//    Un seul tracé fermé : c'est lui qui garantit qu'aucune couture n'apparaît
//    entre tête, cou et corps. Le décrochement 277→271→279 (y 92→106) est
//    l'encoche de la bouche ouverte ; l'angle (256,115)→(244,117) est le coin
//    mâchoire/gorge, très marqué dans la référence.
const CORPS = "M194 126C197 116 201 108 202 100 200 86 200 74 202 62"
  + "C206 52 218 45 238 42 256 45 265 53 269 62"
  + "C272 68 274 74 278 79 281 83 282 87 281 89"
  + "C279 92 273 95 271 98 271 102 275 104 279 106"
  + "C277 108 273 110 268 112 264 113 259 114.5 255 115"
  + "C250 115.5 246 115.5 243 116 242.5 120 242.5 124 242 128"
  + "C241 133 238 141 234 149 229 160 222 172 216 181"
  + "C207 186 197 187 187 187 179 187 174 186 170 184"
  + "C162 184 155 185 148 185 140 185 133 183 129 178"
  + "C126 170 125 160 126 151 127 141 131 133 137 128"
  + "C142 125 146 125 150 125 158 127 168 131 175 132"
  + "C183 133 189 130 194 126Z";

// ── QUEUE : grande vague retombante. Bord extérieur à gauche, racine (143,124)
//    cachée derrière la croupe, pointe en bas à (98,256).
const QUEUE = "M143 124C138 114 124 96 88 84 64 84 44 95 36 112"
  + "C25 128 13 158 9 196 10 210 16 217 26 222"
  + "C40 228 68 242 95 250 88 236 79 214 78 190"
  + "C78 166 80 150 96 130 110 127 126 126 143 124Z";

// ── CRINIÈRE, en trois masses. La frange contourne la corne (encoche 232,44 →
//    235,32) et pique vers le bas en (212,74), juste sur l'œil : sans cette
//    pointe la frange se lit comme un béret.
const FRANGE = "M232 28C226 32 216 39 208 45 204 49 199 53 196 58"
  + "C200 62 205 66 210 71 211 72 212 73 212.5 74"
  + "C218 71 225 67 233 62 241 58 248 55 251 52"
  + "C246 49 239 46 231 43 232 38 234 33 236 29Z";
const MECHE_ARRIERE = "M251 46C250 39 250 32 252 27"
  + "C259 27 267 30 274 35 281 40 285 45 286 50"
  + "C285 53 281 54 277 52 270 51 262 53 258 55"
  + "C254 52 252 49 251 46Z";
const MECHE_COU = "M200 99C197 110 196 122 195 132 193 140 193 148 196 156"
  + "C201 165 207 170 213 173 218 168 223 162 227 155"
  + "C230 149 231 146 231 145 226 142 222 140 221 139"
  + "C226 138 231 137 233 136 230 130 226 124 220 118"
  + "C213 111 207 104 200 99Z";

// ── MEMBRES. Chaque paire est dessinée deux fois : le membre du fond (robe
//    assombrie, contour complet) puis le membre proche. Coordonnées relevées
//    ligne par ligne sur la référence (svgy 187 → 266).
const PATTE_AR_FOND = "M156 152C152 168 149 186 147.6 205 147 222 147.5 238 149.5 252"
  + "C150.5 259 152.5 263 156 263.5 161 264 165 262.5 165.6 258"
  + "C166.5 244 164.5 226 163.2 208 162 188 161 168 161.5 152Z";
const PATTE_AV_FOND = "M201 168C200 182 200.6 196 201.4 210"
  + "C202.4 224 204.6 238 207.6 250 208.6 256 210.6 261 214 261.5"
  + "C218 262 221 260 221 256 220 240 216 224 213 208"
  + "C211 192 210 178 210 166Z";
// Membre proche : le contour VISIBLE s'arrête au flanc (tracé ouvert). Un
// contour fermé dessinerait une couture en travers de la croupe / du poitrail.
const PATTE_AR_BORD = "M162 163C155 171 151 180 149.3 188"
  + "C146 200 143 214 142 228 142 240 143 252 146 261"
  + "C147 265 145 266 142 266 132 267 124 266 121 264"
  + "C119 256 118 244 118.5 231 119 216 122 200 127 189"
  + "C129 185 130 183 131 182";
const PATTE_AV_BORD = "M182 187C180 198 178 212 177.6 226 177.6 240 179 252 181 261"
  + "C182 265 184 266.5 188 266.5 197 267 204 266 206 263"
  + "C207 250 205 236 202 222 200 208 198 194 199 182";

export default (c) => {
  const M0 = c.criniere[0];
  const M1 = c.criniere[1] ?? M0;
  const M2 = c.criniere[2] ?? M0;
  const TRAIT = ton(c.robe, .64, -.21);   // contour de la robe            (réf. #a64cc4)
  const FOND = ton(c.robe, .65, -.10);    // membres du fond               (réf. #b17bcd)
  const FOND_T = ton(c.robe, .55, -.25);  // contour des membres du fond   (réf. #9251ad)
  const CRIN_T = ton(M0, 1.3, -.165);     // contour de la crinière        (réf. #030f36)
  const CRIN_S = ton(M0, 1, -.045);       // séparation de mèches          (réf. #132566)
  const PUPILLE = ton(c.yeux, 1.2, -.28); // pupille                       (réf. #040000)
  const IRIS_BAS = ton(c.yeux, .35, .42); // bas d'iris éclairci           (réf. #cbabdb)
  const BLANC = "#fff8ff";                // blanc de l'œil   (constante documentée)
  const BOUCHE = "#c7096e";               // intérieur de la bouche        (idem)
  const LANGUE = "#fc5e1f";               // langue                        (idem)

  // Un œil = masse sombre, blanc inséré, iris, bas d'iris, pupille, 2 reflets.
  const oeil = (t) => `<g transform="${t}">
    <path d="${AMANDE}" fill="${PUPILLE}"/>
    <path d="${AMANDE}" transform="translate(-1.6 1.4) scale(.955)" fill="${BLANC}"/>
    <path d="${IRIS}" fill="${c.yeux}"/>
    <ellipse cx=".5" cy="8" rx="4.6" ry="2.9" fill="${IRIS_BAS}"/>
    <ellipse cx="2.8" cy="-3.3" rx="10.6" ry="11.4" fill="${PUPILLE}"/>
    <ellipse cx="-4" cy="-5.2" rx="3.8" ry="7.1" fill="#fff" transform="rotate(-12 -4 -5.2)"/>
    <circle cx="4.8" cy=".2" r="2" fill="#fff"/>
  </g>`;

  return `<svg viewBox="0 0 300 300" xmlns="http://www.w3.org/2000/svg" role="img">
  <g stroke-linejoin="round" stroke-linecap="round">

  <!-- 1. QUEUE (derrière tout). Les bandes de couleur sont des TRAITS épais qui
       suivent la courbe de la queue : leurs bords restent ainsi parallèles à la
       mèche, ce qu'un tracé fermé rate toujours un peu. -->
  <path d="${QUEUE}" fill="${M0}" stroke="${CRIN_T}" stroke-width="3.2"/>
  <path d="M72 226C60 210 52 192 49 168 48 148 51 133 58 122
           C66 111 80 103 96 101" fill="none" stroke="${M1}" stroke-width="16"/>
  <!-- les extrémités de bande s'affinent : un trait plus fin prolonge la bande
       là où la mèche se resserre (pointe en bas, retour de boucle en haut) -->
  <path d="M74 229C79 236 84 241 88 245" fill="none" stroke="${M1}" stroke-width="8"/>
  <path d="M96 101C110 104 124 111 134 122" fill="none" stroke="${M1}" stroke-width="11"/>
  <path d="M82 234C75 218 70 202 66 180 63 162 63 146 69 132
           C77 124 87 118 97 117" fill="none" stroke="${M2}" stroke-width="11"/>
  <path d="M97 117C104 117 112 118 120 120" fill="none" stroke="${M2}" stroke-width="8"/>
  <g fill="none" stroke="${CRIN_S}" stroke-width="1.5">
    <path d="M66 92C42 112 26 146 29 200 30 212 31 218 32 222"/>
    <path d="M112 118C90 134 74 156 74 190 75 208 80 224 86 240"/>
  </g>
  <path d="M22 191C24 202 25 212 26 221" fill="none" stroke="${CRIN_T}" stroke-width="3.5"/>
  <!-- le contour est retracé PAR-DESSUS les bandes : elles débordent toujours
       un peu de la masse, et c'est ce second passage qui rattrape le débord. -->
  <path d="${QUEUE}" fill="none" stroke="${CRIN_T}" stroke-width="3.2"/>

  <!-- 2. MEMBRES DU FOND : mêmes formes que les proches, en robe assombrie.
       C'est le voile plus sombre — pas la position — qui les fait lire « derrière ». -->
  <g fill="${FOND}" stroke="${FOND_T}" stroke-width="3.2">
    <path d="${PATTE_AR_FOND}"/><path d="${PATTE_AV_FOND}"/>
  </g>

  <!-- 3. OREILLE, avant la tête (la tête recouvre sa base et trace le pli) -->
  <path d="${OREILLE}" fill="${c.robe}" stroke="${TRAIT}" stroke-width="3.2"/>

  <!-- 4. CORPS + COU + TÊTE + MUSEAU : une seule silhouette -->
  <path d="${CORPS}" fill="${c.robe}" stroke="${TRAIT}" stroke-width="3.4"/>

  <!-- 5. MARQUE DE BEAUTÉ sur le flanc (côté croupe, jamais côté poitrail) -->
  <path transform="translate(141.3 154.4) scale(.43)" d="${ETOILE6}" fill="${M1}"/>
  ${etincelle(136.3, 140.1, .26)}${etincelle(147.5, 140.8, .24)}${etincelle(152.8, 153.8, .21)}
  ${etincelle(135.7, 168.7, .24)}${etincelle(146.9, 171.1, .21)}

  <!-- 6. MEMBRES PROCHES : remplissage sans contour, puis le seul contour
       VISIBLE en tracé ouvert. -->
  <g fill="${c.robe}">
    <path d="${PATTE_AR_BORD} C145 168 155 164 162 163Z"/>
    <path d="${PATTE_AV_BORD} C193 178 195 176 199 176Z"/>
  </g>
  <g fill="none" stroke="${TRAIT}" stroke-width="3.2">
    <path d="${PATTE_AR_BORD}"/><path d="${PATTE_AV_BORD}"/>
  </g>

  <!-- 7. NASEAU + BOUCHE OUVERTE (sourire). Le coin de la bouche déborde très
       légèrement du contour du museau, comme dans la référence. -->
  <path d="M268.5 85.5C270.5 88 273.5 88.5 276 86.5" fill="none" stroke="${TRAIT}" stroke-width="2.2"/>
  <path d="M267.5 95C271 93.5 275.5 97.5 278.5 102.5 275 104.5 271.5 105 269.5 103.5
           267 100 266.5 97 267.5 95Z" fill="${BOUCHE}" stroke="${TRAIT}" stroke-width="2.2"/>
  <path d="M269 100C271.5 102 274 103.5 276 104.5 273 106 270 105 268.5 102.5Z" fill="${LANGUE}"/>

  <!-- 8. YEUX : l'œil proche (grand) et l'œil lointain (étroit, miroir écrasé —
       c'est la perspective 3/4 qui l'aplatit, pas une forme différente). -->
  ${oeil("translate(235.5 77.9)")}
  ${oeil("translate(266 65.8) scale(-.41 .81)")}

  <!-- 9. PAUPIÈRES : dessinées EN POSITION FERMÉE (l'amande de l'œil, un peu
       agrandie). Le CSS les replie vers le haut en scaleY(0) au repos. -->
  <g class="paupieres">
    <path d="${AMANDE}" transform="translate(235.5 77.9) scale(1.07)" fill="${c.robe}"/>
    <path d="${AMANDE}" transform="translate(266 65.8) scale(-.44 .87)" fill="${c.robe}"/>
  </g>

  <!-- 10. Le contour de la joue repasse PAR-DESSUS l'œil lointain, comme dans
       la référence : sans lui l'œil déborde du museau. -->
  <path d="M269 62C272 68 274 74 278 79" fill="none" stroke="${TRAIT}" stroke-width="3.4"/>

  <!-- 11. CORNE : fine, haute, striée. Avant la crinière pour que la frange
       recouvre sa base — c'est ce qui la fait « pousser » dans les cheveux. -->
  <path d="M246 19C242 26 237 34 233 46 238 48 244 48 248 46 249 34 248 26 246 19Z"
        fill="${c.robe}" stroke="${TRAIT}" stroke-width="2.8"/>
  <g fill="none" stroke="${TRAIT}" stroke-width="1.4">
    <path d="M234.5 43.5C239 41.5 244 41.5 248 42"/>
    <path d="M237 36.5C241 34.5 245 34.5 248.6 35"/>
    <path d="M240 30C243 28.5 246 28.5 248 29"/>
    <path d="M242.5 24.5C244.5 23.5 246 23.5 247.2 24"/>
  </g>

  <!-- 12. CRINIÈRE : masse, bandes, séparations de mèches, puis contour retracé. -->
  <path d="${FRANGE}" fill="${M0}" stroke="${CRIN_T}" stroke-width="3.2"/>
  <!-- Les deux bandes sont des COINS EFFILÉS, pas des traits d'épaisseur
       constante : dans la référence elles naissent en pointe à gauche et
       s'épaississent en approchant de la corne. -->
  <path d="M207 47.5C213 45 220 44 228 44 236 44.5 244 47 248 50
           249 52 249 54.5 246 54.5 241 56 236 56.5 233 53
           229 49 222 47 213 47Z" fill="${M2}"/>
  <path d="M200 53.5C207 49 214 47.5 222 47.5 230 48.5 235 53 238 57.5
           239 59.5 238 61 235.5 60.5 231 61.5 227.5 61 225.5 57.5
           221.5 53.5 211 52 203 54Z" fill="${M1}"/>
  <g fill="none" stroke="${CRIN_S}" stroke-width="1.4">
    <path d="M212 42C220 38 228 35 235 33"/><path d="M208 48C216 44 224 41 231 39"/>
  </g>
  <path d="${FRANGE}" fill="none" stroke="${CRIN_T}" stroke-width="3.2"/>
  <!-- mèche rejetée en arrière, à droite de la corne : trois pointes -->
  <path d="${MECHE_ARRIERE}" fill="${M0}" stroke="${CRIN_T}" stroke-width="3.2"/>
  <g fill="none" stroke="${CRIN_S}" stroke-width="1.5">
    <path d="M254 31C263 34 272 40 281 47"/><path d="M253 38C260 41 267 45 274 50"/>
  </g>
  <g fill="none" stroke="${CRIN_T}" stroke-width="2.5">
    <path d="M272 39C270 45 268 50 267 53"/><path d="M279 45C278 49 277 51 276 53"/>
  </g>
  <path d="${MECHE_ARRIERE}" fill="none" stroke="${CRIN_T}" stroke-width="3.2"/>
  <!-- mèche d'encolure : elle part de derrière la mâchoire, suit l'encolure et
       retombe en pointe sur l'épaule (213,173). -->
  <path d="${MECHE_COU}" fill="${M0}" stroke="${CRIN_T}" stroke-width="3.2"/>
  <path d="M203 122C201 134 202 146 206 156 208 163 210 167 211 170" fill="none" stroke="${M1}" stroke-width="5"/>
  <path d="M208 124C206 136 207 147 210 156 211 162 212 166 213 169" fill="none" stroke="${M2}" stroke-width="5"/>
  <g fill="none" stroke="${CRIN_S}" stroke-width="1.5">
    <path d="M214 114C219 123 223 131 227 138"/>
    <path d="M208 112C213 124 218 135 224 144"/>
    <path d="M204 105C207 120 211 134 216 146"/>
  </g>
  <path d="${MECHE_COU}" fill="none" stroke="${CRIN_T}" stroke-width="3.2"/>

  <!-- 13. CILS : trois traits courts au coin EXTERNE de l'œil proche, et rien
       d'autre — le moindre trait au-dessus de l'œil lointain fait un sourcil. -->
  <g fill="none" stroke="${PUPILLE}" stroke-width="2.6">
    <path d="M223 84C221 85 219 86 218 87.5"/>
    <path d="M226 87C224 88.5 222 89.5 221 91"/>
    <path d="M229 90C227 91.5 225 92.5 224 94"/>
  </g>

  </g>
</svg>`;
};

// Médaillon de la marque de beauté. Le disque de robe n'est pas décoratif : les
// étincelles sont blanches (comme sur le flanc), donc invisibles sur le fond
// clair du médaillon sans lui.
export const cutieMark = (c) => `<svg viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg" role="img">
  <circle cx="30" cy="30" r="30" fill="${c.robe}"/>
  <path transform="translate(30 30) scale(.55)" d="${ETOILE6}" fill="${c.criniere[1] ?? c.criniere[0]}"/>
  ${etincelle(23.6, 11.7, .28)}${etincelle(37.9, 12.6, .26)}${etincelle(44.7, 29.2, .23)}
  ${etincelle(22.8, 48.3, .26)}${etincelle(37.2, 51.4, .23)}
</svg>`;
