// ───────────────────────────────────────────────────────────────────────────────
// Rainbow Dash — pégase. Dérivée du TEMPLATE CANON `twilight.js` via
// `_commun.js` (carcasse, œil, museau, oreille, membres).
//
// Singularités : AILE DÉPLOYÉE, et une crinière à SIX mèches. Le template n'en
// gère que trois. Deux techniques cohabitent ici, et le choix n'est pas
// esthétique mais géométrique :
//
//  • crête et mèche d'encolure — SIX MÈCHES EXPLICITES : chaque couleur est une
//    mèche à part, en amande pointue (`M … Q … Q … Z`), qui part de la ligne de
//    cheveux et s'achève en pointe. Elles sont posées de la plus profonde
//    (violet) à la plus haute (rouge), sur une masse de fond rouge.
//    Deux techniques ont été essayées avant et écartées : des traits parallèles
//    laissaient les pointes de la crête en aplat violet (une famille de courbes
//    décalée d'un (dx, dy) constant ne suit pas un contour qui s'évase), et des
//    coquilles concentriques mises à l'échelle autour de la racine donnaient
//    des bandes dont la largeur croît avec la distance — un énorme cœur violet
//    sur le sommet du crâne.
//  • queue — SIX TRAITS ÉPAIS parallèles : la queue est un faisceau droit, les
//    bandes y sont vraiment parallèles à l'axe, pas concentriques.
//
// Autre écart : le contour de crinière ne dérive PAS de `criniere[0]`. Un
// `ton(rouge, …)` cerne les bandes bleues et violettes d'un liseré rouge très
// voyant. Il dérive de `criniere[5]` (le violet), la plus sombre des six.
// ───────────────────────────────────────────────────────────────────────────────
// ── EXPRESSION SIGNATURE, REFAITE SUR RÉFÉRENCE PLEIN PIED (24/08/2026) :
//    `File:Rainbow Dash ID S3E7.png`
//    — https://mlp.fandom.com/wiki/File:Rainbow_Dash_ID_S3E7.png
//    (complément d'expression : `refs/rainbow-dash-smirk.png`).
//    Le « smug » reste, mais les trois cotes qui le portaient étaient fausses :
//      · le SOURCIL était peint en `PUPILLE`, soit un MAGENTA VIF. Sur la
//        référence du smirk c'est un trait presque noir, fin et PLAT. En magenta
//        et arqué il faisait un sourcil de colère, et c'est lui qui rendait
//        Rainbow Dash méchante plutôt que crâneuse ;
//      · les CILS partaient du coin bas — trois griffures magenta sur la joue.
//        La référence les met au coin HAUT-arrière, noirs, en éventail ;
//      · la paupière à `.64` + `.10` par le bas écrasait l'iris en une fente :
//        sur la référence l'œil mi-clos garde une pupille ronde entière. Remonté
//        à `.72` + `.07`, l'air malin reste et le regard redevient lisible en
//        vignette de galerie.
import {
  ton, derives, OREILLE, CORPS, membresFond, membresProches, naseau,
  sourireCoin, oeil, OEIL_PROCHE, OEIL_LOIN, paupieres, paupiereHaute,
  paupiereBasse, sourcil, joue, cilsCoinHaut, museauLisse, aileDeployee,
} from "./_commun.js";

// Une mèche : amande pointue tracée en deux quadratiques. `a` et `b` sont les
// deux points de racine (sur la ligne de cheveux), `t` la pointe, `h` et `k`
// les bombés du dessus et du dessous.
const meche = ([ax, ay, hx, hy, tx, ty, kx, ky, bx, by]) =>
  `M${ax} ${ay}Q${hx} ${hy} ${tx} ${ty}Q${kx} ${ky} ${bx} ${by}Z`;

