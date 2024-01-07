import React from 'react';
import { render, screen } from '@testing-library/react';
import UserConfigBox from './UserConfigBox';

describe('UserConfigBox', () => {
	test('renders UserConfigBox component with buttons and UserSelection', () => {
		render(<UserConfigBox />);

		// Assert the "Add Player +" button is rendered
		const addButton = screen.getByText(/add player \+/i);
		expect(addButton).toBeInTheDocument();

		// Assert the "Battle!" div is rendered
		const battleDiv = screen.getByText(/battle!/i);
		expect(battleDiv).toBeInTheDocument();
	});
});
