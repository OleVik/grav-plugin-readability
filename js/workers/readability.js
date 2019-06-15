self.importScripts(
  "/user/plugins/readability/node_modules/promise-worker/dist/promise-worker.register.min.js"
);

registerPromiseWorker(function(data) {
  importScripts(
    "/user/plugins/readability/node_modules/localized-readability/dist/hypher.js",
    `/user/plugins/readability/node_modules/localized-readability/dist/patterns/${
      data.lang
    }.js`,
    `/user/plugins/readability/node_modules/localized-readability/dist/annotations/language.${
      data.lang
    }.js`,
    "/user/plugins/readability/node_modules/localized-readability/dist/localized-readability.js"
  );
  try {
    const Parser = LocalizedReadability.parser;
    var message = {};
    message.setup = Parser.setup(data.input, Hypher, HyphenationPatterns);
    message.count = Parser.count(message.setup);
    message.statistics = Parser.statistics(message.count, data.lang);
    message.interpretations = Parser.interpretations(
      message.count,
      message.statistics,
      Annotations
    );
    message.consensus = Parser.consensus(message.interpretations);
    return message;
  } catch (error) {
    console.error(error);
  }
});
