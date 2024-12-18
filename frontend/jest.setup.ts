import '@testing-library/jest-dom';
import { TextEncoder, TextDecoder as UtilTextDecoder } from 'util';
import { fn } from 'jest-mock';

global.TextEncoder = TextEncoder;

global.TextDecoder = UtilTextDecoder as unknown as {
  new (label?: string, options?: TextDecoderOptions): TextDecoder;
  prototype: TextDecoder;
};

Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: fn().mockImplementation((query) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: fn(),
    removeListener: fn(),
    addEventListener: fn(),
    removeEventListener: fn(),
    dispatchEvent: fn(),
  })),
});