// Les six mèches de la CRÊTE, du violet (la plus basse, posée en premier) au
// rouge (la plus haute, posée en dernier) : l'éventail balaie de l'arrière-bas
// vers le haut du crâne.
// ITÉRATION 2 DE LA REFONTE : les six pointes DÉPASSAIENT de la masse.
// Le contour retracé par-dessus ne découpe rien (piège documenté), donc chaque
// tête de mèche sortait en épine du bord haut-arrière et la crête se lisait
// comme une crête de coq punk — c'est ce qui la rendait agressive. Les six
// pointes sont rentrées de 10 à 14 unités, à l'INTÉRIEUR du bord de `CRETE`
// (frontière haut-arrière : (238,31) → (196,28) → (162,54) → (153,88)).
const MECHES_CRETE = [
  [194, 56, 180, 78, 174, 94, 196, 80, 208, 60],   // violet
  [199, 50, 172, 72, 166, 90, 190, 78, 211, 57],   // bleu
  [211, 44, 172, 58, 159, 80, 180, 76, 203, 51],   // vert
  [225, 41, 184, 46, 157, 65, 175, 62, 212, 45],   // jaune
  [239, 42, 198, 33, 164, 51, 189, 48, 224, 41],   // orange
  [253, 48, 216, 26, 181, 38, 207, 44, 238, 41],   // rouge
];

// Les six mèches de l'ENCOLURE : six amandes verticales côte à côte, le rouge
// à l'extérieur (à gauche) donc posé en dernier.
const MECHES_COU = [0, 1, 2, 3, 4, 5].map((i) => {
  const ax = 213 - 1.6 * i, ay = 99;              // i = 0 → violet, à l'intérieur
  const bx = 219 - 1.6 * i, by = 103;
  const tx = 218 - 4.6 * i, ty = 150 + 3.4 * i;   // les pointes s'éventent
  return [ax, ay, ax - 7, (ay + ty) / 2, tx, ty, bx + 4, (by + ty) / 2, bx, by];
});

// ── CRÊTE : la crinière est REJETÉE EN ARRIÈRE (elle ne retombe jamais sur
//    l'œil, contrairement à la frange de Twilight). Ligne de cheveux du front
//    (256,52) → sommet du crâne → deux pointes qui filent vers l'arrière.
//    Contrainte de composition : au-dessous de y 56, la crête doit rester à
//    x < 180, sinon elle avale entièrement l'OREILLE (181 → 205, 56 → 101).
const CRETE = "M256 52"
  + "C252 44 246 36 238 31"
  + "C226 24 210 24 196 28"
  + "C182 33 170 42 162 54"
  + "C155 64 152 77 153 88"
  + "C154 94 156 97 159 99"
  + "C161 92 163 86 166 81"
  + "C168 88 170 95 173 101"
  + "C175 93 177 84 178 76"
  + "C178 70 185 60 196 53"
  + "C206 47 226 43 240 44"
  + "C248 46 254 49 256 52Z";

// ── MÈCHE D'ENCOLURE : elle démarre à y 96, comme celle de Twilight, et pas
//    plus haut. Piège : au-dessus de y 95 la bande x 197 → 231 n'est PAS la
//    nuque mais la TEMPE — le crâne y couvre x 202 → 269. Une mèche remontée
//    jusqu'à y 48 pour combler le vide entre crête et encolure barre le visage
//    d'un ruban arc-en-ciel. Ce vide (y 76 → 96) est comblé par l'OREILLE :
//    c'est exactement le rôle qu'elle joue dans le template.
const MECHE = "M206 96"
  + "C199 108 195 122 194 136"
  + "C193 148 194 158 197 166"
  + "C201 161 205 156 208 151"
  + "C209 157 211 162 214 168"
  + "C219 159 223 149 225 141"
  + "C221 124 215 109 206 96Z";

// ── QUEUE : droite, plaquée vers l'arrière-bas, pointe dentelée. Son bord
//    interne reste à x < 122 entre y 150 et 190 pour laisser la place à la
//    marque de beauté (centrée x 143).
const QUEUE = "M140 126"
  + "C124 127 108 134 95 146"
  + "C83 156 74 168 68 180"
  + "C64 189 62 195 62 201"
  + "C66 199 70 197 74 195"
  + "C72 203 71 211 72 219"
  + "C78 211 84 203 90 197"
  + "C90 205 92 213 95 220"
  + "C100 210 105 200 110 191"
  + "C116 178 120 164 121 152"
  + "C126 140 133 130 140 126Z";

