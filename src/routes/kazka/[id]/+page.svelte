<script>
	/** @type {import('./$types').PageData} */
	export let data;
	import Sidebar from '../../../components/Sidebar.svelte';
	import { combineRechennia } from '$lib/utils';
	let SidebarComponent;
</script>

<div class="individual-kazka-div">
	<div class="kazka-and-sidebar">
		<article class="kazka-itself">
			<h2>{data.kazka.title}</h2>
			<p>
				{combineRechennia(data.kazka.rechennia)}
			</p>
			<h3>data.kazka.rechennia:</h3>
			<pre>
				{JSON.stringify(data.kazka.rechennia, null, 4)}
			</pre>
			<h3>data.users:</h3>
			<pre>
				{JSON.stringify(data.users, null, 4)}
			</pre>
		</article>

		<div class="sidebar-container">
			<Sidebar bind:this={SidebarComponent} />
		</div>
	</div>

	<button class="show-sidebar-btn" on:click={SidebarComponent.toggleSidebar}>sidebar</button>
</div>

<!-- дуже-дуже демо версія, погане вирівнювання, треба правити -->
<style>
	.individual-kazka-div {
		padding: 40px;
		display: flex;
		align-items: center;
		justify-content: center;
		flex-direction: column;
	}

	.kazka-and-sidebar {
		display: flex;
		align-items: center;
		justify-content: center;
	}

	article {
		max-width: 70%;
	}

	.sidebar-container {
		margin-left: 10%;
	}

	.show-sidebar-btn {
		position: absolute;
		top: 90px;
		right: 20px;
	}

	pre {
		white-space: pre-wrap;
		font-size: 1em;
		font-family: monospace;
	}
</style>
