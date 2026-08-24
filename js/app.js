import { render } from './render.js';

async function route() {
  const [, ecran = '', id = ''] = (location.hash || '#/').slice(1).split('/');
  await render(ecran || 'accueil', id);
  window.scrollTo(0, 0);
}
window.addEventListener('hashchange', route);
route();
