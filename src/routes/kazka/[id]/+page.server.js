import * as db from '$lib/db';

/** @type {import('./$types').PageServerLoad} */
export async function load({ params, locals }) {
	const { id } = params;
	const session = await locals.auth();

	if (session) {
		await db.addView(session?.user.id, id);
	}

	const kazka = await db.getKazka(id);

	const stats = db.getKazkaStats(id, session?.user.id);

	const users = Promise.all(kazka.rechennia.map((rechennia) => db.getUser(rechennia.user_id)));

	const offer = db.getRandomKazka(true, 2);

	return { kazka, users, offer, stats };
}
