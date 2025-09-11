export const timeIcon = (size) =>
  `<svg width="${size}" height="${size}" viewBox="0 0 24 24">
    <circle cx="13.5" cy="13.5" r="5" />
  </svg>`;

export const languagesIcon = (size) =>
  `<svg viewBox="0 0 24 24" width="${size}" height="${size}">
    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/>
  </svg>`;

export const sourceCodeIcon = (size) =>
  `<svg viewBox="0 0 24 24" width="${size}" height="${size}">
    <path d="M9.4 16.6L4.8 12l4.6-4.6L8 6l-6 6 6 6 1.4-1.4zm5.2 0l4.6-4.6-4.6-4.6L16 6l6 6-6 6-1.4-1.4z"/>
  </svg>`;

export const clockIcon = (size) =>
  `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 24 24">
    <path d="M13.3512 20.4035c1.1108 0 2.169-.2217 3.139-.6157l2.6913 2.6944C17.4555 23.4458 15.4688 24 13.3512 24 6.729 24 1.3594 18.627 1.3594 12.0006 1.3594 5.3729 6.7289 0 13.3512 0c2.0964 0 4.0652.5406 5.7789 1.4865L16.4834 4.136c-.9687-.3918-2.0236-.6134-3.1322-.6134-4.6379 0-8.3976 3.779-8.3976 8.441 0 4.6609 3.7597 8.4399 8.3976 8.4399zm2.176-12.1544l5.5104-5.5139 1.5773 1.5772-5.5104 5.514zm-2.2328 5.6348c-1.0784 0-1.952-.8775-1.952-1.961 0-1.0825.8736-1.9611 1.952-1.9611 1.0784 0 1.952.8786 1.952 1.961 0 1.0836-.8736 1.9611-1.952 1.9611zm9.3462 5.6953l-1.5772 1.5783-5.5105-5.514 1.5774-1.5783z"></path>
  </svg>`;

export function codetimeLogo(color, height) {
  const logoColor = color === "default" ? "currentColor" : color;
  return `
    <g transform="translate(0, 5)">
      <g fill="${logoColor}">
        ${clockIcon(height)}
      </g>
      <text x="${height + 10}" y="${height * 0.85}" fill="${logoColor}" font-family="-apple-system,BlinkMacSystemFont,Segoe UI,Liberation Sans,sans-serif" font-weight="bold" font-size="${height}">Codetime</text>
    </g>`;
}
