<script>
	export let data;
	import { signOut } from '@auth/sveltekit/client';

	let usernameField;

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
</script>

<div class="myaccount-tab">
	<div>
		<p>Пошта</p>
		<p>Кількість казок, у яких брали участь</p>
		<p>Вибір кольру</p>
		<p>.......</p>
	</div>
	<input type="text" bind:this={usernameField} />
	<button
		on:click={() => {
			changeName();
		}}>Змінити ім'я користувача</button
	>
	<button
		on:click={() => {
			signOut();
		}}>Вийти з акаунту</button
	>
</div>

<style>
	.myaccount-tab {
		/* width: 700px; */
		width: 800px;
		text-align: center;
		border: 2px solid black;
		border-radius: 10px;
		padding: 20px;
	}
</style>
