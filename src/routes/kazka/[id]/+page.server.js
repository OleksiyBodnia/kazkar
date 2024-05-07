import * as db from '$lib/db';

/** @type {import('./$types').PageServerLoad} */
export async function load({ params }) {
	const { id } = params;
	const kazka = await db.getKazka(id);
	const users = await Promise.all(
		kazka.rechennia.map((rechennia) => db.getUser(rechennia.user_id))
	);
	const offer = await db.getRandomKazka(true, 2);
	return { kazka, users, offer };
}
