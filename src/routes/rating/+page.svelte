<script>
	/** @type {import('./$types').PageData} */
	import { fade } from 'svelte/transition';
	import { findLargestAttribute, transformDistribution } from '$lib/utils';

	export let data;

	let top_users = true;

	let bars_scale = 120;

	let fin_bar_multiplier;

	let finished;
	let unfinished;
	Promise.all([data.finished, data.unfinished]).then((values) => {
		finished = values[0];
		unfinished = values[1];
		fin_bar_multiplier = bars_scale / (finished > unfinished ? finished : unfinished);
	});

	let best_users;
	let worst_users;
	let top_bar_multiplier;
	Promise.all([data.best_users, data.worst_users]).then((values) => {
		best_users = values[0];
		worst_users = values[1];
		top_bar_multiplier = bars_scale / best_users[0].rech_count;
	});

	let distribution;
	let distrb_bar_multiplier;
	data.distribution.then((distr) => {
		distribution = transformDistribution(distr);
		distrb_bar_multiplier = bars_scale / findLargestAttribute(distribution);
	});
</script>

<div>
	<div class="rating-main-section">
		<div class="site-statistics">
			<h1>Статистика сайту</h1>
			{#if !finished || !unfinished}
				<p>Завантаження...</p>
			{:else}
				<div class="site-stat-bars">
					<div class="finished-bar">
						<label for="">Завершених казок</label>
						<div class="prog-finished-bar" style="width: {finished * fin_bar_multiplier}px;"></div>
						<label for="">{finished}</label>
					</div>
					<div class="unfinished-bar">
						<label for="">Незавершених казок</label>
						<div
							class="prog-unfinished-bar"
							style="width: {unfinished * fin_bar_multiplier}px;"
						></div>
						<label for="">{unfinished}</label>
					</div>
				</div>
			{/if}
		</div>

		<div class="users-statistics">
			<h1>Хто тут ліпший казкар?</h1>
			<div class="top-controls">
				<button
					class={top_users ? 'top-switch-active' : 'top-switch-unactive'}
					on:click={() => {
						top_users = true;
					}}>Найкращі</button
				>
				<button
					class={top_users ? 'top-switch-unactive' : 'top-switch-active'}
					on:click={() => {
						top_users = false;
					}}>Найгірші</button
				>
			</div>

			{#await Promise.all([data.best_users, data.worst_users])}
				<p>Завантаження...</p>
			{:then}
				{#if top_users == true}
					<div class="top-transitions" in:fade={{ delay: 100, duration: 1000 }}>
						<p>Найактивніший казкар за кількістю написаних речень!</p>
						<div class="best-kazkar">
							<img src={best_users[0].image} alt="kazkar" class="best-kazkar-img" />
							<p>{best_users[0].name}</p>
						</div>
						<div class="user-stat-bars">
							{#each best_users as user}
								<div class="user-bar">
									<label for="">{user.name}</label>
									<div
										class="user-prog-bar"
										style="width: {user.rech_count * top_bar_multiplier}px;"
									></div>
									<label for="">{user.rech_count}</label>
								</div>
							{/each}
						</div>
					</div>
				{:else if top_users == false}
					<div class="top-transitions" in:fade={{ delay: 100, duration: 1000 }}>
						<p>Найменш активний казкар за кількістю написаних речень &#128542</p>
						<div class="best-kazkar">
							{#if worst_users[0].image}
								<img src={worst_users[0].image} alt="kazkar" class="best-kazkar-img" />
							{/if}
							<p>{worst_users[0].name}</p>
						</div>
						<div class="user-stat-bars">
							{#each worst_users as user}
								<div class="user-bar">
									<label for="">{user.name}</label>
									<div
										class="user-prog-bar"
										style="width: {user.rech_count * top_bar_multiplier}px;"
									></div>
									<label for="">{user.rech_count}</label>
								</div>
							{/each}
						</div>
					</div>
				{/if}
			{:catch error}
				<p>{error.message}</p>
			{/await}
		</div>

		<div class="kazky-distribution-with-title">
			<h1>Розподіл завершених казок</h1>
			<span style="position: relative;">кількість казок</span>
			<div class="kazky-distribution">
				{#await data.distribution}
					<p>Завантаження...</p>
				{:then}
					{#each Object.entries(distribution) as [key, value]}
						<div class="kazka-distribution-bar">
							<label for="" style="font-weight: 100;">{value}</label>
							<div
								class="distribution-bar"
								style="width: 20px; height: {value * distrb_bar_multiplier}px;"
							>
								<br />
							</div>
							<label for="">{key}</label>
						</div>
					{/each}
				{/await}
			</div>
			<span style="position: relative;">кількість речень</span>
		</div>
	</div>
</div>

<style>
	.rating-main-section {
		margin-top: 9%;
		display: flex;
		align-items: center;
		justify-content: center;
		flex-direction: row;
		gap: 100px;
	}

	h1 {
		text-align: center;
	}

	p {
		text-align: center;
	}

	.site-statistics {
		width: 25%;
		display: flex;
		align-items: center;
		justify-content: center;
		flex-direction: column;
	}

	.site-statistics h1 {
		margin-bottom: 35px;
	}

	.site-stat-bars {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 20px;
	}

	.finished-bar {
		display: flex;
		gap: 12px;
	}
	.unfinished-bar {
		display: flex;
		gap: 12px;
	}
	.prog-finished-bar {
		/* width: 176px; */
		background-color: var(--color-bar);
		border-radius: 5px;
	}
	.prog-unfinished-bar {
		/* width: 326px; */
		background-color: var(--color-bar);
		border-radius: 5px;
	}

	.kazky-distribution-with-title {
		width: 25%;
		display: flex;
		align-items: center;
		justify-content: center;
		flex-direction: column;
		gap: 20px;
	}

	.kazky-distribution {
		display: flex;
		align-items: flex-end;
		justify-content: center;
		flex-direction: row;
		gap: 40px;
	}

	.kazka-distribution-bar {
		display: flex;
		align-items: center;
		justify-content: center;
		flex-direction: column;
		gap: 12px;
	}

	.distribution-bar {
		background-color: var(--color-bar);
		border-radius: 5px;
	}

	.users-statistics {
		width: 25%;
		display: flex;
		align-items: center;
		justify-content: center;
		flex-direction: column;
	}

	.best-kazkar {
		display: flex;
		gap: 15px;
		margin-bottom: 30px;
	}

	.best-kazkar-img {
		width: 50px;
		height: 50px;
		border-radius: 50%;
	}

	.user-stat-bars {
		display: flex;
		align-items: center;
		justify-content: center;
		flex-direction: column;
		gap: 20px;
	}
	.user-bar {
		display: flex;
		gap: 10px;
	}
	.user-prog-bar {
		border-radius: 5px;
		background-color: var(--color-bar);
	}

	.top-controls {
		padding: 10px 0 10px 0;
		display: flex;
		gap: 60px;
	}

	.top-switch-active {
		all: unset;
		font-size: 18px;
		cursor: pointer;
		border-bottom: var(--color-accent) 2px solid;
		color: var(--color-accent);
	}
	.top-switch-unactive {
		all: unset;
		font-size: 18px;
		cursor: pointer;
	}
	.top-switch-unactive:hover {
		color: var(--color-accent);
	}

	.top-transitions {
		display: flex;
		align-items: center;
		justify-content: center;
		flex-direction: column;
	}
	@media screen and (max-width: 767px) {
		.rating-main-section {
			flex-direction: column;
		}
		.finished-bar,
		.unfinished-bar {
			width: 350px;
			justify-content: center;
		}
		.rating-main-section {
			gap: 40px;
			margin-top: 4%;
		}
		.user-bar {
			width: 350px;
			justify-content: center;
		}
		.kazky-distribution {
			gap: 20px;
		}
		span {
			text-align: center;
			width: 350px;
		}
		h1 {
			width: 350px;
		}
	}
	@media screen and (min-width: 768px) and (max-width: 1023px) {
		.rating-main-section {
			flex-direction: column;
			margin-top: 5%;
		}
		.finished-bar,
		.unfinished-bar {
			width: 500px;
			justify-content: center;
		}
		.user-bar {
			width: 500px;
			justify-content: center;
		}
		h1 {
			width: 500px;
		}
		.rating-main-section {
			gap: 60px;
		}
	}
</style>
