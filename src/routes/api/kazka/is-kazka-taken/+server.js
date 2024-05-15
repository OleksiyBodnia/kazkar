import { supabase_public } from '$lib/db';

export async function POST(event) {
	const { kazka_id } = await event.request.json();

	const { data, error } = await supabase_public
		.from('kazky')
		.select('*')
		.eq('id', kazka_id);

	if (error) {
		return new Response(JSON.stringify({ error }), {
			status: 500,
			headers: { 'Content-Type': 'application/json' }
		});
	}

	return new Response(JSON.stringify({ kazka: data[0] }), {
		status: 200,
		headers: { 'Content-Type': 'application/json' }
	});
}
