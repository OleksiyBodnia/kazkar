import { getKazka } from '$lib';

/** @type {import('./$types').PageServerLoad} */
export async function load({ params }) {
	const { id } = params;
	return { kazka: await getKazka(id) };
}
