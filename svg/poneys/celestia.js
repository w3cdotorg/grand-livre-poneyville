// ───────────────────────────────────────────────────────────────────────────────
// Princesse Celestia — ALICORNE. Corne ET ailes, couronne, peytral, souliers, et
// la grande crinière-ruban multicolore qui flotte.
//
// RÉFÉRENCES PLEIN PIED (règle « aucun visage ne se dessine de mémoire ») :
//   `File:Princess Celestia ID S2E09.png`
//     https://mlp.fandom.com/wiki/File:Princess_Celestia_ID_S2E09.png
//     (517 × 537 — LA référence utile : debout, de trois quarts, ailes rangées,
//     la pose du template en miroir ; `refs/w3-celestia-2.png`, gros plan
//     `refs/zoom-celestia2-tete.png`)
//   `File:Princess Celestia ID S4E01.png`
//     https://mlp.fandom.com/wiki/File:Princess_Celestia_ID_S4E01.png
//     (600 × 700, ailes déployées, gros plan du visage et des bijoux ;
//     `refs/w3-celestia-pp.png`, gros plan `refs/zoom-celestia-tete.png`)
//
// ── LE GABARIT D'ALICORNE, la trouvaille de la fiche ─────────────────────────
// Sur la référence debout, le rapport tête / hauteur totale est de **21 %** —
// contre 33 % pour Twilight et 39 % pour une pouliche. Une princesse est donc
// beaucoup plus élancée que le template, et pas d'un peu.
// Mais la fenêtre de portrait (`171 6 124 124`) est FIXE et la tête doit la
// remplir : on ne peut ni réduire la tête ni mettre tout le personnage à
// l'échelle. La solution est de garder la tête EXACTEMENT canonique — donc tous
// les helpers de visage, le clignement et le cadrage marchent tels quels — et
// d'allonger ce qui reste :
//   · le COU passe de 26 à 44 unités (bord arrière (202,100) → (190,144) au lieu
//     de (194,126)) et la gorge descend de (243,116) à (214,192) au lieu de
//     (216,181) ;
//   · les JAMBES sont les jambes canoniques dans un groupe
//     `translate(13.6 -1.8) scale(.92 1.097)` : 10 % plus longues et 8 % plus
//     fines, sabots à y 290 au lieu de 266. Les deux nombres sont contraints
//     par deux points : le haut de la patte doit rester CACHÉ sous le nouveau
//     ventre (y 194) et le sabot doit rester dans le viewBox (y < 300).
// Résultat : rapport tête / hauteur totale de 26 % au lieu de 30 %, dans la
// limite de ce que la fenêtre de portrait autorise. C'est aussi ce qui distingue
// Celestia de Luna, dont le même gabarit est repris un cran moins étiré.
//
// Autres relevés :
//   · sa crinière et sa queue ne sont pas des mèches mais un RUBAN qui flotte,
//     à QUATRE bandes de couleur — la quatrième (un violet, #dfa8f7 à la
//     pipette) manquait au fichier de données, qui n'en donnait que trois ;
//   · son œil est très grand, à cerne noir épais, iris VIOLET (et non le lilas
//     très pâle du fichier de données, qui disparaissait sur une robe blanche),
//     et il porte les cils les plus longs du livre avec ceux de Rarity ;
//   · l'expression est BIENVEILLANTE ET SEREINE : paupière à peine rabattue
//     (.80) et sourire doux fermé. Aucun sourcil — la frange couvre le front,
//     et de toute façon un sourcil sur ce visage-là le rend sévère.
// ───────────────────────────────────────────────────────────────────────────────
import {
  ton, derives, OREILLE, CORPS_ALICORNE, CADRE_JAMBES, membresFond, membresProches, naseau,
  sourireDoux, oeil, OEIL_PROCHE, OEIL_LOIN, paupieres, paupiereHaute,
  joue, cilsCoinHaut, museauLisse, corne, aileAlicorne, etincelle,
  souliersFond, souliersProches, peytral, couronne,
} from "./_commun.js";

