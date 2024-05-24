import { getKazka } from '$lib/db';

/** @type {import('./$types').RequestHandler} */
export async function GET({ url }) {
	const id = url.searchParams.get('id');

	const kazka = await getKazka(id);

	if (!kazka) {
		return new Response({
			status: 500,
			headers: { 'Content-Type': 'application/json' }
		});
	}

	return new Response(JSON.stringify({ kazka }), {
		status: 200,
		headers: { 'Content-Type': 'application/json' }
	});
}
