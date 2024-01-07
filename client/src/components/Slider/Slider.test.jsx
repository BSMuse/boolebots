import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Slider from './Slider';

describe('Slider', () => {
	test('renders slider component with label and value', () => {
		const label = 'Slider Label';
		const initialValue = 50;

		render(<Slider label={label} />);

		// Assert the label is rendered
		const labelElement = screen.getByText(label);
		expect(labelElement).toBeInTheDocument();

		// Assert the initial value is set correctly
		const sliderElement = screen.getByRole('slider');
		expect(sliderElement).toHaveAttribute('value', initialValue.toString());

		// Simulate slider value change
		const newValue = 75;
		fireEvent.change(sliderElement, { target: { value: newValue } });

		// Assert the value is updated
		expect(sliderElement).toHaveAttribute('value', newValue.toString());
	});
});
