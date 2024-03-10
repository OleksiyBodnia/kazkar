<script>
    import { slide, fly } from 'svelte/transition';

	let show_sidebar = true;

    export function toggleSidebar() {
        show_sidebar = !show_sidebar;
    }
    
</script>

{#if show_sidebar}
    <aside transition:slide={{duration: 900, axis: 'x'}}>
        <p>some text just to check sidebar</p>
    </aside>
{/if}

<style>
    aside {
        display: flex;
		align-items: center;
		justify-content: center;
		flex-direction: column;
        padding: 2px 20px;
        border: 2px solid black;
        border-radius: 20px;

        overflow: hidden;
		white-space: nowrap;
		text-overflow: ellipsis;
    }
</style>