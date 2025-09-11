import { timeIcon, sourceCodeIcon, codetimeLogo } from "./artwork.js";
import { languageIcons } from "./language-icons.js";
import { themes } from "./themes.js";

function formatTime(minutes) {
  if (minutes < 60) {
    return `${minutes}m`;
  }
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;
  return mins > 0 ? `${hours}h ${mins}m` : `${hours}h`;
}

const statLine = (icon, iconColor, label, value, xOffset = 0) => {
  const showIcons = icon !== null;
  const labelOffset = showIcons ? `x="${25 + xOffset}"` : `x="${xOffset}"`;
  return `
    ${showIcons ? `<g transform="translate(${xOffset}, 0)" fill="${iconColor}">${icon}</g>` : ''}
    <text ${labelOffset} y="12.5">${label}:</text>
    <text x="${150 + xOffset}" y="12.5" text-anchor="end">${value}</text>
  `;
};

export const CodetimeTimeCard = async (
  data7,
  data30,
  data90,
  showLogo,
  showBorder,
  showIcons,
  showAnimations,
  theme
) => {
  theme = theme.replace(/\W/g, "").toLowerCase();
  let colors;
  if (theme in themes) {
    colors = themes[theme];
  } else {
    colors = themes["tomorrow"];
  }

  const width = 245;
  let height = showLogo ? 140 : 100;

  let logoSvg;
  if (showLogo) {
    logoSvg = `
      <g transform="translate(14, 15)">
        ${codetimeLogo(colors.logo, 20)}
        <text x="130" y="21" font-size="10">for ${data7.username}</text>
      </g>`;
  } else {
    logoSvg = `<text x="20" y="35" font-size="15">Codetime stats for ${data7.username}</text>`;
  }

  const iconSize = 16;
  const timeIconSvg = showIcons ? timeIcon(iconSize) : null;

  const lines = [
    statLine(timeIconSvg, colors.icon, "Last 7 days", formatTime(data7.totalMinutes)),
    statLine(timeIconSvg, colors.icon, "Last 30 days", formatTime(data30.totalMinutes)),
    statLine(timeIconSvg, colors.icon, "Last 90 days", formatTime(data90.totalMinutes)),
  ];

  let linesStr = ``;
  const yOffset = showLogo ? 55 : 0;
  for (let i = 0; i < lines.length; i++) {
    const anim = showAnimations
      ? `class="fadein" style="animation-delay: ${300 + i * 200}ms"`
      : "";
    linesStr += `
      <g ${anim} transform="translate(25, ${yOffset + i * 20})">
        ${lines[i]}
      </g>`;
  }

  return `
    <svg
     width="${width}"
     height="${height}"
     viewBox="0 0 ${width} ${height}"
     xmlns="http://www.w3.org/2000/svg"
     font-family="-apple-system,BlinkMacSystemFont,Segoe UI,Liberation Sans,sans-serif"
     font-size="12"
     fill="${colors.foreground}"
     font-weight="bold"
    >
      <style>
        .fadein {
          animation: fadeInAnimation 0.8s ease-in-out forwards;
          opacity: 0;
        }
        @keyframes fadeInAnimation {
          from { opacity: 0; }
          to { opacity: 1; }
        }
      </style>

      <rect
       fill="${colors.background}"
       width="${width}"
       height="${height}"
       stroke="${colors.border}"
       stroke-opacity="${showBorder ? 1 : 0}"
       rx="4.5"
      />
      ${logoSvg}
      ${linesStr}
    </svg>
  `;
};

export const CodetimeLanguagesCard = async (
  data,
  showLogo,
  showBorder,
  showIcons,
  showAnimations,
  theme
) => {
  theme = theme.replace(/\W/g, "").toLowerCase();
  let colors;
  if (theme in themes) {
    colors = themes[theme];
  } else {
    colors = themes["tomorrow"];
  }

  const width = 245;
  const lineHeight = 20;
  const baseHeight = showLogo ? 65 : 45;
  const height = baseHeight + (data.entries.length * lineHeight);

  let logoSvg;
  if (showLogo) {
    logoSvg = `
      <g transform="translate(14, 15)">
        ${codetimeLogo(colors.logo, 20)}
        <text x="130" y="21" font-size="10">for ${data.username}</text>
      </g>`;
  } else {
    logoSvg = `<text x="20" y="35" font-size="15">Top languages for ${data.username}</text>`;
  }

  const iconSize = 16;
  const langIconSvg = showIcons ? sourceCodeIcon(iconSize) : null;

  let linesStr = ``;
  const yOffset = showLogo ? 55 : 0;
  
  data.entries.forEach((entry, i) => {
  const anim = showAnimations
      ? `class="fadein" style="animation-delay: ${300 + i * 200}ms"`
      : "";
  
  const iconSize = 16;
  
  // Получаем иконку для текущего языка или используем иконку по умолчанию
  const langIconSvg = showIcons
      ? languageIcons[entry.language.toLowerCase()]?.(iconSize) || languageIcons.default(iconSize)
      : null;
  
  const line = statLine(
      langIconSvg, // Передаем соответствующую иконку
      colors.icon,
      entry.language,
      formatTime(entry.totalMinutes),
      0 // Убираем смещение для первого элемента
  );
  linesStr += `
      <g ${anim} transform="translate(25, ${yOffset + i * lineHeight})">
      ${line}
      </g>`;
  });

  return `
    <svg
     width="${width}"
     height="${height}"
     viewBox="0 0 ${width} ${height}"
     xmlns="http://www.w3.org/2000/svg"
     font-family="-apple-system,BlinkMacSystemFont,Segoe UI,Liberation Sans,sans-serif"
     font-size="12"
     fill="${colors.foreground}"
     font-weight="bold"
    >
      <style>
        .fadein {
          animation: fadeInAnimation 0.8s ease-in-out forwards;
          opacity: 0;
        }
        @keyframes fadeInAnimation {
          from { opacity: 0; }
          to { opacity: 1; }
        }
      </style>

      <rect
       fill="${colors.background}"
       width="${width}"
       height="${height}"
       stroke="${colors.border}"
       stroke-opacity="${showBorder ? 1 : 0}"
       rx="4.5"
      />
      ${logoSvg}
      ${linesStr}
    </svg>
  `;
};
