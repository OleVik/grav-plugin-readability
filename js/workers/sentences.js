self.importScripts(
  "../../node_modules/promise-worker/dist/promise-worker.register.min.js"
);

registerPromiseWorker(function(data) {
  importScripts(
    "../../node_modules/localized-readability/dist/localized-readability.js"
  );
  try {
    const Highlighter = LocalizedReadability.highlighter;
    const highlight = Highlighter.highlight(data.nlcst, {
      paragraphs: false,
      sentences: true
    });
    return highlight;
  } catch (error) {
    console.error(error);
  }
});