// ── LE RUBAN DE CRINIÈRE — REFAIT AU TROISIÈME TOUR, et c'est LA correction de
//    la fiche des deux princesses. Premier jet : un ruban dont la racine était au
//    SOMMET du crâne et qui filait vers l'arrière-bas jusqu'à x 72, en laissant
//    entre lui et le cou une bande de fond de trente unités. Rendu en grand, le
//    résultat était sans appel : la crinière et la queue se chaînaient en UNE
//    SEULE GRANDE ANSE au-dessus du dos, une poignée d'arc-en-ciel accrochée à la
//    tête. Le défaut n'était pas la couleur ni la largeur mais le TRAJET.
//    Une crinière de poney POSE sur le cou : son bord intérieur doit mordre sur
//    l'encolure (bord arrière de cou à x 201 vers y 110, x 190 vers y 144), et
//    c'est seulement en bas, sur le flanc, qu'elle a le droit de s'échapper. Le
//    ruban court donc maintenant de la nuque (200,30) en diagonale jusqu'au
//    garrot, bord intérieur sur le cou d'un bout à l'autre, et il S'ÉVASE
//    seulement en bas, sur l'épaule, là où il repose sur le tronc.
//    Trois bornes, toutes payées d'un tour de comparaison :
//      · le ruban doit s'arrêter au GARROT. Poussé jusqu'à y 192 il recouvrait
//        tout le tronc, l'aile et la marque : la princesse n'était plus qu'une
//        masse de crinière sur quatre jambes ;
//      · sa largeur ne peut pas dépasser ~30 unités le long du cou. À 45, il
//        débordait de cinquante unités dans le vide à gauche de l'encolure et se
//        lisait comme une SAUCISSE posée contre la tête ;
//      · la queue doit rester nettement plus étroite que lui, sinon les deux
//        rubans parallèles se lisent comme deux tuyaux jumeaux.
const RUBAN = "M204 32"
  + "C192 42 184 60 182 82"
  + "C180 104 178 124 172 142"
  + "C166 160 160 172 158 182"
  + "C168 186 180 180 188 168"
  + "C196 156 202 140 206 122"
  + "C210 100 212 78 213 58"
  + "C214 44 215 36 212 30"
  + "C208 26 206 28 204 32Z";
const AXE = (o) => `M${208 + o} ${34 + o * .4}C${196 + o} ${54 + o * .4} ${190 + o} ${82 + o * .4} ${187 + o} ${110 + o * .4}`
  + `C${184 + o} ${136 + o * .4} ${176 + o} ${160 + o * .4} ${172 + o} ${176 + o * .4}`;

// ── FRANGE. Bornes dures : bord bas au-dessus de y 56 entre x 213 et 230 (cils
//    du coin haut), rien sous y 62 au-delà de x 224 (amande 216 → 255 / 61 → 94),
//    et la masse s'arrête à x 250 pour que la CORNE se dresse devant elle.
const FRANGE = "M252 48"
  + "C243 54 231 56 220 55"
  + "C209 55 199 53 194 48"
  + "C189 38 192 25 202 18"
  + "C213 11 229 10 241 15"
  + "C252 20 258 28 258 37"
  + "C256 42 253 45 252 48Z";

// ── LA QUEUE, même ruban, du bas de la croupe vers le sol.
// ── LA QUEUE. Elle part ÉTROITE au dock (12 unités) et s'évase vers le bas
//    jusqu'à 40 : un ruban de largeur constante, essayé au tour précédent, se
//    lisait comme une grande FEUILLE posée à côté de la croupe, parce que ses
//    deux extrémités se refermaient à la même largeur.
const QUEUE = "M141 127"
  + "C128 131 118 142 112 158"
  + "C102 182 92 212 88 240"
  + "C88 254 102 260 114 252"
  + "C124 244 130 228 133 210"
  + "C137 186 142 162 148 146"
  + "C151 137 153 131 153 128Z";
const AXE_Q = (o) => `M${147 + o} ${132 + o * .25}C${134 + o} ${142 + o * .25} ${122 + o} ${164 + o * .25} ${113 + o} ${192 + o * .25}`
  + `C${105 + o} ${216 + o * .25} ${100 + o} ${238 + o * .25} ${101 + o} ${250 + o * .25}`;

// ── LE SOLEIL de la marque de beauté : disque plein et huit rayons flamboyants
//    (alternés longs / courts). Contrôlé dans le médaillon de 60 unités : à
//    seize rayons il devient une pelote, à quatre une étoile de mer.
const RAYON_L = "M0 -9L3.4 -21.5L-3.4 -21.5Z";
const RAYON_C = "M0 -9L2.6 -16.5L-2.6 -16.5Z";
const SOLEIL = (x, y, e, f, t) => `<g transform="translate(${x} ${y}) scale(${e})">
    <g fill="${f}" stroke="${t}" stroke-width="1.4">${
      [0, 90, 180, 270].map((a) => `<path transform="rotate(${a})" d="${RAYON_L}"/>`).join('')
    }${
      [45, 135, 225, 315].map((a) => `<path transform="rotate(${a})" d="${RAYON_C}"/>`).join('')
    }</g>
    <circle r="9.6" fill="${f}" stroke="${t}" stroke-width="1.6"/>
  </g>`;

