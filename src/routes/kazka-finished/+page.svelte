<script>
    /** @type {import('./$types').PageData} */
    export let data

    import { page } from '$app/stores';
    const kazka_id = $page.url.searchParams.get("id");

	import Sidebar from '../../components/Sidebar.svelte';
	let SidebarComponent;
</script>

<!-- 
{#if kazka_id}
    <p>success {kazka_id}</p>
{/if}
 -->

<div class="individual-kazka-div">
	<div class="kazka-and-sidebar">
		<article class="kazka-itself">
			<h2>Байтовий маніак на ім'я Біттон</h2>
			<p>Одного разу в країні бітів та байтів жив байтовий маніак на ім'я Біттон. Він був відомий усім своїм неймовірним бажанням економити байти. Його життя оберталося лише навколо цифр і кодування.
	
				Біттон мешкав у маленькій байтовій хатинці на краю великого цифрового лісу. Він виготовляв свої меблі з байтових ресурсів та використовував лише мінімальну кількість байтів для своїх потреб.
				
				Одного дня, коли цифрові стежки привели Біттона до сусіднього села, він почув гучні гомони. Виявилося, що село було в небезпеці від злого вірусу, який споживав багато байтів і руйнував все на своєму шляху.
				
				Біттон, будучи майстром економії байтів, вирішив допомогти селу. Він розробив найефективніший антивірус із найменшою кількістю байтів, щоб знищити зло, яке загрожувало їхньому світу.
				
				Завдяки своїй винахідливості та знанням, Біттон зміг зупинити вірус та зберегти село. Він став героєм усього цифрового світу, а його ім'я ввійшло до легенд.
				
				З того дня село шанувало Біттона за його мудрість та винахідливість. А він продовжував свою місію – зберігати байти та захищати цифровий світ від небезпеки, завжди зберігаючи уважно кожен байт.</p>
		</article>
		
		<div class="sidebar-container">
			<Sidebar bind:this={SidebarComponent} />
		</div>
	</div>
    
	<button class="show-sidebar-btn" on:click={SidebarComponent.toggleSidebar}>sidebar</button>
</div>


<!-- дуже-дуже демо версія, погане вирівнювання, треба правити -->
<style>
    .individual-kazka-div{
        padding: 40px;
		display: flex;
		align-items: center;
		justify-content: center;
		flex-direction: column;
    }

	.kazka-and-sidebar {
		display: flex;
		align-items: center;
		justify-content: center;
	}

	article {
		max-width: 70%;
	}

	.sidebar-container {
		margin-left: 10%;
	}

	.show-sidebar-btn {
		position: absolute;
		top: 90px;
  		right: 20px;
	}

</style>
