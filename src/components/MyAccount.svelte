<script>
	import { writable } from 'svelte/store';
	export let data;
	import { signOut } from '@auth/sveltekit/client';
	import { page } from '$app/stores';

	let usernameField;
	let userEmail = $page.data.session.user.email;

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
	let selectedTheme = 'default';

	const setTheme = (theme) => {
		selectedTheme = theme;

		document.documentElement.classList = theme;
		console.log('done' + theme)

		// Unused: document.documentElement.style.setProperty('--color-black', theme);

		// В цьому місці ви можете додати логіку для збереження обраної теми, наприклад, у локальне сховище.
	};

</script>

<div class="myaccount-tab">
	<p>Пошта: <b>{userEmail}</b></p>
	<p>Завершених казок, у яких брав участь: <b>{data.user_kazky.length}</b></p>
	<p>Всього написаних речень: <b>{data.user_stats.rechennia}</b></p>
	<p>Прочитаних казок: <b>{data.user_stats.views}</b></p>
	<p>Та доданих уподобайок: <b>{data.user_stats.likes}</b></p>
	 
	<div class="theme-div">
		<span>Вибір теми:</span>
<!--		<div class="theme-btn defaul {selectedTheme === 'default' ? 'selected' : ''}" on:click={() => setTheme('default')}></div>-->
<!--		<div class="theme-btn blue-theme {selectedTheme === 'blue' ? 'selected' : ''}" on:click={() => setTheme('blue')}></div>-->
<!--		<div class="theme-btn green-theme {selectedTheme === 'green' ? 'selected' : ''}" on:click={() => setTheme('green')}></div>-->
<!--		<div class="theme-btn purple-theme {selectedTheme === 'purple' ? 'selected' : ''}" on:click={() => setTheme('purple')}></div>-->
		<div class="theme-btn defaul {selectedTheme === 'default' ? 'selected' : ''}" on:click={() => setTheme('default')}></div>
		<div class="theme-btn light-theme {selectedTheme === 'light' ? 'selected' : ''}" on:click={() => setTheme('light')}></div>
		<div class="theme-btn dark-theme {selectedTheme === 'darkk' ? 'selected' : ''}" on:click={() => setTheme('darkk')}></div>

	</div>
	
	<p>
		<button on:click={() => { changeName(); }}>Змінити ім'я</button>
		<input type="text" bind:this={usernameField} class="profile-change-name-input"/>
	</p>
	<p>
		<button on:click={() => { signOut(); }}>Вийти з акаунту</button>
	</p>
</div>

<style>
	.profile-change-name-input{
		border-radius: 4px;
		padding: 2px;
		padding-left: 5px;
		padding-right: 5px;
	}
	.theme-div{
		display: flex;
		align-items: center;
		justify-content: center;
		gap: 5px;
	}
	.theme-btn {
		width: 18px;
		height: 18px;
		border-radius: 50%;
		box-shadow: 0px 3px 5px rgba(0, 0, 0, 0.3);
		transition: width 0.3s ease, height 0.3s ease;
	}
	.theme-btn:hover {

		cursor: pointer;
	}
	.selected {
		transform: scale(1.2);
	}
	.defaul{
		background-color: lavenderblush;
	}
	.blue-theme{
		background-color: #007bff;
	}
	.light-theme{
		background-color: slategray;
	}
	.dark-theme{
		background-color: black;
	}
	.green-theme{
		background-color: #28a745;
	}
	.purple-theme{
		background-color: #6f42c1;
	}

  
	input {
		width: 200px;
	}

	:root.dark {
		--color-black: rgb(47, 39, 119);
	}
</style>
