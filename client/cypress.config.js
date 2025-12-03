const { defineConfig } = require("cypress");

module.exports = defineConfig({
  component: {
    devServer: {
      framework: "react",
      bundler: "vite",
    },
    indexHtmlFile: "cypress/support/component-index.html",
  },

  e2e: {
    baseUrl: "http://localhost:5173",
  },
});
