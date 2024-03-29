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

	<button class="show-sidebar-btn arrow {show_sidebar ? 'rotate0' : 'rotate180'}" on:click={toggleSidebar}>
		<i class="gg-arrow-right"></i>
	</button>
	<!-- <img src="/img/arrow.png" alt="arrow" type="button" class="arrow show-sidebar-btn {show_sidebar ? 'rotate180' : 'rotate0'}" on:click={toggleSidebar}/> -->
</div>

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
		top: 90px;
		right: 20px;
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


	.gg-arrow-right {
		box-sizing: border-box;
		position: relative;
		display: block;
		transform: scale(var(--ggs,1));
		width: 22px;
		height: 22px
	}

	.gg-arrow-right::after,
	.gg-arrow-right::before {
		content: "";
		display: block;
		box-sizing: border-box;
		position: absolute;
		right: 3px
	}

	.gg-arrow-right::after {
		width: 8px;
		height: 8px;
		border-top: 2px solid;
		border-right: 2px solid;
		transform: rotate(45deg);
		bottom: 7px
	}

	.gg-arrow-right::before {
		width: 16px;
		height: 2px;
		bottom: 10px;
		background: currentColor
	} 
</style>
