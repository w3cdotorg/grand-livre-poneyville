// ───────────────────────────────────────────────────────────────────────────────
// Princesse Luna — ALICORNE. Même gabarit élancé que sa sœur (`CORPS_ALICORNE`
// dans `_commun.js`), mais un cran moins étiré : le brief demande que Celestia
// soit nettement la plus grande des deux, et sur les références c'est le cas
// (jambes de Luna à `CADRE_JAMBES_LUNA`, sabots à y 281 contre 290).
//
// RÉFÉRENCES PLEIN PIED (règle « aucun visage ne se dessine de mémoire ») :
//   `File:Princess Luna ID S4E02.png`
//     https://mlp.fandom.com/wiki/File:Princess_Luna_ID_S4E02.png
//     (558 × 558 — debout, de trois quarts, TÊTE À DROITE : la pose du template
//     exactement, la meilleure référence de toute la vague ;
//     `refs/w3-luna-pp.png`, gros plan `refs/zoom-luna-tete.png`)
//   `File:Princess Luna ID S5E04.png`
//     https://mlp.fandom.com/wiki/File:Princess_Luna_ID_S5E04.png
//     (548 × 445 ; `refs/w3-luna-2.png`)
//
// Ce que la référence a corrigé ou imposé :
//   · SA COURONNE ET SON PEYTRAL SONT NOIRS. Relevé à la pipette : #020202 sur
//     les deux pièces (163 et 603 pixels dans les deux boîtes). Pas « bleu très
//     foncé », pas « argent » : noirs, avec une gemme et un croissant cyan. Ils
//     ne dérivent donc d'aucune couleur de `c` et restent des constantes
//     documentées ;
//   · sa robe et sa crinière avaient, dans le fichier de données, la même valeur
//     à 6 % près (#3b4699 contre #3d4fb5) : la crinière ne se détachait pas du
//     tout. Le relevé donne une robe SOMBRE ET DÉSATURÉE (#363a76) sous une
//     crinière BRILLANTE ET SATURÉE (#244abf) ; `js/data.js` a été recalé ;
//   · ses souliers sont clairs (argent), pas dorés ;
//   · son œil est grand, iris bleu-vert pâle, et ses cils sont les plus longs de
//     la vague — trois grands cils au coin haut-arrière, très visibles parce que
//     la robe est sombre ;
//   · l'expression est DOUCE ET UN PEU SOLENNELLE : paupière à .78 (un cran plus
//     basse que Celestia) et sourire doux à peine relevé. Aucun sourcil : sur la
//     référence son front est nu mais un sourcil sur ce visage-là le durcit
//     immédiatement, et Luna doit rester rassurante pour un enfant de 4 ans.
// ───────────────────────────────────────────────────────────────────────────────
import {
  ton, derives, OREILLE, CORPS_ALICORNE, CADRE_JAMBES_LUNA, membresFond,
  membresProches, naseau, sourireDoux, oeil, OEIL_PROCHE, OEIL_LOIN, paupieres,
  paupiereHaute, joue, cilsCoinHaut, museauLisse, corne, aileAlicorne, etincelle,
  souliersFond, souliersProches, peytral, couronne,
} from "./_commun.js";

// ── CONSTANTES DOCUMENTÉES : les bijoux de Luna ne dérivent d'aucune entrée de
//    `c`. Relevé sur `refs/w3-luna-pp.png`.
const NOIR = "#16161f";                  // couronne et peytral (#020202 relevé,
const NOIR_H = "#6f6f8a";                //  remonté à #16161f pour que le liseré
const CYAN = "#8fe3e0";                  //  reste lisible sur une robe sombre)
const CYAN_T = "#4aa8a8";

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

// ── FRANGE. Mêmes bornes que partout : bord bas au-dessus de y 56 entre x 213
//    et 230 (cils du coin haut), rien sous y 62 au-delà de x 224.
const FRANGE = "M250 47"
  + "C241 53 230 56 219 55"
  + "C209 55 200 52 195 47"
  + "C190 38 193 26 203 19"
  + "C214 12 229 11 240 16"
  + "C250 21 256 29 256 38"
  + "C254 42 251 44 250 47Z";

// ── LA QUEUE, même ruban étoilé.
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

