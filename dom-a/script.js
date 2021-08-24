const DOM_B_ORIGIN = "https://dom-b.thegulocal.com"

window.onload = () => {
	const iframe = document.getElementById("iframe");
	const text = document.getElementById("ac-text")
	
	iframe.contentWindow.postMessage("", DOM_B_ORIGIN);

	window.onmessage = (e) => {
		if (e.origin !== DOM_B_ORIGIN) {
			return;
		}

		const { articleCount } = JSON.parse(e.data);

		text.innerText = articleCount;
	};
}