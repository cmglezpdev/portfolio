// Run in a browser console after selecting a theme. Audits flat/composited
// backgrounds; image pixels, gradients, pseudo-elements and hover need inspection.
(() => {
  // Finish theme transitions before reading their settled colors.
  const settling = document.createElement('style');
  settling.textContent = '*, *::before, *::after { transition: none !important; }';
  document.head.append(settling);
  const canvas = document.createElement('canvas');
  canvas.width = canvas.height = 1;
  const context = canvas.getContext('2d', {willReadFrequently:true});
  const rgb = color => {
    context.clearRect(0,0,1,1);
    context.fillStyle = color;
    context.fillRect(0,0,1,1);
    const [r,g,b,a] = context.getImageData(0,0,1,1).data;
    return [r,g,b,a/255];
  };
  const blend = (fg, bg) => fg.slice(0, 3).map((v, i) => v * fg[3] + bg[i] * (1 - fg[3]));
  const luminance = channels => channels.map(v => v / 255).map(v => v <= .04045 ? v / 12.92 : ((v + .055) / 1.055) ** 2.4).reduce((s, v, i) => s + v * [.2126, .7152, .0722][i], 0);
  const background = el => {
    const chain = [];
    for (let node = el; node; node = node.parentElement) chain.unshift(node);
    return chain.reduce((bg, node) => blend(rgb(getComputedStyle(node).backgroundColor), bg), [255,255,255]);
  };
  const failures = [];
  let checked = 0;
  const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
  while (walker.nextNode()) {
    const text = walker.currentNode;
    const el = text.parentElement;
    if (!text.textContent.trim() || !el || el.closest('[aria-hidden="true"], .sr-only, script, style, template') || !el.checkVisibility({checkOpacity:true, checkVisibilityCSS:true})) continue;
    const rect = el.getBoundingClientRect();
    if (rect.width <= 1 || rect.height <= 1) continue;
    const style = getComputedStyle(el);
    const bg = background(el);
    const fg = blend(rgb(style.color), bg);
    const values = [luminance(bg), luminance(fg)].sort((a,b) => b-a);
    const ratio = (values[0]+.05)/(values[1]+.05);
    const size = parseFloat(style.fontSize);
    const threshold = size >= 24 || size >= 18.66 && parseFloat(style.fontWeight) >= 700 ? 3 : 4.5;
    checked++;
    if (ratio < threshold) failures.push({text:text.textContent.trim().slice(0,100),ratio,threshold,color:style.color,size,classes:el.className});
  }
  const sizes = Object.fromEntries(['body','control','role'].map(role => {
    const el = document.querySelector('.text-'+role);
    const style = el && getComputedStyle(el);
    return [role, style ? {size:style.fontSize,lineHeight:style.lineHeight,color:style.color} : null];
  }));
  settling.remove();
  return {route:location.pathname,theme:document.documentElement.dataset.theme,width:innerWidth,overflow:document.documentElement.scrollWidth>innerWidth,checked,failures,sizes};
})()
