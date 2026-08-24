// ───────────────────────────────────────────────────────────────────────────────
// TANK — la tortue de Rainbow Dash. De profil vers la droite, cou tendu et tête
// HAUTE, avec sur la carapace le dôme et la PETITE HÉLICE qui lui permettent de
// voler — son gadget, et le détail que tout le monde attend.
//
// RÉFÉRENCES PLEIN PIED (API MediaWiki, dans `refs/`) :
//   · `refs/z-tank-corps.png` — recadrage ×3 de File:Tank S2E7.png (1280 × 720)
//     https://mlp.fandom.com/wiki/File:Tank_S2E7.png
//     PLEIN PIED de profil : carapace, écailles, pattes, cou plissé.
//   · `refs/z-tank-helice.png` — recadrage de File:Tank flying S2E7.png
//     https://mlp.fandom.com/wiki/File:Tank_flying_S2E7.png
//     le harnais de vol : dôme bleu translucide, sangle de cuir à boucle et
//     rotor. C'est la seule référence qui montre le gadget en entier.
//   · `refs/z-tank-tete.png` — gros plan de la tête (même image que le plein
//     pied) : l'œil, le naseau en virgule et le bec crochu.
//
// RELEVÉ MÉTRIQUE (carapace 193 × 183 px, tête 94 × 67 px sur le plein pied) :
//   | carapace / tête (largeur) | 2,05 — la carapace fait DEUX TÊTES de large |
//   | œil                       | dans le tiers avant du crâne, petit         |
//   | écailles                  | disque pâle à DEUX tons : anneau moyen + cœur clair |
//   | pattes                    | courtes et trapues, trois griffes pâles     |
//
// TROIS RELEVÉS QUI COMPTENT :
//   1. **L'ŒIL DE TANK EST SOMBRE**, presque noir-vert (relevé #234a2f), avec un
//      reflet blanc et une paupière supérieure épaisse. `data.js` portait un
//      orange ambré (#e8a33d) qui n'existe sur aucune référence.
//   2. **LES ÉCAILLES DE CARAPACE SONT À DEUX TONS** — un anneau vert moyen
//      autour d'un cœur jaune-vert clair. En aplat d'une seule couleur elles se
//      lisent comme des taches de peinture ; c'est l'anneau qui fait le scute.
//   3. **LE BAS DE LA CARAPACE EST UNE BANDE SEGMENTÉE** (les marginales). Sans
//      elle, la carapace est un galet posé sur des pattes.
//
// LE PROBLÈME DE CADRAGE DE TANK EST L'INVERSE DE CELUI DES AUTRES ANIMAUX :
// sa tête est le PLUS PETIT élément du personnage (la carapace fait deux têtes
// de large), et c'est pourtant elle qui doit remplir la fenêtre de portrait
// 171 6 124 124. À proportions exactes, une tête qui remplirait la fenêtre
// donnerait une carapace de 250 unités — impossible. Deux décisions en
// découlent, et les deux sont des cotes, pas des goûts :
//   · tout le personnage est décalé vers la DROITE, pour que la pale d'hélice
//     entre dans la fenêtre : centré, le rotor tombait à x 130 et la vignette ne
//     montrait plus rien du gadget ;
//   · CADRE_TANK (plus bas) agrandit l'ensemble de 15 % autour du BOUT DU
//     MUSEAU. Au premier cadrage la tête ne faisait que 64 % × 52 % de la
//     fenêtre, et la vignette montrait une petite tortue surmontée d'une barre
//     sombre — la pale se lisait comme une brindille.
//
// Pas de marque de beauté (`cutieMark: null`) ; `class="paupieres"` obligatoire.
// ───────────────────────────────────────────────────────────────────────────────
import { ton, derivesAnimal, AMANDE } from "./_commun.js";

// ── CARAPACE : dôme à fond plat. x 64 → 216, y 108 → 234.
const CARAPACE = "M64 206"
  + "C64 152 92 108 140 108"
  + "C188 108 216 152 216 206"
  + "C216 220 208 230 196 232"
  + "C164 236 116 236 84 232"
  + "C72 230 64 220 64 206Z";
