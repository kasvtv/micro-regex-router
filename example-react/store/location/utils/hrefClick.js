import { history } from '..';

export default function hrefClick(url) {
	return function(e) {

		if (
			(e.button && e.button !== 0)
			|| e.metaKey
			|| e.altKey
			|| e.ctrlKey
			|| e.shiftKey
			|| e.defaultPreed === true
		) return;

		e.preventDefault();
		history.push(url);
	};
}