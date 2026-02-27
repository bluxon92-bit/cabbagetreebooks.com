// Mobile nav
const toggle = document.querySelector('.nav-toggle');
const mobileNav = document.querySelector('.nav-mobile');
if (toggle && mobileNav) {
  toggle.addEventListener('click', () => {
    mobileNav.classList.toggle('open');
    document.body.style.overflow = mobileNav.classList.contains('open') ? 'hidden' : '';
  });
  mobileNav.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => {
      mobileNav.classList.remove('open');
      document.body.style.overflow = '';
    });
  });
}

// Blog search
const searchInput = document.querySelector('#blog-search');
const postCards = document.querySelectorAll('.blog-card-ct, .post-list-item');
if (searchInput && postCards.length) {
  searchInput.addEventListener('input', () => {
    const q = searchInput.value.toLowerCase();
    postCards.forEach(c => { c.style.display = c.textContent.toLowerCase().includes(q) ? '' : 'none'; });
  });
}

// Category filter
document.querySelectorAll('.filter-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    const filter = btn.dataset.filter;
    postCards.forEach(c => {
      c.style.display = (filter === 'all' || c.dataset.category === filter) ? '' : 'none';
    });
  });
});

// ============================================================
// CHARACTER NAME GENERATOR
// ============================================================
const sciFirstNames = {
  male:   ['Kaiden', 'Orion', 'Zephyr', 'Aether', 'Corvus', 'Solus', 'Dax', 'Rigel', 'Caspian', 'Theron', 'Vex', 'Hadron', 'Ezra', 'Lyell', 'Cade'],
  female: ['Lyra', 'Nova', 'Selene', 'Zara', 'Vesper', 'Calyx', 'Nyx', 'Andromeda', 'Seraphine', 'Tara', 'Cassia', 'Elara', 'Vega', 'Mira', 'Helia'],
  neutral:['Asha', 'Cael', 'Skye', 'Echo', 'Ryn', 'Sable', 'Onyx', 'Lexa', 'Cyan', 'Pax', 'Axis', 'Juno', 'Arc', 'Vale', 'Zion']
};
const sciLastNames = ['Voss', 'Crane', 'Halcyon', 'Nexus', 'Draven', 'Steele', 'Voigt', 'Arden', 'Morrow', 'Cross', 'Hale', 'Ravenswood', 'Solaris', 'Vane', 'Drake', 'Ash', 'Wren', 'Kairos', 'Storm', 'Pierce'];

const fanFirstNames = {
  male:   ['Aldric', 'Theron', 'Caelum', 'Rowan', 'Dorian', 'Eryn', 'Bastian', 'Corvin', 'Daven', 'Leoric', 'Emrys', 'Taryn', 'Brennan', 'Oberon', 'Gareth'],
  female: ['Lyria', 'Serafina', 'Eilidh', 'Cassia', 'Mireille', 'Sylvara', 'Arwen', 'Calliope', 'Niamh', 'Sable', 'Isolde', 'Thessaly', 'Vivienne', 'Elara', 'Branwen'],
  neutral:['Riven', 'Ash', 'Cael', 'Sylvan', 'Vale', 'Onyx', 'Sage', 'Lark', 'Peren', 'Wren', 'Emrys', 'Skye', 'Seren', 'Blaze', 'Thorn']
};
const fanLastNames = ['Stoneheart', 'Ashveil', 'Dawnbrook', 'Thornwood', 'Ravenshollow', 'Greymoor', 'Ironbark', 'Nightshade', 'Silverwood', 'Coldwater', 'Blackthorn', 'Emberfall', 'Duskmantle', 'Wraithbone', 'Goldenshard'];

const horFirstNames = {
  male:   ['Ezra', 'Malachar', 'Silas', 'Damien', 'Ambrose', 'Caspar', 'Dorian', 'Victor', 'Cyrus', 'Alaric', 'Lucian', 'Emeric', 'Hadrian', 'Roland', 'Gideon'],
  female: ['Morrigan', 'Isolde', 'Helena', 'Vesper', 'Rowena', 'Lilith', 'Agatha', 'Serena', 'Sable', 'Vivienne', 'Thessaly', 'Cordelia', 'Raven', 'Seraphine', 'Delphine'],
  neutral:['Grey', 'Ember', 'Vale', 'Onyx', 'Ash', 'Sable', 'Wren', 'Shade', 'Mist', 'Thorn', 'Ruin', 'Echo', 'Blanche', 'Dusk', 'Nox']
};
const horLastNames = ['Blackwood', 'Crowe', 'Vance', 'Morrow', 'Ashcroft', 'Gallows', 'Holloway', 'Dread', 'Grimshaw', 'Ravenswood', 'Coldstone', 'Wraithmore', 'Dunmore', 'Ashwood', 'Nighthollow'];

function getRandomItem(arr) { return arr[Math.floor(Math.random() * arr.length)]; }

function generateName(genre, gender) {
  let first, last;
  if (genre === 'sci-fi') {
    first = getRandomItem(sciFirstNames[gender] || sciFirstNames.neutral);
    last  = getRandomItem(sciLastNames);
  } else if (genre === 'fantasy') {
    first = getRandomItem(fanFirstNames[gender] || fanFirstNames.neutral);
    last  = getRandomItem(fanLastNames);
  } else {
    first = getRandomItem(horFirstNames[gender] || horFirstNames.neutral);
    last  = getRandomItem(horLastNames);
  }
  return `${first} ${last}`;
}

const genreSelect  = document.getElementById('gen-genre');
const genderSelect = document.getElementById('gen-gender');
const resultEl     = document.getElementById('gen-result');
const generateBtn  = document.getElementById('gen-btn');
const historyList  = document.getElementById('gen-history');
const copyBtn      = document.getElementById('gen-copy');

let nameHistory = [];

function runGenerator() {
  if (!genreSelect || !resultEl) return;
  const genre  = genreSelect.value;
  const gender = genderSelect ? genderSelect.value : 'neutral';
  const name   = generateName(genre, gender);

  // Animate result
  resultEl.style.opacity = '0';
  resultEl.style.transform = 'translateY(8px)';
  setTimeout(() => {
    resultEl.textContent = name;
    resultEl.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
    resultEl.style.opacity = '1';
    resultEl.style.transform = 'translateY(0)';
  }, 120);

  // Add to history
  nameHistory.unshift(name);
  if (nameHistory.length > 5) nameHistory.pop();
  if (historyList) {
    historyList.innerHTML = nameHistory.map(n => `<li style="padding:0.3rem 0; font-size:0.9rem; color:var(--ink-soft); border-bottom:1px solid var(--border);">${n}</li>`).join('');
  }
}

if (generateBtn) {
  generateBtn.addEventListener('click', runGenerator);
  runGenerator(); // show initial name
}

if (copyBtn && resultEl) {
  copyBtn.addEventListener('click', () => {
    navigator.clipboard.writeText(resultEl.textContent).then(() => {
      copyBtn.textContent = 'Copied!';
      setTimeout(() => copyBtn.textContent = 'Copy', 1500);
    });
  });
}

// Smooth entry
document.addEventListener('DOMContentLoaded', () => {
  document.body.style.opacity = '0';
  document.body.style.transition = 'opacity 0.3s ease';
  requestAnimationFrame(() => { document.body.style.opacity = '1'; });
});
