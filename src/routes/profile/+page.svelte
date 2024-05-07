<script>
	/** @type {import('./$types').PageData} */
	export let data;
	import MyAccount from '../../components/MyAccount.svelte';
	import MyKazky from '../../components/MyKazky.svelte';
	import MyAchievements from '../../components/MyAchievements.svelte';
	import { fade } from 'svelte/transition';
	import { page } from '$app/stores';

	let username = $page.data.session.user.name;
	let items = ['Мій акаунт', 'Мої казки', 'Особисті досягнення'];
	let active_item = items[0];
	let previous_item = items[0];

	function tabChange(item) {
		previous_item = active_item;
		active_item = item;
	}
</script>

<div class="profile-page-div">
	<h1>Профіль користувача <strong>{username}</strong></h1>

	<div class="tabs">
		<ul>
			{#each items as item}
				<button
					on:click={() => tabChange(item)}
					on:keydown={(event) => {
						if (event.key === 'Enter') tabChange(item);
					}}
				>
					<div class:active={item === active_item}>{item}</div>
				</button>
			{/each}
		</ul>
	</div>

	{#if active_item === items[0]}
		<div in:fade={{ x: -200, duration: 700 }}>
			<MyAccount {data} />
		</div>
	{:else if active_item === items[1]}
		<div in:fade={{ x: 200, duration: 700 }}>
			<MyKazky kazky={data.user_kazky}/>
		</div>
		<!-- {:else if active_item === items[1] && previous_item === items[2]}
		<div in:fly={{ x: -200, duration: 700 }}>
			<MyKazky />
		</div> -->
	{:else if active_item === items[2]}
		<div in:fade={{ x: 200, duration: 700 }}>
			<MyAchievements kazky={data.user_kazky}/>
		</div>
	{/if}
</div>

<style>
	.profile-page-div {
		padding: 40px;
		display: flex;
		align-items: center;
		justify-content: center;
		flex-direction: column;
	}

	h1 {
		font-weight: normal;
		text-align: center;
	}

	.tabs {
		margin-bottom: 40px;
	}

	ul {
		display: flex;
		justify-content: center;
		padding: 0;
		gap: 100px;
		list-style-type: none;
	}

	button {
		margin: 0 16px;
		font-size: 18px;
		color: #555;
		cursor: pointer;
	}

	button:hover {
		background-image: linear-gradient(120deg, #78009d 34%, #0087bc 100%);
		background-clip: text;
		-webkit-background-clip: text;
		-webkit-text-fill-color: transparent;
	}

	.active {
		background-image: linear-gradient(120deg, #78009d 34%, #0087bc 100%);
		background-clip: text;
		-webkit-background-clip: text;
		-webkit-text-fill-color: transparent;
		/* border-bottom: 2px solid #78009d; */
	}
</style>
