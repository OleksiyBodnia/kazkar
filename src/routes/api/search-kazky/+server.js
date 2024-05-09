import { searchKazky } from '$lib/db';

export const POST = async (event) => {
    const { is_completed, query } = await event.request.json();

    try {
        const kazky = await searchKazky(is_completed, query);

        return new Response(JSON.stringify({ message: 'Знайдено!', kazky: kazky }), {
            status: 200,
            headers: { 'Content-Type': 'application/json' },
        });
    } catch (error) {
        console.error('Error adding like:', error);

        return new Response(JSON.stringify({ error: 'Упс. Щось пішло не так: лайк не змінено.' }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' }
        });
    }
}