// BANDE MARGINALE : le bas de la carapace, en écailles carrées segmentées.
const MARGINALE = "M65 202C64 214 66 226 78 230"
  + "C110 235 172 235 200 230"
  + "C212 226 216 214 215 202"
  + "C214 216 208 224 196 226"
  + "C164 230 116 230 84 226"
  + "C72 222 66 214 65 202Z";
// ── COU : un tube court et plissé, de l'ouverture de la carapace à la tête.
const COU = "M200 152C204 138 212 126 222 118"
  + "C230 112 240 114 242 122"
  + "C244 132 238 144 228 152"
  + "C218 160 204 162 200 152Z";
// ── TÊTE : museau à droite, bec légèrement CROCHU, crâne bas.
const TETE = "M214 104"
  + "C214 86 224 70 242 62"
  + "C260 54 280 58 288 70"
  + "C293 78 293 88 288 94"
  + "C284 100 276 102 268 100"      // bec crochu
  + "C272 106 272 112 266 116"
  + "C254 122 236 122 226 118"
  + "C218 114 214 110 214 104Z";
// ── PATTES : quatre pattes courtes et trapues, celles du fond décalées.
const PATTE_AV_FOND = "M144 220C138 232 138 244 145 251C153 257 164 257 170 251"
  + "C173 242 172 230 166 220C159 215 150 215 144 220Z";
const PATTE_AV = "M164 224C158 238 158 252 166 260C176 266 190 266 198 260"
  + "C202 250 200 234 192 224C184 218 172 218 164 224Z";
const PATTE_AR_FOND = "M58 216C52 228 52 240 59 247C67 253 78 253 84 247"
  + "C87 238 86 226 80 216C73 211 64 211 58 216Z";
const PATTE_AR = "M76 222C70 236 70 250 78 258C88 264 102 264 110 258"
  + "C114 248 112 232 104 222C96 216 84 216 76 222Z";
// ── QUEUE : un simple moignon à l'arrière — une tortue n'en montre pas plus.
const QUEUE = "M62 198C52 196 44 202 44 210C46 218 56 220 62 214Z";
// ── DÔME de vol : la calotte bleu clair posée sur le sommet de la carapace.
const DOME = "M100 112C100 84 118 64 140 64C162 64 180 84 180 112C154 116 126 116 100 112Z";
// ── HÉLICE. Les deux pales ne sont PAS colinéaires : la gauche relevée, la
//    droite piquée. Alignées, elles se lisent comme UN SEUL bâton planté sur un
//    dôme — soit un parasol, ce qu'était le premier tour. Ce sont leurs deux
//    angles différents, plus les deux arcs de rotation au-dessus, qui font lire
//    « hélice ». La pale DROITE est allongée jusqu'à x 216 exprès : c'est la
//    seule partie du gadget qui entre dans la fenêtre de portrait.
const PALE_G = "M136 42C118 32 96 26 76 28C90 40 114 48 136 48Z";
const PALE_D = "M144 44C166 36 194 38 216 50C194 56 164 54 144 50Z";

