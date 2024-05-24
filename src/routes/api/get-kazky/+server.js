import { getKazky } from '$lib/db';

/** @type {import('./$types').RequestHandler} */
export async function GET({ url }) {
	const state = url.searchParams.get('state') || 'all';
	const page = parseInt(url.searchParams.get('page')) || 1;
	const kazky_per_page = parseInt(url.searchParams.get('kazky_per_page')) || 4;
	const sorting = url.searchParams.get('sorting') || 'asc';

	// log all query params as variables
	// console.log({ state, page, kazky_per_page });

	const kazky = await getKazky({
		state: state,
		sort: sorting,
		limit: kazky_per_page,
		offset: (page - 1) * kazky_per_page
	});

	// console.log(kazky);

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
