<script>
	/** @type {import('./$types').PageData} */
	export let data;
	import MyAccount from '../../components/MyAccount.svelte';
	import MyKazky from '../../components/MyKazky.svelte';
	import MyAchievements from '../../components/MyAchievements.svelte';

	let username = 'Nickname0';
	let items = ['Мій акаунт', 'Мої казки', 'Особисті досягнення'];
	let active_item = items[0];

	function tabChange(item) {
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
		<MyAccount />
	{:else if active_item === items[1]}
		<MyKazky />
	{:else if active_item === items[2]}
		<MyAchievements />
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
		border-bottom: 2px solid #78009d;
		padding-bottom: 8px;
	}
</style>
