// ───────────────────────────────────────────────────────────────────────────────
// Canterlot — la capitale d'Equestria, accrochée à sa montagne.
//
// RÉFÉRENCES (dans `refs/`, API MediaWiki de mlp.fandom.com) :
//   · refs/lieu-canterlot.png    https://mlp.fandom.com/wiki/File:Canterlot_castle_wide_view_S1E26.png
//   · refs/lieu-canterlot-b.png  https://mlp.fandom.com/wiki/File:Canterlot_castle_close-up_S1E26.png
//
// L'ARCHITECTURE SIGNATURE, relevée sur le gros plan :
//   · les toits ne sont PAS des cônes mais des BULBES D'OR (des dômes en oignon)
//     posés sur des fûts blancs — c'est LA forme qui fait Canterlot, et le plan
//     large montre qu'elle se lit encore à toute petite taille ;
//   · chaque bulbe est surmonté d'un ÉPI D'OR, et des FANIONS ROSES flottent
//     entre les tours ;
//   · une bande en DAMIER noir et blanc ceinture la grosse tour ;
//   · le château est posé sur un ÉPERON ROCHEUX en surplomb, d'où tombent DEUX
//     CASCADES qui se jettent dans un bassin ;
//   · derrière, le massif mauve à névés de neige.
// Le blanc `C.mur`, l'or `C.or` et le mauve `C.mont` sont ceux du mini-château de
// la carte d'accueil.
// ───────────────────────────────────────────────────────────────────────────────
import { C, n, cielFond, nuage, volute, oiseau, arbre, buisson, fleurs, herbes } from './_decor.js';

const MUR_C = '#fffdf8';
const MUR_O = '#e6dcea';       // l'ombre portée sur les fûts blancs
// L'éperon doit être plus SOMBRE que le massif (`C.mont`) : à teinte égale, il
// disparaissait dedans et le château semblait posé sur une ombre.
const ROCHE = '#8f80b2';
const ROCHE_T = '#63558a';

// Le bulbe d'or : deux courbes qui se rejoignent en pointe.
const bulbe = (r) => `M${-r} 0C${n(-r - 3)} ${n(-r * 1.15)} ${n(-r * 0.55)} ${n(-r * 2.1)} 0 ${n(-r * 2.55)}
    C${n(r * 0.55)} ${n(-r * 2.1)} ${n(r + 3)} ${n(-r * 1.15)} ${r} 0Z`;

// Une tour : fût blanc, bandeau d'or, bulbe, épi et fanion.
const tour = (x, y, h, r, fanion = true) => `<g transform="translate(${x} ${y})">
    <path d="M${-r} 0L${-r} ${-h}L${r} ${-h}L${r} 0Z" fill="${MUR_C}" stroke="${C.murT}" stroke-width="1.8" stroke-linejoin="round"/>
    <path d="M${n(r * 0.35)} 0L${n(r * 0.35)} ${-h}L${r} ${-h}L${r} 0Z" fill="${MUR_O}" opacity=".7"/>
    <path d="M${n(-r - 3)} ${-h}L${n(r + 3)} ${-h}" stroke="${C.or}" stroke-width="3.4" stroke-linecap="round"/>
    <g transform="translate(0 ${n(-h - 1)})">
      <path d="${bulbe(r)}" fill="${C.or}" stroke="${C.orT}" stroke-width="1.8" stroke-linejoin="round"/>
      <path d="M${n(-r * 0.5)} ${n(-r * 0.9)}C${n(-r * 0.3)} ${n(-r * 1.6)} ${n(r * 0.1)} ${n(-r * 1.9)} ${n(r * 0.3)} ${n(-r * 2)}"
        fill="none" stroke="#ffeeb0" stroke-width="1.8" opacity=".8"/>
      <path d="M0 ${n(-r * 2.55)}L0 ${n(-r * 3.1)}" stroke="${C.orT}" stroke-width="1.8" stroke-linecap="round"/>
      <circle cx="0" cy="${n(-r * 3.3)}" r="2.4" fill="${C.or}" stroke="${C.orT}" stroke-width="1.1"/>
      ${fanion ? `<path d="M0 ${n(-r * 2.9)}C7 ${n(-r * 2.9 - 3)} 11 ${n(-r * 2.9 + 3)} 18 ${n(-r * 2.9)}L18 ${n(-r * 2.9 + 7)}
        C11 ${n(-r * 2.9 + 10)} 7 ${n(-r * 2.9 + 4)} 0 ${n(-r * 2.9 + 7)}Z"
        fill="${C.rose}" stroke="${C.roseT}" stroke-width="1.3" stroke-linejoin="round"/>` : ''}
    </g>
    <path d="M${n(-r * 0.45)} ${n(-h * 0.55)}C${n(-r * 0.45)} ${n(-h * 0.72)} ${n(r * 0.45)} ${n(-h * 0.72)} ${n(r * 0.45)} ${n(-h * 0.55)}L${n(r * 0.45)} ${n(-h * 0.3)}L${n(-r * 0.45)} ${n(-h * 0.3)}Z"
      fill="${C.or}" stroke="${C.orT}" stroke-width="1.4" stroke-linejoin="round"/>
  </g>`;

