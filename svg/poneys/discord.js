// ───────────────────────────────────────────────────────────────────────────────
// Discord — DRACONEQUUS. Le seul personnage du livre qui ne réemploie du template
// que la TÊTE et la machinerie de l'œil : son corps est un serpent, ses quatre
// membres viennent de quatre animaux différents et ses deux ailes ne vont pas
// ensemble.
//
// RÉFÉRENCES PLEIN PIED (règle « aucun visage ne se dessine de mémoire ») :
//   `File:Discord ID S4E26.png` — https://mlp.fandom.com/wiki/File:Discord_ID_S4E26.png
//     (370 × 630, debout de trois quarts, tête à gauche ; `refs/w3-discord-2.png`,
//     gros plan `refs/zoom-discord-tete.png`)
//   `File:Discord ID.png` — https://mlp.fandom.com/wiki/File:Discord_ID.png
//     (397 × 663 ; `refs/w3-discord-pp.png`)
//
// Ce que le relevé a donné, et qui ne se devinait pas :
//   · SA TÊTE N'EST PAS DE LA COULEUR DE SON CORPS. Le corps est un brun franc
//     (#7d5227 à la pipette, 23 679 pixels) mais la tête et le museau sont un
//     GRIS-BEIGE (#aba798). Peints du brun du corps, le visage se noie dedans ;
//   · son œil a le BLANC JAUNE et l'IRIS ROUGE, pas l'inverse. C'est le seul œil
//     du livre dans ce cas, et c'est ce qui le rend immédiatement reconnaissable.
//     `oeil()` n'a pas eu besoin d'être touché : on lui passe le jaune comme
//     `BLANC` et un faux `c.yeux` rouge ;
//   · il a DEUX oreilles différentes autant que deux cornes différentes : une
//     oreille de poney à l'intérieur rose, et une grande oreille bleu pâle
//     nervurée du côté de la corne bleue ;
//   · le sourire n'est PAS une gueule de crocs. Sur les deux références Discord
//     sourit d'un côté, avec UN SEUL croc qui dépasse, et ses sourcils blancs
//     sont RELEVÉS. C'est la condition posée par le brief (public de 4-5 ans) et
//     c'est aussi ce que montre la série : rien de menaçant.
//
// ── CE QUI DOIT ENTRER DANS LA FENÊTRE DE PORTRAIT (`171 6 124 124`) ─────────
// La contrainte la plus dure du personnage. Sa tête occupe donc exactement la
// boîte canonique (x 181 → 282, y 42 → 117), copiée mot pour mot de `CORPS`, et
// c'est le CORPS SERPENTIN qui part de sous la gorge (y > 126, donc sous le bord
// bas de la fenêtre) et descend en S vers le bas-gauche du viewBox. Ses deux
// cornes et ses deux oreilles tiennent dans y ≥ 11 et x ≤ 293. Aucun cadre
// dédié (type `CADRE_SPIKE`) n'a donc été nécessaire.
// ───────────────────────────────────────────────────────────────────────────────
import {
  ton, derives, naseau, oeil, OEIL_PROCHE, OEIL_LOIN, paupieres, museauLisse,
} from "./_commun.js";

// ── CONSTANTES DOCUMENTÉES. Discord est fait de morceaux d'animaux : aucune de
//    ces couleurs ne dérive de `c`, et c'est le sens même du personnage.
const TETE = "#aba79a";          // gris-beige du crâne et du museau (relevé)
const TETE_T = ton(TETE, .5, -.26);
const ANTLER = "#e2d1a4";        // bois de cerf, tan (assez foncé pour se
                                 //  distinguer des touffes blanches — au crème
                                 //  #eee2c2 du premier jet, le sourcil s'y noyait)
const ANTLER_T = ton(ANTLER, .7, -.24);
const CORNE_B = "#bfe8e6";       // corne de chèvre, bleu pâle annelé
const CORNE_B_T = ton(CORNE_B, .8, -.28);
const POIL = "#f6f4ec";          // barbiche, touffes de sourcil, touffe de queue
const POIL_T = "#c8c3b4";
const OREILLE_ROSE = "#e9a6bd";  // intérieur de l'oreille de poney
const AILE_OISEAU = "#4fbfe0";   // aile d'oiseau, cyan
const AILE_OISEAU_T = ton(AILE_OISEAU, .9, -.24);
const LION = "#ecd884";          // patte de lion, jaune paille
const LION_T = ton(LION, .85, -.26);
const SERRE = "#8ec0e2";         // serre d'aigle, bleu
const SERRE_T = ton(SERRE, .8, -.28);
const DRAGON = "#82d873";        // jambe de dragon, vert
const DRAGON_T = ton(DRAGON, .85, -.26);
const SABOT = "#6f6252";         // sabot de cheval
const VENTRE = "#d8b4a0";        // écailles claires du dessous de la queue
const ROUGE = "#c1272d";         // iris
const NOIR = "#101014";

