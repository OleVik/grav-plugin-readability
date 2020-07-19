/**
 * Create button in Admin toolbar
 */
function renderButton() {
  var button = document.createElement("a");
  button.classList.add("button");
  button.setAttribute("href", "/admin/readability");
  button.setAttribute("title", "Readability");
  button.setAttribute("id", "readability-render");
  var i = document.createElement("i");
  i.classList.add("fa", "fa-file-text-o");
  i.style.marginRight = "0.25em";
  var text = document.createTextNode("Readability");
  var titlebar = document.querySelector("#titlebar .button-bar");
  button.appendChild(i);
  button.appendChild(text);
  titlebar.prepend(button);
}

document.addEventListener("readability", function (event) {
  console.debug(event.detail.message);
  if (event.detail.state == "start-score") {
    document
      .querySelector("#readability-render i.fa")
      .classList.remove("fa-file-text-o");
    document
      .querySelector("#readability-render i.fa")
      .classList.add("fa-spin", "fa-spinner");
  } else if (event.detail.state == "end-score") {
    document.querySelector(".readability").style.display = "grid";
  } else if (event.detail.state == "end-words") {
    document
      .querySelector("#readability-render")
      .style.removeProperty("background-color");
    document
      .querySelector("#readability-render i.fa")
      .classList.remove("fa-spin", "fa-spinner");
    document
      .querySelector("#readability-render i.fa")
      .classList.add("fa-file-text-o");
  }
});
window.addEventListener(
  "load",
  function (event) {
    if (
      window.Worker &&
      document.querySelector('textarea[name="data[content]"]')
    ) {
      const Highlighter = window.LocalizedReadability.highlighter;
      const Annotations = window.Annotations;
      const lang = readabilityLanguage;

      renderButton();

      document.querySelector(".readability #header-interpretations").innerHTML =
        Annotations.general.interpretations;
      document.querySelector(".readability #header-counts").innerHTML =
        Annotations.general.counts;

      const readabilityWorker = new PromiseWorker(
        new Worker(readabilityBaseUrl + "/js/workers/readability.js")
      );
      const paragraphsWorker = new PromiseWorker(
        new Worker(readabilityBaseUrl + "/js/workers/paragraphs.js")
      );
      const sentencesWorker = new PromiseWorker(
        new Worker(readabilityBaseUrl + "/js/workers/sentences.js")
      );
      const wordsWorker = new PromiseWorker(
        new Worker(readabilityBaseUrl + "/js/workers/words.js")
      );

      if (readabilityTooltips) {
        tippy.setDefaults({
          arrow: true,
        });
      }

      const readabilityButton = document.querySelector("#readability-render");
      if (readabilityButton) {
        readabilityButton.addEventListener(
          "click",
          function (event) {
            console.debug(`Readability language: ${lang}`);
            const markdownEditor = document.querySelector(
              'textarea[name="data[content]"]'
            );
            const currentContent =
              typeof tinyMCE !== "undefined"
                ? tinyMCE.activeEditor.getContent({ format: "text" })
                : markdownEditor.value;
            renderAnalysis(
              currentContent,
              lang,
              Highlighter,
              Annotations,
              readabilityWorker,
              paragraphsWorker,
              sentencesWorker,
              wordsWorker
            );
            event.preventDefault();
          },
          false
        );
      }
      const readabilityToggle = document.querySelector("#readability-toggle");
      if (readabilityToggle) {
        readabilityToggle.addEventListener(
          "click",
          function (event) {
            const readabilityElement = document.querySelector(".readability");
            if (readabilityElement.style.display == "grid") {
              readabilityToggle.classList.remove("fa-chevron-up");
              readabilityToggle.classList.add("fa-chevron-down");
              readabilityElement.style.display = "none";
            } else {
              readabilityToggle.classList.remove("fa-chevron-down");
              readabilityToggle.classList.add("fa-chevron-up");
              readabilityElement.style.display = "grid";
            }
            event.preventDefault();
          },
          false
        );
      }
    }
  },
  false
);
