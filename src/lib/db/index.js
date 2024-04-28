// place files you want to import through the `$lib` alias in this folder. ("$lib/db" for this file)

import { createClient } from '@supabase/supabase-js';
import { SUPABASE_URL, SUPABASE_ANON_KEY } from '$env/static/private';

const supabase_public = createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
	db: { schema: 'public' }
});

const supabase_next_auth = createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
	db: { schema: 'next_auth' }
});

export async function getKazky(state = 'all', limit = 10, sort = 'asc', offset = 0) {
	let query = supabase_public.from('kazky').select('*');

	if (state === 'completed') {
		query = query.filter('is_completed', 'eq', true);
	}

	if (state === 'incompleted') {
		query = query.filter('is_completed', 'eq', false);
	}

	const rangeStart = offset;
	const rangeEnd = offset + limit - 1;
	query = query.range(rangeStart, rangeEnd);

	if (sort === 'asc') {
		query = query.order('created_at', { ascending: true });
	} else if (sort === 'desc') {
		query = query.order('created_at', { ascending: false });
	}

	const { data: kazky, error } = await query;

	if (error) {
		throw error;
	}

	for (let kazka of kazky) {
		const { data: rechennia, error: errorRechennia } = await supabase_public
			.from('rechennia')
			.select('*')
			.eq('kazka_id', kazka.id);
		if (errorRechennia) {
			throw errorRechennia;
		}
		kazka.rechennia = rechennia;
	}

	return kazky;
}

export async function getKazka(id) {
	const { data: kazka, error } = await supabase_public
		.from('kazky')
		.select('*')
		.eq('id', id)
		.single();
	if (error) {
		throw error;
	}
	const { data: rechennia, error: errorRechennia } = await supabase_public
		.from('rechennia')
		.select('*')
		.eq('kazka_id', id);
	if (errorRechennia) {
		throw errorRechennia;
	}
	kazka.rechennia = rechennia;
	return kazka;
}

export async function getRandomKazka(completed = false) {
	const { data: kazky, error } = await supabase_public
		.from('kazky')
		.select('*')
		.filter('is_completed', 'eq', completed)
		.order('random()')
		.limit(1);
	if (error) {
		throw error;
	}
	const kazka = kazky[0];
	const { data: rechennia, error: errorRechennia } = await supabase_public
		.from('rechennia')
		.select('*')
		.eq('kazka_id', kazka.id);
	if (errorRechennia) {
		throw errorRechennia;
	}
	kazka.rechennia = rechennia;
	return kazka;
}

export async function getUser(id) {
	const { data: user, error } = await supabase_next_auth
		.from('users')
		.select('*')
		.eq('id', id)
		.single();
	if (error) {
		throw error;
	}
	return user;
}

// get a number of completed or incompleted kazky
export async function getKazkyCount(state = 'all') {
	let query = supabase_public.from('kazky').select('id');

	if (state === 'completed') {
		query = query.filter('is_completed', 'eq', true);
	}

	if (state === 'incompleted') {
		query = query.filter('is_completed', 'eq', false);
	}

	const { data: kazky, error } = await query;

	if (error) {
		throw error;
	}

	return kazky.length;
}
