// Smooth scroll
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const t = document.querySelector(a.getAttribute('href'));
    if (t) { e.preventDefault(); t.scrollIntoView({behavior:'smooth',block:'start'}); closeMob(); }
  });
});

// Hamburger
const ham = document.getElementById('ham');
const mob = document.getElementById('mob');
const icM = document.getElementById('ic-m');
const icX = document.getElementById('ic-x');
function closeMob(){ mob.classList.remove('open'); icM.style.display='block'; icX.style.display='none'; }
ham.addEventListener('click', () => {
  const o = mob.classList.toggle('open');
  icM.style.display = o ? 'none' : 'block';
  icX.style.display = o ? 'block' : 'none';
});

// Reveal on scroll
const obs = new IntersectionObserver((entries) => {
  entries.forEach((e, i) => {
    if (e.isIntersecting) {
      setTimeout(() => e.target.classList.add('vis'), i * 70);
      obs.unobserve(e.target);
    }
  });
}, { threshold: 0.1 });
document.querySelectorAll('.rv').forEach(el => obs.observe(el));

// Active nav highlight
const secs = document.querySelectorAll('section[id]');
const navAs = document.querySelectorAll('.nav a');
const nObs = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) navAs.forEach(a => { a.style.color = a.getAttribute('href') === '#'+e.target.id ? 'var(--blue-m)' : ''; });
  });
}, { threshold: 0.45 });
secs.forEach(s => nObs.observe(s));

// Tabs
function switchTab(i) {
  document.querySelectorAll('.tab-btn').forEach((b,j) => b.classList.toggle('act', j===i));
  document.querySelectorAll('.tab-pnl').forEach((p,j) => p.classList.toggle('act', j===i));
}

//carousel
const track = document.querySelector('.carousel-track');
const cards = Array.from(track?.children || []);
const nextBtn = document.querySelector('.next-btn');
const prevBtn = document.querySelector('.prev-btn');
let carouselIndex = 0;

const getCardsPerView = () => {
  if (window.innerWidth > 1024) return 3;
  if (window.innerWidth > 720) return 2;
  return 1;
};

const moveCarousel = () => {
  if (!track || cards.length === 0) return;
  const cardsPerView = getCardsPerView();
  const maxIndex = cards.length - cardsPerView;
  
  if (carouselIndex < 0) carouselIndex = 0;
  if (carouselIndex > maxIndex) carouselIndex = maxIndex;
  
  const cardWidth = cards[0].getBoundingClientRect().width + 20; 
  track.style.transform = `translateX(-${carouselIndex * cardWidth}px)`;
};

nextBtn?.addEventListener('click', () => {
  const cardsPerView = getCardsPerView();
  if (carouselIndex < cards.length - cardsPerView) {
    carouselIndex++;
    moveCarousel();
  }
});

prevBtn?.addEventListener('click', () => {
  if (carouselIndex > 0) {
    carouselIndex--;
    moveCarousel();
  }
});

window.addEventListener('resize', moveCarousel);



//zoom img roscas
document.querySelectorAll('.card-media img').forEach(img => {
  img.addEventListener('mousemove', (e) => {
    const rect = e.target.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    e.target.style.transformOrigin = `${x}% ${y}%`;
  });
  img.addEventListener('mouseleave', (e) => {
    e.target.style.transformOrigin = 'center center';
  });
});