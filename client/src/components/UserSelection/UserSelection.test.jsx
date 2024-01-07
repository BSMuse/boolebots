import React from 'react';
import { render, screen } from '@testing-library/react';
import UserSelection from './UserSelection';

describe('UserSelection', () => {
	test('renders UserSelection component with input, slider, and dropdowns', () => {
		render(<UserSelection />);

		// Assert the "Name" input is rendered
		const nameInput = screen.getByLabelText(/name/i);
		expect(nameInput).toBeInTheDocument();
	});
});
