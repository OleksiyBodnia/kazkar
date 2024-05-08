import { getKazky } from '$lib/db';
const kazky_per_page = 4;

/** @type {import('./$types').PageServerLoad} */
export async function load() {
	const kazky = await getKazky({
		state: 'completed',
		limit: kazky_per_page
	});

	return {
		kazky,
		kazky_per_page
	};
}
