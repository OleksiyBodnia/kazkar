import { getKazky } from '$lib/db';

/** @type {import('./$types').PageServerLoad} */
export async function load() {
	const kazky = await getKazky({ state: 'completed', limit: 4 });
	return { kazky };
}
