// ───────────────────────────────────────────────────────────────────────────────
// Rarity — licorne. Dérivée du TEMPLATE CANON `twilight.js` via `_commun.js`
// (carcasse, œil, museau, oreille, membres, corne).
//
// Singularités : crinière et queue en VOLUTES. Une volute ne se dessine pas
// comme un tracé fermé — il faudrait un contour qui se recroise. On la dessine
// comme un TRAIT ÉPAIS le long d'une spirale, à bouts ronds, passé deux fois :
// d'abord large en `CRIN_T` (ce qui fait le contour), puis plus fin en `M0`.
// Là où la spirale se recouvre elle-même, la seconde passe efface la première :
// la volute se referme proprement, sans couture interne.
//
// ── EXPRESSION SIGNATURE, REFAITE SUR RÉFÉRENCE PLEIN PIED (24/08/2026) :
//    `File:Rarity id S1E08.png` — https://mlp.fandom.com/wiki/File:Rarity_id_S1E08.png
//    (840 × 720, la plus détaillée des six ; complément d'expression :
//    `refs/rarity-sweet.png`, `refs/rarity-canterlot.png`).
//    Paupières mi-closes, cils spectaculaires et sourire posé : tout cela reste.
//    Trois cotes changent, et la troisième est un revirement :
//      · les CILS sortent du coin HAUT-arrière. Au coin bas, quatre cils longs et
//        épais faisaient quatre traits noirs en travers de la joue — de loin le
//        pire défaut du personnage au comparateur, on lui voyait des moustaches ;
//      · la paupière du fard passe de `.6` à `.72`. Sur la référence, le fard est
//        une BANDE le long du bord haut (un quart de la hauteur d'œil), pas une
//        paupière à moitié rabattue : à `.6` l'œil de Rarity était le plus fermé
//        de la galerie alors qu'elle a les plus grands yeux de la série ;
//      · **elle a bien un SOURCIL.** La passe expressions avait conclu que non,
//        et le raisonnement était juste pour la frange d'alors, coiffée EN AVANT
//        et dont le bord bas passait par (238,66) — plus bas que le sommet de
//        l'œil. Mais les deux références montrent une frange REJETÉE EN ARRIÈRE
//        qui dégage le front, et un sourcil fin et arqué dessus. La frange est
//        donc remontée, et le sourcil posé dans les 7 unités de front nu.
//
//    Et surtout : le FARD À PAUPIÈRES est visible YEUX OUVERTS. Il l'était
//    seulement au clignement, ce qui revenait à cacher sa marque de fabrique
//    99 % du temps. La solution est d'un seul tenant : la paupière fixe
//    mi-close est peinte du fard, si bien que le lilas est exactement l'aplat
//    qu'on voit dans la série au-dessus de l'œil. Sur la référence ce fard est
//    un bleu-lilas CLAIR, plus clair que la crinière — d'où `ton(M0, .55, .34)`.
// ───────────────────────────────────────────────────────────────────────────────
import {
  ton, derives, OREILLE, CORPS, membresFond, membresProches, naseau,
  sourirePose, oeil, OEIL_PROCHE, OEIL_LOIN, paupieres, paupiereHaute,
  joue, cilsCoinHaut, sourcil, museauLisse, corne,
} from "./_commun.js";

// ── FRANGE, REFAITE SUR RÉFÉRENCE : REJETÉE EN ARRIÈRE. Le premier jet la
//    coiffait EN AVANT, bord bas descendant jusqu'à (216,82) — donc par-dessus
//    tout l'arrière de l'œil (amande 216 → 255 / 61 → 94). C'est ce qui
//    interdisait à la fois le sourcil et les cils du coin haut. Les deux
//    références montrent l'inverse : la masse violette est BALAYÉE VERS
//    L'ARRIÈRE, son bord bas court à 0,12 hauteur de tête au-dessus de l'œil, et
//    le front est nu entre les deux.
//    Bornes : bord bas au-dessus de y 56 entre x 205 et x 230 (les cils du coin
//    haut occupent x 215 → 228 / y 57,7 → 66,4, et le sourcil y 56,5 → 58,5) ;
//    la masse s'arrête à x 240, si bien qu'elle ne couvre que la BASE ARRIÈRE de
//    la corne : sur les deux références la corne se dresse DEVANT la crinière,
//    dégagée sur toute sa longueur, et le front reste blanc entre elle et l'œil
//    lointain. Premier essai poussé jusqu'à x 255 : la frange avalait les deux
//    tiers de la corne et se lisait comme un béret posé de travers.
const FRANGE = "M243 44"
  + "C236 49 226 53 216 55"
  + "C208 57 200 57 195 55"
  + "C191 49 192 39 197 32"
  + "C205 25 215 22 224 22"
  + "C232 23 238 26 241 31"
  + "C239 35 239 40 243 44Z";

