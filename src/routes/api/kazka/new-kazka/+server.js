import { newKazka } from '$lib/db';

export const POST = async (event) => {
	const { title, rechennia_content, user_id } = await event.request.json();

	try {
		await newKazka(title, rechennia_content, user_id);

		return new Response(JSON.stringify({ message: 'Казку було розпочато.' }), {
			status: 200,
			headers: { 'Content-Type': 'application/json' }
		});
	} catch (error) {
		console.error('Error creating kazka:', error);

		return new Response(JSON.stringify({ error: 'Упс. Щось пішло не так: казку не створено.' }), {
			status: 500,
			headers: { 'Content-Type': 'application/json' }
		});
	}
};
