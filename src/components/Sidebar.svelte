<script>
    import { lastRechennia } from '$lib/utils';
    export let data;

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
    <p>Інформація про казку</p>
    <p>Час написання<br>
        від {niceTime(data.kazka.rechennia[0])}<br>
        до {niceTime(lastRechennia(data.kazka.rechennia))}</p>
    <p> Автори
        {#each data.users as user}
           <!-- <span>{user.username}</span> -->
        {/each}
    </p>
    <p>Перегляди</p>
    <p>Уподобайки</p>
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
</style>