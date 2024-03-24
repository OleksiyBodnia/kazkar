<script>
	/** @type {import('./$types').PageData} */
	export let data;
	import Sidebar from '../../../components/Sidebar.svelte';
	let SidebarComponent;

	// let kazka_content = '';
	// data.kazka.rechennia?.forEach((rechennia) => {
	// 	kazka_content += rechennia.content + ' ';
	// 	console.log(rechennia.content);
	// });
</script>

<!-- 
{#if kazka_id}
    <p>success {kazka_id}</p>
{/if}
 -->

<div class="individual-kazka-div">
	<div class="kazka-and-sidebar">
		<article class="kazka-itself">
			<h2>{data.kazka.title}</h2>
			<p>
				{data.kazka.content}
			</p>
		</article>

		<div class="sidebar-container">
			<Sidebar bind:this={SidebarComponent} />
		</div>
	</div>

	<button class="show-sidebar-btn" on:click={SidebarComponent.toggleSidebar}>sidebar</button>
</div>

<!-- дуже-дуже демо версія, погане вирівнювання, треба правити -->
<style>
	.individual-kazka-div {
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
