/**
 * Convert milliseconds to human readable time
 * @param {number} millisec Float containing milliseconds
 * @see https://stackoverflow.com/a/32180863
 */
function msToTime(millisec) {
  var milliseconds = millisec.toFixed(2);
  var seconds = (millisec / 1000).toFixed(1);
  var minutes = (millisec / (1000 * 60)).toFixed(1);
  var hours = (millisec / (1000 * 60 * 60)).toFixed(1);
  var days = (millisec / (1000 * 60 * 60 * 24)).toFixed(1);
  if (seconds <= 0) {
    return milliseconds + " ms";
  } else if (seconds < 60) {
    return seconds + " sec";
  } else if (minutes < 60) {
    return minutes + " min";
  } else if (hours < 24) {
    return hours + " hrs";
  } else {
    return days + " days";
  }
}

/**
 * Render individual parts of Score
 * @param {object} data Generated data
 */
function renderScore(data, Annotations) {
  document.querySelector(".readability #consensus-age value").innerHTML =
    data.consensus.age;
  document
    .querySelector(".readability #consensus-age")
    .setAttribute("title", Annotations.stats.consensus.description);
  document.querySelector(".readability #consensus-grade value").innerHTML =
    data.consensus.grade;
  document
    .querySelector(".readability #consensus-grade")
    .setAttribute("title", Annotations.stats.consensus.description);
  document.querySelector(
    ".readability #automated-readability-index .title"
  ).innerHTML = Annotations.stats.automatedReadability.title;
  document.querySelector(
    ".readability #automated-readability-index .description"
  ).innerHTML = Annotations.stats.automatedReadability.description;
  document
    .querySelector("#automated-readability-index .title")
    .setAttribute("title", Annotations.stats.automatedReadability.description);
  document.querySelector(
    ".readability #automated-readability-index label.age"
  ).innerHTML = Annotations.general.age;
  document.querySelector(
    ".readability #automated-readability-index value.age"
  ).innerHTML = data.interpretations.automatedReadability.age;
  document.querySelector(
    ".readability #automated-readability-index label.grade"
  ).innerHTML = Annotations.general.grade;
  document.querySelector(
    ".readability #automated-readability-index value.grade"
  ).innerHTML = data.interpretations.automatedReadability.grade;
  document.querySelector(".readability #flesch .title").innerHTML =
    Annotations.stats.flesch.title;
  document.querySelector(".readability #flesch .description").innerHTML =
    Annotations.stats.flesch.description;
  document
    .querySelector("#flesch .title")
    .setAttribute("title", Annotations.stats.flesch.description);
  document.querySelector(".readability #flesch .value").innerHTML =
    data.interpretations.flesch;
  document.querySelector(".readability #flesch-kincaid .title").innerHTML =
    Annotations.stats.fleschKincaid.title;
  document.querySelector(
    ".readability #flesch-kincaid .description"
  ).innerHTML = Annotations.stats.fleschKincaid.description;
  document
    .querySelector("#flesch-kincaid .title")
    .setAttribute("title", Annotations.stats.fleschKincaid.description);
  document.querySelector(".readability #flesch-kincaid label.age").innerHTML =
    Annotations.general.age;
  document.querySelector(".readability #flesch-kincaid value.age").innerHTML =
    data.interpretations.fleschKincaid.age;
  document.querySelector(".readability #flesch-kincaid label.grade").innerHTML =
    Annotations.general.grade;
  document.querySelector(".readability #flesch-kincaid value.grade").innerHTML =
    data.interpretations.fleschKincaid.grade;
  document.querySelector(".readability #coleman-liau .title").innerHTML =
    Annotations.stats.colemanLiau.title;
  document.querySelector(".readability #coleman-liau .description").innerHTML =
    Annotations.stats.colemanLiau.description;
  document
    .querySelector("#coleman-liau .title")
    .setAttribute("title", Annotations.stats.colemanLiau.description);
  document.querySelector(".readability #coleman-liau label.age").innerHTML =
    Annotations.general.age;
  document.querySelector(".readability #coleman-liau value.age").innerHTML =
    data.interpretations.colemanLiau.age;
  document.querySelector(".readability #coleman-liau label.grade").innerHTML =
    Annotations.general.grade;
  document.querySelector(".readability #coleman-liau value.grade").innerHTML =
    data.interpretations.colemanLiau.grade;
  document.querySelector(".readability #smog .title").innerHTML =
    Annotations.stats.smog.title;
  document.querySelector(".readability #smog .description").innerHTML =
    Annotations.stats.smog.description;
  document
    .querySelector("#smog .title")
    .setAttribute("title", Annotations.stats.smog.description);
  document.querySelector(".readability #smog label.age").innerHTML =
    Annotations.general.age;
  document.querySelector(".readability #smog value.age").innerHTML =
    data.interpretations.smog.age;
  document.querySelector(".readability #smog label.grade").innerHTML =
    Annotations.general.grade;
  document.querySelector(".readability #smog value.grade").innerHTML =
    data.interpretations.smog.grade;
  document.querySelector(".readability #lix .title").innerHTML =
    Annotations.stats.lix.title;
  document.querySelector(".readability #lix .description").innerHTML =
    Annotations.stats.lix.description;
  document
    .querySelector("#lix .title")
    .setAttribute("title", Annotations.stats.lix.description);
  document.querySelector(".readability #lix .value").innerHTML =
    data.interpretations.lix;
  document.querySelector(".readability #rix .title").innerHTML =
    Annotations.stats.rix.title;
  document.querySelector(".readability #rix .description").innerHTML =
    Annotations.stats.rix.description;
  document
    .querySelector("#rix .title")
    .setAttribute("title", Annotations.stats.rix.description);
  document.querySelector(".readability #rix label.grade").innerHTML =
    Annotations.general.grade;
  document.querySelector(".readability #rix value.grade").innerHTML =
    data.interpretations.rix.grade;
  document.querySelector(".readability #count label.paragraphs").innerHTML =
    Annotations.general.paragraphs;
  document.querySelector(".readability #count value.paragraphs").innerHTML =
    data.count.paragraphs;
  document.querySelector(".readability #count label.sentences").innerHTML =
    Annotations.general.sentences;
  document.querySelector(".readability #count value.sentences").innerHTML =
    data.count.sentences;
  document.querySelector(".readability #count label.words").innerHTML =
    Annotations.general.words;
  document.querySelector(".readability #count value.words").innerHTML =
    data.count.words;
  document.querySelector(".readability #count label.syllables").innerHTML =
    Annotations.general.syllables;
  document.querySelector(".readability #count value.syllables").innerHTML =
    data.count.syllables;
  document.querySelector(
    ".readability #count label.polysillabic-words"
  ).innerHTML = Annotations.general.polysillabicWords;
  document.querySelector(
    ".readability #count value.polysillabic-words"
  ).innerHTML = data.count.polysillabicWords;
  document.querySelector(".readability #count label.letters").innerHTML =
    Annotations.general.letters;
  document.querySelector(".readability #count value.letters").innerHTML =
    data.count.letters;
  document.querySelector(".readability #count label.characters").innerHTML =
    Annotations.general.characters;
  document.querySelector(".readability #count value.characters").innerHTML =
    data.count.characters;
  document.querySelector(".readability #count label.longwords").innerHTML =
    Annotations.general.longwords;
  document.querySelector(".readability #count value.longwords").innerHTML =
    data.count.longwords;
  document.querySelector(".readability #count label.periods").innerHTML =
    Annotations.general.periods;
  document.querySelector(".readability #count value.periods").innerHTML =
    data.count.periods;
  document.querySelector(".readability #count label.punctuations").innerHTML =
    Annotations.general.punctuations;
  document.querySelector(".readability #count value.punctuations").innerHTML =
    data.count.punctuations;
  document.querySelector(".readability #count label.whitespaces").innerHTML =
    Annotations.general.whitespaces;
  document.querySelector(".readability #count value.whitespaces").innerHTML =
    data.count.whitespaces;
}

