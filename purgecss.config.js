module.exports = {
  content: ['src/**/*.js'],
  css: ['src/main.css'],
  extractors: [
    {
      extractor: class {
        static extract(content) {
          return content.match(/[A-Za-z0-9-_:\/]+/g) || [];
        }
      },
      extensions: ['js']
    }
  ],
  // include text colour classes as well as hover and focus variants,
  // those classes are concatenated in Button
  whitelistPatterns: [/^text-/, /^hover:text-/, /^focus:text-/]
};
