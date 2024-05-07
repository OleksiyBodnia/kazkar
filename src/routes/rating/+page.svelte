<script>
	/** @type {import('./$types').PageData} */
	export let data;

	import { fade } from 'svelte/transition';

	let top_users = true;
</script>

<div>
<div class="rating-main-section">
	<div class="site-statistics">
		<h1>Статистика сайту</h1>
		<div class="site-stat-bars">
			<div class="finished-bar">
				<label for="" style="padding: 0 9px 0 9px">Завершених казок</label>
				<div class="prog-finished-bar" style="width: {data.finished}px;"></div>
				<label for="">{data.finished}</label>
			</div>
			<div class="unfinished-bar">
				<label for="">Незавершених казок</label>
				<div class="prog-unfinished-bar" style="width: {data.unfinished}px;"></div>
				<label for="">{data.unfinished}</label>
			</div>
		</div>
	</div>

	<div class="users-statistics">
		<h1>Хто тут ліпший казкар?</h1>
		<div class="top-controls">
			<button class={top_users ? 'top-switch-active' : 'top-switch-unactive'} 
				on:click={() => {top_users = true}}>Кращі</button>
			<button class={top_users ? 'top-switch-unactive' : 'top-switch-active'} 
				on:click={() => {top_users = false}}>Гірші</button>
		</div>
		
		
		{#if top_users == true}
		<div class="top-transitions" in:fade={{ delay: 100, duration: 1000 }}>
			<p>Найактивніший казкар за кількістю написаних речень!</p>
			<div class="best-kazkar">
				<img src={data.best_users[0].image} alt="kazkar" class="best-kazkar-img" />
				<p>{data.best_users[0].name}</p>
			</div>
			<div class="user-stat-bars">
				{#each data.best_users as user}
					<div class="user-bar">
						<label for="">{user.name}</label>
						<div class="user-prog-bar" style="width: {user.rech_count}px;"></div>
						<label for="">{user.rech_count}</label>
					</div>
				{/each}
			</div>
		</div>
		{:else if top_users == false}
		<div class="top-transitions" in:fade={{ delay: 100, duration: 1000 }}>
			<p>Найменш активний казкар за кількістю написаних речень</p>
			<div class="best-kazkar">
				<img src={data.worst_users[0].image} alt="kazkar" class="best-kazkar-img" />
				<p>{data.worst_users[0].name}</p>
			</div>
			<div class="user-stat-bars">
				{#each data.worst_users as user}
					<div class="user-bar">
						<label for="">{user.name}</label>
						<div class="user-prog-bar" style="width: {user.rech_count}px;"></div>
						<label for="">{user.rech_count}</label>
					</div>
				{/each}
			</div>
		</div>
		{/if}
		
	</div>

	<div class="kazky-distribution-with-title">
		<h1>Розподіл казок</h1>
		<span style="position: relative;">кількість казок</span>
		<div class="kazky-distribution">
			{#each Object.entries(data.distribution) as [key, value]}
				<div class="kazka-distribution-bar">
					<label for="" style="font-weight: 100;">{value}</label>
					<div class="distribution-bar" style="width: 20px; height: {value*30}px;"><br></div>
					<label for="">{key}</label>
				</div>
			{/each}
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
		align-items: start;
		justify-content: start;
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
		background-color: bisque;
		border-radius: 5px;
	}
	.prog-unfinished-bar {
		/* width: 326px; */
		background-color: rgb(180, 78, 78);
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
		background-color: rgb(149, 222, 207);
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
		background-color: rgb(149, 222, 207);
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
		border-bottom: grey 2px solid;
		background-image: linear-gradient(120deg, #78009d 34%, #0087bc 100%);
		background-clip: text;
		-webkit-background-clip: text;
		-webkit-text-fill-color: transparent;
	}
	.top-switch-unactive {
		all: unset;
		font-size: 18px;
		cursor: pointer;
		/* border-bottom: grey 2px solid; */
	}

	.top-transitions {
		display: flex;
		align-items: center;
		justify-content: center;
		flex-direction: column;
	}
</style>
