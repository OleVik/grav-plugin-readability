self.importScripts(
  "../../node_modules/promise-worker/dist/promise-worker.register.min.js"
);

registerPromiseWorker(function(data) {
  importScripts(
    "../../node_modules/localized-readability/dist/hypher.js",
    `../../node_modules/localized-readability/dist/patterns/${data.lang}.js`,
    "../../node_modules/localized-readability/dist/localized-readability.js"
  );
  try {
    const Highlighter = LocalizedReadability.highlighter;
    const highlight = Highlighter.highlight(data.nlcst, {
      paragraphs: false,
      sentences: false,
      words: true,
      Hypher: Hypher,
      HyphenationPatterns: HyphenationPatterns
    });
    return highlight;
  } catch (error) {
    console.error(error);
  }
});
