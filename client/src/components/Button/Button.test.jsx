import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Button from './Button';

describe('Button', () => {
	test('renders button component with initial text', () => {
		const initialText = 'Initial Text';

		render(<Button text={initialText} />);

		const buttonElement = screen.getByText(initialText);

		expect(buttonElement).toBeInTheDocument();
	});

	test('changes text on button click', () => {
		const initialText = 'Initial Text';
		const changedText = 'Changed Text';

		render(<Button text={initialText} changedText={changedText} />);

		const buttonElement = screen.getByText(initialText);

		fireEvent.click(buttonElement);

		const updatedButtonElement = screen.getByText(changedText);

		expect(updatedButtonElement).toBeInTheDocument();
	});

	test('executes onClick function on button click', () => {
		const initialText = 'Initial Text';
		const onClickMock = jest.fn();

		render(<Button text={initialText} onClick={onClickMock} />);

		const buttonElement = screen.getByText(initialText);

		fireEvent.click(buttonElement);

		expect(onClickMock).toHaveBeenCalled();
	});
});
