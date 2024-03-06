<script>
	export let title;
	export let content;
	export let time_stamp;
</script>

<article>
	<h2>{title}</h2>
	<p>{content}</p>
	<!-- <span>{time_stamp}</span> -->
</article>

<style>
	article {
		margin-bottom: 2em;
		padding: 1rem;
		background-color: #f3f3f3;
		border-radius: 24px;
	}
	article h2 {
		margin-top: 0;
		margin-bottom: 0.5em;
	}
</style>