// ── LE CROISSANT DE LUNE de la marque de beauté, posé sur la tache sombre : sur
//    la référence la marque de Luna n'est pas un croissant seul mais un croissant
//    CLAIR sur une plaque SOMBRE — c'est le contraste des deux qui la rend
//    lisible sur une robe bleu nuit. Un croissant seul, de la couleur de la
//    crinière, disparaissait sur le flanc.
const TACHE = "M-19 -3C-19 -14-11 -21 0 -21 12 -21 20 -13 20 -2"
  + "C20 10 12 19 0 19-12 19-19 9-19 -3Z";
const CROISSANT = "M-3 -14C4 -14 10 -8 10 0 10 8 4 14-3 14"
  + "C2 10 5 5 5 0 5 -5 2 -10-3 -14Z";
const MARQUE = (x, y, e) => `<g transform="translate(${x} ${y}) scale(${e})">
    <path d="${TACHE}" fill="${NOIR}" stroke="${NOIR_H}" stroke-width="1.6"/>
    <path d="${CROISSANT}" transform="translate(1 -1) scale(1.05)"
          fill="#f4f7ff" stroke="#c3cbe4" stroke-width="1.4"/>
  </g>`;

export default (c) => {
  const d = derives(c);
  const { M0, M1, TRAIT } = d;
  const ARGENT = c.argent ?? "#d8dcee";
  const ARGENT_T = ton(ARGENT, .5, -.3);
  // Contour d'AILE plus CLAIR que la robe, et non plus foncé : l'aile est un
  // aplat de robe voilé de 10 % de noir, donc plus sombre que le corps ; sur une
  // robe bleu nuit un contour assombri comme le veut le template la faisait
  // disparaître entièrement du flanc.
  const AILE_T = ton(c.robe, .55, .14);
  // Contour de crinière : la masse est un bleu vif sur une robe bleu sombre.
  // Un `CRIN_T` dérivé de la masse (−16,5 %) tombe pile sur la valeur de la robe
  // et la crinière n'a plus de bord du tout. Il faut descendre bien plus bas.
  // Le bord du ruban est VIOLET et non bleu foncé. C'est le relevé le plus utile
  // du personnage : sur les deux références la crinière de Luna est ourlée d'un
  // halo lilas (#8d88c3 à la pipette), et c'est lui qui la détache de la robe
  // bleu nuit. Un liseré bleu foncé, lui, tombe pile sur la valeur de la robe :
  // au premier tour de comparaison la crinière était un simple TUYAU bleu.
  const CRIN_T = "#8478c9";
  // Crayon à cils. Ici `CRAYON` (dérivé d'un œil bleu-vert PÂLE) donnerait un
  // vert sombre à peine distinct de la robe bleu nuit : les cils de Luna
  // disparaîtraient. Ils sont donc franchement NOIRS.
  const CRAYON = "#0d0d14";
  const oe = oeil(c, { ...d, PUPILLE: CRAYON });

  const bandes = (axe, w) => [M0, M1].map((col, i) =>
    `<path d="${axe(-4 - i * 11)}" fill="none" stroke="${col}" stroke-width="${w}"
        stroke-linecap="round"/>`).join('');
  const etoiles = (l) => l.map(([x, y, e]) => etincelle(x, y, e, "#f6f9ff")).join('');

  return `<svg viewBox="0 0 300 300" xmlns="http://www.w3.org/2000/svg" role="img">
  <g stroke-linejoin="round" stroke-linecap="round">

  <!-- 1. LA QUEUE-RUBAN étoilée -->
  <path d="${QUEUE}" fill="${M0}" stroke="${CRIN_T}" stroke-width="2.6"/>
  ${bandes(AXE_Q, 11)}
  <path d="${QUEUE}" fill="none" stroke="${CRIN_T}" stroke-width="2.6"/>
  ${etoiles([[100, 170, .44], [76, 198, .5], [58, 228, .4], [62, 250, .3],
             [118, 148, .34], [86, 222, .28], [66, 214, .22], [52, 244, .2]])}

  <!-- 2. MEMBRES DU FOND + souliers d'argent -->
  <g ${CADRE_JAMBES_LUNA}>${membresFond(d)}${souliersFond(ARGENT, ARGENT_T)}</g>

  <!-- 4. CORPS + COU + TÊTE + MUSEAU : gabarit alicorne -->
  <path d="${CORPS_ALICORNE}" fill="${c.robe}" stroke="${TRAIT}" stroke-width="3.4"/>

  <!-- 5. MARQUE DE BEAUTÉ : le croissant clair sur sa plaque sombre -->
  ${MARQUE(146, 158, .8)}

  <!-- 5 bis. AILE D'ALICORNE, descendue de 8 pour suivre le dos du gabarit -->
  <g transform="translate(0 8)">${aileAlicorne(c, { TRAIT: AILE_T })}</g>

  <!-- 6. MEMBRES PROCHES + souliers d'argent -->
  <g ${CADRE_JAMBES_LUNA}>${membresProches(c, d)}${souliersProches(ARGENT, ARGENT_T)}</g>

  <!-- 6 bis. LE PEYTRAL NOIR et son croissant cyan -->
  <g transform="translate(0 8)">${peytral(NOIR, NOIR_H)}
    <path d="${CROISSANT}" transform="translate(214 160) rotate(12) scale(.85)"
          fill="${CYAN}" stroke="${CYAN_T}" stroke-width="1.8"/>
  </g>

  <!-- 6 ter. MUSEAU LISSE : bouche fermée, sans lui le chanfrein finit en bec -->
  ${museauLisse(c, d)}

  <!-- 7. NASEAU + SOURIRE DOUX, à peine relevé : la douceur solennelle -->
  ${naseau(d)}${sourireDoux(d, 1.05, .3)}

  <!-- 8. YEUX, iris bleu-vert pâle sur une robe sombre : le contraste le plus
       fort du livre. Liseré d'amande et pupille NOIRS. -->
  ${oe(OEIL_PROCHE)}${oe(OEIL_LOIN)}

  <!-- 8 bis. PAUPIÈRE à .78, un cran sous celle de Celestia : c'est ce qui
       sépare « sereine » de « un peu solennelle ». -->
  ${paupiereHaute(c, { TRAIT: CRAYON }, .78)}

  <!-- 9. PAUPIÈRES du clignement -->
  ${paupieres(c)}

  <!-- 10. contour de la joue, par-dessus l'œil lointain -->
  ${joue(d)}

  <!-- 12. LE RUBAN DE CRINIÈRE étoilé, puis la frange sur sa racine -->
  <path d="${RUBAN}" fill="${M0}" stroke="${CRIN_T}" stroke-width="2.6"/>
  ${bandes(AXE, 12)}
  <path d="${RUBAN}" fill="none" stroke="${CRIN_T}" stroke-width="2.6"/>
  ${etoiles([[124, 96, .5], [98, 134, .46], [86, 172, .4], [152, 76, .38],
             [106, 188, .3], [138, 112, .34], [172, 60, .28], [92, 152, .26],
             [112, 118, .24], [80, 190, .22]])}

  <path d="${FRANGE}" fill="${M0}" stroke="${CRIN_T}" stroke-width="2.6"/>
  <path d="M252 36C241 29 227 27 214 30 205 32 199 37 197 43" fill="none"
        stroke="${M1}" stroke-width="9"/>
  <path d="${FRANGE}" fill="none" stroke="${CRIN_T}" stroke-width="2.6"/>
  ${etoiles([[214, 25, .3], [236, 21, .24], [204, 39, .2]])}

  <!-- 12 bis. OREILLE, après la crinière (le ruban couvre sa zone) ; le pli
       interne est retracé à la main. -->
  <path d="${OREILLE}" fill="${c.robe}" stroke="${TRAIT}" stroke-width="3.2"/>
  <path d="M202 62C200 74 200 86 202 100" fill="none" stroke="${TRAIT}" stroke-width="3.4"/>

  <!-- 12 ter. LA COURONNE NOIRE, réduite et reculée comme celle de Celestia :
       à sa place nominale elle occupe la boîte de la corne. -->
  <g transform="translate(13.8 14) scale(.85)">${couronne(NOIR, NOIR_H, CYAN, CYAN_T)}</g>

  <!-- 12 quater. CORNE, allongée de 26 % sur pivot de base et avancée de 6 —
       même cote que Celestia : la corne d'une alicorne fait 0,45 hauteur de
       tête contre 0,36 pour une licorne. -->
  <g transform="translate(6 -11.96) scale(1 1.26)">${corne(c, d)}</g>

  <!-- 13. CILS AU COIN HAUT-ARRIÈRE : trois, LONGS (1,8) — les plus longs de la
       vague, très lisibles parce que la robe est sombre. -->
  ${cilsCoinHaut(d, 3, 2.5, 1.8, OEIL_PROCHE, 1, CRAYON)}

  </g>
</svg>`;
};

export const cutieMark = (c) => `<svg viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg" role="img">
  <circle cx="30" cy="30" r="30" fill="${c.robe}"/>
  ${MARQUE(30, 31, 1.2)}
</svg>`;
