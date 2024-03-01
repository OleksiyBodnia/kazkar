<script>
    import Kazka from '../components/Kazka.svelte';
</script>

<div class="main-page-div">
    <div class="write-encourage">
        <button>Написати казку</button>
        <p>Створюй нову неймовірну казку разом із Казкарем!</p>
    </div>
    
    <div class="read-finished">
        <h1>Читай завершені казки</h1>
            <div class="finished-samples">
                <p>За дев’ятьма селами і дев’ятьма лісами є одне особливе поле. 
                    Там ростуть красиві, жовті квіти, які можуть повертатися за сонцем. 
                    Це поле соняшників ....</p>
                <p>За дев’ятьма селами і дев’ятьма лісами є одне особливе поле. 
                    Там ростуть красиві, жовті квіти, які можуть повертатися за сонцем. 
                    Це поле соняшників ....</p>
                <p>За дев’ятьма селами і дев’ятьма лісами є одне особливе поле. 
                    Там ростуть красиві, жовті квіти, які можуть повертатися за сонцем. 
                    Це поле соняшників ....</p>
                <p>За дев’ятьма селами і дев’ятьма лісами є одне особливе поле. 
                    Там ростуть красиві, жовті квіти, які можуть повертатися за сонцем. 
                    Це поле соняшників ....</p>
            </div>
        <button>Більше</button>
    </div>
</div>


<style>

    .main-page-div{
        padding: 40px 0;
    }

    .write-encourage{
        margin: 0 0 20px 0;
    }

    .write-encourage,.read-finished {
        text-align: center;
    }

    .write-encourage button {
        font-size: 1.5em;
    }

    .read-finished {
        margin-top: 40px;
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;
    }

    .finished-samples {
        width: 80%;
        /* display: grid;
        grid-template-columns: auto auto;
        /* grid-gap: 20px; */

        display: flex;
        align-items: center;
        justify-content: center;
        row-gap: 40px;
        column-gap: 90px;
        flex-wrap: wrap;
        margin-bottom: 40px;

    }
    .finished-samples p{
        width: 500px;
    }


    .finished-samples :hover {
        border-radius: 20px;
        box-shadow: 0 5px 20px rgba(0, 0, 0, 0.2);
        transition: all 0.5s ease;
    }
</style>