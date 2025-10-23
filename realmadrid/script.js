
// script.js - funksionalitet kryesor: ngarkim lojtarësh, kërkim, filtër, favorites, modal, theme
document.addEventListener('DOMContentLoaded', () => {
const playersEl = document.getElementById('players');
const searchInput = document.getElementById('search');
const posFilter = document.getElementById('positionFilter');
const modal = document.getElementById('modal');
const modalBody = document.getElementById('modalBody');
const modalClose = document.getElementById('modalClose');
const themeToggle = document.getElementById('themeToggle');

let players = [];
let positions = new Set();
const favoritesKey = 'rm_favorites';
const favorites = new Set(JSON.parse(localStorage.getItem(favoritesKey) || '[]'));

// Theme
const setTheme = (t) => document.documentElement.setAttribute('data-theme', t);
themeToggle.addEventListener('click', () => {
const cur = document.documentElement.getAttribute('data-theme') || 'light';
const next = cur === 'light' ? 'dark' : 'light';
setTheme(next);
});

// Modal
function openModal(html){
modalBody.innerHTML = html;
modal.setAttribute('aria-hidden','false');
}
function closeModal(){
modal.setAttribute('aria-hidden','true'); modalBody.innerHTML='';
}
modalClose.addEventListener('click', closeModal);
modal.addEventListener('click', (e) => { if(e.target===modal) closeModal(); });

// Fetch players from PHP endpoint
async function loadPlayers(){
try{
const resp = await fetch('players.php');
players = await resp.json();
renderPlayers(players);
populateFilter();
}catch(err){
playersEl.innerHTML = `<div class="loading">Gabim në ngarkim: ${err}</div>`;
}
}

function populateFilter(){
players.forEach(p => positions.add(p.position));
positions.forEach(pos => {
const opt = document.createElement('option'); opt.value = pos; opt.textContent = pos;
posFilter.appendChild(opt);
});
}

function renderPlayers(list){
if(!list.length){ playersEl.innerHTML = '<div class="loading">Nuk u gjetën lojtarë.</div>'; return; }
playersEl.innerHTML = '';
list.forEach(p => {
const card = document.createElement('article'); card.className='player-card';
card.innerHTML = `
<img src="${p.photo}" alt="${p.name}">
<div class="player-meta">
<strong>${p.name}</strong>
<div>${p.number ? '#'+p.number : ''} <span class="badge">${p.position}</span></div>
<div style="margin-top:8px">
<button class="btn btn-details" data-id="${p.id}">Detaje</button>
<button class="btn btn-fav" data-id="${p.id}">${favorites.has(p.id)?'♥ Remove':'♡ Favorite'}</button>
</div>
</div>
`;
playersEl.appendChild(card);
});
}

// Events: search + filter
function applyFilters(){
const q = searchInput.value.trim().toLowerCase();
const pos = posFilter.value;
const filtered = players.filter(p => {
const matchQ = !q || p.name.toLowerCase().includes(q);
const matchPos = !pos || p.position === pos;
return matchQ && matchPos;
});
renderPlayers(filtered);
}
searchInput.addEventListener('input', applyFilters);
posFilter.addEventListener('change', applyFilters);

// Delegate clicks for details and fav
playersEl.addEventListener('click', (e) => {
const detailsBtn = e.target.closest('.btn-details');
const favBtn = e.target.closest('.btn-fav');
if(detailsBtn){
const id = detailsBtn.dataset.id;
const p = players.find(x=>x.id==id);
openModal(`<h2>${p.name}</h2><img src="${p.photo}" style="width:150px;border-radius:8px"/><p>Numër: ${p.number || '-'}</p><p>Pozicion: ${p.position}</p><p>Biografi: ${p.bio || '—'}</p>`);
} else if(favBtn){
const id = favBtn.dataset.id;
if(favorites.has(id)){ favorites.delete(id); favBtn.textContent='♡ Favorite'; }
else { favorites.add(id); favBtn.textContent='♥ Remove'; }
localStorage.setItem(favoritesKey, JSON.stringify([...favorites]));
}
});

// Gallery open
document.getElementById('galleryGrid').addEventListener('click', (e) => {
if(e.target.tagName === 'IMG'){
openModal(`<img src="${e.target.src}" style="max-width:100%"><p>${e.target.alt}</p>`);
}
});

// Contact form handling (client-side)
const contactForm = document.getElementById('contactForm');
const formMsg = document.getElementById('formMsg');
contactForm.addEventListener('submit', async (e) => {
e.preventDefault();
formMsg.textContent = 'Duke dërguar...';
const data = new FormData(contactForm);
try{
const res = await fetch(contactForm.action, { method:'POST', body:data });
const json = await res.json();
if(json.success){ formMsg.textContent = 'Dërguar me sukses! Faleminderit.'; contactForm.reset(); }
else formMsg.textContent = 'Gabim: ' + (json.error || 'Server error');
}catch(err){
formMsg.textContent = 'Gabim në dërgim: '+err;
}
setTimeout(()=>formMsg.textContent='',5000);
});

// Initial load
loadPlayers();
});
