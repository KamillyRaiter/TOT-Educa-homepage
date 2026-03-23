// ===========================
// TOT Educação Corporativa
// script.js
// ===========================

document.addEventListener('DOMContentLoaded', () => {

  // -------------------------
  // Courses Carousel
  // -------------------------
  const track = document.getElementById('coursesTrack');
  const prevBtn = document.getElementById('prevBtn');
  const nextBtn = document.getElementById('nextBtn');

  if (track && prevBtn && nextBtn) {

    const cards = track.querySelectorAll('.course-card');
    const cardWidth = () => cards[0].offsetWidth + 16; // width + gap
    let currentIndex = 0;

    function getVisibleCount() {
      const trackWidth = track.parentElement.offsetWidth - 80; // minus buttons
      return Math.floor(trackWidth / cardWidth());
    }

    function maxIndex() {
      return Math.max(0, cards.length - getVisibleCount());
    }

    function updateCarousel() {
      const offset = currentIndex * cardWidth();

      track.style.transform = `translateX(-${offset}px)`;
      track.style.transition = 'transform 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)';

      prevBtn.style.opacity = currentIndex === 0 ? '0.4' : '1';
      nextBtn.style.opacity = currentIndex >= maxIndex() ? '0.4' : '1';
    }

    nextBtn.addEventListener('click', () => {
      if (currentIndex < maxIndex()) {
        currentIndex++;
        updateCarousel();
      }
    });

    prevBtn.addEventListener('click', () => {
      if (currentIndex > 0) {
        currentIndex--;
        updateCarousel();
      }
    });

    // Re-check on resize
    window.addEventListener('resize', () => {
      currentIndex = Math.min(currentIndex, maxIndex());
      updateCarousel();
    });

    updateCarousel();
  }


  // -------------------------
  // Logo scroller (duplicate items for infinite loop)
  // -------------------------
  const logosTrack = document.querySelector('.logos-track');

  if (logosTrack) {
    const clone = logosTrack.innerHTML;
    logosTrack.innerHTML += clone;
  }


  // -------------------------
  // Smooth scroll for anchor links
  // -------------------------
  document.querySelectorAll('a[href^="#"]').forEach(link => {

    link.addEventListener('click', e => {

      const target = document.querySelector(link.getAttribute('href'));

      if (target) {
        e.preventDefault();

        target.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }

    });

  });


  // -------------------------
  // Sticky header shadow on scroll
  // -------------------------
  const header = document.querySelector('.header');

  if (header) {

    window.addEventListener('scroll', () => {

      if (window.scrollY > 10) {
        header.style.boxShadow = '0 4px 20px rgba(0,0,0,0.1)';
      } else {
        header.style.boxShadow = '0 2px 8px rgba(0,0,0,0.06)';
      }

    });

  }


  // -------------------------
  // Scroll-in animation
  // -------------------------
  const animateEls = document.querySelectorAll(
    '.stat-card, .solution-card, .course-card, .form-card, .material-inner'
  );

  const observer = new IntersectionObserver((entries) => {

    entries.forEach(entry => {

      if (entry.isIntersecting) {

        entry.target.style.opacity = '1';

        entry.target.style.transform =
          entry.target.style.transform.replace('translateY(24px)', 'translateY(0)');

        observer.unobserve(entry.target);
      }

    });

  }, { threshold: 0.12 });


  animateEls.forEach(el => {

    el.style.opacity = '0';
    el.style.transform = (el.style.transform || '') + ' translateY(24px)';
    el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';

    observer.observe(el);

  });


  // -------------------------
  // Form submit feedback
  // -------------------------
  document.querySelectorAll('.contact-form').forEach(form => {

    form.addEventListener('submit', e => {

      e.preventDefault();

      const btn = form.querySelector('.btn-submit');
      const original = btn.textContent;

      btn.textContent = '✓ Enviado!';
      btn.style.background = '#2b9348';

      setTimeout(() => {

        btn.textContent = original;
        btn.style.background = '';
        form.reset();

      }, 2500);

    });

  });

});