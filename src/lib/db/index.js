// place files you want to import through the `$lib` alias in this folder. ("$lib/db" for this file)

import { createClient } from '@supabase/supabase-js';
import { SUPABASE_URL, SUPABASE_ANON_KEY } from '$env/static/private';

export const supabase_public = createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
	db: { schema: 'public' }
});

export const supabase_next_auth = createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
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
	let kazky_query = supabase_public.from('kazky').select('*');

	if (state === 'completed') {
		kazky_query = kazky_query.filter('is_completed', 'eq', true);
	}

	if (state === 'incompleted') {
		kazky_query = kazky_query.filter('is_completed', 'eq', false);
	}

	if (user_id) {
		const { data: rechennia, error: errorRechennia } = await supabase_public
			.from('rechennia')
			.select('kazka_id')
			.eq('user_id', user_id);
		if (errorRechennia) {
			throw errorRechennia;
		}
		const kazka_ids = rechennia.map((rec) => rec.kazka_id);
		kazky_query = kazky_query.in('id', kazka_ids);
	}

	const rangeStart = offset;
	const rangeEnd = offset + limit - 1;
	kazky_query = kazky_query.range(rangeStart, rangeEnd);

	if (sort === 'asc') {
		kazky_query = kazky_query.order('created_at', { ascending: true });
	} else if (sort === 'desc') {
		kazky_query = kazky_query.order('created_at', { ascending: false });
	}

	const { data: kazky, error } = await kazky_query;

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

		kazka.stats = await getKazkaStats(kazka.id);
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

export async function getRandomKazka(completed = false, count = 1) {
	const { data: kazky, error } = await supabase_public
		.from('random_kazky')
		.select('*')
		.filter('is_completed', 'eq', completed)
		.limit(count);
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

		kazka.stats = await getKazkaStats(kazka.id);
	}
	return kazky;
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
export async function newKazka(title, rechennia_content, user_id) {
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

// отримати 10 найактивніших користувачів із кількістю завершених казок, у яких вони брали участь
export async function getTopUsers(amount = 10, top = true) {
	const { data: users, error } = await supabase_next_auth.from('users').select('*');
	if (error) {
		throw error;
	}

	// для кожного користувача порахувати кількість речень, які він додав
	for (let user of users) {
		const { data: rechennia, error: errorRechennia } = await supabase_public
			.from('rechennia')
			.select('*')
			.eq('user_id', user.id);
		if (errorRechennia) {
			throw errorRechennia;
		}
		user.rech_count = rechennia.length;
	}

	users.sort((a, b) => b.rech_count - a.rech_count);

	if (top) {
		return users.slice(0, amount);
	} else {
		return users.slice(-amount).reverse();
	}
}

// ця функція повертає розподіл казок за кількістю речень
// приклад об'єкта, що повертається:
// { 1: 10, 2: 20, 3: 30, 4: 40, 5: 50 }
// де ключ - кількість речень, значення - кількість казок з такою кількістю речень
export async function getKazkyDistribution() {
	const { data: kazky, error } = await supabase_public.from('kazky').select('*');
	if (error) {
		throw error;
	}

	const distribution = {};
	for (let kazka of kazky) {
		const { data: rechennia, error: errorRechennia } = await supabase_public
			.from('rechennia')
			.select('*')
			.eq('kazka_id', kazka.id);
		if (errorRechennia) {
			throw errorRechennia;
		}
		const rechennia_count = rechennia.length;
		if (distribution[rechennia_count]) {
			distribution[rechennia_count]++;
		} else {
			distribution[rechennia_count] = 1;
		}
	}

	return distribution;
}

// should be called getKazkaUserStats?
export async function getKazkaStats(kazka_id, user_id = null) {
	let stats = {};

	const { count: views, views_error } = await supabase_public
		.from('views_likes')
		.select('*', { count: 'exact', head: true })
		.eq('kazka_id', kazka_id)
		.eq('view', true);
	if (views_error) {
		throw views_error;
	}
	stats.views = views;

	const { count: likes, error: likes_error } = await supabase_public
		.from('views_likes')
		.select('*', { count: 'exact', head: true })
		.eq('kazka_id', kazka_id)
		.eq('like', true);
	if (likes_error) {
		throw likes_error;
	}
	stats.likes = likes;

	if (user_id) {
		const { data: entry, error: entry_error } = await supabase_public
			.from('views_likes')
			.select('*')
			.eq('kazka_id', kazka_id)
			.eq('user_id', user_id);
		if (entry_error) {
			throw entry_error;
		}
		stats.entry = entry[0];
	}
	
	return stats;
}

export async function addView(user_id, kazka_id) {
	const { data: view, error } = await supabase_public
		.from('views_likes')
		.upsert({ user_id: user_id, kazka_id: kazka_id, view: true }, { onConflict: 'user_id, kazka_id' })
		.select();
	if (error) {
		throw error;
	}
}

export async function Like(user_id, kazka_id, like) {

	const { error } = await supabase_public
		.from('views_likes')
		.update({ like: like })
		.eq('user_id', user_id)
		.eq('kazka_id', kazka_id);
	if (error) {
		throw error;
	}
}

export async function getUserStats(user_id) {
	let stats = {};

	const { count: views, views_error } = await supabase_public
		.from('views_likes')
		.select('*', { count: 'exact', head: true })
		.eq('user_id', user_id)
		.eq('view', true);
	if (views_error) {
		throw views_error;
	}
	stats.views = views;

	const { count: likes, error: likes_error } = await supabase_public
		.from('views_likes')
		.select('*', { count: 'exact', head: true })
		.eq('user_id', user_id)
		.eq('like', true);
	if (likes_error) {
		throw likes_error;
	}
	stats.likes = likes;

	return stats;
}