// ── MARQUE DE BEAUTÉ : nuage + éclair arc-en-ciel. Le nuage est un tracé fermé
//    à fond plat (bosses en haut, base droite) ; l'éclair est un polygone en Z
//    dont on recolore le HAUT en rouge et la POINTE en bleu — les trois bandes
//    de couleur de l'éclair officiel sont horizontales, pas concentriques.
const NUAGE = "M-19 5C-22 5-24 2-24 -1C-24 -5-21 -7-18 -7"
  + "C-18 -12-13 -16-8 -15C-5 -20 2 -21 7 -18"
  + "C12 -20 18 -17 19 -11C24 -10 26 -6 25 -1"
  + "C25 3 22 5 19 5Z";
const ECLAIR = "M15 -12L-5 4 5 4-7 30 17 10 7 10Z";
const ECLAIR_HAUT = "M15 -12L-5 4 9.2 4Z";
const ECLAIR_BAS = "M-2.4 20L5 20-7 30Z";
const NUAGE_T = "#c9d4e2";   // contour du nuage : constante documentée, le nuage
const NUAGE_F = "#ffffff";   // est blanc et ne dérive d'aucune couleur de `c`.

const marque = (x, y, e, M) => `<g transform="translate(${x} ${y}) scale(${e})">
    <g transform="translate(2 12)">
      <path d="${ECLAIR}" fill="${M[2]}" stroke="${ton(M[2], 1, -.3)}" stroke-width="2.2"/>
      <path d="${ECLAIR_HAUT}" fill="${M[0]}"/>
      <path d="${ECLAIR_BAS}" fill="${M[4]}"/>
      <path d="${ECLAIR}" fill="none" stroke="${ton(M[2], 1, -.3)}" stroke-width="2.2"/>
    </g>
    <path d="${NUAGE}" fill="${NUAGE_F}" stroke="${NUAGE_T}" stroke-width="2.4"/>
  </g>`;

