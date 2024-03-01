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

<dialog class="login" bind:this={login}>
    <button class="close-button" on:click={toggleLoginDialog}>×</button>
	<p>Лише автентифіковані користувачі можуть брати участь у написанні казок!</p>
    
    <div class="action-btn-div">
        <button class="action-btn" on:click={toggleAuthDialog}>Увійти</button>
        <button class="action-btn" on:click={toggleCreateAccDialog}>Створити аккаунт</button>
    </div>
    
</dialog>

<dialog bind:this={auth}>
    <button class="close-button" on:click={toggleAuthDialog}>×</button>
    <form action="" class="auth-form">
            <label>Пошта/Нікнейм
                <br>
                <input type="text" name="email_or_nick">
            </label>
        
            <label>Пароль
                <br>
                <input type="text" name="password" >
            </label>
        <button class="auth-btn" on:click={toggleAuthDialog}>Увійти</button>
    </form>
    
</dialog>

<dialog bind:this={create_acc}>
    <button class="close-button" on:click={toggleCreateAccDialog}>×</button>
    <form action="" class="create-acc-form">
        <label>Нікнейм
            <br>
            <input type="text" name="nickname">
        </label>
        <label>Пошта
            <br>
            <input type="text" name="email">
        </label>
        <label>Пароль
            <br>
            <input type="text" name="password">
        </label>
        <label>Підтвердження паролю
            <br>
            <input type="text" name="password-confirm">
        </label>
        <button on:click={toggleCreateAccDialog}>Створити аккаунт</button>
    </form> 
    
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

    .action-btn-div{
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 70px;
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

    .auth-form{
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;
    }
    input{
        height: 35px;
        border-radius: 6px;
        padding: 5px 10px;
    }
    label{
        margin-bottom: 30px;
    }
    .create-acc-form{
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;
    }
</style>