// ── VOLUTES. Chemins de spirale : chaque volute part de la base de la frange
//    et s'enroule vers son centre. Le trait épais fait le volume.
const VOLUTE_TETE = "M198 62C184 66 174 78 176 92 178 104 190 112 201 108"
  + "C210 105 214 95 210 87 207 81 199 79 194 84 191 88 192 93 196 95";
const VOLUTE_COU = "M200 104C192 116 189 132 194 146 199 158 212 163 221 156"
  + "C229 150 229 138 223 132 218 127 210 128 207 134 205 138 207 143 211 144";
// La queue est une seule grande volute qui descend sous la croupe et se
// retourne vers l'avant.
const VOLUTE_QUEUE = "M142 128C118 133 99 150 94 174 89 198 100 220 120 229"
  + "C138 237 156 228 159 211 161 197 150 187 138 190 130 192 126 200 130 207";

// ── DIAMANT de la marque de beauté : taille brillant vue de face — table
//    (le plat du haut), couronne, pavillon en pointe. Les facettes ne sont pas
//    décoratives : sans elles le losange se lit comme un cerf-volant.
const DIAMANT = "M-7 -6L-3 -11 3 -11 7 -6 0 11Z";
const BLEU = "#7fc3e8";
const BLEU_T = ton(BLEU, 1, -.2);
const diamant = (x, y, e) => `<g transform="translate(${x} ${y}) scale(${e})">
    <path d="${DIAMANT}" fill="${BLEU}" stroke="${BLEU_T}" stroke-width="1.8"/>
    <g fill="none" stroke="${BLEU_T}" stroke-width="1.2">
      <path d="M-7 -6L7 -6"/><path d="M-3 -11L-1.4 -6"/><path d="M3 -11L1.4 -6"/>
      <path d="M-3.6 -6L0 11"/><path d="M3.6 -6L0 11"/>
    </g>
  </g>`;
// Trois diamants en triangle pointe en bas, comme les pommes d'Applejack.
const TROIS_DIAMANTS = (x, y, e) =>
  diamant(x - 9 * e, y - 8 * e, e) + diamant(x + 9 * e, y - 8 * e, e) + diamant(x, y + 10 * e, e);

