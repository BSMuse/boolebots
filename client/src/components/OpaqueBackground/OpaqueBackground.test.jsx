import React from 'react';
import { render, screen } from '@testing-library/react';
import OpaqueBackground from './OpaqueBackground';

describe('OpaqueBackground', () => {
	test('renders children within an opaque background', () => {
		const children = <div>Content</div>;
		const style = { backgroundColor: 'red' };

		render(<OpaqueBackground style={style}>{children}</OpaqueBackground>);

		// Assert the wrapper element with the specified style is rendered
		const wrapperElement = screen.getByTestId('opaque-background-wrapper');
		expect(wrapperElement).toHaveStyle('background-color: red');

		// Assert the children content is rendered within the container element
		const containerElement = screen.getByTestId('opaque-background-container');
		expect(containerElement).toContainHTML('<div>Content</div>');
	});
});