export default (c) => {
  const d = derives(c);
  const { M0, M1, M2, M3, TRAIT } = d;
  const OR = c.or ?? "#f7c55c";
  const OR_T = ton(OR, .85, -.22);
  const GEMME = "#a24fb0";                 // améthyste de la couronne et du peytral
  const GEMME_T = ton(GEMME, .9, -.18);
  // Contour de crinière. Le ruban est fait de quatre pastels ; un `CRIN_T`
  // dérivé du seul premier (l'aqua) cerne les trois autres d'un liseré vert très
  // voyant — le piège déjà rencontré sur la crête de Rainbow Dash. Il dérive
  // donc de la bande la plus SOMBRE, le violet.
  // Adouci à la boucle de comparaison : à +15 % de saturation et −26 % de
  // luminosité, le liseré violet était un TRAIT FLUO qui cernait le ruban et
  // transformait la crinière en serpent arc-en-ciel. Sur la référence la masse
  // n'a presque pas de contour, et aucun entre deux bandes.
  const CRIN_T = ton(M3, .5, -.14);
  // Contour de CORNE renforcé, comme chez Rarity : `TRAIT` tiré d'une robe
  // blanche (#fdfdff) est un gris presque invisible, et la corne disparaît.
  const CORNE_T = ton(c.robe, .4, -.34);
  // Contour d'AILE, plus sombre encore que celui de la corne : l'aile est un
  // grand aplat blanc sur un corps blanc, et au TRAIT du template elle
  // disparaissait purement et simplement du flanc.
  const AILE_T = ton(c.robe, .4, -.44);
  // Crayon à cils : `CRAYON` dérive d'un œil violet et en tire un prune encore
  // coloré ; les cils de la référence sont noirs.
  const CRAYON = ton(c.yeux, .3, -.5);
  const oe = oeil(c, { ...d, PUPILLE: CRAYON });

  // Une passe de bandes : quatre traits épais le long de l'axe, du bord
  // extérieur vers l'intérieur, puis le contour du ruban retracé par-dessus
  // (les bandes débordent toujours un peu — cf. NOTES.md).
  const bandes = (axe, w) => [M0, M1, M2, M3].map((col, i) =>
    `<path d="${axe(-3 - i * 6.5)}" fill="none" stroke="${col}" stroke-width="${w}"
        stroke-linecap="round"/>`).join('');

  return `<svg viewBox="0 0 300 300" xmlns="http://www.w3.org/2000/svg" role="img">
  <g stroke-linejoin="round" stroke-linecap="round">

  <!-- 1. LA QUEUE-RUBAN : masse, quatre bandes, contour retracé, étincelles -->
  <path d="${QUEUE}" fill="${M0}" stroke="${CRIN_T}" stroke-width="2.4"/>
  ${bandes(AXE_Q, 6.6)}
  <path d="${QUEUE}" fill="none" stroke="${CRIN_T}" stroke-width="2.4"/>
  ${etincelle(70, 196, .38, "#fffdf4")}${etincelle(48, 236, .3, "#fffdf4")}

  <!-- 2. MEMBRES DU FOND, allongés et affinés, avec leurs souliers -->
  <g ${CADRE_JAMBES}>${membresFond(d)}${souliersFond(OR, OR_T)}</g>

  <!-- 4. CORPS + COU + TÊTE + MUSEAU : une seule silhouette, gabarit alicorne -->
  <path d="${CORPS_ALICORNE}" fill="${c.robe}" stroke="${TRAIT}" stroke-width="3.4"/>

  <!-- 5. MARQUE DE BEAUTÉ : le soleil, sur la croupe. Placée à (146,158) et non
       à (141,154) : le tronc est descendu de 12 unités avec le gabarit. -->
  ${SOLEIL(146, 158, .84, OR, OR_T)}

  <!-- 5 bis. AILE D'ALICORNE, descendue de 8 pour suivre le dos du gabarit
       allongé (à sa place nominale son bord haut sortait au-dessus du garrot). -->
  <g transform="translate(0 8)">${aileAlicorne(c, { TRAIT: AILE_T })}</g>

  <!-- 6. MEMBRES PROCHES + leurs souliers -->
  <g ${CADRE_JAMBES}>${membresProches(c, d)}${souliersProches(OR, OR_T)}</g>

  <!-- 6 bis. LE PEYTRAL, descendu de 8 sur le cou allongé -->
  <g transform="translate(0 8)">${peytral(OR, OR_T)}
    <path d="M213 153C218 153 221 157 221 161 221 166 218 169 213 169
             C209 169 206 166 206 161 206 157 209 153 213 153Z"
          fill="${GEMME}" stroke="${GEMME_T}" stroke-width="1.6"/>
    <path d="M211 157C213 156 215 157 216 158" fill="none" stroke="#f0c9f7"
          stroke-width="1.5"/>
  </g>

  <!-- 6 ter. MUSEAU LISSE : bouche fermée, sans lui le chanfrein finit en bec -->
  ${museauLisse(c, d)}

  <!-- 7. NASEAU + SOURIRE DOUX long et à peine relevé : la sérénité -->
  ${naseau(d)}${sourireDoux(d, 1.1, .35)}

  <!-- 8. YEUX, iris violet, liseré et pupille noirs -->
  ${oe(OEIL_PROCHE)}${oe(OEIL_LOIN)}

  <!-- 8 bis. PAUPIÈRE à .80 : le regard bienveillant. Grand ouvert, Celestia a
       l'air surprise ; sous .72 elle a l'air lasse. -->
  ${paupiereHaute(c, { TRAIT: CRAYON }, .8)}

  <!-- 9. PAUPIÈRES du clignement -->
  ${paupieres(c)}

  <!-- 10. contour de la joue, par-dessus l'œil lointain -->
  ${joue(d)}

  <!-- 12. LE RUBAN DE CRINIÈRE, puis la frange par-dessus sa racine -->
  <path d="${RUBAN}" fill="${M0}" stroke="${CRIN_T}" stroke-width="2.4"/>
  ${bandes(AXE, 7)}
  <path d="${RUBAN}" fill="none" stroke="${CRIN_T}" stroke-width="2.4"/>
  ${etincelle(126, 84, .4, "#fffdf4")}${etincelle(88, 150, .34, "#fffdf4")}
  ${etincelle(160, 60, .3, "#fffdf4")}

  <path d="${FRANGE}" fill="${M0}" stroke="${CRIN_T}" stroke-width="3.2"/>
  <path d="M254 36C243 28 228 26 215 29 206 31 199 36 196 42" fill="none"
        stroke="${M1}" stroke-width="8"/>
  <path d="M254 45C243 51 229 54 217 54" fill="none" stroke="${M2}" stroke-width="7"/>
  <path d="${FRANGE}" fill="none" stroke="${CRIN_T}" stroke-width="3.2"/>

  <!-- 12 bis. OREILLE, après la crinière (le ruban couvre sa zone
       181 → 205 / 56 → 101) ; le pli interne est retracé à la main. -->
  <path d="${OREILLE}" fill="${c.robe}" stroke="${TRAIT}" stroke-width="3.2"/>
  <path d="M202 62C200 74 200 86 202 100" fill="none" stroke="${TRAIT}" stroke-width="3.4"/>

  <!-- 12 ter. LA COURONNE, posée SUR la frange. Elle est RECULÉE de 30 unités :
       à sa place nominale sa pointe centrale (x 247 → 262) et sa bande
       (x 226 → 277) occupaient exactement la boîte de la corne (233 → 248 /
       19 → 46), qui disparaissait dessous. Sur les deux références le diadème
       ceinture le front DERRIÈRE la corne, qui le traverse. Le diadème est donc
       réduit à 85 % et reculé (translate(13.8 14) scale(.85), soit
       x' = .85x + 13,8 / y' = .85y + 14) : sa bande court de x 206 à x 249 sous
       la base de la corne, et sa pointe centrale culmine à y 23 en x 224 → 236,
       à gauche de la corne. Borne : le bord bas de la bande (y 54) doit rester
       au-dessus des cils du coin haut (y 57,7). -->
  <g transform="translate(13.8 14) scale(.85)">${couronne(OR, OR_T, GEMME, GEMME_T)}</g>

  <!-- 12 quater. CORNE, contour renforcé (sur une robe blanche le TRAIT du
       template est un gris presque invisible), ALLONGÉE de 26 % et avancée de 6.
       Relevé : la corne d'une alicorne fait 0,45 hauteur de tête, celle d'une
       licorne 0,36. La mise à l'échelle pivote sur la BASE (y 46) pour ne pas
       la décoller du front : y' = 1,26·y − 11,96 laisse la base à y 46 et porte
       la pointe de y 19 à y 12 — une unité au-dessus de la borne de la fenêtre
       de portrait. Elle passe APRÈS la crinière et
       non en couche 11 : la frange occupe x 194 → 258 et l'avalait ENTIÈREMENT
       — au premier tour de comparaison Celestia n'avait plus de corne du tout.
       Sur les deux références la corne se dresse devant la crinière. -->
  <g transform="translate(6 -11.96) scale(1 1.26)">${corne(c, { TRAIT: CORNE_T })}</g>

  <!-- 13. CILS AU COIN HAUT-ARRIÈRE : trois, LONGS (1,7) et fins (2,3) -->
  ${cilsCoinHaut(d, 3, 2.3, 1.7, OEIL_PROCHE, 1, CRAYON)}

  </g>
</svg>`;
};

export const cutieMark = (c) => {
  const OR = c.or ?? "#f7c55c";
  return `<svg viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg" role="img">
  <circle cx="30" cy="30" r="30" fill="${c.robe}"/>
  ${SOLEIL(30, 30, 1.22, OR, ton(OR, .85, -.22))}
</svg>`;
};
