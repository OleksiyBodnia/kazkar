<script>
	/** @type {import('./$types').PageData} */
	export let data;
	import Sidebar from '../../../components/Sidebar.svelte';
	import { tooltip } from '$lib/utils/tooltip.js';
	import { slide, scale } from 'svelte/transition';
	import { tweened } from 'svelte/motion';
	import { cubicOut } from 'svelte/easing';

	let SidebarComponent;

	const sp_width = tweened(4, {
		duration: 900,
		easing: cubicOut
	});

	let show_sidebar = true;
	let show_spacer = false;

    function toggleSidebar() {
        show_sidebar = !show_sidebar;
		show_spacer = !show_spacer;
		if (show_spacer) {
			sp_width.set(16);
		} else {
			sp_width.set(4);
		}		
    }
</script>

<div class="individual-kazka-div">
	<div class="kazka-and-sidebar">
		<article class="kazka-itself" style="margin-right: {$sp_width}%;">
			<h2>{data.kazka.title}</h2>
			<p>
				{#each data.kazka.rechennia as rechennia, i}
					<span use:tooltip={{placement: 'left', theme: 'light-border',}} 
							title={"автор речення: " + data.users[i].username}
							>{rechennia.content + " "}</span>
				{/each}
			</p>
		</article>

		{#if show_sidebar}
			<div class="sidebar-container" transition:slide={{duration: 900, axis: 'x'}}>
				<Sidebar bind:this={SidebarComponent} {data}/>
			</div>
		{/if}
	</div>

	<button class="show-sidebar-btn arrow {show_sidebar ? 'rotate0' : 'rotate180'}" on:click={toggleSidebar} id='show-sidebar-btn-id'>
		<svg class="show-sidebar-btn-arrow2" xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32" fill="none">
			<path d="M26.6667 16H5.33342" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
			<path d="M13.3333 24L5.33325 16L13.3333 8" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
		</svg>
	</button>
</div>

<style>
	.individual-kazka-div {
		margin-top: 40px;
		padding: 40px 0 40px 0;
		display: flex;
		align-items: center;
		justify-content: center;
		flex-direction: column;
		position: relative;
	}

	.kazka-and-sidebar {
		display: flex;
		align-items: center;
		justify-content: right;
	}

	article {
		max-width: 66%;
	}

	.sidebar-container {

		padding-left: 5%;
		max-width: 30%;
	}

	.show-sidebar-btn {
		all: unset;
		position: absolute;
		top: 7px;
		right: 7px;
		stroke-width: 2px;
	}

	.show-sidebar-btn:hover {
		cursor: pointer;
	}
	
	span:hover {
		cursor: pointer;
		text-decoration: underline;
	}

	.rotate180 {
    	transform: rotateY(180deg);
		transition: 0.3s ease-in-out;
  	}
	.rotate0 {
    	transform: rotateY(0deg);
		transition: 0.3s ease-in-out;
  	}
	
	.show-sidebar-btn-arrow2{
		stroke: black;
	}
	.show-sidebar-btn-arrow2:hover{
		stroke: #78009d;
	}

	 
</style>
