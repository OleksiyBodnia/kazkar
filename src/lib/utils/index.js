export function combineRechennia(arr) {
	return arr.map((obj) => obj.content).join(' ');
}

export function lastRechennia(arr) {
	return arr[arr.length - 1];
}

export function truncateText(text, maxLength) {
	let truncated = text.substring(0, maxLength);
	let last_dot = truncated.lastIndexOf('.');
	let last_space = truncated.lastIndexOf(' ');

	if (last_dot > last_space) {
		truncated = truncated.substring(0, last_dot + 1);
	} else {
		truncated = truncated.substring(0, last_space + 1);
	}

	if (truncated.length != text.length) {
		truncated += ' . . .';
	}

	return truncated;
}

export function tooltip(node, params) {
	node.classList.add('tooltip');
	node.setAttribute('tabindex', 0);

	function handleFocus() {
		const child = document.createElement('span');
		child.textContent = params;
		child.setAttribute('id', 'tooltip');
		node.appendChild(child);

		node.addEventListener('mouseleave', handleBlur);
		node.addEventListener('blur', handleBlur);
		node.removeEventListener('mouseenter', handleFocus);
		node.removeEventListener('focus', handleFocus);
	}

	function handleBlur() {
		node.removeChild(node.querySelector('#tooltip'));

		node.removeEventListener('mouseleave', handleBlur);
		node.removeEventListener('blur', handleBlur);
		node.addEventListener('mouseenter', handleFocus);
		node.addEventListener('focus', handleFocus);
	}

	node.addEventListener('mouseenter', handleFocus);
	node.addEventListener('focus', handleFocus);

	return {
		onDestroy() {
			node.classList.remove('tooltip');
			node.removeEventListener('mouseenter', handleFocus);
			node.removeEventListener('focus', handleFocus);
		}
	};
}

export async function releaseKazka(kazka) {
	if (!kazka) {
		return;
	}
	await fetch('/api/kazka/release-kazka', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({
			kazka_id: kazka.id
		})
	});
}

export async function takeKazka(kazka) {
	await fetch('/api/kazka/take-kazka', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({
			kazka_id: kazka.id
		})
	});
}

export async function isKazkaTaken(kazka_id, taking_window = 180) {
	const responce = await fetch('/api/kazka/is-kazka-taken', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({
			kazka_id: kazka_id
		})
	});

	const { kazka } = await responce.json();

	// if kazka.taken_at is null, it is considered not taken
	if (kazka.taken_at === null) {
		return false;
	}

	// if kazka.taken_at is less than 'taking_window' seconds ago, it is considered taken
	const now = new Date();
	const taken_at = new Date(kazka.taken_at);
	const diff = now - taken_at;
	const diff_seconds = diff / 1000;
	return diff_seconds < taking_window;
}

export function transformDistribution(distribution) {
	const numRanges = 8;

	// Sort the distribution keys in ascending order
	const sortedKeys = Object.keys(distribution).sort((a, b) => a - b);

	// Calculate the range width based on the number of keys and desired number of ranges
	const rangeWidth = Math.ceil(sortedKeys.length / numRanges);

	const transformedDistribution = {};

	let lowerBoundIndex = 0;
	let upperBoundIndex = 0;

	for (let i = 0; i < numRanges; i++) {
		// Calculate the upper bound index for the current range
		upperBoundIndex = Math.min(lowerBoundIndex + rangeWidth - 1, sortedKeys.length - 1);

		// Determine the lower and upper bounds for the current range
		let lowerBound = parseInt(sortedKeys[lowerBoundIndex]);
		let upperBound = parseInt(sortedKeys[upperBoundIndex]);

		// If lower bound is NaN or upper bound is NaN, skip this range
		if (isNaN(lowerBound) || isNaN(upperBound)) {
			break;
		}

		// Rename the range if lower and upper bounds are equal
		const rangeKey = lowerBound === upperBound ? `${lowerBound}` : `${lowerBound}-${upperBound}`;

		let sum = 0;

		// Sum up the values in the current range
		for (let j = lowerBound; j <= upperBound; j++) {
			if (distribution[j]) {
				sum += distribution[j];
			}
		}

		// Assign the sum to the range key
		transformedDistribution[rangeKey] = sum;

		// Update the lower bound index for the next range
		lowerBoundIndex = upperBoundIndex + 1;
	}

	return transformedDistribution;
}

