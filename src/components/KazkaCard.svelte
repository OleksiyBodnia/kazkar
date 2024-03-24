<script>
	export let id;
	export let title;
	export let content;

	// потрібна щоб обрізати текст для прев'ю казки
	function truncateText(text, maxLength) {
		// потребує шліфування, зараз працює не завжди коректно
		let truncatedText = text.substring(0, maxLength + 1);
		let lastSpaceIndex = truncatedText.lastIndexOf(' ');
		if (lastSpaceIndex !== -1) {
			truncatedText = truncatedText.substring(0, lastSpaceIndex);
		}
		return truncatedText + ' . . .';
	}
</script>

<article>
	<a href="/kazka/{id}">
		<h4>{title}</h4>
		<p>{truncateText(content, 160)}</p>
	</a>
</article>

<style>
	a {
		width: 500px;
		/* some padding should be here */
		border-radius: 24px;
		padding: 1px 10px 10px 10px;
	}

	a:hover {
		box-shadow: 0 5px 20px rgba(0, 0, 0, 0.2);
		transition: all 0.5s ease;
	}

	h4 {
		text-align: center;
	}

	p {
		text-align: start;
	}
</style>
