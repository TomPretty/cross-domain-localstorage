window.onload = () => {
	window.onmessage = () => {
		const parent = window.parent
		const articleCount = parseInt(localStorage.getItem("ARTICLE_COUNT"))

		parent.postMessage(JSON.stringify({ articleCount }), "*")
	}
}