// ── LA TÊTE : la boîte canonique de `CORPS`, du crâne à la mâchoire, refermée
//    par une gorge courte. Les six premiers segments sont copiés à l'identique de
//    `CORPS` — c'est ce qui garantit que `naseau`, `museauLisse` et les deux
//    placements d'œil tombent exactement où il faut.
const TETE_D = "M202 100C200 86 200 74 202 62"
  + "C206 52 218 45 238 42 256 45 265 53 269 62"
  + "C272 68 274 74 278 79 281 83 282 87 281 89"
  + "C279 92 273 95 271 98 271 102 275 104 279 106"
  + "C277 108 273 110 268 112 264 113 259 114.5 255 115"
  + "C250 115.5 246 115.5 243 116 242.5 120 242.5 124 242 128"
  + "C234 132 222 132 213 128 205 123 202 110 202 100Z";

// ── LE BOIS DE CERF (au-dessus de l'œil proche, penché en arrière). Une fourche
//    à trois pointes ; dessiné en une seule pièce, contour compris.
const BOIS = "M228 44"
  + "C226 36 224 28 220 21"
  + "C218 16 214 13 210 14"
  + "C207 16 207 20 210 24"
  + "C214 30 216 36 217 44"
  + "C212 40 206 36 200 34"
  + "C196 33 193 35 193 39"
  + "C194 43 198 45 203 46"
  + "C210 48 216 51 221 55"
  + "C224 52 226 48 228 44Z";
// La deuxième fourche, plus courte, vers l'avant.
const BOIS2 = "M224 30C226 24 230 19 235 16"
  + "C238 15 241 17 240 21"
  + "C238 25 234 29 231 34"
  + "C228 34 225 33 224 30Z";

// ── LA CORNE DE CHÈVRE bleue, en avant du bois, incurvée et annelée.
const CORNE_BLEUE = "M254 44"
  + "C256 34 260 24 266 17"
  + "C269 13 274 13 276 17"
  + "C278 22 276 30 271 38"
  + "C268 43 266 46 265 49"
  + "C261 48 257 46 254 44Z";

// ── LES DEUX OREILLES. L'oreille de poney (arrière), à intérieur rose, et la
//    grande oreille bleu pâle nervurée (avant, du côté de la corne bleue).
const OREILLE_PONEY = "M198 52C192 54 189 58 189 64"
  + "C190 71 194 78 200 84 205 88 210 91 213 93"
  + "C211 84 209 72 208 63 207 57 203 54 198 52Z";
const OREILLE_BLEUE = "M284 52C290 50 294 53 293 59"
  + "C292 67 288 74 282 80 277 84 273 86 270 87"
  + "C271 78 273 66 275 58 277 54 280 52 284 52Z";

// ── LA BARBICHE : une mèche blanche sous le menton, pointe vers l'arrière-bas.
const BARBICHE = "M250 114C256 116 262 118 266 122"
  + "C270 128 270 136 266 142"
  + "C262 147 256 148 252 145"
  + "C254 140 253 134 249 130"
  + "C246 126 244 124 244 120"
  + "C245 116 247 114 250 114Z";

