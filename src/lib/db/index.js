// place files you want to import through the `$lib` alias in this folder. ("$lib/db" for this file)

import { createClient } from '@supabase/supabase-js';
import { SUPABASE_URL, SUPABASE_ANON_KEY } from '$env/static/private';

const supabase_public = createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
	db: { schema: 'public' }
});

const supabase_next_auth = createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
	db: { schema: 'next_auth' }
});

// отримати казки з можливістю фільтрації за станом (виконані, невиконані, всі), за певним користувачем, сортуванням, зміщенням (для пакетного завантаження)
export async function getKazky(
	state = 'all',
	limit = 100,
	sort = 'asc',
	offset = 0,
	user_id = null
) {
	let query = supabase_public.from('kazky').select('*');

	if (user_id) {
		query = query.filter('user_id', 'eq', user_id);
	}

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
			.eq('kazka_id', kazka.id)
			.order('id');
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
		.eq('kazka_id', id)
		.order('id');
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

// add a new rechennia to a kazka
export async function addRechennia(kazka_id, rechennia_content, user_id, finish = false) {
	const { data: newRechennia, error: errorNewRechennia } = await supabase_public
		.from('rechennia')
		.insert([{ kazka_id, content: rechennia_content, user_id }]);
	if (errorNewRechennia) {
		throw errorNewRechennia;
	}

	if (finish) {
		const { data: updatedKazka, error: errorUpdatedKazka } = await supabase_public
			.from('kazky')
			.update({ is_completed: true })
			.eq('id', kazka_id);
		if (errorUpdatedKazka) {
			throw errorUpdatedKazka;
		}
	}
}

// create new kazka
export async function newKazka( title, rechennia_content, user_id ) {
	const { data: newKazka, error: errorNewKazka } = await supabase_public
		.from('kazky')
		.upsert([{ title, is_completed: false }])
		.select();
	if (errorNewKazka) {
		throw errorNewKazka;
	}

	const { data: newRechennia, error: errorNewRechennia } = await supabase_public
		.from('rechennia')
		.upsert([{ kazka_id: newKazka[0].id, content: rechennia_content, user_id }])
		.select();
	if (errorNewRechennia) {
		throw errorNewRechennia;
	}
}

// change user name
export async function changeUserName(user_id, new_name) {
	const { data: user, error } = await supabase_next_auth
		.from('users')
		.update({ name: new_name })
		.eq('id', user_id);
	if (error) {
		throw error;
	}
	return user;
}

// отримати 10 найактивніших користувачів із кількістю завершених казок, у яких вони брали участь
export async function getTopUsers() {
	// для кожного користувача порахувати кількість речень, які він додав
	const { data: users, error } = await supabase_next_auth.from('users').select('*');
	if (error) {
		throw error;
	}

	for (let user of users) {
		const { data: rechennia, error: errorRechennia } = await supabase_public
			.from('rechennia')
			.select('*')
			.eq('user_id', user.id);
		if (errorRechennia) {
			throw errorRechennia;
		}
		user.rechennia_count = rechennia.length;
	}

	users.sort((a, b) => b.rechennia_count - a.rechennia_count);

	// порахувати кількість завершених казок для кожного користувача
	for (let user of users) {
		const { data: kazky, error: errorKazky } = await supabase_public
			.from('kazky')
			.select('*')
			.eq('user_id', user.id);
		if (errorKazky) {
			throw errorKazky;
		}
		user.kazky_count = kazky.length;
	}

	return users.slice(0, 10);
}
