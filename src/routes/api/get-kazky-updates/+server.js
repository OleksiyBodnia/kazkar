import { getKazkyUpdates } from '$lib/db';

/** @type {import('./$types').RequestHandler} */
export async function GET({ url }) {
	const state = url.searchParams.get('state');

	const kazky = await getKazkyUpdates(state);

	if (!kazky) {
		return new Response({
			status: 500,
			headers: { 'Content-Type': 'application/json' }
		});
	}

	return new Response(JSON.stringify({ kazky }), {
		status: 200,
		headers: { 'Content-Type': 'application/json' }
	});
}