const damier = (x, y, w, h, k) => {
  const p = w / k;
  const cases = Array.from({ length: k }, (_, i) => i % 2 === 0
    ? `<path d="M${n(x + i * p)} ${y}L${n(x + i * p + p)} ${y}L${n(x + i * p + p)} ${n(y + h)}L${n(x + i * p)} ${n(y + h)}Z" fill="${C.montT}"/>`
    : '').join('');
  return `<path d="M${x} ${y}L${n(x + w)} ${y}L${n(x + w)} ${n(y + h)}L${x} ${n(y + h)}Z"
      fill="${MUR_C}" stroke="${C.murT}" stroke-width="1.4"/>${cases}`;
};

const chateau = () => `<g>
    ${tour(140, 212, 44, 11)}
    ${tour(258, 212, 50, 12)}
    ${tour(168, 212, 66, 13, false)}
    ${tour(232, 212, 70, 14, false)}
    <path d="M182 212L182 176L218 176L218 212Z" fill="${MUR_C}" stroke="${C.murT}" stroke-width="1.8" stroke-linejoin="round"/>
    ${damier(182, 176, 36, 8, 6)}
    <path d="M178 176L200 156L222 176Z" fill="${C.or}" stroke="${C.orT}" stroke-width="1.8" stroke-linejoin="round"/>
    ${tour(200, 158, 44, 16)}
    <path d="M190 212L190 192C190 182 210 182 210 192L210 212Z" fill="${C.or}" stroke="${C.orT}" stroke-width="1.6" stroke-linejoin="round"/>
    <path d="M126 212L274 212L274 220L126 220Z" fill="${MUR_C}" stroke="${C.murT}" stroke-width="1.8" stroke-linejoin="round"/>
    <path d="M130 212L130 206M142 212L142 206M154 212L154 206M166 212L166 206M178 212L178 206
      M222 212L222 206M234 212L234 206M246 212L246 206M258 212L258 206M270 212L270 206"
      stroke="${MUR_C}" stroke-width="4" stroke-linecap="round"/>
  </g>`;

const eperon = () => `<g>
    <path d="M110 218C104 238 116 250 130 254C142 258 150 250 160 254C174 260 194 256 208 258
      C230 261 246 252 262 244C280 236 294 228 298 216Z"
      fill="${ROCHE}" stroke="${ROCHE_T}" stroke-width="2.2" stroke-linejoin="round"/>
    <path d="M110 218C130 226 168 230 210 228C246 226 278 222 298 216" fill="none" stroke="#a698c6" stroke-width="3"/>
    <path d="M124 236C146 244 178 248 208 246" fill="none" stroke="${ROCHE_T}" stroke-width="1.6" opacity=".5"/>
    <path d="M234 244C252 240 268 234 280 226" fill="none" stroke="${ROCHE_T}" stroke-width="1.6" opacity=".4"/>
  </g>`;

