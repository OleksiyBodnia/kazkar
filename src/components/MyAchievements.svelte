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
        {#if kazky.length >= 5}
            <div class="achiev-unit">
                <div class="achiev-icon"></div>
                      <img src="/img/K_five.png"  class="achiev-img" />
                <p>{achievements[0]}</p>
            </div>
        {/if}
        {#if kazky.length > 9}
            <div class="achiev-unit">
                <div class="achiev-icon"></div>
                     <img src="/img/K_ten.png"  class="achiev-img"/>
                <p>{achievements[1]}</p>
            </div>
        {/if}
        {#if kazky.length > 99}
            <div class="achiev-unit">
                <div class="achiev-icon"  ></div>
                     <img src="/img/K_hundred.png" class="achiev-img"/>
                <p>{achievements[2]}</p>
            </div>
        {/if}

        <img class="achiev-img" src="/img/gK_five.png" title="Створіть 5 казок."/>
        <img class="achiev-img" src="/img/gK_ten.png"  title="Створіть 10 казок."/>
        <img class="achiev-img" src="/img/gK_hundred.png"  title="Створіть 100 казок."/>
        <img class="achiev-img" src="/img/gL_five.png" title="Зберіть 5 лайкiв."/>
        <img class="achiev-img" src="/img/gL_ten.png" title="Зберіть 10 лайкiв"/>
        <img class="achiev-img" src="/img/gL_hundred.png" title="Зберіть 100 лайкiв"/>
    </div>
    
</div>

<style>
    /* .personal-achiev-tab {
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
    } */

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

    .achiev-img {
        width: 20%;
        transition-duration: 0.3s;
    }
    .achiev-img:hover {
        width: 22%;
    }
</style>