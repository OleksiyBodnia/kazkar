import { getKazky } from '$lib';

/** @type {import('./$types').PageServerLoad} */
export async function load() {
	return { kazky: await getKazky('completed') };
}
