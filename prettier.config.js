module.exports = {
  semi: false,
  useTabs: true,
  overrides: [
      {
          files: "*.html",
          options: {
              parser: "html",
          },
      },
      {
          files: "*.vue",
          options: {
              parser: "vue",
              singleQuote: true,
              bracketSpacing: true,
              arrowParens: 'avoid',
          },
      },
  ],
}