export default (c) => {
  const d = derives(c);
  const { M5, TRAIT } = d;
  const M = [d.M0, d.M1, d.M2, d.M3, d.M4, d.M5];
  const CRIN_T = ton(M5, 1.15, -.14);   // contour : dérivé du VIOLET, pas du rouge
  // ŒIL À CERNE NOIR. Le liseré de l'amande et la pupille sortent tous les deux
  // de `PUPILLE`, qui vaut ici un magenta foncé : sur un iris magenta les trois
  // se confondaient et l'œil devenait UNE SEULE tache magenta cernée d'un gros
  // trait — l'effet « trait d'eye-liner » relevé au comparateur. Sur la
  // référence, le liseré et la pupille sont NOIRS et seul l'anneau d'iris est
  // magenta. On passe donc `CRAYON` en `PUPILLE` pour cet œil-là : la fonction
  // ne s'en sert que pour le liseré et la pupille.
  const oe = oeil(c, { ...d, PUPILLE: d.CRAYON });

  // Six bandes de queue : la queue est un faisceau droit, décalage
  // perpendiculaire à son axe. Trait de 10 pour un pas de 5,2 : chaque bande
  // mange la moitié de la précédente, il reste une rayure nette.
  const bandesQueue = M.map((col, k) => {
    const dx = 2.4 * k, dy = 5.2 * k;
    return `<path d="M${136 + dx} ${134 + dy}C${118 + dx} ${137 + dy} ${102 + dx} ${146 + dy} ${88 + dx} ${159 + dy}`
      + `C${78 + dx} ${169 + dy} ${70 + dx} ${181 + dy} ${66 + dx} ${191 + dy}"`
      + ` fill="none" stroke="${col}" stroke-width="10"/>`;
  }).join('');

  return `<svg viewBox="0 0 300 300" xmlns="http://www.w3.org/2000/svg" role="img">
  <g stroke-linejoin="round" stroke-linecap="round">

  <!-- 1. QUEUE : masse violette (couche la plus basse de l'arc-en-ciel), six
       bandes, puis le contour RETRACÉ par-dessus — les bandes débordent
       toujours un peu de la masse. -->
  <path d="${QUEUE}" fill="${M5}" stroke="${CRIN_T}" stroke-width="3.2"/>
  ${bandesQueue}
  <path d="${QUEUE}" fill="none" stroke="${CRIN_T}" stroke-width="3.2"/>

  <!-- 2. MEMBRES DU FOND -->
  ${membresFond(d)}

  <!-- 4. CORPS + COU + TÊTE + MUSEAU : une seule silhouette -->
  <path d="${CORPS}" fill="${c.robe}" stroke="${TRAIT}" stroke-width="3.4"/>

  <!-- 5. MARQUE DE BEAUTÉ sur la croupe. Elle est prise en étau : l'éclair
       descend de 26 unités sous le nuage et le bord haut de la patte arrière
       proche passe de (131,182) à (162,163), donc au-delà de y 168 la pointe
       disparaît sous la cuisse ; au-dessus, c'est l'aile déployée qui avale le
       nuage. D'où une marque haute, compacte, et une aile remontée. -->
  ${marque(150, 142, .62, M)}

  <!-- 5 bis. AILE DÉPLOYÉE : après le corps, avant les membres proches. Sa
       pointe reste à x < 171 pour rester hors de la fenêtre de portrait.
       Remontée de 11 unités par rapport à la position générique de
       _commun.js : à sa place nominale son bord bas descend à y 143 et
       recouvre le nuage de la marque de beauté. Sa racine reste sur la ligne
       du dos (194,121). -->
  <g transform="translate(-2 -11)">${aileDeployee(c, d)}</g>

  <!-- 6. MEMBRES PROCHES -->
  ${membresProches(c, d)}

  <!-- 6 ter. MUSEAU LISSE : l'encoche de bouche de la silhouette est rabotée.
       Bouche fermée, elle laissait une marche de 10 unités au bout du museau,
       que le comparateur lisait comme un bec. -->
  ${museauLisse(c, d)}

  <!-- 7. NASEAU + SOURIRE EN COIN à GRAND crochet (2) : le sourire remonte
       nettement d'un seul côté. C'est l'asymétrie, pas la largeur, qui fait le
       sourire crâneur. Le crochet monte en RECULANT, cf. _commun.js : l'encoche
       est rentrante et interdit tout point à x > 271 entre y 96 et 101. -->
  ${naseau(d)}${sourireCoin(d, 2)}


  <!-- 8. YEUX -->
  ${oe(OEIL_PROCHE)}${oe(OEIL_LOIN)}

  <!-- 8 bis. LE PLISSEMENT : la paupière haute laisse .64 d'ouverture et la
       basse remonte de .1, soit une fente de ~54 % de l'œil. Trois valeurs
       essayées : à .5 / .15 l'œil devient une fente et, en vignette de galerie,
       Rainbow Dash a l'air ENDORMIE plutôt que crâneuse — l'iris doit rester
       lisible à 60 px de large. Au-delà de .7 la paupière disparaît et le regard
       redevient neutre. C'est le SOURCIL qui porte l'arrogance ; la paupière ne
       fait que l'appuyer. -->
  ${paupiereHaute(c, d, .72)}
  ${paupiereBasse(c, d, .07)}

  <!-- 8 ter. SOURCIL relevé, sur le front nu au-dessus de l'œil proche
       (ligne de cheveux de la crête : (256,52) → (240,44) → (226,43)). Quatre
       cotes, toutes relevées sur refs/rainbow-dash-smirk.png : il est COURT
       (moitié de la largeur de l'œil, pas plus — long, il se lit comme un pli du
       front), FIN (2,2), PLAT (deux unités de dénivelé, pas cinq) et NOIR
       (CRAYON, cf. _commun.js). Le premier jet le peignait en PUPILLE, soit magenta vif, et
       nettement arqué : à ce compte-là ce n'est plus un sourcil crâneur mais un
       sourcil de colère, et c'était le défaut n° 1 du personnage. Il monte vers
       l'AVANT ; vers l'arrière il ferait un air inquiet. Posé ici, donc sous la
       crinière : la crête en recouvre l'attache. -->
  ${sourcil(d.CRAYON, "M226 57.5C231 54.5 236.5 53.5 241.5 54.5", 2.2)}

  <!-- 9. PAUPIÈRES du clignement : elles recouvrent l'amande entière, donc aussi
       les paupières fixes ci-dessus. -->
  ${paupieres(c)}

  <!-- 10. contour de la joue, par-dessus l'œil lointain -->
  ${joue(d)}

  <!-- 11. (pas de corne : pégase — l'aile est posée en 5 bis) -->

  <!-- 12. CRINIÈRE. Masse de fond (rouge, la couche la plus haute), puis les
       six mèches de la plus profonde à la plus haute, puis le contour de la
       masse RETRACÉ : les mèches débordent toujours un peu. -->
  <path d="${CRETE}" fill="${M[0]}" stroke="${CRIN_T}" stroke-width="3.2"/>
  <!-- Les six bandes se touchent SANS liseré : dans la référence il n'y a pas de
       contour entre deux couleurs de crinière, et le liseré violet foncé du
       premier jet cernait chaque mèche d'un trait épais qui alourdissait toute
       la crête. Seule la MASSE garde son contour. -->
  <g stroke="none">
    ${MECHES_CRETE.map((m, i) => `<path d="${meche(m)}" fill="${M[5 - i]}"/>`).join('')}
  </g>
  <path d="${CRETE}" fill="none" stroke="${CRIN_T}" stroke-width="3.2"/>

  <!-- 12 bis. OREILLE, ici et pas en couche 3 : la crête arrière recouvre
       entièrement la zone de l'oreille (181 → 205, 56 → 101), et le débord des
       mèches par-dessous n'est PAS rattrapé par le contour retracé (un
       tracé en fill=none retrace le bord, il ne découpe rien). L'oreille est donc
       posée DEVANT la crinière, ce qui est de toute façon la bonne lecture :
       l'oreille proche est en avant des mèches rejetées derrière la tête. Le
       pli interne, que le contour du corps dessinait en couche 4, est retracé
       à la main juste après. -->
  <path d="${OREILLE}" fill="${c.robe}" stroke="${TRAIT}" stroke-width="3.2"/>
  <path d="M202 62C200 74 200 86 202 100" fill="none" stroke="${TRAIT}" stroke-width="3.4"/>

  <path d="${MECHE}" fill="${M[0]}" stroke="${CRIN_T}" stroke-width="3.2"/>
  <g stroke="none">
    ${MECHES_COU.map((m, i) => `<path d="${meche(m)}" fill="${M[5 - i]}"/>`).join('')}
  </g>
  <path d="${MECHE}" fill="none" stroke="${CRIN_T}" stroke-width="3.2"/>

  <!-- 13. CILS AU COIN HAUT-ARRIÈRE, noirs (convention de la vague 2, désormais
       partagée). Au coin bas et en magenta, ils se lisaient comme trois
       griffures sur la joue. -->
  ${cilsCoinHaut(d, 3, 2.4)}

  </g>
</svg>`;
};

// Médaillon. Pas de disque de robe : le nuage blanc et l'éclair se lisent seuls
// sur le fond clair de la fiche — mais on le garde pour rester homogène avec
// les autres marques, et parce que le blanc du nuage a besoin d'un fond coloré.
export const cutieMark = (c) => {
  const M = [0, 1, 2, 3, 4, 5].map(i => c.criniere[i] ?? c.criniere[0]);
  return `<svg viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg" role="img">
  <circle cx="30" cy="30" r="30" fill="${c.robe}"/>
  ${marque(30, 26, 1.05, M)}
</svg>`;
};
