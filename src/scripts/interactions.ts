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
  if (!('IntersectionObserver' in window)) return;

  const navigation = new IntersectionObserver((entries) => {
    for (const entry of entries) {
      if (!entry.isIntersecting) continue;
      document.querySelectorAll('[data-nav]').forEach((link) => {
        if (link.getAttribute('data-nav') === entry.target.id) link.setAttribute('aria-current', 'location');
        else link.removeAttribute('aria-current');
      });
    }
  }, { rootMargin: '-15% 0px -55% 0px' });
  document.querySelectorAll('section[id]').forEach((section) => navigation.observe(section));
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
    if (counter) counter.textContent = `${currentIndex + 1} / ${slides.length}`;
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
    button.addEventListener('click', () => {
      const source = button.querySelector('img[data-preview-main]');
      if (!(source instanceof HTMLImageElement)) return;
      if (!(button instanceof HTMLElement) || !title || !description || !caption || !imageContainer || !projectLink) return;
      title.textContent = button.dataset.title || 'Project preview';
      caption.textContent = button.dataset.caption || '';
      projectLink.setAttribute('href', button.dataset.href || '/#work');
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
initProjectPreview();
