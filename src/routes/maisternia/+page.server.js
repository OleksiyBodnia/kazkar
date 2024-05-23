import { getKazky, getRandomKazka } from '$lib/db';
const kazky_per_page = 4;

/** @type {import('./$types').PageServerLoad} */
export async function load() {
	return {
		kazky: getKazky({ state: 'incompleted', limit: kazky_per_page }),
		kazky_per_page
	};
}
