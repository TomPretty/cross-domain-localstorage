const DOM_A_ORIGIN = "https://dom-a.thegulocal.com"

window.onload = () => {
	window.onmessage = (e) => {
		if (e.origin !== DOM_A_ORIGIN) {
			return;
		}

		const parent = window.parent
		const articleCount = parseInt(localStorage.getItem("ARTICLE_COUNT"))

		parent.postMessage(JSON.stringify({ articleCount }), DOM_A_ORIGIN)
	}
}