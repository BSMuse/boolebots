import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Dropdown from './Dropdown';

describe('Dropdown', () => {
	test('renders dropdown component with label and options', () => {
		const label = 'Dropdown Label';
		const options = ['Option 1', 'Option 2', 'Option 3'];

		render(<Dropdown label={label} options={options} />);

		// Assert the dropdown label is rendered
		const dropdownLabel = screen.getByText(label);
		expect(dropdownLabel).toBeInTheDocument();

		// Assert the dropdown options are rendered
		options.forEach((option) => {
			const dropdownOption = screen.getByText(option);
			expect(dropdownOption).toBeInTheDocument();
		});
	});
});
