import React from 'react';
import { render, screen } from '@testing-library/react';
import Input from './Input';

describe('Input', () => {
	test('renders input component with label', () => {
		const label = 'Name';
		const className = { color: 'red' };

		render(<Input label={label} className={className} />);

		// Assert that the label and input elements are rendered
		const labelElement = screen.getByLabelText(label);
		const inputElement = screen.getByRole('textbox', { name: label });

		// Assert the elements are present
		expect(labelElement).toBeInTheDocument();
		expect(inputElement).toBeInTheDocument();
	});
});
