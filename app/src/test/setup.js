import '@testing-library/jest-dom/vitest';

// jsdom lacks matchMedia; default to a desktop-width screen.
if (!window.matchMedia) {
  window.matchMedia = (query) => ({
    matches: query.includes('min-width: 1024px'),
    media: query,
    addEventListener: () => {},
    removeEventListener: () => {},
    addListener: () => {},
    removeListener: () => {},
  });
}
