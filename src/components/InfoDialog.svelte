<script>
	import Modal from './Modal.svelte';

	let ModalComponent;
	export function toggleInfoDialog() {
		ModalComponent.toggle();
	}
</script>

<Modal bind:this={ModalComponent}>
	<p>
		Казкар — це проєкт створення казок на кшталт гри “Нісенітниця” на аркуші паперу, де кожна фраза
		загортається і він передається далі.
	</p>
</Modal>

<style>
	p {
		width: 600px;
		text-align: start;
	}
</style>