export default (c) => {
  const d = derives(c);
  const TRAIT = ton(c.robe, .7, -.24);
  const dTete = { ...d, TRAIT: TETE_T };
  // L'ŒIL DE DISCORD : blanc JAUNE, iris ROUGE, pupille et liseré noirs.
  // `oeil()` ne lit que `c.yeux` pour l'iris et `BLANC` pour la sclère : on lui
  // passe donc un faux `c` et un `d` modifié, sans toucher à la fonction.
  const oe = oeil({ ...c, yeux: ROUGE }, {
    ...d, BLANC: c.yeux, PUPILLE: NOIR, IRIS_BAS: ton(ROUGE, .6, .28),
  }, { iris: .72 });
  // `iris` à .72 et non 1 : sur les références l'iris rouge est un petit disque
  // au milieu d'une grande amande JAUNE, et c'est ce rapport-là qui fait l'œil de
  // Discord. À .9 le rouge occupait presque toute l'amande et l'œil devenait un
  // gros point de mire rouge, nettement plus dur.

  // Le CORPS SERPENTIN est dessiné comme un trait épais à bouts ronds passé deux
  // fois (contour large, puis remplissage plus fin) : c'est la technique des
  // volutes de Rarity. Un tracé fermé de largeur variable devrait se recroiser
  // aux inflexions du S ; ici les jonctions entre segments disparaissent sous
  // les bouts ronds, ce qui permet d'AFFINER le tube du cou vers la queue.
  const tube = (trace, w) => `<path d="${trace}" fill="none" stroke="${TRAIT}"
        stroke-width="${w}" stroke-linecap="round"/>`;
  const tubeInterieur = (trace, w) => `<path d="${trace}" fill="none" stroke="${c.robe}"
        stroke-width="${w}" stroke-linecap="round"/>`;
  // Le S du corps, refait au deuxième tour : le premier trajet bouclait en C et
  // ramenait la queue à la hauteur du torse, si bien que la moitié gauche du
  // viewBox restait vide et que la silhouette se lisait comme un fer à cheval.
  // Le corps descend maintenant presque droit sous la tête et c'est la QUEUE qui
  // s'échappe vers la gauche, ce qui remplit le cadre et fait lire le serpent.
  const SEG = [
    ["M224 122C212 136 200 148 190 162", 42],
    ["M190 162C180 178 174 196 172 216", 36],
    ["M172 216C170 234 170 250 172 264", 31],
    ["M172 264C160 274 146 277 132 271", 26],
    ["M132 271C118 263 108 250 104 236", 20],
    ["M104 236C102 230 101 226 100 222", 15],
  ];

  return `<svg viewBox="0 0 300 300" xmlns="http://www.w3.org/2000/svg" role="img">
  <g stroke-linejoin="round" stroke-linecap="round">

  <!-- 1. LES DEUX AILES, derrière tout le reste : l'aile de CHAUVE-SOURIS
       (sombre, à membranes échancrées) en haut, l'aile d'OISEAU (cyan, à pennes)
       en dessous. Elles ne vont pas ensemble, et c'est voulu.
       L'aile de chauve-souris est DESCENDUE de 12 : à sa place nominale, son
       bord d'attaque passait par (183 ; 128) et un éclat sombre entrait dans le
       coin bas-gauche de la fenêtre de portrait (171 6 124 124), où il se
       lisait comme une salissure dans la vignette de galerie. -->
  <g transform="translate(0 12)">
  <path d="M196 140C180 126 156 114 132 108
           C124 106 120 110 123 116 127 125 135 134 145 142
           C133 141 124 142 119 145 126 153 138 161 152 167
           C143 170 137 174 134 178 145 182 160 183 176 179
           C189 175 196 164 196 140Z"
        fill="${d.M0}" stroke="${ton(d.M0, 1.05, -.12)}" stroke-width="2.8"/>
  <g fill="none" stroke="${ton(d.M0, 1.05, -.12)}" stroke-width="1.8">
    <path d="M186 143C172 134 154 125 138 120"/>
    <path d="M180 155C167 148 151 141 137 138"/>
    <path d="M170 167C159 162 147 156 138 151"/>
  </g>

  <path d="M186 170C170 165 146 165 126 172
           C119 175 118 181 124 183 133 187 144 188 155 188
           C145 194 139 200 137 205 147 207 161 204 174 198
           C184 193 188 184 186 170Z"
        fill="${AILE_OISEAU}" stroke="${AILE_OISEAU_T}" stroke-width="2.8"/>
  <g fill="none" stroke="${AILE_OISEAU_T}" stroke-width="1.8">
    <path d="M177 172C163 171 145 173 131 178"/>
    <path d="M180 182C168 183 155 187 145 193"/>
  </g>

  <!-- 2. LE CORPS SERPENTIN, en S sous la tête, puis la QUEUE qui s'échappe
       vers la gauche : six segments de largeur décroissante (42 → 15), contours
       d'abord puis remplissages, tous à bouts ronds. -->
  ${SEG.map(([t, w]) => tube(t, w)).join('')}
  ${SEG.map(([t, w]) => tubeInterieur(t, w - 6)).join('')}
  <!-- écailles claires du DESSOUS de la queue : sans elles la queue se lit comme
       un simple boudin brun. -->
  <g fill="none" stroke="${VENTRE}" stroke-width="4" stroke-opacity=".9">
    <path d="M174 254C176 262 172 269 164 273"/>
    <path d="M160 274C152 277 143 276 136 272"/>
    <path d="M130 266C124 260 119 253 116 246"/>
  </g>
  <!-- la crête dentelée du DOS de la queue, en brun sombre (essayée en vert au
       premier tour : elle se confondait alors avec la jambe de dragon et se
       lisait comme trois feuilles collées sur la queue). -->
  <g fill="${ton(c.robe, .8, -.2)}" stroke="${ton(c.robe, .8, -.32)}" stroke-width="1.6">
    <path d="M170 252L180 254L172 262Z"/>
    <path d="M158 265L166 271L155 274Z"/>
    <path d="M140 264L146 272L134 270Z"/>
    <path d="M124 254L131 261L119 261Z"/>
  </g>
  <!-- la TOUFFE de bout de queue -->
  <path d="M105 230C104 220 99 210 90 206
           C82 203 76 208 78 216
           C80 222 85 226 90 228
           C84 230 80 234 79 239
           C86 243 95 242 100 237
           C100 242 102 246 105 248
           C110 243 111 236 105 230Z"
        fill="${POIL}" stroke="${POIL_T}" stroke-width="2.2"/>

  <!-- 3. LES QUATRE MEMBRES DÉPAREILLÉS — c'est la définition du personnage, et
       la seule chose qui compte est qu'on les distingue les uns des autres à la
       taille de la fiche. Bras : patte de LION (jaune, griffue) et SERRE D'AIGLE
       (bleue). Jambes : jambe de DRAGON (verte) et jambe de cheval à SABOT. -->
  <path d="M199 148C210 154 220 164 228 176
           C233 184 231 191 224 193
           C216 194 209 189 204 180
           C198 170 192 160 190 154Z"
        fill="${LION}" stroke="${LION_T}" stroke-width="2.6"/>
  <path d="M221 188C228 188 233 193 233 199 233 205 228 209 222 209
           C216 209 212 205 212 199 212 193 215 188 221 188Z"
        fill="${LION}" stroke="${LION_T}" stroke-width="2.2"/>
  <g fill="none" stroke="${LION_T}" stroke-width="2.2" stroke-linecap="round">
    <path d="M231 206C235 210 238 213 240 215"/>
    <path d="M223 210C224 215 225 219 225 222"/>
    <path d="M214 207C212 212 210 215 208 218"/>
  </g>

  <path d="M186 176C194 186 200 198 202 210
           C203 218 198 223 191 221
           C185 219 181 212 180 203
           C179 192 179 182 180 176Z"
        fill="${SERRE}" stroke="${SERRE_T}" stroke-width="2.6"/>
  <g fill="none" stroke="${SERRE_T}" stroke-width="3" stroke-linecap="round">
    <path d="M188 221C186 227 183 232 180 236"/>
    <path d="M194 221C196 227 197 232 197 237"/>
    <path d="M200 218C204 223 207 227 209 230"/>
  </g>

  <path d="M161 240C158 250 156 262 156 272
           C156 280 161 284 167 282
           C172 279 173 272 171 264
           C169 255 166 246 164 240Z"
        fill="${DRAGON}" stroke="${DRAGON_T}" stroke-width="2.6"/>
  <g fill="none" stroke="${DRAGON_T}" stroke-width="2.6" stroke-linecap="round">
    <path d="M159 282C155 286 152 289 150 291"/>
    <path d="M166 284C166 287 166 290 166 292"/>
    <path d="M171 281C175 284 177 287 179 289"/>
  </g>

  <path d="M186 236C188 246 192 258 195 268
           C197 276 203 279 207 276
           C211 272 210 264 207 256
           C203 247 198 239 195 235Z"
        fill="${c.robe}" stroke="${TRAIT}" stroke-width="2.6"/>
  <path d="M197 274C203 272 209 274 212 278
           C213 284 210 288 204 288
           C198 288 195 284 195 279
           C195 277 196 275 197 274Z"
        fill="${SABOT}" stroke="${ton(SABOT, .8, -.16)}" stroke-width="2"/>

  <!-- 4. LES DEUX OREILLES, avant la tête : c'est le contour de la tête, tracé
       ensuite, qui creuse leur pli interne. -->
  <path d="${OREILLE_PONEY}" fill="${TETE}" stroke="${TETE_T}" stroke-width="3"/>
  <path d="M199 58C197 66 198 76 202 84" fill="none" stroke="${OREILLE_ROSE}"
        stroke-width="5"/>
  <path d="${OREILLE_BLEUE}" fill="${CORNE_B}" stroke="${CORNE_B_T}" stroke-width="3"/>
  <g fill="none" stroke="${CORNE_B_T}" stroke-width="1.6">
    <path d="M283 57C281 65 279 74 277 81"/>
    <path d="M288 58C286 65 284 72 282 78"/>
  </g>

  <!-- 5. LA TÊTE : la boîte canonique de CORPS, en gris-beige et non en brun -->
  <path d="${TETE_D}" fill="${TETE}" stroke="${TETE_T}" stroke-width="3.4"/>

  <!-- 6. MUSEAU LISSE : sans lui l'encoche de bouche de la silhouette reste vide
       et le museau se termine en marche d'escalier (cf. _commun.js). -->
  ${museauLisse({ robe: TETE }, { TRAIT: TETE_T })}

  <!-- 7. NASEAU + LE SOURIRE ESPIÈGLE. Il monte franchement vers l'ARRIÈRE (le
       coin de lèvre remonte sous la joue) et laisse dépasser UN SEUL croc, en
       bas. Deux crocs symétriques, ou une rangée, font une gueule : sur les deux
       références Discord n'en montre qu'un, et c'est ce déséquilibre qui le rend
       farceur au lieu d'inquiétant. -->
  ${naseau(dTete)}
  <path d="M252 95.4C258 99.4 264 102.4 271 104.6" fill="none"
        stroke="${TETE_T}" stroke-width="2.6"/>
  <path d="M259 100.6L263.4 100.2L261.4 107Z" fill="#fbfaf4"
        stroke="${TETE_T}" stroke-width="1.4"/>
  <path d="M268 103.6L271.6 104.4L269.4 108.6Z" fill="#fbfaf4"
        stroke="${TETE_T}" stroke-width="1.2"/>

  <!-- 8. YEUX : blanc JAUNE, iris ROUGE, pupille et liseré noirs -->
  ${oe(OEIL_PROCHE)}${oe(OEIL_LOIN)}

  <!-- 9. PAUPIÈRES du clignement, de la couleur de la TÊTE et non du corps -->
  ${paupieres({ robe: TETE })}

  <!-- 10. le contour de la joue repasse par-dessus l'œil lointain -->
  <path d="M269 62C272 68 274 74 278 79" fill="none" stroke="${TETE_T}"
        stroke-width="3.4"/>

  <!-- 12. LE BOIS DE CERF et LA CORNE DE CHÈVRE : deux attributs différents,
       c'est la définition même du draconequus. -->
  <path d="${BOIS}" fill="${ANTLER}" stroke="${ANTLER_T}" stroke-width="2.6"/>
  <path d="${BOIS2}" fill="${ANTLER}" stroke="${ANTLER_T}" stroke-width="2.4"/>
  <path d="${CORNE_BLEUE}" fill="${CORNE_B}" stroke="${CORNE_B_T}" stroke-width="2.6"/>
  <g fill="none" stroke="${CORNE_B_T}" stroke-width="1.6">
    <path d="M256 41C259 40 262 40 264 41"/>
    <path d="M258 34C261 33 264 33 266 34"/>
    <path d="M261 27C264 26 266 26 268 27"/>
    <path d="M265 21C267 20 269 20 271 21"/>
  </g>

  <!-- 13. LA BARBICHE, sous le menton -->
  <path d="${BARBICHE}" fill="${POIL}" stroke="${POIL_T}" stroke-width="2.4"/>
  <g fill="none" stroke="${POIL_T}" stroke-width="1.6">
    <path d="M254 120C259 124 262 130 262 137"/>
    <path d="M250 124C254 128 256 133 256 139"/>
  </g>

  <!-- 14. LES DEUX SOURCILS EN TOUFFE BLANCHE, RELEVÉS, et dessinés en DERNIER.
       C'est la pièce qui décide de tout : relevés, Discord est farceur ;
       abaissés vers l'avant, il devient menaçant — et c'est exactement ce que le
       brief interdit (public de 4-5 ans). Deux positions perdues avant :
       posés en couche 11 puis en 12 bis, le bois de cerf (x 193 → 228) et la
       corne bleue (x 254 → 278) les recouvraient à chaque fois entièrement. Ils
       sont donc calés juste au-dessus des deux amandes (sommets à y 61 pour
       l'œil proche, y 52 pour le lointain) et passent par-dessus tout. -->
  <g fill="${POIL}" stroke="${POIL_T}" stroke-width="1.8">
    <path d="M230 59C237 53 246 51 252 54
             C247 58 241 60 236 61
             C232 61 230 60 230 59Z"/>
    <path d="M255 51C260 46 267 45 272 47
             C268 51 264 53 259 54
             C256 54 254 53 255 51Z"/>
  </g>

  </g>
</svg>`;
};
