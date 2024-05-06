import { addRechennia } from '$lib/db';

export const POST = async (event) => {
    const { kazka_id, rechennia_content, user_id, finish } = await event.request.json();

    try {
        await addRechennia(kazka_id, rechennia_content, user_id, finish);

        return new Response(JSON.stringify({ message: 'Речення було записано.' }), {
            status: 200,
            headers: { 'Content-Type': 'application/json' }
        });
    } catch (error) {
        console.error('Error adding rechennia:', error);

        return new Response(JSON.stringify({ error: 'Упс. Щось пішло не так: речення не додано.' }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' }
        });
    }
}