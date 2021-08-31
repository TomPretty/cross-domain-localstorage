const DOM_A_ORIGIN = "https://dom-a.thegulocal.com";

window.onload = () => {
  window.onmessage = (msg) => {
    const { origin, data } = msg;

    if (origin !== DOM_A_ORIGIN) {
      return;
    }

    if (data.type === "GET_ARTICLE_COUNT") {
      handleGetArticleCount();
    } else if (data.type === "OPT_OUT") {
      handleOptOut();
    } else if (data.type === "OPT_IN") {
      handleOptIn();
    }
  };

  // ---- Handlers ---- //

  function handleGetArticleCount() {
    window.parent.postMessage(
      {
        type: "ARTICLE_COUNT",
        articleCount: hasOptedOutOfArticleCount()
          ? getOptedOutMessage()
          : getOptedInMessage(),
      },
      DOM_A_ORIGIN
    );
  }

  function handleOptOut() {
    setArticleCountOptOutCookie();
    removeArticleCountFromLocalStorage();
  }

  function handleOptIn() {
    deleteArticleCountOptOutCookie();
  }

  // ---- Helpers ---- //

  function setArticleCountOptOutCookie() {
    setCookie("ARTICLE_COUNT_OPT_OUT", true, 10_000);
  }

  function removeArticleCountFromLocalStorage() {
    localStorage.removeItem("ARTICLE_COUNT");
  }

  function deleteArticleCountOptOutCookie() {
    deleteCookie("ARTICLE_COUNT_OPT_OUT");
  }

  function hasOptedOutOfArticleCount() {
    return checkCookie("ARTICLE_COUNT_OPT_OUT");
  }

  function getOptedOutMessage() {
    return { type: "OPTED_OUT" };
  }

  function getOptedInMessage() {
    const articleCount = parseInt(localStorage.getItem("ARTICLE_COUNT") ?? "0");

    return {
      type: "OPTED_IN",
      articleCount,
    };
  }

  // ---- Cookie utils ---- //

  function setCookie(cname, cvalue, exdays) {
    const d = new Date();
    d.setTime(d.getTime() + exdays * 24 * 60 * 60 * 1000);
    let expires = "expires=" + d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
  }

  function deleteCookie(cname) {
    setCookie(cname, undefined, 0);
  }

  function getCookie(cname) {
    let name = cname + "=";
    let ca = document.cookie.split(";");
    for (let i = 0; i < ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) == " ") {
        c = c.substring(1);
      }
      if (c.indexOf(name) == 0) {
        return c.substring(name.length, c.length);
      }
    }
    return "";
  }

  function checkCookie(cname) {
    return !!getCookie(cname);
  }
};
