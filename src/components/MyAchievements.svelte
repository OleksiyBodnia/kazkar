<script>
    let achievements = ["Написано 1 казку!", "Написано 10 казок!", "Написано 100 казок!"]

    export let kazky;
</script>

<div class="personal-achiev-tab">
    <h3>Розблоковані досягнення</h3>
    <div class="achieves">
        <!-- {#each achievements as achiev}
            <div class="achiev-unit">
                <div class="achiev-icon"></div>
                <p>{achiev}</p>
            </div>
        {/each}  -->
        {#if kazky.length > 0}
            <div class="achiev-unit">
                <div class="achiev-icon"></div>
                <p>{achievements[0]}</p>
            </div>
        {/if}
        {#if kazky.length > 9}
            <div class="achiev-unit">
                <div class="achiev-icon"></div>
                <p>{achievements[1]}</p>
            </div>
        {/if}
        {#if kazky.length > 99}
            <div class="achiev-unit">
                <div class="achiev-icon"></div>
                <p>{achievements[2]}</p>
            </div>
        {/if}
    </div>
    
</div>

<style>
    .personal-achiev-tab {
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;
        column-gap: 90px;
        flex-wrap: wrap;
        border: 2px solid black;
        border-radius: 10px;
        padding: 20px;
        width: 800px;
    }

    .achieves {
        margin-top: 20px;
        display: flex;
        align-items: center;
        justify-content: center;
        row-gap: 20px;
        column-gap: 90px;
        flex-wrap: wrap;
    }

    .achiev-unit {
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;
    }

    .achiev-icon {
        width: 50px;
        height: 50px;
        border-radius: 50%;
        background-color: brown;
    }
</style>