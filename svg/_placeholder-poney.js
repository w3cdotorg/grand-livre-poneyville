export default (c) => `<svg viewBox="0 0 300 300" xmlns="http://www.w3.org/2000/svg">
  <ellipse cx="150" cy="210" rx="75" ry="52" fill="${c.robe}"/>
  <circle cx="150" cy="105" r="62" fill="${c.robe}"/>
  <circle cx="128" cy="105" r="14" fill="#fff"/><circle cx="172" cy="105" r="14" fill="#fff"/>
  <circle cx="128" cy="107" r="7" fill="${c.yeux}"/><circle cx="172" cy="107" r="7" fill="${c.yeux}"/>
  <g class="paupieres">
    <rect x="112" y="89" width="32" height="30" rx="14" fill="${c.robe}"/>
    <rect x="156" y="89" width="32" height="30" rx="14" fill="${c.robe}"/>
  </g>
  <text x="150" y="290" text-anchor="middle" font-size="20" fill="#999">dessin à venir</text>
</svg>`;
export const cutieMark = () => `<svg viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg">
  <path d="M30 8 37 24 54 24 40 34 45 51 30 41 15 51 20 34 6 24 23 24 Z" fill="#d8c9ee"/>
</svg>`;