/**
 * Create sentence- and word focusing with tooltips
 */
function createTooltips() {
  var marks = document.querySelectorAll(`.readability mark`);
  for (let i = 0; i < marks.length; i++) {
    var target = "sentence";
    var placement = "top";
    var theme = "light-border";
    var size = "regular";
    if (marks[i].classList.contains("word")) {
      target = "word";
      placement = "bottom";
      theme = "light";
      size = "small";
    }
    marks[i].dataset.tippyPlacement = placement;
    marks[i].dataset.tippyTheme = theme;
    marks[i].dataset.tippySize = size;
    if (marks[i].classList.contains(`${target}-0`)) {
      marks[i].dataset.tippyContent = window.Annotations.highlight[0];
    } else if (marks[i].classList.contains(`${target}-1`)) {
      marks[i].dataset.tippyContent = window.Annotations.highlight[1];
    } else if (marks[i].classList.contains(`${target}-2`)) {
      marks[i].dataset.tippyContent = window.Annotations.highlight[2];
    } else if (marks[i].classList.contains(`${target}-3`)) {
      marks[i].dataset.tippyContent = window.Annotations.highlight[3];
    } else if (marks[i].classList.contains(`${target}-4`)) {
      marks[i].dataset.tippyContent = window.Annotations.highlight[4];
    }
  }
  tippy("mark");
}

