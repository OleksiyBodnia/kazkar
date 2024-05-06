import * as db from '$lib/db';

/** @type {import('./$types').PageServerLoad} */
export async function load() {
	let kazky = await db.getKazky('completed', 4);
	return { kazky };
}
