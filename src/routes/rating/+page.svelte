<script>
	import { onMount } from 'svelte';
	import { fade, fly } from 'svelte/transition';
	import { tweened } from 'svelte/motion';
	import { cubicOut } from 'svelte/easing';

	let visible = false;
	const finished_bar = tweened(0, {
		duration: 1000,
		easing: cubicOut
	});
	const unfinished_bar = tweened(0, {
		duration: 1000,
		easing: cubicOut
	});
	const user_bar = tweened(0, {
		duration: 1000,
		easing: cubicOut
	});

	onMount(() => {
		visible = true;
		finished_bar.set(176);
		unfinished_bar.set(326);
		user_bar.set(100);
	});
</script>

<div class="rating-main-section">
	<div class="site-statistics">
		<h1>Статистика сайту</h1>
		<div class="site-stat-bars">
			<div class="finished-bar">
				<label for="">Завершених казок</label>
				<div class="prog-finished-bar" style="width: {$finished_bar}px;"></div>
				<label for="">176</label>
			</div>
			<div class="unfinished-bar">
				<label for="">Незавершених казок</label>
				<div class="prog-unfinished-bar" style="width: {$unfinished_bar}px;"></div>
				<label for="">326</label>
			</div>
		</div>
	</div>
	<div class="users-statistics">
		<h1>Хто тут ліпший казкар?</h1>
		<p>Найактивніший казкар</p>
		<div class="best-kazkar">
			<img src="/img/shiba.jpg" alt="kazkar" class="best-kazkar-img" />
			<p>Nickname 0</p>
		</div>
		<div class="user-stat-bars">
			<div class="user-bar">
				<label for="">Nickname 1</label>
				<div class="user-prog-bar" style="width: {$user_bar}px;"></div>
				<label for="">100</label>
			</div>
		</div>
	</div>
</div>

<style>
	.rating-main-section {
		display: flex;
		align-items: center;
		justify-content: center;
		flex-direction: column;
		gap: 40px;
	}
	.site-statistics {
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
		gap: 30px;
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

	.users-statistics {
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
	}
	.user-bar {
		display: flex;
		gap: 10px;
	}
	.user-prog-bar {
		border-radius: 5px;
		/* width: 100px; */
		background-color: rgb(149, 222, 207);
	}
</style>
