// ───────────────────────────────────────────────────────────────────────────────
// GUMMY — le bébé alligator de Pinkie Pie. Museau à droite, tête haute, corps bas
// dont l'axe descend en diagonale vers la gauche, queue enroulée dans le coin
// bas-gauche. Regard fixe iconique, bouche SANS DENTS, air placide.
//
// RÉFÉRENCES PLEIN PIED (API MediaWiki, dans `refs/`) :
//   · `refs/z-gummy-corps.png` — recadrage ×2 de
//     File:Gummy, Winona, and Opalescence appear S6E22.png (1280 × 720)
//     https://mlp.fandom.com/wiki/File:Gummy,_Winona,_and_Opalescence_appear_S6E22.png
//     PLEIN PIED complet (museau, dos à écailles, quatre pattes, queue) : LA
//     référence de silhouette. Gummy y regarde à gauche, tout est donc miroir.
//   · `refs/v4-gummy-stoic.png` — File:Gummy looking as stoic as ever S7E11.png
//     https://mlp.fandom.com/wiki/File:Gummy_looking_as_stoic_as_ever_S7E11.png
//     gros plan de la tête : c'est LUI qui donne la structure de l'œil.
//
// RELEVÉ MÉTRIQUE sur le plein pied (silhouette x 180 → 565, y 345 → 690 dans
// l'image d'origine ; facteur de report 0,554 pour que le bloc tête tienne dans
// la fenêtre de portrait `171 6 124 124`) :
//   | œil proche        | 57 × 103 px → 32 × 57 unités | PLUS DE 1,7 FOIS PLUS HAUT QUE LARGE |
//   | œil lointain      | 42 × 80 px  → 23 × 44        | et plus haut sur le crâne            |
//   | museau (pointe)   | 121 px devant l'œil, 132 px dessous | d'où la pointe en (289, 116) |
//   | tronc (épaisseur) | 160 px → 89 unités           | c'est un BARIL, pas un tube          |
//   | tête / silhouette  | 0,62 en hauteur              | la tête EST le personnage            |
//
// QUATRE RELEVÉS QUI FONT GUMMY, et sans eux ce n'est qu'un lézard vert :
//   1. **LES YEUX BOMBENT AU-DESSUS DU CRÂNE.** Le contour de la tête ne passe
//      pas devant les yeux, il fait une BOSSE par-dessus chacun, avec un creux
//      entre les deux. Un crâne lisse et deux ovales posés dessus : grenouille.
//   2. **L'IRIS EST RAYÉ EN RAYONS** — une douzaine de traits violets plus
//      sombres qui partent du centre. C'est la texture la plus reconnaissable du
//      personnage ; en aplat uni, l'œil devient une bille.
//   3. **LA PUPILLE EST UN CROISSANT NOIR MINCE**, pas un disque, collé au bord
//      haut-arrière de l'iris. Avec une pupille ronde Gummy REGARDE quelque
//      chose ; avec le croissant il regarde dans le vide — tout son comique.
//   4. **AUCUNE DENT.** La ligne de bouche est un simple trait le long du
//      museau, et le pâle du ventre remonte jusque sous la mâchoire.
//
// LE CORPS EST GÉNÉRÉ, PAS ÉCRIT — et c'est la trouvaille du personnage.
// Quatre tours ont été perdus à écrire le tronc « à la main » en un tracé fermé :
// à chaque fois la silhouette ressortait PLATE (25 à 40 unités d'épaisseur au
// lieu de 89) et Gummy se lisait comme une COSSE DE POIS. La cause est
// structurelle : dans un tracé fermé écrit point par point, l'épaisseur est la
// différence de deux courbes indépendantes, et rien ne la garantit — on croit
// régler une silhouette alors qu'on règle deux bords sans lien. Le tronc et la
// queue sont donc décrits par leur AXE et leur DEMI-LARGEUR, et les deux bords
// sont calculés par décalage perpendiculaire. L'épaisseur devient un paramètre,
// le ventre pâle et les écailles dorsales se posent sur le même axe, et tout se
// règle en changeant un nombre. À rejouer pour tout animal au corps allongé.
//
// PAUPIÈRES : dans la série, Gummy ne cligne pratiquement jamais et n'a pas de
// paupière visible. Le groupe `class="paupieres"` est néanmoins requis par les
// tests, et il est ici de la couleur de la ROBE : le clignement reste doux et
// drôle (les deux grands yeux disparaissent d'un coup dans le vert).
//
// Pas de marque de beauté (`cutieMark: null`) ; ce module n'en exporte pas.
// ───────────────────────────────────────────────────────────────────────────────
import { ton, derivesAnimal } from "./_commun.js";

