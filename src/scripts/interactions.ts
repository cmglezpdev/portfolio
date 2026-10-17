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
  let previousOverflow = '';

  document.querySelectorAll('[data-preview]').forEach((button) => {
    button.addEventListener('click', () => {
      const source = button.querySelector('img');
      if (!(source instanceof HTMLImageElement)) return;
      if (!(button instanceof HTMLElement) || !title || !description || !caption || !imageContainer || !projectLink) return;
      title.textContent = button.dataset.title || 'Project preview';
      description.textContent = button.dataset.description || '';
      caption.textContent = button.dataset.caption || '';
      projectLink.setAttribute('href', button.dataset.href || '/#work');
      const image = source.cloneNode(true);
      if (image instanceof HTMLImageElement) {
        image.loading = 'eager';
        image.className = 'block h-auto w-full';
      }
      imageContainer.replaceChildren(image);
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
