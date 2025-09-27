document.addEventListener('DOMContentLoaded', function () {



  const allNavElements = document.querySelectorAll('.nav-brand h2, .nav-menu .nav-link');

  allNavElements.forEach((element, index) => {

    element.style.opacity = '0';


    setTimeout(() => {

      element.style.animation = `bounce-in-right 2.0s ease forwards`;
    }, index * 150);


    element.addEventListener('animationend', () => {

      element.style.opacity = '1';

      element.style.animation = '';
    }, { once: true });
  });


  setTimeout(() => {
    const loader = document.getElementById('loading-screen');
    if (loader) loader.classList.add('hidden');
  }, 1200);

  // Hamburger menu
  const navHamburger = document.getElementById('nav-hamburger');
  const navMenu = document.querySelector('.nav-menu');
  if (navHamburger && navMenu) {
    navHamburger.addEventListener('click', () => {
      navMenu.classList.toggle('open');
    });
    document.querySelectorAll('.nav-link').forEach(link => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('open');
      });
    });
  }


  // Theme toggle
  const themeToggle = document.getElementById('theme-toggle');
  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      document.body.classList.toggle('light');
      if (document.body.classList.contains('light')) {
        themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
        localStorage.setItem('theme', 'light');
      } else {
        themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
        localStorage.setItem('theme', 'dark');
      }
    });
    if (localStorage.getItem('theme') === 'light') {
      document.body.classList.add('light');
      themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
    }
  }


  window.addEventListener('scroll', () => {
    const h = document.documentElement;
    const scrolled = (h.scrollTop / (h.scrollHeight - h.clientHeight)) * 100;
    const progressBar = document.querySelector('.scroll-progress');
    if (progressBar) {
      progressBar.style.width = `${scrolled}%`;
    }
  });

  // Animated skill bars
  let skillSeen = false;
  function animateSkills() {
    document.querySelectorAll('.skill-level').forEach(bar => {
      bar.style.width = `${bar.getAttribute('data-level')}%`;
    });
  }
  window.addEventListener('scroll', () => {
    const skillSec = document.querySelector('.skills-section');
    if (skillSec && !skillSeen && skillSec.getBoundingClientRect().top < window.innerHeight - 60) {
      animateSkills();
      skillSeen = true;
    }
  });

  // Typing effect
  const roles = ['Student', 'Photographer', 'Researcher', 'Editor', 'Scout Leader'];
  let r = 0, ci = 0, del = false;
  function typeEffect() {
    const el = document.querySelector('.typed-text');
    if (!el) return;
    el.textContent = roles[r].slice(0, ci);
    if (!del && ci < roles[r].length) {
      ci++;
    } else if (!del && ci === roles[r].length) {
      del = true;
      setTimeout(typeEffect, 900);
      return;
    } else if (del && ci > 0) {
      ci--;
    } else if (del && ci === 0) {
      del = false;
      r = (r + 1) % roles.length;
    }
    setTimeout(typeEffect, del ? 55 : 125);
  }
  typeEffect();


  let statsSeen = false;
  function animateStats() {
    document.querySelectorAll('.stat-value').forEach(stat => {
      let target = +stat.getAttribute('data-target');
      let v = 0;
      function step() {
        stat.textContent = Math.min(target, Math.floor(v));
        if (v < target) {
          v += target / 28;
          setTimeout(step, 38);
        } else {
          stat.textContent = target;
        }
      }
      step();
    });
  }
  window.addEventListener('scroll', () => {
    const statSec = document.querySelector('.about-section .stats');
    if (statSec && !statsSeen && statSec.getBoundingClientRect().top < window.innerHeight - 90) {
      statsSeen = true;
      animateStats();
    }
  });

  // Parallax particle background
  const canvas = document.getElementById('particles');
  if (canvas) {
    const ctx = canvas.getContext('2d');
    let w = window.innerWidth, h = window.innerHeight;
    canvas.width = w;
    canvas.height = h;
    let particles = [];
    for (let i = 0; i < 60; i++) {
      particles.push({
        x: Math.random() * w,
        y: Math.random() * h,
        r: Math.random() * 2.1 + 1,
        xa: Math.random() * 0.8 - 0.4,
        ya: Math.random() * 0.7 - 0.35,
        c: `rgba(183,75,75,${Math.random() * 0.4 + 0.39})`
      });
    }
    function draw() {
      ctx.clearRect(0, 0, w, h);
      particles.forEach(p => {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = p.c;
        ctx.fill();
        p.x += p.xa;
        p.y += p.ya;
        if (p.x < 0 || p.x > w) p.xa *= -1;
        if (p.y < 0 || p.y > h) p.ya *= -1;
      });
      requestAnimationFrame(draw);
    }
    draw();
    window.addEventListener('resize', () => {
      w = window.innerWidth;
      h = window.innerHeight;
      canvas.width = w;
      canvas.height = h;
    });
  }

  // --- Gallery Lightbox ---
  document.querySelectorAll('.gallery-item').forEach(img => {
    img.addEventListener('click', () => {
      const box = document.getElementById('lightbox');
      const boximg = box.querySelector('.lightbox-img');
      if (box && boximg) {
        boximg.src = img.src;
        box.classList.remove('hidden');
      }
    });
  });


  const lightbox = document.getElementById('lightbox');
  const lightboxClose = lightbox.querySelector('.lightbox-close');

  if (lightboxClose) {
    lightboxClose.addEventListener('click', () => {
      lightbox.classList.add('hidden');
    });
  }


  if (lightbox) {
    lightbox.addEventListener('click', (e) => {
      if (e.target === lightbox) {
        lightbox.classList.add('hidden');
      }
    });
  }


  // Contact Form 
  const contactForm = document.getElementById('contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
      e.preventDefault();

      const formData = new FormData(contactForm);

      try {
        const response = await fetch(contactForm.action, {
          method: contactForm.method,
          body: formData,
          headers: { 'Accept': 'application/json' }
        });

        if (response.ok) {
          alert('✅ Thank you for your message! I will get back to you soon.');
          contactForm.reset();
        } else {
          alert('❌ Oops! Something went wrong. Please try again.');
        }
      } catch (error) {
        alert('⚠️ Network error. Please try again later.');
      }
    });
  }





  // Staggered reveal for section children
  const sectionsToStagger = ['skills', 'projects', 'experience', 'education', 'volunteering', 'achievements', 'gallery'];
  const animatedSections = new Set();
  const staggerObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !animatedSections.has(entry.target.id)) {
        const sectionId = entry.target.id;
        const targetElements = getStaggeredElements(sectionId);

        targetElements.forEach((el, index) => {
          setTimeout(() => {
            el.classList.add('revealed');
          }, index * 250);
        });
        animatedSections.add(sectionId);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.35 });

  function getStaggeredElements(sectionId) {
    switch (sectionId) {
      case 'skills':
        return document.querySelectorAll('#skills .skill-3d-card');
      case 'projects':
        return document.querySelectorAll('#projects .project-card');
      case 'experience':
        return document.querySelectorAll('#experience .timeline li');
      case 'education':
        return document.querySelectorAll('#education .education-card');
      case 'volunteering':
        return document.querySelectorAll('#volunteering .timeline li');
      case 'achievements':
        return document.querySelectorAll('#achievements .badge');
      case 'gallery':
        return document.querySelectorAll('#gallery .gallery-item');
      default:
        return [];
    }
  }

  sectionsToStagger.forEach(id => {
    const section = document.getElementById(id);
    if (section) {
      const items = getStaggeredElements(id);
      items.forEach(item => {
        item.classList.add('stagger-item');
      });
      staggerObserver.observe(section);
    }
  });


  const generalObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.target.id === 'gallery') {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
          observer.unobserve(entry.target);
        }
      } else {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
          entry.target.classList.remove('outro');
        } else {
          entry.target.classList.add('outro');
          entry.target.classList.remove('active');
        }
      }
    });
  }, { threshold: 0.5 });
  document.querySelectorAll('.section').forEach(section => {

    if (!sectionsToStagger.includes(section.id)) {
      generalObserver.observe(section);
    }
  });

});