export function findLargestAttribute(obj) {
	const largestKey = Object.keys(obj).reduce((a, b) => (obj[a] > obj[b] ? a : b));
	return obj[largestKey];
}

export function getKazkyLikesTotal(kazky) {
	return kazky.reduce((acc, kazka) => acc + kazka.stats.likes, 0);
}

export function correctSentence(sentence) {
	// Upper Case for 1st letter
	if (sentence.charAt(0) !== sentence.charAt(0).toUpperCase()) {
		sentence = sentence.charAt(0).toUpperCase() + sentence.slice(1);
	}

	//check last symbol
	const lastChar = sentence.charAt(sentence.length - 1);
	if (!'.!?'.includes(lastChar)) {
		sentence += '.';
	}

	return sentence;
}

export function validateSentence(sentence) {
	//empty string
	if (!sentence.trim()) {
		return false;
	}

	// check somethink like "_?!!₽?(")"
	const regexNoTextNoNumbers = /^[^\p{L}\p{N}]+$/u;
	if (regexNoTextNoNumbers.test(sentence)) {
		return false;
	}

	// split sentence by ., !, ?
	const list = ['.', '?', '!'];
	const splitPattern = new RegExp(`[${list.join('')}]`, 'g');
	const parts = sentence.split(splitPattern).filter((part) => part.trim() !== '');
	if (parts.length > 1) {
		return false;
	}

	const ukrainianVowelRegex = 'аеєиіїоуюя';
	const ukrainianConsonantRegex = "бвгґджзклмнпйрстьфхцчш`'";
	const allowedSigns = '-!?.,';

	function checkWord(line) {
		line = line.toLowerCase();
		//check is it number
		const regex = /^\d+$/;
		if (regex.test(line)) return true;

		for (let i = 0; i < line.length; i++) {
			//no other symbols
			if (
				!ukrainianVowelRegex.includes(line[i]) &&
				!ukrainianConsonantRegex.includes(line[i]) &&
				!allowedSigns.includes(line[i])
			)
				return false;

			//1) not >3 vowel in line
			if (ukrainianVowelRegex.includes(line[i]))
				if (line.length - (i + 1) > 0 && ukrainianVowelRegex.includes(line[i + 1]))
					if (line.length - (i + 2) > 0 && ukrainianVowelRegex.includes(line[i + 2]))
						if (line.length - (i + 3) > 0 && ukrainianVowelRegex.includes(line[i + 3]))
							//limit
							return false;
			//2) not >3 consonant in line
			if (ukrainianConsonantRegex.includes(line[i]))
				if (line.length - (i + 1) > 0 && ukrainianConsonantRegex.includes(line[i + 1]))
					if (line.length - (i + 2) > 0 && ukrainianConsonantRegex.includes(line[i + 2]))
						if (line.length - (i + 3) > 0 && ukrainianConsonantRegex.includes(line[i + 3]))
							//limit
							return false;
			//3) not >3 sign in line
			if (allowedSigns.includes(line[i]))
				if (line.length - (i + 1) > 0 && allowedSigns.includes(line[i + 1]))
					if (line.length - (i + 2) > 0 && allowedSigns.includes(line[i + 2]))
						if (line.length - (i + 3) > 0 && allowedSigns.includes(line[i + 3]))
							//limit
							return false;
		}
		return true;
	}

	const words = sentence.split(' ');
	for (let word of words) {
		if (word.trim() != '')
			if (!checkWord(word)) {
				return false;
			}
	}

	return true;
}
