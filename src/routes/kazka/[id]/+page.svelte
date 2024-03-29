<script>
	/** @type {import('./$types').PageData} */
	export let data;
	import Sidebar from '../../../components/Sidebar.svelte';
	import { tooltip } from '$lib/utils/tooltip.js';
	import { slide, fly } from 'svelte/transition';

	let SidebarComponent;
	let sidebar;
	let opened = true;
	let kazkaAndSidebar;
	let opened2 = true;
	// let show_sidebar = true;
    function toggleSidebar() {
        // show_sidebar = !show_sidebar;

		// sidebar.classList.toggle('open');
		opened = !opened;
		opened2 =! opened2;
    }
</script>

<div class="individual-kazka-div">
	<div class="kazka-and-sidebar {opened2 ? 'open2' : ' '}" bind:this={kazkaAndSidebar}>
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
		<!-- {#if show_sidebar} -->
			<div class="sidebar-container {opened ? 'open' : ' '}" bind:this={sidebar}>
				<Sidebar bind:this={SidebarComponent} {data}/>
			</div>
		<!-- {/if} -->
	</div>

	<button class="show-sidebar-btn" on:click={toggleSidebar}>sidebar</button>
</div>

<!-- дуже-дуже демо версія, погане вирівнювання, треба правити -->
<style>
	.individual-kazka-div {
		padding: 40px;
		display: flex;
		align-items: center;
		justify-content: center;
		flex-direction: column;
		width: 100%;
	}

	.kazka-and-sidebar {
		position: relative;
		display: flex;
		align-items: center;
		justify-content: center;
		overflow: hidden;
	}
	.kazka-and-sidebar.open2{
		justify-content: space-between;
	}

	article {
		max-width: 70%;
	}

	.sidebar-container {
		/* margin-left: 10%; */
		/* padding-left: 5%; */
		max-width: 30%;
		position: absolute;
		right: 0;
		transform: translateX(100%);
		transition: transform 0.3s ease-in-out, position 0.6s ease-in-out; 
	}
	.sidebar-container.open{
		position: relative;
		transform: translateX(0%);
	}

	.show-sidebar-btn {
		position: absolute;
		top: 90px;
		right: 20px;
	}

	/* pre {
		white-space: pre-wrap;
		font-size: 1em;
		font-family: monospace;
	} */

	span:hover {
		cursor: pointer;
		text-decoration: underline;
	}
</style>
