<script>
    import Kazka from '../components/Kazka.svelte';
</script>

<!-- <h1>Ласкаво просимо до Казкаря</h1> -->

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

<style>
    .write-encourage,.read-finished {
        text-align: center;
    }

    .write-encourage button {
        font-size: 1.5em;
    }

    .read-finished {
    }

    .finished-samples {
        width: 80%;
        display: grid;
        grid-template-columns: auto auto; /* Two columns */
        grid-gap: 20px; /* Gap between grid items */
    }

    .finished-samples :hover {
        border-radius: 20px;
        box-shadow: 0 15px 30px rgba(0, 0, 0, 0.3);
        transition: all 0.5s ease;
    }
</style>