/**
 * Call web worker chain and render
 * @param {string} input Text to process
 * @param {string} lang Language-code
 */
function renderAnalysis(
  input,
  lang,
  Highlighter,
  Annotations,
  readabilityWorker,
  paragraphsWorker,
  sentencesWorker,
  wordsWorker
) {
  const start = performance.now();
  document.dispatchEvent(
    new CustomEvent("readability", {
      detail: {
        state: "start-readability",
        message:
          "Starting Readability Analysis: " +
          msToTime(performance.now() - start)
      }
    })
  );
  const results = {};
  document.dispatchEvent(
    new CustomEvent("readability", {
      detail: {
        state: "start-score",
        message: "Start Score: " + msToTime(performance.now() - start)
      }
    })
  );
  return readabilityWorker
    .postMessage({ input: input, lang: lang, path: readabilityBaseUrl })
    .then(function(response) {
      results.data = response;
      renderScore(results.data, Annotations);
      document.dispatchEvent(
        new CustomEvent("readability", {
          detail: {
            state: "end-score",
            message: "End Score: " + msToTime(performance.now() - start)
          }
        })
      );
      const nlcst = results.data.setup.nlcst;
      document.dispatchEvent(
        new CustomEvent("readability", {
          detail: {
            state: "start-paragraphs",
            message: "Start Paragraphs: " + msToTime(performance.now() - start)
          }
        })
      );
      return paragraphsWorker.postMessage({ nlcst, path: readabilityBaseUrl });
    })
    .then(function(response) {
      results.paragraphs = response;
      document.getElementsByTagName(
        "content"
      )[0].innerHTML = Highlighter.stringify(results.paragraphs);
      document.dispatchEvent(
        new CustomEvent("readability", {
          detail: {
            state: "end-paragraphs",
            message: "End Paragraphs: " + msToTime(performance.now() - start)
          }
        })
      );
      const nlcst = results.paragraphs;
      document.dispatchEvent(
        new CustomEvent("readability", {
          detail: {
            state: "start-sentences",
            message: "Start Sentences: " + msToTime(performance.now() - start)
          }
        })
      );
      return sentencesWorker.postMessage({ nlcst, path: readabilityBaseUrl });
    })
    .then(function(response) {
      results.sentences = response;
      document.getElementsByTagName(
        "content"
      )[0].innerHTML = Highlighter.stringify(results.sentences);
      document.dispatchEvent(
        new CustomEvent("readability", {
          detail: {
            state: "end-sentences",
            message: "End Sentences: " + msToTime(performance.now() - start)
          }
        })
      );
      const nlcst = results.sentences;
      document.dispatchEvent(
        new CustomEvent("readability", {
          detail: {
            state: "start-words",
            message: "Start Words: " + msToTime(performance.now() - start)
          }
        })
      );
      if (results.data.count.words <= readabilityMaxWords) {
        return wordsWorker.postMessage({
          nlcst,
          lang: lang,
          path: readabilityBaseUrl
        });
      } else {
        return "skipped";
      }
    })
    .then(function(response) {
      results.words = response;
      if (results.words != "skipped") {
        document.getElementsByTagName(
          "content"
        )[0].innerHTML = Highlighter.stringify(results.words);
      }
      document.dispatchEvent(
        new CustomEvent("readability", {
          detail: {
            state: "end-words",
            message: "End Words: " + msToTime(performance.now() - start)
          }
        })
      );
      if (readabilityTooltips) {
        document.dispatchEvent(
          new CustomEvent("readability", {
            detail: {
              state: "start-tooltips",
              message: "Start Tooltips: " + msToTime(performance.now() - start)
            }
          })
        );
        createTooltips();
        document.dispatchEvent(
          new CustomEvent("readability", {
            detail: {
              state: "end-tooltips",
              message: "End Tooltips: " + msToTime(performance.now() - start)
            }
          })
        );
      }
      document.dispatchEvent(
        new CustomEvent("readability", {
          detail: {
            state: "end-readability",
            message:
              "Finished Readability Analysis: " +
              msToTime(performance.now() - start)
          }
        })
      );
    })
    .catch(function(error) {
      console.error(error);
      return Promise.reject(error);
    });
}
