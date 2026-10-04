(() => {
  'use strict';

  const root = document.documentElement;
  const body = document.body;

  const progress = document.getElementById('progressBar');
  const themeToggle = document.getElementById('themeToggle');
  const themeIcon = document.getElementById('themeIcon');
  const menuToggle = document.getElementById('menuToggle');
  const navLinks = document.getElementById('navLinks');
  const cursor = document.getElementById('cursor');
  const cursorDot = document.getElementById('cursorDot');
  const year = document.getElementById('year');

  const projectModal = document.getElementById('projectModal');
  const modalCard = projectModal?.querySelector('.modal-card');
  const modalTitle = document.getElementById('modalTitle');
  const modalText = document.getElementById('modalText');
  const modalStack = document.getElementById('modalStack');
  const modalUrl = document.getElementById('modalUrl');
  const modalGithub = document.getElementById('modalGithub');

  // Adicione aqui os links reais dos seus projetos e repositórios
  const PROJECTS = {
    'Cafeteria': {
      text: 'Projeto digital com foco em identidade, experiência e apresentação de um negócio de café.',
      stack: 'HTML, CSS, JavaScript',
      url: 'https://seu-link-cafeteria.com',
      github: 'https://github.com/mariacarolinarosa'
    },
    'Blocos de Carnaval': {
      text: 'Conceito para organizar informações, eventos e experiências ligadas aos blocos e à programação.',
      stack: 'HTML, CSS, JavaScript',
      url: 'https://seu-link-carnaval.com',
      github: 'https://github.com/mariacarolinarosa'
    },
    'Aplicativo de banco': {
      text: 'Proposta de experiência para serviços financeiros, com atenção a clareza, fluxo e segurança.',
      stack: 'HTML, CSS, JavaScript',
      url: 'https://seu-link-banco.com',
      github: 'https://github.com/mariacarolinarosa'
    },
    'Cofre de senhas': {
      text: 'Projeto conceitual voltado à organização segura de credenciais e ao desenho de uma experiência simples.',
      stack: 'HTML, CSS, JavaScript',
      url: 'https://seu-link-cofre.com',
      github: 'https://github.com/mariacarolinarosa'
    },
    'Organização de Copa da Faculdade': {
      text: 'Planejamento e organização de uma competição acadêmica, com estrutura de participantes, regras e calendário.',
      stack: 'HTML, CSS, JavaScript',
      url: 'https://seu-link-copa.com',
      github: 'https://github.com/mariacarolinarosa'
    }
  };

  function safeStorageGet(key) {
    try {
      return window.localStorage.getItem(key);
    } catch (_) {
      return null;
    }
  }

  function safeStorageSet(key, value) {
    try {
      window.localStorage.setItem(key, value);
    } catch (_) {}
  }

  function setTheme(theme) {
    const isLight = theme === 'light';

    root.dataset.theme = isLight ? 'light' : 'dark';
    themeToggle?.setAttribute('aria-pressed', String(isLight));

    if (themeIcon) {
      themeIcon.innerHTML = isLight
        ? '<path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79Z"></path>'
        : '<circle cx="12" cy="12" r="4"></circle><path d="M12 2v2M12 20v2M4.93 4.93l1.42 1.42M17.65 17.65l1.42 1.42M2 12h2M20 12h2M4.93 19.07l1.42-1.42M17.65 6.35l1.42-1.42"></path>';
    }

    document.querySelector('meta[name="theme-color"]')
      ?.setAttribute('content', isLight ? '#f4f1ea' : '#0c0d10');
  }

  const storedTheme = safeStorageGet('portfolio-theme');
  const prefersLight = window.matchMedia?.('(prefers-color-scheme: light)').matches;
  setTheme(storedTheme || (prefersLight ? 'light' : 'dark'));

  themeToggle?.addEventListener('click', () => {
    const next = root.dataset.theme === 'light' ? 'dark' : 'light';
    setTheme(next);
    safeStorageSet('portfolio-theme', next);
  });

  function closeMenu() {
    navLinks?.classList.remove('is-open');
    menuToggle?.setAttribute('aria-expanded', 'false');
    menuToggle?.setAttribute('aria-label', 'Abrir menu');
  }

  menuToggle?.addEventListener('click', () => {
    const open = navLinks?.classList.toggle('is-open') || false;
    menuToggle.setAttribute('aria-expanded', String(open));
    menuToggle.setAttribute('aria-label', open ? 'Fechar menu' : 'Abrir menu');
  });

  navLinks?.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', closeMenu);
  });

  function onScroll() {
    const max = Math.max(document.documentElement.scrollHeight - window.innerHeight, 0);

    if (progress) {
      progress.style.width = max
        ? `${(window.scrollY / max) * 100}%`
        : '0%';
    }

    let current = '';

    document.querySelectorAll('main section[id]').forEach((section) => {
      if (window.scrollY >= section.offsetTop - 110) {
        current = section.id;
      }
    });

    navLinks?.querySelectorAll('a').forEach((link) => {
      link.classList.toggle(
        'active',
        link.getAttribute('href') === `#${current}`
      );
    });
  }

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  const reduceMotion = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
  const revealItems = document.querySelectorAll('.reveal');

  if (!reduceMotion && 'IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const delay = entry.target.dataset.delay;

          if (delay) {
            entry.target.style.transitionDelay = `${delay}ms`;
          }

          entry.target.classList.add('in');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });

    revealItems.forEach((item) => observer.observe(item));
  } else {
    revealItems.forEach((item) => item.classList.add('in'));
  }

  if (
    window.matchMedia?.('(pointer:fine)').matches &&
    window.innerWidth > 900 &&
    !reduceMotion
  ) {
    body.classList.add('cursor-active');

    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let cursorX = mouseX;
    let cursorY = mouseY;

    window.addEventListener('mousemove', (event) => {
      mouseX = event.clientX;
      mouseY = event.clientY;
    });

    function tick() {
      cursorX += (mouseX - cursorX) * 0.18;
      cursorY += (mouseY - cursorY) * 0.18;

      if (cursor) {
        cursor.style.left = `${cursorX}px`;
        cursor.style.top = `${cursorY}px`;
      }

      if (cursorDot) {
        cursorDot.style.left = `${mouseX}px`;
        cursorDot.style.top = `${mouseY}px`;
      }

      window.requestAnimationFrame(tick);
    }

    tick();

    document
      .querySelectorAll('a, button, .project, .skill-group, .profile-link')
      .forEach((element) => {
        element.addEventListener('mouseenter', () => body.classList.add('cursor-hover'));
        element.addEventListener('mouseleave', () => body.classList.remove('cursor-hover'));
      });
  }

  document.querySelectorAll('.project').forEach((card) => {
    card.addEventListener('mousemove', (event) => {
      const rect = card.getBoundingClientRect();

      card.style.setProperty(
        '--mx',
        `${((event.clientX - rect.left) / rect.width) * 100}%`
      );

      card.style.setProperty(
        '--my',
        `${((event.clientY - rect.top) / rect.height) * 100}%`
      );
    });

    card.addEventListener('mouseleave', () => {
      card.style.setProperty('--mx', '50%');
      card.style.setProperty('--my', '50%');
    });
  });

  function openProject(name) {
    const project = PROJECTS[name];

    if (!project || !projectModal) return;

    if (modalTitle) modalTitle.textContent = name;
    if (modalText) modalText.textContent = project.text;
    if (modalStack) modalStack.textContent = project.stack;

    if (modalUrl) {
      modalUrl.href = project.url || '#';
    }

    if (modalGithub) {
      modalGithub.href = project.github || '#';
    }

    projectModal.hidden = false;
    projectModal.setAttribute('aria-hidden', 'false');
    body.classList.add('modal-open');

    window.setTimeout(() => modalCard?.focus(), 0);
  }

  function closeProject() {
    if (!projectModal) return;

    projectModal.hidden = true;
    projectModal.setAttribute('aria-hidden', 'true');
    body.classList.remove('modal-open');
  }

  document.querySelectorAll('.project-trigger').forEach((button) => {
    button.addEventListener('click', (event) => {
      event.preventDefault();
      openProject(button.dataset.project || 'Projeto');
    });
  });

  projectModal
    ?.querySelectorAll('[data-close-modal]')
    .forEach((element) => element.addEventListener('click', closeProject));

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
      closeProject();
      closeMenu();
    }
  });

  document.querySelectorAll('.institution-photo img, .navy-visual img').forEach((image) => {
    image.addEventListener('error', () => {
      image.hidden = true;

      const fallback = image.parentElement?.querySelector('.photo-fallback');
      if (fallback) {
        fallback.style.display = 'grid';
      }
    }, { once: true });
  });

  document.querySelectorAll('[data-placeholder-link]').forEach((link) => {
    link.addEventListener('click', (event) => {
      if (link.getAttribute('href') === '#') {
        event.preventDefault();
      }
    });
  });

  if (year) {
    year.textContent = String(new Date().getFullYear());
  }
})();