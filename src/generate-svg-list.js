import { languageIcons } from "./language-icons.js"
import fs from "fs"

function generateIconsSVG() {
  const cols = 10;
  const iconSize = 24;
  const spacing = 3;
  const keys = Object.keys(languageIcons);
  const rows = Math.ceil(keys.length / cols);
  
  const width = cols * (iconSize + spacing) + spacing;
  const height = rows * (iconSize + spacing) + spacing;
  
  let svgContent = '';
  
  keys.forEach((key, index) => {
    const col = index % cols;
    const row = Math.floor(index / cols);
    const x = spacing + col * (iconSize + spacing);
    const y = spacing + row * (iconSize + spacing);
    
    const iconSVG = languageIcons[key](iconSize);
    const iconContent = iconSVG.replace(/^<svg[^>]*>|<\/svg>$/g, '');
    
    svgContent += `<g transform="translate(${x}, ${y})">${iconContent}</g>\n`;
  });

  return `<?xml version="1.0" encoding="UTF-8"?>
<svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg" fill="white">
${svgContent}
</svg>`;
}

fs.writeFileSync('icons/icons.svg', generateIconsSVG());