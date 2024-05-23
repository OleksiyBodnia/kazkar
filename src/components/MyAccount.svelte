<script>
	export let user_kazky;
	export let user_stats;

	import { signOut } from '@auth/sveltekit/client';
	import { site_theme } from '$lib/stores/theme';
	import { page } from '$app/stores';

	let usernameField;
	let userEmail = $page.data.session.user.email || 'невідомо';

	async function changeName() {
		const response = await fetch('/api/user/change-name', {
			method: 'POST',
			body: JSON.stringify({ newName: usernameField.value }),
			headers: {
				'Content-Type': 'application/json'
			}
		});

		if (!response.ok) {
			console.log('Name change failed', response);
		} else {
			usernameField.style.backgroundColor = 'lightgreen';
			setTimeout(() => {
				usernameField.style.backgroundColor = 'white';
			}, 1000);
		}
	}

	const setTheme = (theme) => {
		site_theme.set(theme);
	};
</script>

<div class="myaccount-tab">
	<p>Пошта: <b>{userEmail}</b></p>
	<p>Завершених казок, у яких брав участь: <b>{user_kazky.length}</b></p>
	<p>Всього написаних речень: <b>{user_stats.rechennia}</b></p>
	<p>Прочитаних казок: <b>{user_stats.views}</b></p>
	<p>Та доданих уподобайок: <b>{user_stats.likes}</b></p>
	<div class="theme-div">
		<span>Вибір теми:</span>
		<div
			class="theme-btn defaul {$site_theme === 'default' ? 'selected' : ''}"
			on:click={() => setTheme('default')}
		></div>
		<div
			class="theme-btn light-theme {$site_theme === 'light' ? 'selected' : ''}"
			on:click={() => setTheme('light')}
		></div>
		<div
			class="theme-btn dark-theme {$site_theme === 'darkk' ? 'selected' : ''}"
			on:click={() => setTheme('darkk')}
		></div>
	</div>
	<p>
		<button
			on:click={() => {
				changeName();
			}}>Змінити ім'я</button
		>
		<input type="text" bind:this={usernameField} class="profile-change-name-input" />
	</p>
	<p>
		<button
			on:click={() => {
				signOut();
			}}>Вийти з акаунту</button
		>
	</p>
</div>

<style>
	.profile-change-name-input {
		border-radius: 4px;
		padding: 2px;
		padding-left: 5px;
		padding-right: 5px;
	}

	.theme-div {
		display: flex;
		align-items: center;
		justify-content: center;
		gap: 10px;
	}

	.theme-btn {
		width: 20px;
		height: 20px;
		border-radius: 50%;

		transition:
			width 0.3s ease,
			height 0.3s ease;
	}

	.theme-btn:hover {
		cursor: pointer;
	}

	.selected {
		transform: scale(1.2);
		box-shadow: 0px 3px 5px rgba(0, 0, 0, 0.3);
	}

	.defaul {
		background-color: lavenderblush;
	}

	.light-theme {
		background-color: slategray;
	}

	.dark-theme {
		background-color: black;
		box-shadow: rgba(100, 100, 111, 0.2) 0px 3px 5px;
	}

	input {
		width: 200px;
	}
</style>
