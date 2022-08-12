module.exports = {
  presets: ['next/babel'],
  plugins: ['inline-react-svg'],
  plugins: [
    [
      'module-resolver',
      {
        root: ['.'],
      },
    ],
    'inline-react-svg',
  ],
};
