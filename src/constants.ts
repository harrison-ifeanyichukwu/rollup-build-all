import { CommonConfig } from './@types';

export const COMMON_CONFIGS: (keyof CommonConfig)[] = [
  'sourcemap',
  'interop',
  'uglify',
];

export const REGEX_FIELDS = ['assets', 'include', 'exclude'];

export const PACKAGE_NAME = '@teclone/rollup-all';
