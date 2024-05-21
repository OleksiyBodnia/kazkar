<script>
    export let data;
    import { getKazkyLikesTotal } from '$lib/utils';

    let write_achievements = [
        { name: "Написано 5 казок!", value: 5, path: "/img/K_five.png", pathg: "/img/gK_five.png"},
        { name: "Написано 10 казок!", value: 10, path: "/img/K_ten.png", pathg: "/img/gK_ten.png"},
        { name: "Написано 100 казок!", value:100, path: "/img/K_hundred.png", pathg: "/img/gK_hundred.png"}  
    ]

    let like_achievements = [
        { name: "Зібрано 5 лайків!", value: 5, path: "/img/L_five.png", pathg: "/img/gL_five.png"},
        { name: "Зібрано 10 лайків!", value: 10, path: "/img/L_ten.png", pathg: "/img/gL_ten.png"},
        { name: "Зібрано 100 лайків!", value: 100, path: "/img/L_hundred.png", pathg: "/img/gL_hundred.png"}
    ]

    let likes_total = getKazkyLikesTotal(data.user_kazky);

</script>

<div class="personal-achiev-tab">
    <h3>Розблоковані досягнення</h3>
    <div class="achieves">
        {#each write_achievements as achv}
            <div class="achiev-unit">
                {#if data.user_kazky.length >= achv.value}
                    <img src={achv.path} alt="achievement-img" class="achiev-img" />
                {:else}
                    <img src={achv.pathg} alt="achievement-img" class="achiev-img" />
                {/if}
                <span>{achv.name}</span>
            </div>
        {/each}

        {#each like_achievements as achv}
            <div class="achiev-unit">
                {#if likes_total >= achv.value}
                    <img src={achv.path} alt="achievement-img" class="achiev-img" />
                {:else}
                    <img src={achv.pathg} alt="achievement-img" class="achiev-img" />
                {/if}
                <span>{achv.name}</span>
            </div>
        {/each}
    </div>
</div>

<style>
    .achieves {
        margin-top: 30px;
        display: flex;
        align-items: center;
        justify-content: center;
        row-gap: 40px;
        column-gap: 80px;
        flex-wrap: wrap;
    }

    .achiev-unit {
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;
        width: 180px;
    }

    .achiev-img {
        width: 40%;
        transition-duration: 0.3s;
    }

    .achiev-img:hover {
        width: 45%;
    }
</style>