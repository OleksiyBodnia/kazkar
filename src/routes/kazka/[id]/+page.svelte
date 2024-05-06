<script>
	/** @type {import('./$types').PageData} */
	export let data;
	import Sidebar from '../../../components/Sidebar.svelte';
	import { tooltip } from '$lib/utils/tooltip.js';
	import { slide, scale } from 'svelte/transition';
	import { tweened } from 'svelte/motion';
	import { cubicOut } from 'svelte/easing';
	import KazkaCard from '../../../components/KazkaCard.svelte';
	import { onMount } from 'svelte';

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
	let ks_div;
	let h;
	onMount(() => {
		h = ks_div.getBoundingClientRect().height;
	});
</script>

<div class="individual-kazka-div">
	<div bind:this={ks_div} class="kazka-and-sidebar">
		<div class="kazka-and-offer" style="margin-right: {$sp_width}%;">
			<article class="kazka-itself">
				<h2 style="text-align: center;">{data.kazka.title}</h2>
				<p>
					{#each data.kazka.rechennia as rechennia, i}
						<span
							use:tooltip={{ placement: 'left', theme: 'light-border' }}
							title={'автор речення: ' + data.users[i].name}>{rechennia.content + ' '}</span
						>
					{/each}
				</p>
			</article>
			
		</div>
		<div style="height: {h}px;"></div>
		{#if show_sidebar}
			<div class="sidebar-container" transition:slide={{ duration: 900, axis: 'x' }}>
				<Sidebar bind:this={SidebarComponent} {data} />
			</div>
		{/if}
	</div>
	<button
		class="show-sidebar-btn arrow {show_sidebar ? 'rotate180' : 'rotate0'}"
		on:click={toggleSidebar}
		id="show-sidebar-btn-id"
	>
		<svg
			class="show-sidebar-btn-arrow2"
			xmlns="http://www.w3.org/2000/svg"
			width="32"
			height="32"
			viewBox="0 0 32 32"
			fill="none"
		>
			<path
				d="M26.6667 16H5.33342"
				stroke-width="2"
				stroke-linecap="round"
				stroke-linejoin="round"
			/>
			<path
				d="M13.3333 24L5.33325 16L13.3333 8"
				stroke-width="2"
				stroke-linecap="round"
				stroke-linejoin="round"
			/>
		</svg>
	</button>
	<span class="delimeter"></span>
	<div class="offer">
		<h3 style="text-align: left;">Читайте також</h3>
		<div class="finished-samples">
			{#each data.offer as kazka,i}
				<div class="sample" in:scale={{ delay:  160*i, duration: 700, start: 0.7 }}>
					<KazkaCard state={"completed"} {kazka} />
				</div>
		{/each}   
		</div>
	</div>
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
		justify-content: right;
		align-items: flex-start;
	}

	.kazka-and-offer {
		max-width: 66%;
	}

	.delimeter {
		width: 80%;
		height: 2px;
		background-color: #e0e0e0;
		margin-top: 70px;
		margin-bottom: 20px;
	}

	/* .offer {
		margin-top: 300px;
	} */

	.finished-samples {
		margin: 0 auto;
		display: flex;
		align-items: center;
		justify-content: center;
		row-gap: 10px;
		column-gap: 90px;
		flex-wrap: wrap;
		margin-bottom: 40px;
	}

	.sidebar-container {
		margin-left: 5%;
		margin-top: 60px;
		max-width: 25%;
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

	.show-sidebar-btn-arrow2 {
		stroke: black;
	}

	.show-sidebar-btn-arrow2:hover {
		stroke: #78009d;
	}
</style>
