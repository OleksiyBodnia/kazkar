import { getKazky } from '$lib/db';

/** @type {import('./$types').PageServerLoad} */
export async function load() {
	return { kazky: await getKazky('incompleted') };
}
