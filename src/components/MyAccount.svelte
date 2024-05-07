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

//   function getCurrentTheme() {
//     return localStorage.getItem('theme') || 'light';
//   }
//   const theme = writable(getCurrentTheme());

//   function toggleTheme() {
//     theme.update(currentTheme => {
//       const newTheme = currentTheme === 'light' ? 'dark' : 'light';
//       localStorage.setItem('theme', newTheme); // Збереження нової теми в локальне сховище
//       return newTheme;
//     });
//   }
//   $: {
//     const currentTheme = $theme;
//     if (currentTheme === 'dark') {
//       document.documentElement.classList.add('dark');
//     } else {
//       document.documentElement.classList.remove('dark');
//     }
//   }

//   let isAnimating = false;
// let isToggled = JSON.parse(localStorage.getItem('isToggled')) || false;

// function toggleThemeAndAnimation() {
//   if (!isAnimating) {
//     isAnimating = true;
//     toggleTheme();
//     const themeSpan = document.querySelector('.theme-btn-span');
//     const themeBtn = document.querySelector('.theme-btn');
//     const btnWidth = themeBtn.offsetWidth;

//     if (!isToggled) {
//       themeSpan.style.backgroundColor = 'black';
//       themeSpan.style.transform = `translateX(${btnWidth - 22}px)`;
//       isToggled = true;
//       localStorage.setItem('isToggled', JSON.stringify(true));
//     } else {
//       themeSpan.style.backgroundColor = 'white'
//       themeSpan.style.transform = 'translateX(0)';
//       isToggled = false;
//       localStorage.setItem('isToggled', JSON.stringify(false));
//     }

//     themeSpan.addEventListener('transitionend', () => {
//       isAnimating = false;
//     });
//   }
// }

</script>

<div class="myaccount-tab">
		<p>Пошта: <b>{userEmail}</b></p>
		<p>Кількість казок, у яких брав участь: <b>{data.user_kazky.length}</b></p>
		<p>Всього написано речень: <b>{data.user_kazky.reduce((total, kazka) => total + kazka.rechennia.length, 0)}</b></p>
		<!-- <div class="theme-toggle-div">
			<p>Вибір кольру </p>
			<button on:click={toggleThemeAndAnimation} class="theme-btn"><div class="theme-btn-span"></div></button>
		</div> -->
	<p>
		<input type="text" bind:this={usernameField} />
		<button on:click={() => { changeName(); }}>Змінити ім'я</button>
	</p>
	<p>
		<button on:click={() => { signOut(); }}>Вийти з акаунту</button>
	</p>
</div>

<style>
	.theme-toggle-div {
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.theme-btn {
		width: 50px;
		height: 22px;
		margin-left: 10px;
		position: relative;
		border-radius: 11px;
		overflow: hidden;
		background-color: rgb(130, 130, 130);
	}

	.theme-btn:hover{
		background-color: inherit;
		background-image: inherit;
		color: inherit;
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

	.myaccount-tab {
		width: 800px;
		text-align: center;
		border: 2px solid black;
		border-radius: 10px;
		padding: 20px;
		display: flex;
		align-items: center;
		justify-content: center;
		flex-direction: column;
	}

	:root.dark {
		--color-black: rgb(47, 39, 119);
	}
</style>
