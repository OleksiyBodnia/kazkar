import { Like } from '$lib/db';

export const POST = async (event) => {
    const {  user_id, kazka_id, like } = await event.request.json();

    try {
        await Like(user_id, kazka_id, like);

        return new Response(JSON.stringify({ message: 'Лайк було змінено' }), {
            status: 200,
            headers: { 'Content-Type': 'application/json' }
        });
    } catch (error) {
        console.error('Error adding like:', error);

        return new Response(JSON.stringify({ error: 'Упс. Щось пішло не так: лайк не змінено.' }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' }
        });
    }
}