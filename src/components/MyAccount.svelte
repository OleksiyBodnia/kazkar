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
	let selectedTheme = '';

  const setTheme = (theme) => {
    selectedTheme = theme;
    document.documentElement.style.setProperty('--color-black', theme);
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
		<span>Акцентний колір:</span>
		<div class="theme-btn defaul {selectedTheme === 'dark-red' ? 'selected' : ''}" on:click={() => setTheme('dark-red')}></div>
		<div class="theme-btn blue-theme {selectedTheme === 'blue' ? 'selected' : ''}" on:click={() => setTheme('blue')}></div>
		<div class="theme-btn green-theme {selectedTheme === 'green' ? 'selected' : ''}" on:click={() => setTheme('green')}></div>
		<div class="theme-btn purple-theme {selectedTheme === 'purple' ? 'selected' : ''}" on:click={() => setTheme('purple')}></div>

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
		background-color: black;
	}
	.blue-theme{
		background-color: #007bff;
	}
	.green-theme{
		background-color: #28a745;
	}
	.purple-theme{
		background-color: #6f42c1;
	}
	
  .blue {
    --color-black: #007bff; 
  }

  .green {
    --color-black: #28a745; 
  }

  .purple {
    --color-black: #6f42c1; 
  }

  .dark-red {
    --color-black: #010101; 
  }
  
	input {
		width: 200px;
	}

	.theme-toggle-div {
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.profile-change-name-form{
		display: flex;
		align-items: center;
		justify-content: center;
		gap: 10px;
		
	}

	.theme-btn-span {
		border: 1px solid black;
		width: 19px;
		height: 19px;
		background-color: white;
		border-radius: 50%;
		position: absolute;
		top: 0;
		left: 0;
		transition: transform 0.3s ease, background-color 0.3s ease;
	}

	:root.dark {
		--color-black: rgb(47, 39, 119);
	}
</style>
