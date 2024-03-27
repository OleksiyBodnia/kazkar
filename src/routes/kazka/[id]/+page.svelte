<script>
	/** @type {import('./$types').PageData} */
	export let data;
	import Sidebar from '../../../components/Sidebar.svelte';
	import { tooltip } from '$lib/utils/tooltip.js';

	let SidebarComponent;

</script>

<div class="individual-kazka-div">
	<div class="kazka-and-sidebar">
		<article class="kazka-itself">
			<h2>{data.kazka.title}</h2>
			<p>
				{#each data.kazka.rechennia as rechennia, i}
					<span use:tooltip={{placement: 'left', theme: 'light-border',}} 
							title={"автор речення: " + data.users[i].username}
							>{rechennia.content + " "}</span>
				{/each}
			</p>
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

	span:hover {
		cursor: pointer;
		text-decoration: underline;
	}
</style>
