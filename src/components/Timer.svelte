<script>
	import { onMount, afterUpdate, onDestroy } from "svelte";
    import { createEventDispatcher } from 'svelte';

	export let countdown = 60;
	let timer = null;

	// $: displayValue = `${Math.trunc(countdown / 60)}:${countdown % 60}`;
    $: displayValue = new Date(countdown* 1000).toISOString().substring(14, 19);

    const dispatch = createEventDispatcher();

	onMount(() => {
	  timer = setInterval(() => {
	    countdown -= 1;
	  }, 1000);
	});

	afterUpdate(() => {
	  if (countdown === 0) {
        dispatch('notime', {text: 'Час вийшов!'});
	    if (timer) {
	      clearInterval(timer);
	      timer = null;
	    }
	  }
	});

	onDestroy(() => {
	  if (timer) {
	    clearInterval(timer);
	  }
	});
</script>

<span>{displayValue}</span>