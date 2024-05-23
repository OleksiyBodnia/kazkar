import { getKazky, getRandomKazka } from '$lib/db';
const kazky_per_page = 4;

/** @type {import('./$types').PageServerLoad} */
export async function load() {
	const kazky = getKazky({
		state: 'completed',
		limit: kazky_per_page
	});

	const random_kazka = getRandomKazka(true).then((res) => res[0]);

	return {
		kazky,
		kazky_per_page,
		random_kazka
	};
}
