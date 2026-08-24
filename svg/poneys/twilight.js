// Twilight Sparkle — dessin de référence : il fixe le style de tous les poneys.
// Voir NOTES.md § « Guide de style poneys » pour les coordonnées et l'ordre des couches.

// Grande étoile à 6 branches (la marque de beauté de Twilight), dans un carré 60x60.
const ETOILE6 = "M30 4 35.5 20.5 52.5 17 41 30 52.5 43 35.5 39.5 30 56 24.5 39.5 7.5 43 19 30 7.5 17 24.5 20.5 Z";
// Petite étoile à 5 branches, centrée sur (0,0), rayon 10.
const ETOILE5 = "M0 -10 2.65 -3.64 9.51 -3.09 4.28 1.39 5.88 8.09 0 4.5 -5.88 8.09 -4.28 1.39 -9.51 -3.09 -2.65 -3.64 Z";
const petite = (x, y, e) => `<path transform="translate(${x} ${y}) scale(${e})" d="${ETOILE5}" fill="#fff"/>`;

export default (c) => `<svg viewBox="0 0 300 300" xmlns="http://www.w3.org/2000/svg" role="img">
  <!-- queue (3 mèches = les 3 couleurs de la crinière) -->
  <path d="M96 174 Q56 194 48 246 Q54 262 72 258 Q90 250 98 226 Q104 198 104 176 Z" fill="${c.criniere[0]}"/>
  <path d="M92 188 Q66 210 62 244" stroke="${c.criniere[1]}" stroke-width="11" fill="none" stroke-linecap="round"/>
  <path d="M98 196 Q80 216 78 246" stroke="${c.criniere[2] ?? c.criniere[0]}" stroke-width="8" fill="none" stroke-linecap="round"/>

  <!-- pattes du fond (légèrement assombries) -->
  <g fill="${c.robe}"><rect x="96" y="192" width="27" height="84" rx="13.5"/><rect x="156" y="192" width="27" height="84" rx="13.5"/></g>
  <g fill="#000" fill-opacity=".1"><rect x="96" y="192" width="27" height="84" rx="13.5"/><rect x="156" y="192" width="27" height="84" rx="13.5"/></g>

  <!-- corps (volontairement plus petit que la tête : c'est ça qui fait « mignon ») -->
  <ellipse cx="140" cy="202" rx="62" ry="43" fill="${c.robe}"/>

  <!-- marque de beauté sur le flanc (côté croupe, jamais côté poitrail) -->
  <g transform="translate(88 183) scale(.54)">
    <path d="${ETOILE6}" fill="${c.criniere[1]}"/>
    ${petite(6, 8, .38)}${petite(54, 12, .32)}${petite(50, 52, .3)}
  </g>

  <!-- pattes de devant -->
  <g fill="${c.robe}"><rect x="126" y="192" width="27" height="84" rx="13.5"/><rect x="176" y="192" width="27" height="84" rx="13.5"/></g>
  <g fill="#000" fill-opacity=".13"><rect x="126" y="260" width="27" height="16" rx="8"/><rect x="176" y="260" width="27" height="16" rx="8"/></g>

  <!-- cou + tête (le bord droit fait une gorge légèrement creuse, jamais un segment droit) -->
  <path d="M124 122 Q112 158 126 186 L184 184 Q190 168 185 152 Q194 138 190 118 Z" fill="${c.robe}"/>
  <circle cx="152" cy="98" r="54" fill="${c.robe}"/>
  <!-- museau -->
  <ellipse cx="194" cy="122" rx="24.5" ry="20" fill="${c.robe}"/>
  <ellipse cx="205" cy="113" rx="3.5" ry="2.8" fill="#000" fill-opacity=".25"/>
  <path d="M184 132 Q194 140 206 131" stroke="#000" stroke-opacity=".3" stroke-width="4" fill="none" stroke-linecap="round"/>

  <!-- oreille (arrondie, en arrière : elle ne doit jamais être confondue avec la corne) -->
  <path d="M106 70 Q100 32 122 40 Q138 48 132 72 Z" fill="${c.robe}"/>
  <path d="M111 65 Q108 42 120 48 Q130 54 127 68 Z" fill="#000" fill-opacity=".13"/>
  <!-- corne de licorne : fine, haute, striée, avec un reflet clair pour la détacher -->
  <path d="M164 62 Q170 40 191 22 Q195 46 192 68 Q176 72 164 62 Z" fill="${c.robe}"/>
  <path d="M169 57 Q176 38 189 24 Q182 44 178 60 Z" fill="#fff" fill-opacity=".22"/>
  <g stroke="#000" stroke-opacity=".16" stroke-width="3" fill="none" stroke-linecap="round">
    <path d="M168 54 Q177 52 187 51"/><path d="M172 44 Q180 42 189 40"/><path d="M179 33 Q184 32 190 30"/>
  </g>

  <!-- crinière : frange sur le front. Le retour de la ligne de cheveux fait une pointe
       vers (178 84) entre les deux yeux : sans elle la frange fait « béret ». -->
  <path d="M96 106 Q94 54 138 45 Q184 41 198 76 Q192 82 178 84 Q152 70 128 78 Q108 92 96 106 Z" fill="${c.criniere[0]}"/>
  <path d="M188 80 Q184 84 176 83 Q152 70 128 78 Q108 92 97 105 Q106 86 126 70 Q152 56 176 70 Q184 74 188 80 Z" fill="${c.criniere[1]}"/>
  <path d="M180 72 Q176 76 170 75 Q148 64 126 72 Q108 86 99 99 Q108 82 126 66 Q150 52 170 64 Q177 67 180 72 Z" fill="${c.criniere[2] ?? c.criniere[0]}"/>
  <!-- crinière : mèche derrière l'encolure (elle sort du contour de la tête, à gauche) -->
  <path d="M112 92 Q88 128 92 178 Q110 170 118 138 Q126 112 122 90 Z" fill="${c.criniere[0]}"/>
  <path d="M110 108 Q96 138 100 168" stroke="${c.criniere[1]}" stroke-width="9" fill="none" stroke-linecap="round"/>

  <!-- yeux (3/4 : l'œil proche est plus grand, l'œil lointain mord sur le museau) -->
  <ellipse cx="137" cy="103" rx="17" ry="22" fill="#fff"/>
  <ellipse cx="181" cy="102" rx="12.5" ry="17" fill="#fff"/>
  <ellipse cx="140" cy="107" rx="11" ry="13" fill="${c.yeux}"/>
  <ellipse cx="183" cy="105" rx="8" ry="10" fill="${c.yeux}"/>
  <ellipse cx="140" cy="109" rx="5" ry="6.5" fill="#2a1436"/>
  <ellipse cx="184" cy="107" rx="3.6" ry="5" fill="#2a1436"/>
  <circle cx="144" cy="99" r="4.6" fill="#fff"/><circle cx="134" cy="113" r="2.6" fill="#fff" fill-opacity=".8"/>
  <circle cx="186" cy="98" r="3.2" fill="#fff"/>

  <!-- paupières : dessinées EN POSITION FERMÉE, l'animation CSS les replie vers le haut -->
  <g class="paupieres">
    <ellipse cx="137" cy="103" rx="18" ry="23" fill="${c.robe}"/>
    <ellipse cx="181" cy="102" rx="13.5" ry="18" fill="${c.robe}"/>
  </g>

  <!-- cils : UNE ligne de paupière qui suit le bord de l'œil proche, et rien d'autre.
       Des cils détachés tombent sur la crinière et font des agrafes ; au-dessus de
       l'œil lointain, le moindre trait fait un sourcil fâché. -->
  <path d="M121 96 Q124 84 137 81" stroke="${c.criniere[0]}" stroke-width="5" fill="none" stroke-linecap="round"/>
</svg>`;

export const cutieMark = (c) => `<svg viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg" role="img">
  <path d="${ETOILE6}" fill="${c.criniere[1]}"/>
  ${petite(8, 9, .5)}${petite(52, 8, .42)}${petite(55, 44, .38)}${petite(7, 46, .42)}${petite(44, 57, .3)}
</svg>`;
