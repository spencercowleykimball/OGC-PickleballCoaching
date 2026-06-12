// OG-C Pickleball — main.js

document.addEventListener('DOMContentLoaded', () => {

  // ── Pause ball spin on hover ──────────────────────────────────
  const ball = document.getElementById('ball');
  if (ball) {
    ball.addEventListener('mouseenter', () => {
      ball.style.animationPlayState = 'paused';
    });
    ball.addEventListener('mouseleave', () => {
      ball.style.animationPlayState = 'running';
    });
  }

  // ── Card entrance animation ───────────────────────────────────
  const cards = document.querySelectorAll('.card-circle');
  cards.forEach((card, i) => {
    card.style.opacity = '0';
    card.style.transform = card.style.transform + ' scale(0.7)';
    setTimeout(() => {
      card.style.transition = 'opacity 0.4s ease, transform 0.4s cubic-bezier(1,.3,1.5,.5)';
      card.style.opacity = '1';
      card.style.transform = card.style.transform.replace('scale(0.7)', 'scale(1)');
    }, 200 + i * 300);
  });

  // ── Active nav link highlight ─────────────────────────────────
  const currentPage = window.location.pathname.split('/').pop();
  document.querySelectorAll('.nav-link').forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentPage || (currentPage === '' && href === 'index.html')) {
      link.classList.add('active');
    } else {
      link.classList.remove('active');
    }
  });

  // ── Carousel navigation ───────────────────────────────────────
  const carouselImages = document.querySelectorAll('.carousel-image');
  const carouselDots = document.querySelectorAll('.dot');
  const carouselPrev = document.querySelector('.carousel-prev');
  const carouselNext = document.querySelector('.carousel-next');
  let currentImageIndex = 0;

  function showImage(index) {
    // Remove active class from all images and dots
    carouselImages.forEach(img => img.classList.remove('active'));
    carouselDots.forEach(dot => dot.classList.remove('active'));
    
    // Add active class to current image and dot
    carouselImages[index].classList.add('active');
    carouselDots[index].classList.add('active');
    currentImageIndex = index;
  }

  function nextImage() {
    const nextIndex = (currentImageIndex + 1) % carouselImages.length;
    showImage(nextIndex);
  }

  function prevImage() {
    const prevIndex = (currentImageIndex - 1 + carouselImages.length) % carouselImages.length;
    showImage(prevIndex);
  }

  if (carouselPrev) carouselPrev.addEventListener('click', prevImage);
  if (carouselNext) carouselNext.addEventListener('click', nextImage);

  carouselDots.forEach(dot => {
    dot.addEventListener('click', (e) => {
      const index = parseInt(e.target.dataset.index);
      showImage(index);
    });
  });

});
