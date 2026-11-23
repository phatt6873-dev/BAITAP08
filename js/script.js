/* ==========================================================
   script.js - Dark Mode Toggle, Scroll Animation (IntersectionObserver)
               & Mobile Navigation
   ========================================================== */

document.addEventListener('DOMContentLoaded', () => {
  // 1. DARK MODE TOGGLE (Lưu trạng thái vào localStorage)
  const themeToggleBtn = document.getElementById('themeToggle');
  const htmlEl = document.documentElement;

  const savedTheme = localStorage.getItem('portfolio-theme');
  if (savedTheme === 'dark') {
    htmlEl.setAttribute('data-theme', 'dark');
    if (themeToggleBtn) themeToggleBtn.textContent = '☀️ Light';
  }

  if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', () => {
      const isDark = htmlEl.getAttribute('data-theme') === 'dark';
      if (isDark) {
        htmlEl.removeAttribute('data-theme');
        localStorage.setItem('portfolio-theme', 'light');
        themeToggleBtn.textContent = '🌙 Dark';
      } else {
        htmlEl.setAttribute('data-theme', 'dark');
        localStorage.setItem('portfolio-theme', 'dark');
        themeToggleBtn.textContent = '☀️ Light';
      }
    });
  }

  // 2. MOBILE NAVIGATION TOGGLE
  const menuToggleBtn = document.getElementById('menuToggle');
  const navLinks = document.getElementById('navLinks');

  if (menuToggleBtn && navLinks) {
    menuToggleBtn.addEventListener('click', () => {
      navLinks.classList.toggle('open');
    });
  }

  // 3. SCROLL ANIMATION DÙNG INTERSECTION OBSERVER
  const revealElements = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            obs.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.12,
        rootMargin: '0px 0px -30px 0px'
      }
    );

    revealElements.forEach((el) => observer.observe(el));
  } else {
    // Fallback cho trình duyệt cũ
    revealElements.forEach((el) => el.classList.add('visible'));
  }
});
