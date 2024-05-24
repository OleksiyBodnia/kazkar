import { getRandomKazka } from '$lib/db';

/** @type {import('./$types').RequestHandler} */
export async function GET() {
	const kazka = await getRandomKazka();

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
