<script>
    let login;
	let login_is_open = false;
    let auth;
    let auth_is_open = false;
    let create_acc;
    let create_acc_is_open = false;

	export function toggleLoginDialog() {
		if (login_is_open) {
			login.close();
			login_is_open = false;
		} else {
			login.showModal();
			login_is_open = true;
		}
	}
    function toggleAuthDialog() {
		if (auth_is_open) {
			auth.close();
			auth_is_open = false;
		} else {
			auth.showModal();
			auth_is_open = true;
		}
	}
    function toggleCreateAccDialog() {
		if (create_acc_is_open) {
			create_acc.close();
			create_acc_is_open = false;
		} else {
			create_acc.showModal();
			create_acc_is_open = true;
		}
	}
</script>

<dialog bind:this={login}>
    <button class="close-button" on:click={toggleLoginDialog}>×</button>
	<p>Лише автентифіковані користувачі можуть брати участь у написанні казок!</p>
    <button on:click={toggleAuthDialog}>Увійти</button>
    <button on:click={toggleCreateAccDialog}>Створити аккаунт</button>
</dialog>

<dialog bind:this={auth}>
    <button class="close-button" on:click={toggleAuthDialog}>×</button>
    <form action="">
        <p>
            <label>Пошта/Нікнейм
                <br>
                <input type="text" name="email_or_nick">
            </label>
        </p>
        <p>
            <label>Пароль
                <br>
                <input type="text" name="password">
            </label>
        </p>
    </form>
    <button on:click={toggleAuthDialog}>Увійти</button>
</dialog>

<dialog bind:this={create_acc}>
    <button class="close-button" on:click={toggleCreateAccDialog}>×</button>
    <form action="">
        <p>
            <label>Нікнейм
                <br>
                <input type="text" name="nickname">
            </label>
        </p>
        <p>
            <label>Пошта
                <br>
                <input type="text" name="email">
            </label>
        </p>
        <p>
            <label>Пароль
                <br>
                <input type="text" name="password">
            </label>
        </p>
        <p>
            <label>Підтвердження паролю
                <br>
                <input type="text" name="password-confirm">
            </label>
        </p>
    </form> 
    <button on:click={toggleCreateAccDialog}>Створити аккаунт</button>
</dialog>

<style>
    dialog {
		/* треба адекватно стилізувати діалогове вікно */
		padding: 2em;
		border-radius: 20px;
	}
	dialog::backdrop {
        backdrop-filter: blur(5px);
        background-color: rgba(0, 0, 0, 0.5);
    }

    .close-button {
    position: absolute;
    top: 0.2em;
    right: 0.5em;
    background-color: transparent;
    border: none;
    font-size: 2em;
    cursor: pointer;
	}

	.close-button:hover {
		color: red;
	}
</style>