// ── AXE DU CORPS : [x, y, demi-largeur], de la nuque à la pointe de queue. Les
//    deux premiers points sont NOYÉS DANS LA TÊTE (dessinée après), ce qui fait
//    disparaître l'attache — la technique des tubes de Spike.
const AXE = [
  [214, 112, 30],
  [192, 136, 36],
  [164, 157, 41],
  [134, 174, 42],
  [104, 189, 39],
  [76, 201, 35],
  [52, 214, 29],
  [34, 238, 21],
  [40, 260, 15],
  [64, 273, 11],
  [90, 276, 7],
];

// ── TÊTE : crâne à DEUX BOSSES D'YEUX, museau long qui descend vers la droite,
//    mâchoire, gorge. Tracé fermé, posé PAR-DESSUS le tube du corps.
const TETE = "M196 96"
  + "C198 78 201 66 202 50"
  + "C202 30 210 12 222 11"          // BOSSE de l'œil proche
  + "C232 10 240 22 242 34"          // creux entre les deux yeux
  + "C246 22 254 11 262 11"          // BOSSE de l'œil lointain
  + "C272 11 279 26 281 44"          // avant du crâne
  + "C284 62 288 90 289 112"         // dessus du museau, long et bas
  + "C289 120 284 124 277 122"       // bout du museau
  + "C263 120 249 122 237 126"       // mâchoire inférieure
  + "C228 136 218 146 210 152"       // gorge
  + "C200 158 188 156 184 148"       // dessous de la nuque
  + "C180 138 186 112 196 96Z";

// ── PATTES : quatre pattes courtes et TRAPUES (plus larges que longues), celles
//    du fond décalées. Les trois griffes claires ne sont pas décoratives : sans
//    elles, quatre moignons.
const PATTE_AV_FOND = "M146 190C140 204 140 220 148 230C156 237 168 237 175 230"
  + "C178 220 177 204 171 190C164 184 153 184 146 190Z";
const PATTE_AV = "M168 186C162 202 162 220 170 232C180 240 194 240 202 232"
  + "C206 220 204 200 196 186C188 180 176 180 168 186Z";
const PATTE_AR_FOND = "M80 222C74 236 74 250 82 259C90 266 102 266 109 259"
  + "C112 250 111 236 105 222C98 216 87 216 80 222Z";
const PATTE_AR = "M100 218C94 234 94 252 102 264C112 272 126 272 134 264"
  + "C138 252 136 232 128 218C120 212 108 212 100 218Z";

