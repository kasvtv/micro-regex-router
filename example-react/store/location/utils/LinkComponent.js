import React from 'react';
import hrefClick from './hrefClick';

export default function LinkComponent({ href, children, ...otherProps }) {
	return (
		<a
			href={href ? href : '#'}
			onClick={href ? hrefClick(href) : undefined}
			{...otherProps}
		>
			{children}
		</a>
	);
}