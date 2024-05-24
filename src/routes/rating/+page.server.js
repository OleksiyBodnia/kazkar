import { getKazkyCount, getTopUsers, getKazkyDistribution} from '$lib/db';

/** @type {import('./$types').PageServerLoad} */
export async function load() {
    const finished = getKazkyCount('completed');
    const unfinished = getKazkyCount('incompleted');
    const best_users = getTopUsers(5);
    const worst_users = getTopUsers(5, false);
    const distribution = getKazkyDistribution();

    return { finished, unfinished, distribution, best_users, worst_users };
};