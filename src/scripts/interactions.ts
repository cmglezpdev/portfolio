const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

function initProjectAnimations(): void {
  // The page remains fully visible and navigable without JavaScript.
  if (reducedMotion.matches || !('IntersectionObserver' in window)) return;

  const reveal = new IntersectionObserver((entries) => {
    for (const entry of entries) {
      if (!entry.isIntersecting) continue;
      entry.target.animate(
        [{ opacity: 0.5, transform: 'translateY(16px)' }, { opacity: 1, transform: 'translateY(0)' }],
        { duration: 600, easing: 'cubic-bezier(.2,.7,.3,1)' },
      );
      reveal.unobserve(entry.target);
    }
  }, { threshold: 0.12 });
  document.querySelectorAll('[data-project-card]').forEach((card) => reveal.observe(card));
}

function initScrollTimeline(track: HTMLElement): void {
  const marker = track.querySelector('[data-scroll-marker]');
  const progress = track.querySelector('[data-scroll-progress]');
  if (!(marker instanceof HTMLElement) || !(progress instanceof HTMLElement)) return;

  let scheduled = false;
  const update = (): void => {
    const rect = track.getBoundingClientRect();
    const distance = Math.max(0, Math.min(rect.height - marker.offsetHeight, window.innerHeight * 0.55 - rect.top));
    marker.hidden = reducedMotion.matches;
    progress.hidden = reducedMotion.matches;
    marker.style.transform = `translateY(${distance}px)`;
    progress.style.height = `${distance}px`;
    scheduled = false;
  };
  const schedule = (): void => {
    if (scheduled) return;
    scheduled = true;
    window.requestAnimationFrame(update);
  };
  window.addEventListener('scroll', schedule, { passive: true });
  window.addEventListener('resize', schedule, { passive: true });
  reducedMotion.addEventListener('change', schedule);
  update();
}

function initScrollProgress(): void {
  document.querySelectorAll('[data-scroll-track]').forEach((track) => {
    if (track instanceof HTMLElement) initScrollTimeline(track);
  });
}

function initSectionNavigation(): void {
  const sections = [...document.querySelectorAll('[data-nav]')].flatMap((link) => {
    const section = document.getElementById(link.getAttribute('data-nav') || '');
    return section ? [{ link, section }] : [];
  });
  // Article headings are siblings of their text, so each range ends where the next heading starts.
  const rangeEnd = (index: number): number => {
    const { section } = sections[index];
    if (section.tagName !== 'H2') return section.getBoundingClientRect().bottom;
    const next = sections[index + 1]?.section;
    return next ? next.getBoundingClientRect().top : (section.parentElement ?? section).getBoundingClientRect().bottom;
  };
  let scheduled = false;
  const update = (): void => {
    scheduled = false;
    const position = window.innerHeight * 0.35;
    sections.forEach(({ link, section }, index) => {
      if (section.getBoundingClientRect().top <= position && rangeEnd(index) > position) link.setAttribute('aria-current', 'location');
      else link.removeAttribute('aria-current');
    });
  };
  const schedule = (): void => {
    if (scheduled) return;
    scheduled = true;
    window.requestAnimationFrame(update);
  };
  // Read the current geometry once per frame, including after jumps and exits.
  window.addEventListener('scroll', schedule, { passive: true });
  window.addEventListener('resize', schedule, { passive: true });
  update();
}

// Diagrams carry small text, so article images open in the shared preview dialog.
// Without JavaScript they stay ordinary images.
function initArticleImages(): void {
  const images = document.querySelectorAll('[data-article-body] img');
  images.forEach((image, index) => {
    if (!(image instanceof HTMLImageElement) || image.closest('a')) return;
    const trigger = document.createElement('a');
    trigger.href = image.currentSrc || image.src;
    trigger.dataset.preview = '';
    trigger.dataset.title = document.querySelector('h1')?.textContent || 'Article image';
    trigger.dataset.caption = `Image ${index + 1} of ${images.length}`;
    trigger.setAttribute('aria-haspopup', 'dialog');
    trigger.setAttribute('aria-label', `Enlarge image: ${image.alt}`);
    image.dataset.previewMain = '';
    image.replaceWith(trigger);
    trigger.append(image);
  });
}

