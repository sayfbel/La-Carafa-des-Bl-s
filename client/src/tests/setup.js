import '@testing-library/jest-dom';

// Polyfill localStorage for Node 26 + jsdom
const mockStorage = {};
const localStoragePolyfill = {
  getItem: (key) => (key in mockStorage ? mockStorage[key] : null),
  setItem: (key, val) => { mockStorage[key] = String(val); },
  removeItem: (key) => { delete mockStorage[key]; },
  clear: () => { Object.keys(mockStorage).forEach(k => delete mockStorage[k]); }
};

Object.defineProperty(globalThis, 'localStorage', {
  value: localStoragePolyfill,
  writable: true
});

if (typeof window !== 'undefined') {
  Object.defineProperty(window, 'localStorage', {
    value: localStoragePolyfill,
    writable: true
  });
}

// Mock window.scrollTo
if (typeof window !== 'undefined') {
  window.scrollTo = () => {};

  // Mock matchMedia
  Object.defineProperty(window, 'matchMedia', {
    writable: true,
    value: (query) => ({
      matches: false,
      media: query,
      onchange: null,
      addListener: () => {},
      removeListener: () => {},
      addEventListener: () => {},
      removeEventListener: () => {},
      dispatchEvent: () => {}
    })
  });
}
