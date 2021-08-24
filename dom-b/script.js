window.onload = () => {
	const input = document.getElementById("ac-input")
	const button = document.getElementById("set-ac-button")

	button.onclick = () => {
		localStorage.setItem("ARTICLE_COUNT", input.value)
	}
}
