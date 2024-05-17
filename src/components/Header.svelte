<script>
	import InfoDialog from './InfoDialog.svelte';
	import LoginDialog from './LoginDialog.svelte';
	import { signIn } from '@auth/sveltekit/client';
	import { page } from '$app/stores';
	import { writable } from 'svelte/store';

	let InfoDialogComponent;
	let LoginDialogComponent;
	
  
  	const isMenuOpen = writable(false);
</script>

<InfoDialog bind:this={InfoDialogComponent} />
<LoginDialog bind:this={LoginDialogComponent} />

<header>
	<a class="title" href="/">Казкар</a>
	<!-- треба зробит так, щоб при натисканні головна строрінка оновлювалася навіть коли вона є поточною -->
	<nav class="nav-desctop">
		<a href="/chytaty" class="header-link">Читати</a>
		<a href="/maisternia" class="header-link">Писати</a>
		<a href="/rating" class="header-link">Рейтинг</a>
		<button on:click={InfoDialogComponent.toggleInfoDialog}>Що тут коїться?</button>
		<!-- <button on:click={LoginDialogComponent.toggleLoginDialog}>Увійти</button> -->
		{#if $page.data.session}
			<a href="/profile" class="header-link">Профіль</a>
		{:else}
			<button on:click={() => signIn()}>Увійти</button>
		{/if}
	</nav>
	<div class="nav-div-desc" class:active={$isMenuOpen}>
		<nav class="nav-mobile">
			<a  href="/chytaty" class="header-link nav-mobile-item" on:click={() => $isMenuOpen = !$isMenuOpen}>Читати</a>
			<a  href="/maisternia" class="header-link nav-mobile-item" on:click={() => $isMenuOpen = !$isMenuOpen}>Писати</a>
			<a  href="/rating" class="header-link nav-mobile-item" on:click={() => $isMenuOpen = !$isMenuOpen}>Рейтинг</a>
			<button class="header-btn nav-mobile-item" on:click={InfoDialogComponent.toggleInfoDialog} on:click={() => $isMenuOpen = !$isMenuOpen}>Що тут коїться?</button>
			{#if $page.data.session}
				<a  href="/profile" class="header-link nav-mobile-item" on:click={() => $isMenuOpen = !$isMenuOpen}>Профіль</a>
			{:else}
				<button class="nav-mobile-item" on:click={() => signIn()} on:click={() => $isMenuOpen = !$isMenuOpen}>Увійти</button>
			{/if}

			<!-- <svg  xmlns="http://www.w3.org/2000/svg"  width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
				<line x1="18" y1="6" x2="6" y2="18"></line>
				<line x1="6" y1="6" x2="18" y2="18"></line>
			  </svg> -->
			<p on:click={() => $isMenuOpen = !$isMenuOpen} class="cross-icon">x</p>
		</nav>
	</div>
	<svg
		on:click={() => $isMenuOpen = !$isMenuOpen}
		xmlns="http://www.w3.org/2000/svg"
		class="burger-icon"
		width="24"
		height="24"
		viewBox="0 0 24 24"
		fill="none"
		stroke="currentColor"
		stroke-width="2"
		stroke-linecap="round"
		stroke-linejoin="round"
	>
		<line x1="3" y1="12" x2="21" y2="12"></line>
		<line x1="3" y1="6" x2="21" y2="6"></line>
		<line x1="3" y1="18" x2="21" y2="18"></line>
	</svg>
	
</header>

<style>
	header {
		position: fixed;
		z-index: 100;
		width: 100%;
		height: 4rem;
		top: 0;
		left: 0;
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 1em;
		background-color: var(--color-header);
	}

	.title {
		font-size: 1.7rem;
		font-weight: bold;
		text-decoration: none;
	}

	nav a,
	nav button {
		margin-left: 1em;
	}

	nav button {
		border: none;
		cursor: pointer;
		padding: 0;
		font: inherit;
		outline: inherit;
	}
	nav button:hover {
		background-color: white;
		color: var(--color-accent);
	}

	.title:hover,
	.header-link:hover,
	.header-link:focus {
		background-color: white;
		color: var(--color-accent);
	}

	@media screen and (max-width: 767px) {
		.nav-mobile-item{
			font-size: x-large;
			width: 250px;
			text-align: center;
			margin-left: 0;
		}
		.nav-desctop {
			display: none;
		}
		.nav-div-desc {
			position: absolute;
			top: 0;
			/* right: -100%; */
			left: 0;
			width: 100%;
			height: 1000vh;
			background-color: white;
			padding: 100px;
			padding-top: 200px;
			transform: translateX(100%);
			z-index: 100;
			transition: transform 0.3s ease-in-out;
		}
		.nav-div-desc.active {
			transform: translateX(0);
			/* right: 0; */
		}

		.nav-mobile {
			display: flex;
			align-items: center;
			justify-content: center;
			flex-direction: column;
			gap: 20px;
		}
		.cross-icon{
			position: absolute;
			top: -10px;
			left: 40px;
			font-size: 2em;
		}
	}
	@media screen and (min-width: 767px) {
		.nav-div-desc,
		.burger-icon {
			display: none;
		}
	}
</style>
