const DOM_B_ORIGIN = "https://dom-b.thegulocal.com";

window.onload = () => {
  const iframe = document.getElementById("iframe");
  const text = document.getElementById("ac-text");
  const optOutButton = document.getElementById("opt-out-button");
  const optInButton = document.getElementById("opt-in-button");

  setUpClickHandlers();
  setUpMessageHandler();
  sendGetArticleCountMessage();

  // ---- Helpers ---- //

  function setUpClickHandlers() {
    optOutButton.onclick = () => sendOptOutMessage();
    optInButton.onclick = () => sendOptInMessage();
  }

  function setUpMessageHandler() {
    window.onmessage = (msg) => {
      const { origin, data } = msg;

      if (origin !== DOM_B_ORIGIN) {
        return;
      }

      if (data.type === "ARTICLE_COUNT") {
        handleArticleCount(data.articleCount);
      }
    };
  }

  function sendGetArticleCountMessage() {
    iframe.contentWindow.postMessage(
      { type: "GET_ARTICLE_COUNT" },
      DOM_B_ORIGIN
    );
  }

  function sendOptOutMessage() {
    iframe.contentWindow.postMessage({ type: "OPT_OUT" }, DOM_B_ORIGIN);
  }

  function sendOptInMessage() {
    iframe.contentWindow.postMessage({ type: "OPT_IN" }, DOM_B_ORIGIN);
  }

  function handleArticleCount(articleCount) {
    if (articleCount.type === "OPTED_IN") {
      text.innerText = `You have read ${articleCount.articleCount} articles`;
    } else {
      text.innerText = "You have opted out of article count";
    }
  }
};
