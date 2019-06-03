import React from 'react';

export default function Page({ params }) {
	return (
		<main>
			<h1>This is a page</h1>
			<p>Its ID is:</p>
			<pre>{params && JSON.stringify(params.param)}</pre>
		</main>
	);

}