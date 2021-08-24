window.onload = () => {
	const iframe = document.getElementById("iframe");
	const text = document.getElementById("ac-text")
	
	iframe.contentWindow.postMessage("", "*");

	window.onmessage = (e) => {
		const data = JSON.parse(e.data);

		text.innerText = data.articleCount;
	};
}