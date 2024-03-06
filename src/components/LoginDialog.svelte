<script>
    import Modal from "./Modal.svelte";

    let LoginModal, AuthModal, CreateAccModal;

    export function toggleLoginDialog() {
        LoginModal.toggleModal();
    }
</script>

<Modal bind:this={LoginModal}>
	<p>Лише автентифіковані користувачі можуть брати участь у написанні казок!</p>
    <div class="action-btn-div">
        <button class="action-btn" on:click={() => {AuthModal.toggleModal(); LoginModal.toggleModal()}}>Увійти</button>
        <button class="action-btn" on:click={() => {CreateAccModal.toggleModal(); LoginModal.toggleModal()}}>Створити аккаунт</button>
    </div>
</Modal>

<Modal outer_close={false} bind:this={AuthModal}>
    <form action="" class="auth-form">
        <label>Пошта/Нікнейм
            <br>
            <input type="text" name="email_or_nick">
        </label>
    
        <label>Пароль
            <br>
            <input type="text" name="password" >
        </label>
        <button class="auth-btn" on:click={AuthModal.toggleModal}>Увійти</button>
    </form>
</Modal>

<Modal outer_close={false} bind:this={CreateAccModal}>
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
        <button on:click={CreateAccModal.toggleModal}>Створити аккаунт</button>
    </form> 
</Modal>

<style>
    .action-btn-div{
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 70px;
    }

    .auth-form{
        margin-top: 10px;
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;
    }
    
    .create-acc-form{
        margin-top: 10px;
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
</style>