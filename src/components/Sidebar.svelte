<script>
    import { lastRechennia } from '$lib/utils';
	import { onMount } from 'svelte';

    export let data;
    let unique_users = [];
    onMount(() => {
        unique_users = data.users.filter((user, index, self) =>
        index === self.findIndex((u) => (
            u.name === user.name
        ))
    );
    });

    function niceTime(rech) {
        const date = new Date(rech.created_at);

        const year = date.getFullYear();
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const day = date.getDate().toString().padStart(2, '0');
        const hours = date.getHours().toString().padStart(2, '0');
        const minutes = date.getMinutes().toString().padStart(2, '0');

        return `${year}-${month}-${day} ${hours}:${minutes}`;      
    }
</script>

<aside>
    <h4 class="sb-title">Інформація про казку</h4>
    <p>Період створення:<br>
        з {niceTime(data.kazka.rechennia[0])}<br>
        по {niceTime(lastRechennia(data.kazka.rechennia))}</p>
    <p>Всього реченнь: {data.kazka.rechennia.length}</p>
    <p> Унікальних авторів:
        {unique_users.length}
        <!-- {#each data.users as user}
           <span>{user.name}</span>
        {/each} -->
    </p>
    <p>Переглядів: </p>
    <p>Уподобайок: </p>
</aside>

<style>
    aside {
        display: flex;
		align-items: center;
		justify-content: center;
		flex-direction: column;
        padding: 2px 20px;
        border: 2px solid black;
        border-radius: 20px;

        overflow: hidden;
		white-space: nowrap;
		text-overflow: ellipsis;
    }
    
    p {
        text-align: center;
    }
</style>