<script>
    export let data;
</script>

<aside>
    <p>Інформація про казку</p>
    <p>
        {#each data.users as user}
           <!-- <span>{user.username}</span> -->
        {/each}
    </p>
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

        overflow: visible;
		white-space: nowrap;
		text-overflow: ellipsis;
    }
</style>