export default (c) => {
  const d = derivesAnimal(c);
  const { TRAIT } = d;
  const VENTRE_C = c.ventre ?? ton(c.robe, .7, .24);   // gardé : la clé est optionnelle
  const VENTRE_T = ton(VENTRE_C, .8, -.24);
  const ECAILLE_C = ton(c.robe, 1.05, -.09);           // crête dorsale, un cran plus sombre

  // ── Décalage perpendiculaire de l'axe. `k` = +1 côté ventre, −1 côté dos ;
  //    `f` = fraction de la demi-largeur.
  const bord = (k, f) => AXE.map(([x, y, w], i) => {
    const a = AXE[Math.max(0, i - 1)], b = AXE[Math.min(AXE.length - 1, i + 1)];
    const tx = b[0] - a[0], ty = b[1] - a[1];
    const n = Math.hypot(tx, ty) || 1;
    return [+(x + k * f * w * (ty / n)).toFixed(1), +(y - k * f * w * (tx / n)).toFixed(1)];
  });
  // Polyligne LISSÉE : des `Q` par les points, sommets aux milieux. Une
  // polyligne brute donne un corps facetté ; un `C` par segment demanderait des
  // tangentes explicites.
  const lisse = (pts, ouvre) => {
    let s = `${ouvre ? 'M' : 'L'}${pts[0][0]} ${pts[0][1]}`;
    for (let i = 1; i < pts.length - 1; i++) {
      const [x, y] = pts[i], [x2, y2] = pts[i + 1];
      s += `Q${x} ${y} ${+((x + x2) / 2).toFixed(1)} ${+((y + y2) / 2).toFixed(1)}`;
    }
    return `${s}L${pts.at(-1)[0]} ${pts.at(-1)[1]}`;
  };
  const inv = (pts) => [...pts].reverse();
  // CORPS : bord du ventre, puis retour par le bord du dos.
  const CORPS = `${lisse(bord(1, 1), true)}${lisse(inv(bord(-1, 1)), false)}Z`;
  // VENTRE PÂLE : la bande entre 0,50 et 1,0 de la demi-largeur, côté ventre.
  // À 0,32 il mangeait les deux tiers du tronc et Gummy devenait pâle.
  const VENTRE = `${lisse(bord(1, 1), true)}${lisse(inv(bord(1, .50)), false)}Z`;
  // ÉCAILLES DORSALES : des lobes RONDS accolés le long du bord du dos. Sur la
  // référence ce ne sont pas des pointes de dinosaure — des pointes font un
  // stégosaure, pas un bébé alligator.
  const LOBES = bord(-1, .92).slice(1, 9);
  // PLIS DU VENTRE : des traits perpendiculaires à l'axe, de 0,45 à 0,95 de la
  // demi-largeur. Sans eux, l'aplat clair se lit comme une ombre.
  const dedans = bord(1, .58), dehors = bord(1, .95);
  const PLIS = dedans.slice(1, 8).map((p, i) =>
    `<path d="M${p[0]} ${p[1]}L${dehors[i + 1][0]} ${dehors[i + 1][1]}"/>`).join('');

  // L'ŒIL DE GUMMY, la pièce maîtresse. Trois teintes dérivées de `c.yeux` :
  const IRIS_PALE = ton(c.yeux, .85, .18);   // cœur de l'iris (relevé #d9b5f8)
  const IRIS_RAIE = ton(c.yeux, 1, -.10);    // les rayons
  const IRIS_RIM = ton(c.yeux, 1.05, -.16);  // liseré (relevé #9024f0)
  // Les RAYONS de l'iris : douze traits qui partent d'un petit disque central et
  // filent vers le bord. Calculés sur l'ELLIPSE (16 × 29) et non sur un cercle,
  // sinon ils sortent en haut et manquent sur les côtés.
  const rayons = Array.from({ length: 12 }, (_, i) => {
    const a = (i / 12) * Math.PI * 2 + .26;
    const x = Math.cos(a), y = Math.sin(a);
    const p = (k) => `${+(x * 16 * k).toFixed(1)} ${+(y * 29 * k).toFixed(1)}`;
    return `<path d="M${p(.30)}L${p(.93)}"/>`;
  }).join('');
  // La PUPILLE EN CROISSANT : un fuseau mince le long du bord haut-arrière.
  const CROISSANT = "M-7 -23C-2 -15 2 -4 3 9C0 -4 -4 -15 -9 -22Z";
  const oeil = (t) => `<g transform="${t}">
    <ellipse rx="16" ry="29" fill="${IRIS_PALE}" stroke="${IRIS_RIM}" stroke-width="3.4"/>
    <g fill="none" stroke="${IRIS_RAIE}" stroke-width="1.5" stroke-linecap="round">
      ${rayons}
    </g>
    <path d="${CROISSANT}" fill="#0a0010" stroke="#0a0010" stroke-width="2.6"
          stroke-linejoin="round"/>
    <ellipse cx="-4" cy="-15" rx="6.2" ry="8.6" fill="#fff"/>
    <circle cx="5.4" cy="-2" r="3.2" fill="#fff"/>
  </g>`;
  // Placements relevés : l'œil proche bas et grand, le lointain plus haut et
  // réduit de 28 % en largeur pour 24 % en hauteur (la perspective l'écrase
  // moins en hauteur qu'en largeur — c'est un œil bombé, pas une amande plate).
  const OEIL_P = "translate(222 44)";
  const OEIL_L = "translate(262 36) scale(.72 .76)";

  return `<svg viewBox="0 0 300 300" xmlns="http://www.w3.org/2000/svg" role="img">
  <g stroke-linejoin="round" stroke-linecap="round">

  <!-- 1. PATTES DU FOND, en robe assombrie -->
  <g fill="${d.FOND}" stroke="${d.FOND_T}" stroke-width="2.8">
    <path d="${PATTE_AR_FOND}"/><path d="${PATTE_AV_FOND}"/>
  </g>

  <!-- 2. TRONC + QUEUE : le tube calculé sur l'axe (cf. en-tête). Ses deux
       premières sections sont noyées dans la tête, dessinée plus loin. -->
  <path d="${CORPS}" fill="${c.robe}" stroke="${TRAIT}" stroke-width="3.4"/>

  <!-- 3. VENTRE PÂLE + ses plis transversaux -->
  <path d="${VENTRE}" fill="${VENTRE_C}" stroke="${VENTRE_T}" stroke-width="2.4"/>
  <g fill="none" stroke="${VENTRE_T}" stroke-width="1.8">${PLIS}</g>

  <!-- 4. ÉCAILLES DORSALES, posées sur le bord du dos -->
  <g fill="${ECAILLE_C}" stroke="${TRAIT}" stroke-width="2.2">
    ${LOBES.map(([x, y]) => `<circle cx="${x}" cy="${y}" r="8.4"/>`).join('')}
  </g>

  <!-- 5. PATTES PROCHES, avec leurs griffes claires -->
  <g fill="${c.robe}" stroke="${TRAIT}" stroke-width="3">
    <path d="${PATTE_AR}"/><path d="${PATTE_AV}"/>
  </g>
  <g fill="none" stroke="${TRAIT}" stroke-width="2">
    <path d="M176 232C176 236 176 238 176 240"/>
    <path d="M185 234C185 238 185 240 185 242"/>
    <path d="M194 232C194 236 194 238 194 240"/>
    <path d="M108 264C108 268 108 270 108 272"/>
    <path d="M117 266C117 270 117 272 117 274"/>
    <path d="M126 264C126 268 126 270 126 272"/>
  </g>

  <!-- 6. TÊTE, par-dessus le tube : sa gorge recouvre l'attache -->
  <path d="${TETE}" fill="${c.robe}" stroke="${TRAIT}" stroke-width="3.4"/>
  <!-- le dessous de la mâchoire, pâle comme le ventre (relevé) -->
  <path d="M238 126C230 136 220 145 212 151C204 156 196 154 194 148C198 140 210 132 222 128C230 125 235 125 238 126Z"
        fill="${VENTRE_C}" stroke="${VENTRE_T}" stroke-width="2"/>

  <!-- 7. LIGNE DE BOUCHE le long du museau. AUCUNE DENT : Gummy n'en a pas,
       c'est même ce que raconte sa fiche. Elle s'arrête avant le bout du museau
       — poussée jusqu'à la pointe, elle coupe la tête en deux. -->
  <path d="M240 124C254 121 268 119 280 119" fill="none" stroke="${TRAIT}"
        stroke-width="2.4"/>
  <!-- NASEAUX : deux fentes sombres sur le renflement du bout du museau, plus le
       bourrelet qui les porte. Deux points seuls se lisent comme des grains de
       beauté (piège relevé sur Spike). -->
  <path d="M272 104C280 102 286 105 287 111" fill="none" stroke="${TRAIT}"
        stroke-width="2"/>
  <g fill="${ton(c.robe, .8, -.30)}">
    <ellipse cx="277" cy="110" rx="2.2" ry="3.4" transform="rotate(-18 277 110)"/>
    <ellipse cx="284" cy="112" rx="2.2" ry="3.4" transform="rotate(-18 284 112)"/>
  </g>

  <!-- 8. LES DEUX GRANDS YEUX -->
  ${oeil(OEIL_L)}${oeil(OEIL_P)}

  <!-- 9. PAUPIÈRES du clignement : les deux ellipses d'iris agrandies de 7 %,
       dans les repères EXACTS des yeux. De la couleur de la robe (cf. en-tête). -->
  <g class="paupieres">
    <ellipse cx="222" cy="44" rx="17.1" ry="31" fill="${c.robe}"/>
    <ellipse cx="262" cy="36" rx="12.3" ry="23.6" fill="${c.robe}"/>
  </g>

  </g>
</svg>`;
};
