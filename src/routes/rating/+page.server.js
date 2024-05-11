import { getKazkyCount, getTopUsers, getKazkyDistribution} from '$lib/db';

/** @type {import('./$types').PageServerLoad} */
export async function load() {
    const finished = await getKazkyCount('completed');
    const unfinished = await getKazkyCount('incompleted');
    const best_users = await getTopUsers(5);
    const worst_users = await getTopUsers(5, false);
    const distribution = await getKazkyDistribution();

    return { finished, unfinished, distribution, best_users, worst_users };
};