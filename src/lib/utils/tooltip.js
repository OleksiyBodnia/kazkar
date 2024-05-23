import tippy, { followCursor } from 'tippy.js';
import 'tippy.js/dist/tippy.css';
import 'tippy.js/themes/light.css';
import 'tippy.js/themes/light-border.css';
import 'tippy.js/themes/material.css';
import 'tippy.js/themes/translucent.css';

// tooltip.js
export function tooltip(node, params = {}) {
	const custom = params.content;
	const title = node.title;
	const label = node.getAttribute('aria-label');
	const content = custom || title || label;

	if (!label) node.setAttribute('aria-label', content);

	node.title = '';
	params['plugins'] = [followCursor];

	const tip = tippy(node, { content, ...params });

	return {
		// If the props change, let's update the Tippy instance:
		update: (newParams) => tip.setProps({ content, ...newParams }),

		// Clean up the Tippy instance on unmount:
		destroy: () => tip.destroy()
	};
}