export default (c) => {
  const d = derives(c);
  const { M0, TRAIT, CRIN_H } = d;
  // Contour de crinière renforcé : `CRIN_T` du template (-16,5 %) ne détache
  // pas un trait épais violet foncé de la volute qu'il cerne.
  const CRIN_T = ton(M0, 1.25, -.21);
  // Fard à paupières. Relevé sur `refs/rarity-canterlot.png` : c'est un BLEU
  // lilas clair, nettement plus bleu que la crinière. Un `ton(M0, …)` en donnait
  // un gris-violet qui, sur une robe presque blanche, se lisait comme une ombre
  // sale ; il dérive donc de la couleur des YEUX, désaturée et éclaircie.
  const FARD = ton(c.yeux, .5, .4);
  // Contour de CORNE renforcé. `TRAIT` dérive d'une robe quasi blanche
  // (#f2f0f7) : il en sort un gris-lavande très clair, avec lequel la corne
  // disparaissait purement et simplement sur le front — au comparateur on ne
  // voyait plus que ses quatre stries flotter. Sur la référence la corne est
  // cernée d'un gris franc.
  const CORNE_T = ton(c.robe, 1.05, -.34);   // gris-lavande franc
  const oe = oeil(c, d);

  // Une volute : passe large en contour, passe fine en crinière, filet clair.
  const volute = (trace, large) => `<path d="${trace}" fill="none" stroke="${CRIN_T}"
        stroke-width="${large}" stroke-linecap="round"/>
    <path d="${trace}" fill="none" stroke="${M0}"
        stroke-width="${large - 6.4}" stroke-linecap="round"/>
    <path d="${trace}" fill="none" stroke="${CRIN_H}"
        stroke-width="${(large - 6.4) * .3}" stroke-linecap="round" stroke-opacity=".8"/>`;

  return `<svg viewBox="0 0 300 300" xmlns="http://www.w3.org/2000/svg" role="img">
  <g stroke-linejoin="round" stroke-linecap="round">

  <!-- 1. QUEUE : une seule grande volute -->
  ${volute(VOLUTE_QUEUE, 40)}

  <!-- 2. MEMBRES DU FOND -->
  ${membresFond(d)}

  <!-- 4. CORPS + COU + TÊTE + MUSEAU : une seule silhouette -->
  <path d="${CORPS}" fill="${c.robe}" stroke="${TRAIT}" stroke-width="3.4"/>

  <!-- 5. MARQUE DE BEAUTÉ : trois diamants sur la croupe -->
  ${TROIS_DIAMANTS(146, 152, .78)}

  <!-- 6. MEMBRES PROCHES -->
  ${membresProches(c, d)}

  <!-- 6 ter. MUSEAU LISSE : bouche fermée, l'encoche de bouche de la silhouette
       restait vide et le museau se terminait en bec (cf. _commun.js). -->
  ${museauLisse(c, d)}

  <!-- 7. NASEAU + SOURIRE POSÉ : long, il remonte vers l'avant et s'achève sur
       un repli de lèvre. Le maintien, pas la joie. -->
  ${naseau(d)}${sourirePose(d)}

  <!-- 8. YEUX -->
  ${oe(OEIL_PROCHE)}${oe(OEIL_LOIN)}

  <!-- 8 bis. PAUPIÈRES peintes du FARD : .72 d'ouverture (et non .6). C'est
       ce qui rend le fard visible à l'état ouvert, et non plus au seul
       clignement. Le bord bas du fard est le bord bas même de l'œil remonté,
       donc rigoureusement parallèle à lui. -->
  ${paupiereHaute(c, d, .72, FARD)}

  <!-- 8 ter. SOURCIL FIN ET ARQUÉ — ajouté à la refonte du 24/08, avec la
       frange remontée. Le verdict « pas de front où le poser » de la passe
       expressions portait sur une frange coiffée en avant qui n'est pas celle
       des références. Il reste maintenant 7 unités entre le bord bas de la
       frange (y 54,5 à x 222) et le sommet de l'amande (y 61) : le sourcil y
       tient, à condition d'être MINCE (1,9). Il est arqué et non descendant —
       descendant, c'est l'air méprisant qu'on avait déjà écarté pour Diamond
       Tiara. -->
  ${sourcil(d.PUPILLE, "M222 59.6C227.5 56.8 234.5 56.2 241 58.4", 1.9)}

  <!-- 9. PAUPIÈRES du clignement, du même fard -->
  ${paupieres(c, 1, FARD)}

  <!-- 10. contour de la joue, par-dessus l'œil lointain -->
  ${joue(d)}

  <!-- 11. CORNE, avant la crinière pour que la frange couvre sa base. Contour
       renforcé : le TRAIT dérivé d'une robe quasi blanche la rendait invisible. -->
  ${corne(c, { TRAIT: CORNE_T })}

  <!-- 12. CRINIÈRE : frange, puis les deux volutes de la nuque et de l'encolure -->
  <path d="${FRANGE}" fill="${M0}" stroke="${CRIN_T}" stroke-width="3.2"/>
  <!-- reflet et séparation : ils suivent le BALAYAGE ARRIÈRE de la nouvelle
       frange, de la pointe avant (255,45) vers la nuque (203,42) -->
  <path d="M238 40C229 45 218 49 209 50 201 51 196 49 195 46" fill="none"
        stroke="${CRIN_H}" stroke-width="7"/>
  <path d="M239 45C230 50 219 54 209 55" fill="none"
        stroke="${ton(M0, 1.05, -.11)}" stroke-width="1.6"/>
  <path d="${FRANGE}" fill="none" stroke="${CRIN_T}" stroke-width="3.2"/>

  ${volute(VOLUTE_TETE, 26)}

  <!-- 12 bis. OREILLE, ici et pas en couche 3 : la volute de nuque couvre toute
       sa zone (181 → 205, 56 → 101), et un trait épais ne se rattrape pas au
       contour. L'oreille proche est de toute façon en avant de la volute
       rejetée derrière la tête ; le pli interne, dessiné par le contour du corps
       en couche 4, est retracé à la main juste après. -->
  <path d="${OREILLE}" fill="${c.robe}" stroke="${TRAIT}" stroke-width="3.2"/>
  <path d="M202 62C200 74 200 86 202 100" fill="none" stroke="${TRAIT}" stroke-width="3.4"/>

  ${volute(VOLUTE_COU, 26)}

  <!-- 13. CILS SPECTACULAIRES, au coin HAUT-arrière : trois (le répertoire
       cilsHauts de _commun.js en compte trois), très longs (l = 1,8) et ÉPAIS
       (3). Sur la référence ce sont quatre à cinq cils, mais ils se recouvrent :
       à l'échelle
       de la vignette, trois cils longs et épais rendent exactement la même
       masse, et quatre au même endroit se fondent en un pâté noir. C'est le
       poney de la galerie qui a les plus longs. -->
  ${cilsCoinHaut(d, 3, 2.5, 1.6)}

  </g>
</svg>`;
};

export const cutieMark = (c) => `<svg viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg" role="img">
  <circle cx="30" cy="30" r="30" fill="${c.robe}"/>
  ${TROIS_DIAMANTS(30, 30, 1.28)}
</svg>`;
