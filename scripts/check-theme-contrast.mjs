import { readFileSync } from 'node:fs';
const css = readFileSync(new URL('../src/styles/global.css', import.meta.url), 'utf8');
const tokens = Object.fromEntries([...css.matchAll(/--color-([\w-]+): light-dark\((#[\da-f]+), (#[\da-f]+)\)/g)].map(([, name, light, dark]) => [name, [light, dark]]));
const luminance = hex => {
  const rgb = hex.slice(1).match(/../g).map(v => parseInt(v, 16) / 255).map(v => v <= .04045 ? v / 12.92 : ((v + .055) / 1.055) ** 2.4);
  return rgb.reduce((sum, v, i) => sum + v * [.2126, .7152, .0722][i], 0);
};
let failed = false;
const typeNames = [...css.matchAll(/--text-([\w-]+):/g)].map(match => match[1]);
for (const name of typeNames) {
  if (name in tokens) { console.error(`Color/size utility collision: text-${name}`); failed = true; }
}
for (const [fg, bg, minimum] of [['ink','paper',4.5],['copy','paper',7],['muted','paper',4.5],['accent','paper',4.5],['on-accent','accent',4.5],['muted','surface',4.5],['edge','paper',3],['edge','surface',3]]) {
  const ratios = [0,1].map(mode => {
    const values = [luminance(tokens[fg][mode]), luminance(tokens[bg][mode])].sort((a,b) => b-a);
    return (values[0]+.05)/(values[1]+.05);
  });
  console.log(`${fg}/${bg}: light ${ratios[0].toFixed(2)}:1, dark ${ratios[1].toFixed(2)}:1 (minimum ${minimum})`);
  if (ratios.some(r => r < minimum)) failed = true;
}
if (failed) process.exitCode = 1;