function initProjectPreview(): void {
  const dialog = document.querySelector('#project-preview');
  if (!(dialog instanceof HTMLDialogElement)) return;

  const title = dialog.querySelector('#preview-title');
  const description = dialog.querySelector('#preview-description');
  const caption = dialog.querySelector('#preview-caption');
  const imageContainer = dialog.querySelector('[data-preview-image]');
  const projectLink = dialog.querySelector('[data-preview-link]');
  const closeButton = dialog.querySelector('[data-close-preview]');
  const controls = dialog.querySelector('[data-preview-controls]');
  const counter = dialog.querySelector('[data-preview-counter]');
  const fullImageLink = dialog.querySelector('[data-preview-full-image]');
  const previousButton = dialog.querySelector('[data-preview-previous]');
  const nextButton = dialog.querySelector('[data-preview-next]');
  let slides: HTMLImageElement[] = [];
  let currentIndex = 0;
  let previousOverflow = '';

  function showSlide(index: number): void {
    if (!slides.length || !imageContainer || !description) return;
    currentIndex = (index + slides.length) % slides.length;
    const image = slides[currentIndex].cloneNode(true);
    if (!(image instanceof HTMLImageElement)) return;
    image.loading = 'eager';
    image.className = 'block h-full w-full object-contain';
    imageContainer.replaceChildren(image);
    description.textContent = image.alt;
    if (counter instanceof HTMLElement) {
      counter.textContent = `${currentIndex + 1} / ${slides.length}`;
      counter.hidden = slides.length < 2;
    }
    if (fullImageLink instanceof HTMLAnchorElement) {
      const largestSrc = image.srcset
        .split(',')
        .map((candidate) => candidate.trim().split(/\s+/))
        .filter((candidate) => candidate.length > 1)
        .sort((left, right) => Number.parseInt(right[1], 10) - Number.parseInt(left[1], 10))[0]?.[0];
      fullImageLink.href = largestSrc || image.currentSrc || image.src;
    }
  }

  previousButton?.addEventListener('click', () => showSlide(currentIndex - 1));
  nextButton?.addEventListener('click', () => showSlide(currentIndex + 1));
  dialog.addEventListener('keydown', (event) => {
    if (event.key !== 'ArrowLeft' && event.key !== 'ArrowRight') return;
    event.preventDefault();
    showSlide(currentIndex + (event.key === 'ArrowRight' ? 1 : -1));
  });

  document.querySelectorAll('[data-preview]').forEach((button) => {
    button.addEventListener('click', (event) => {
      if (event instanceof MouseEvent && (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey)) return;
      const source = button.querySelector('img[data-preview-main]');
      if (!(source instanceof HTMLImageElement)) return;
      if (!(button instanceof HTMLElement) || !title || !description || !caption || !imageContainer || !projectLink) return;
      event.preventDefault();
      title.textContent = button.dataset.title || 'Project preview';
      caption.textContent = button.dataset.caption || '';
      projectLink.setAttribute('href', button.dataset.href || '/#work');
      // Article images have no project page to link to.
      if (projectLink instanceof HTMLElement) projectLink.hidden = !button.dataset.href;
      slides = [source];
      button.querySelectorAll('template[data-preview-slide]').forEach((template) => {
        if (!(template instanceof HTMLTemplateElement)) return;
        const image = template.content.querySelector('img[data-preview-main]');
        if (image instanceof HTMLImageElement) slides.push(image);
      });
      if (controls instanceof HTMLElement) controls.hidden = false;
      if (previousButton instanceof HTMLButtonElement) previousButton.hidden = slides.length < 2;
      if (nextButton instanceof HTMLButtonElement) nextButton.hidden = slides.length < 2;
      showSlide(0);
      previousOverflow = document.documentElement.style.overflow;
      document.documentElement.style.overflow = 'hidden';
      dialog.showModal();
    });
  });

  closeButton?.addEventListener('click', () => dialog.close());
  dialog.addEventListener('click', (event) => {
    if (event.target !== dialog) return;
    const bounds = dialog.getBoundingClientRect();
    if (event.clientX < bounds.left || event.clientX > bounds.right || event.clientY < bounds.top || event.clientY > bounds.bottom) dialog.close();
  });
  dialog.addEventListener('close', () => {
    document.documentElement.style.overflow = previousOverflow;
  });
}

initProjectAnimations();
initScrollProgress();
initSectionNavigation();
initArticleImages();
initProjectPreview();
