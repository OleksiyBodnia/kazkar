<script>
    import KazkaCard from "./KazkaCard.svelte"

</script>

<div class="">
    <KazkaCard title={"Назва"} content={"Одного разу в країні бітів та байтів жив байтовий маніак на ім'я Біттон. Він був відомий усім своїм неймовірним бажанням економити байти. Його життя оберталося лише навколо цифр і кодування."} />
    <KazkaCard title={"Назва"} content={"Одного разу в країні бітів та байтів жив байтовий маніак на ім'я Біттон. Він був відомий усім своїм неймовірним бажанням економити байти. Його життя оберталося лише навколо цифр і кодування."} />
</div>


<style>
    div {
        display: flex;
        align-items: center;
        justify-content: center;
        /* flex-direction: column; */
        column-gap: 90px;
        flex-wrap: wrap;
        border: 2px solid black;
        border-radius: 10px;
        padding: 20px;
        max-width: 1200px;
    }
</style>