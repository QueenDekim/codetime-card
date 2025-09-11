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
  `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 50 50">
    <path d="M 25 2 C 12.309295 2 2 12.309295 2 25 C 2 37.690705 12.309295 48 25 48 C 37.690705 48 48 37.690705 48 25 C 48 12.309295 37.690705 2 25 2 z M 25 4 C 36.609824 4 46 13.390176 46 25 C 46 36.609824 36.609824 46 25 46 C 13.390176 46 4 36.609824 4 25 C 4 13.390176 13.390176 4 25 4 z M 24.984375 6.9863281 A 1.0001 1.0001 0 0 0 24 8 L 24 22.173828 A 3 3 0 0 0 22 25 A 3 3 0 0 0 22.294922 26.291016 L 16.292969 32.292969 A 1.0001 1.0001 0 1 0 17.707031 33.707031 L 23.708984 27.705078 A 3 3 0 0 0 25 28 A 3 3 0 0 0 28 25 A 3 3 0 0 0 26 22.175781 L 26 8 A 1.0001 1.0001 0 0 0 24.984375 6.9863281 z"></path>
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
