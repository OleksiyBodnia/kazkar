<script>
	/** @type {import('./$types').PageData} */
	import Sidebar from '@components/Sidebar.svelte';
	import KazkaCard from '@components/KazkaCard.svelte';
	import { page } from '$app/stores';
	import { tooltip } from '$lib/utils/tooltip.js';
	import { slide, scale } from 'svelte/transition';
	import { tweened } from 'svelte/motion';
	import { cubicOut } from 'svelte/easing';

	export let data;

	// make 'users' such an array that returns '...' for each index
	let users = [];

	$: {
		data.users.then((u) => {
			users = u;
		});
	}

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
			<h2 style="text-align: center;">{data.kazka.title}</h2>
			{#await data.users then}
				<p class="tippy-pc">
					{#each data.kazka.rechennia as rechennia, i}
						<span
							use:tooltip={{ placement: 'left', theme: 'light-border' }}
							title={'автор речення: ' + users[i]?.name || '...'}
							style={$page.data.session && $page.data.session.user.id == rechennia.user_id
								? 'color: var(--color-accent)'
								: ''}>{rechennia.content + ' '}</span
						>
					{/each}
				</p>
				<p class="tippy-mobile">
					{#each data.kazka.rechennia as rechennia, i}
						<span
							use:tooltip={{ placement: 'top', theme: 'light-border' }}
							title={'автор речення: ' + users[i]?.name || '...'}
							style={$page.data.session && $page.data.session.user.id == rechennia.user_id
								? 'color: var(--color-accent)'
								: ''}>{rechennia.content + ' '}</span
						>
					{/each}
				</p>
			{/await}
		</article>
		<div class="height-correction" style="height: 500px;"></div>
		{#if show_sidebar}
			<div class="sidebar-container" transition:slide={{ duration: 900, axis: 'x' }}>
				<Sidebar bind:this={SidebarComponent} {data} {users} />
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
	<div class="delimeter"></div>
	<div class="mobile-sidebar"><Sidebar {data} /></div>
	<div class="delimeter second-delimetr"></div>
	{#await data.offer}
		<p>Завантаження...</p>
	{:then offer}
		<div class="offer">
			<h3 style="text-align: left;">Читайте також</h3>
			<div class="finished-samples">
				{#each offer as kazka, i}
					<div class="sample" in:scale={{ delay: 160 * i, duration: 700, start: 0.7 }}>
						<KazkaCard state={'completed'} {kazka} />
					</div>
				{/each}
			</div>
		</div>
	{:catch error}
		<p style="color: red">{error.message}</p>
	{/await}
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

	.kazka-itself {
		max-width: 66%;
	}

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
		margin-top: 30px;
		max-width: 25%;
	}

	.delimeter {
		width: 80%;
		height: 2px;
		background-color: #e0e0e0;
		margin-top: 20px;
		margin-bottom: 20px;
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
		stroke: var(--color-black);
	}

	.show-sidebar-btn-arrow2:hover {
		stroke: var(--color-purple);
	}
	.second-delimetr {
		display: none;
	}
	.mobile-sidebar {
		display: none;
	}
	.tippy-mobile {
		display: none;
	}
	@media screen and (max-width: 767px) {
		.sidebar-container,
		.show-sidebar-btn {
			display: none;
		}
		.kazka-and-sidebar {
			justify-content: center;
		}
		.kazka-itself {
			max-width: 100%;
		}
		.individual-kazka-div {
			margin-top: 0;
			padding-top: 0;
		}
		.height-correction {
			display: none;
		}
		.second-delimetr {
			display: block;
		}
		.mobile-sidebar {
			display: flex;
		}
		.tippy-pc {
			display: none;
		}
		.tippy-mobile {
			display: block;
		}
	}
</style>