export default (c) => {
  const d = derivesAnimal(c);
  const { TRAIT } = d;
  const CARA = c.carapace ?? ton(c.robe, 1.05, -.10);   // gardé : clés optionnelles
  const CARA_T = ton(CARA, .9, -.20);
  const ECAILLE = c.ecailles ?? ton(CARA, .9, .26);
  const ANNEAU = ton(CARA, .95, .11);      // l'anneau moyen de chaque écaille
  const PLI = ton(c.robe, .9, -.18);       // plis du cou et de la peau
  const GRIFFE = ton(c.robe, .5, .26);     // griffes pâles
  // CONSTANTES DOCUMENTÉES — le harnais de vol ne dérive d'aucune entrée de `c` :
  const DOME_C = "#c3dcea";                // dôme bleu translucide (relevé)
  const DOME_T = "#95b6cb";
  const METAL = "#4b3520";                 // moyeu et pales, brun très sombre
  const SANGLE = "#7a5230";                // sangle de cuir
  const BOUCLE = "#b9d3e6";                // boucle bleu pâle
  // ÉCAILLES : des disques à deux tons, sur la partie de carapace laissée libre
  // par le dôme de vol et par la sangle.
  const ECAILLES = [
    [92, 168, 21], [136, 154, 24], [196, 176, 18],
    [84, 208, 15], [126, 204, 18], [200, 214, 13],
  ];
  const OEIL = "translate(258 80) scale(.52 .46)";
  return `<svg viewBox="0 0 300 300" xmlns="http://www.w3.org/2000/svg" role="img">
  <!-- CADRE_TANK : agrandissement de 15 % autour du BOUT DU MUSEAU (293, 118).
       Ce pivot est le seul qui grandisse la tête SANS la sortir par la droite du
       viewBox : la tête passe de 79 x 65 à 91 x 71 dans la fenêtre de portrait,
       la pale y entre de 33 unités, et le bas des pattes reste à y 288. Le
       groupe englobe class="paupieres" sans casser le clignement — un transform
       parent se compose (vérifié depuis les pouliches de la vague 2). -->
  <g transform="translate(-43.95 -17.7) scale(1.15)"
     stroke-linejoin="round" stroke-linecap="round">

  <!-- 1. QUEUE et PATTES DU FOND, en robe assombrie -->
  <path d="${QUEUE}" fill="${d.FOND}" stroke="${d.FOND_T}" stroke-width="2.6"/>
  <g fill="${d.FOND}" stroke="${d.FOND_T}" stroke-width="2.8">
    <path d="${PATTE_AR_FOND}"/><path d="${PATTE_AV_FOND}"/>
  </g>

  <!-- 2. COU plissé. Il passe avant la carapace : c'est le bord de la carapace,
       tracé ensuite, qui ferme proprement son attache. -->
  <path d="${COU}" fill="${c.robe}" stroke="${TRAIT}" stroke-width="3"/>

  <!-- 3. CARAPACE, sa bande marginale segmentée et ses écailles à deux tons -->
  <path d="${CARAPACE}" fill="${CARA}" stroke="${CARA_T}" stroke-width="3.4"/>
  <path d="${MARGINALE}" fill="${ton(CARA, 1, -.11)}" stroke="${CARA_T}" stroke-width="2"/>
  <g fill="none" stroke="${CARA_T}" stroke-width="1.8">
    <path d="M96 228C96 224 96 218 95 212"/>
    <path d="M128 231C128 227 128 220 128 214"/>
    <path d="M160 231C160 227 160 220 160 214"/>
    <path d="M190 228C190 224 190 218 189 212"/>
  </g>
  <g stroke="${CARA_T}" stroke-width="1.6">
    ${ECAILLES.map(([x, y, r]) => `<circle cx="${x}" cy="${y}" r="${r}" fill="${ANNEAU}"/>`).join('')}
  </g>
  <g>
    ${ECAILLES.map(([x, y, r]) =>
      `<circle cx="${x}" cy="${y}" r="${(r * .58).toFixed(1)}" fill="${ECAILLE}"/>`).join('')}
  </g>

  <!-- 4. PATTES PROCHES et leurs trois griffes -->
  <g fill="${c.robe}" stroke="${TRAIT}" stroke-width="3">
    <path d="${PATTE_AR}"/><path d="${PATTE_AV}"/>
  </g>
  <g fill="${GRIFFE}" stroke="${TRAIT}" stroke-width="1.4">
    <path d="M170 258C170 264 172 266 176 266C178 262 178 258 176 256Z"/>
    <path d="M181 261C181 267 183 269 187 269C189 265 189 261 187 259Z"/>
    <path d="M192 258C192 264 194 266 198 266C200 262 200 258 198 256Z"/>
    <path d="M82 256C82 262 84 264 88 264C90 260 90 256 88 254Z"/>
    <path d="M93 259C93 265 95 267 99 267C101 263 101 259 99 257Z"/>
    <path d="M104 256C104 262 106 264 110 264C112 260 112 256 110 254Z"/>
  </g>

  <!-- 5. SANGLE de cuir en travers de la carapace, avec sa boucle. C'est elle
       qui explique le harnais : sans elle, le dôme est posé en équilibre. -->
  <path d="M172 118C178 152 180 190 180 228" fill="none" stroke="${SANGLE}"
        stroke-width="16"/>
  <path d="M172 118C178 152 180 190 180 228" fill="none"
        stroke="${ton(SANGLE, 1, -.14)}" stroke-width="2.4"/>
  <rect x="164" y="158" width="28" height="24" rx="4" fill="${BOUCLE}"
        stroke="${ton(BOUCLE, 1, -.26)}" stroke-width="2.2"/>
  <path d="M178 162C178 170 178 174 178 178" fill="none"
        stroke="${ton(BOUCLE, 1, -.26)}" stroke-width="2.6"/>

  <!-- 6. DÔME de vol, puis le ROTOR. Le dôme est peint en aplat clair avec un
       reflet : un vrai translucide (opacité) ne se lirait pas de la même façon
       selon le fond de la fiche. -->
  <path d="${DOME}" fill="${DOME_C}" stroke="${DOME_T}" stroke-width="3"/>
  <path d="M110 104C110 86 118 72 130 66" fill="none" stroke="#fff"
        stroke-width="4" stroke-opacity=".7"/>
  <path d="M140 66C140 58 140 52 140 44" fill="none" stroke="${METAL}"
        stroke-width="5"/>
  <g fill="${METAL}" stroke="${METAL}" stroke-width="1.4">
    <path d="${PALE_G}"/><path d="${PALE_D}"/>
  </g>
  <circle cx="140" cy="44" r="5.6" fill="${METAL}"/>
  <!-- deux arcs de rotation : c'est ce qui transforme deux pales immobiles en
       hélice qui tourne, et ça coûte deux tracés -->
  <g fill="none" stroke="${METAL}" stroke-width="2.2" stroke-opacity=".45">
    <path d="M92 34C118 22 168 22 200 36"/>
    <path d="M104 24C126 16 162 16 190 26"/>
  </g>

  <!-- 7. TÊTE, par-dessus le cou -->
  <path d="${TETE}" fill="${c.robe}" stroke="${TRAIT}" stroke-width="3.2"/>
  <!-- plis du cou : trois arcs, le trait qui fait « tortue » plutôt que « lézard » -->
  <g fill="none" stroke="${PLI}" stroke-width="2.2">
    <path d="M212 128C218 132 224 134 230 134"/>
    <path d="M208 138C214 143 221 146 228 146"/>
    <path d="M206 148C212 153 219 156 226 156"/>
  </g>
  <!-- SOURIRE le long du museau + NASEAU en virgule (un point seul se lit comme
       un grain de beauté : piège relevé sur Spike) -->
  <path d="M236 102C244 110 258 110 269 100" fill="none" stroke="${TRAIT}"
        stroke-width="2.4"/>
  <path d="M281 72C285 73 286 76 284 78C282 79.5 280 78.5 280 77" fill="none"
        stroke="${TRAIT}" stroke-width="2"/>

  <!-- 8. ŒIL : amande sombre pleine + reflet + paupière supérieure épaisse -->
  <g transform="${OEIL}">
    <path d="${AMANDE}" fill="${c.yeux}"/>
    <ellipse cx="6" cy="-3" rx="5.2" ry="7.4" fill="#fff" transform="rotate(20 6 -3)"/>
  </g>
  <path d="M247 74C252 69 261 68 268 72" fill="none" stroke="${ton(c.yeux, 1, -.04)}"
        stroke-width="3.4"/>

  <!-- 9. PAUPIÈRE du clignement : l'amande agrandie de 7 %, dans le repère EXACT
       de l'œil. Tank est de profil et n'a qu'un œil visible ; le groupe reste
       obligatoire et couvre bien la seule amande. -->
  <g class="paupieres">
    <path d="${AMANDE}" transform="translate(258 80) scale(.556 .492)" fill="${c.robe}"/>
  </g>

  </g>
</svg>`;
};
