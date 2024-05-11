import * as db from '$lib/db';

/** @type {import('./$types').PageServerLoad} */
export async function load({ params, locals }) {
	const { id } = params;
	const session = await locals.auth();

	if (session) {
		await db.addView(session?.user.id, id);
	}

	const stats = await db.getKazkaStats(id, session?.user.id);

	const kazka = await db.getKazka(id);
	// баг
	const users = await Promise.all(
		kazka.rechennia.map((rechennia) => db.getUser(rechennia.user_id))
	);
	const offer = await db.getRandomKazka(true, 2);

	return { kazka, users, offer, stats };
}