// LES CASCADES SE DESSINENT APRÈS LA PELOUSE. Tracées avec l'éperon, elles
// passaient sous les bandes d'herbe du premier plan et disparaissaient.
const cascades = () => `<g>
    <path d="M154 254C154 272 150 284 146 292" fill="none" stroke="${C.eauT}" stroke-width="10" stroke-linecap="round" opacity=".9"/>
    <path d="M154 254C154 272 150 284 146 292" fill="none" stroke="${C.eau}" stroke-width="5.5" stroke-linecap="round"/>
    <path d="M248 250C250 268 254 280 258 288" fill="none" stroke="${C.eauT}" stroke-width="8" stroke-linecap="round" opacity=".9"/>
    <path d="M248 250C250 268 254 280 258 288" fill="none" stroke="${C.eau}" stroke-width="4.5" stroke-linecap="round"/>
    <ellipse cx="144" cy="294" rx="26" ry="7" fill="${C.eau}" stroke="${C.eauT}" stroke-width="1.8"/>
    <ellipse cx="260" cy="290" rx="22" ry="6" fill="${C.eau}" stroke="${C.eauT}" stroke-width="1.8"/>
    <path d="M132 294C140 292 150 292 156 294" fill="none" stroke="#ffffff" stroke-width="1.8" opacity=".6"/>
  </g>`;

export default () => `<svg viewBox="0 0 400 300" xmlns="http://www.w3.org/2000/svg" role="img"
  aria-label="Canterlot, le château blanc et or des princesses, accroché à la montagne">
  ${cielFond('ct-ciel', '#8fd0f2', '#e6f5fd')}
  ${volute(60, 44, 1)}${volute(348, 52, 0.9)}
  ${nuage(70, 34, 0.28, 0.85)}${nuage(346, 86, 0.24, 0.7)}
  ${oiseau(96, 74, 0.9)}${oiseau(120, 86, 0.7)}
  <path d="M56 300L128 160L176 108L226 152L268 60L318 130L364 92L400 150L400 300Z"
    fill="${C.mont}" stroke="${C.montT}" stroke-width="2.4" stroke-linejoin="round"/>
  <path d="M176 108L200 132L176 142L154 134Z" fill="${C.neige}"/>
  <path d="M268 60L296 100L268 112L242 92Z" fill="${C.neige}"/>
  <path d="M364 92L384 120L362 128L346 116Z" fill="${C.neige}"/>
  <path d="M330 154C344 150 356 154 360 162" fill="none" stroke="${C.montT}" stroke-width="2" opacity=".5"/>
  <path d="M96 218C110 212 124 216 130 224" fill="none" stroke="${C.montT}" stroke-width="2" opacity=".5"/>
  <path d="M336 174C346 194 344 216 334 236" fill="none" stroke="${C.eauT}" stroke-width="7" stroke-linecap="round" opacity=".75"/>
  <path d="M336 174C346 194 344 216 334 236" fill="none" stroke="${C.eau}" stroke-width="4" stroke-linecap="round"/>
  <path d="M330 158C338 162 344 170 336 176" fill="${C.neige}" stroke="${C.montT}" stroke-width="1.6" stroke-linejoin="round"/>
  ${nuage(200, 196, 0.34, 0.55)}
  ${eperon()}
  ${chateau()}
  <path d="M0 268C60 254 130 260 200 266C270 272 340 262 400 254L400 300L0 300Z"
    fill="${C.mid}" stroke="${C.herbeT}" stroke-width="2.2"/>
  ${cascades()}
  <path d="M0 296C70 288 150 292 220 296C280 300 340 296 400 292L400 300L0 300Z"
    fill="${C.pres}" stroke="${C.herbeT}" stroke-width="2.2"/>
  ${arbre(44, 292, 0.68)}${arbre(362, 294, 0.6)}
  ${buisson(88, 294, 0.62)}${buisson(316, 296, 0.58)}
  ${fleurs(186, 296, 0.85)}${fleurs(20, 298, 0.8)}
  ${herbes(300, 298, 0.85)}${herbes(112, 298, 0.85)}
</svg>`;
