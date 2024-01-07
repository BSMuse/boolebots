import React from 'react';
import { render, screen, act } from '@testing-library/react';
import LeaderBoard from './LeaderBoard';

describe('LeaderBoard', () => {
  // Mock the GameContext
jest.mock('../../../context/GameContext/GameContext', () => ({
  GameContext: {
    bots: [
      { name: 'Bot1', wins: 1, losses: 0 },
      { name: 'Bot2', wins: 0, losses: 1 },
    ],
  },
}));


  test('renders the LeaderBoard component with correct headings', () => {
    render(<LeaderBoard />);

    // Assert that the "Leaders" heading is rendered
    const leadersHeading = screen.getByRole('heading', { level: 2, name: /leaders/i });
    expect(leadersHeading).toBeInTheDocument();

    // Assert that the column headings are rendered
    const userHeading = screen.getByRole('heading', { level: 3, name: /user/i });
    const winsHeading = screen.getByRole('heading', { level: 3, name: /wins/i });
    const lossesHeading = screen.getByRole('heading', { level: 3, name: /losses/i });

    expect(userHeading).toBeInTheDocument();
    expect(winsHeading).toBeInTheDocument();
    expect(lossesHeading).toBeInTheDocument();
  });

  test('renders the BotStatistics component with the correct number of bots', () => {
    render(<LeaderBoard />);

    // Assert that the BotStatistics component is rendered
    const botStatisticsComponent = screen.getByTestId('bot-statistics');
    expect(botStatisticsComponent).toBeInTheDocument();

    // Assert that the correct number of bots are rendered within the BotStatistics component
    const botItems = screen.getAllByTestId('bot-item');
    expect(botItems.length).toBe(bots.length);
  });

  test('adds bots to uniqueBots array and updates bot\'s wins/losses', () => {
    render(<LeaderBoard />);
  
    // Mock the useState hook for bots and setBots
    const setBots = jest.fn();
    jest.mock('react', () => ({
      ...jest.requireActual('react'),
      useState: initialBots => [initialBots, setBots],
    }));
  
    // Set the initial state for bots
    act(() => {
      setBots([
        { name: 'Bot1', wins: 1, losses: 0 },
        { name: 'Bot2', wins: 0, losses: 1 },
      ]);
    });
  
    expect(bots).toEqual([
      { name: 'Bot1', wins: 1, losses: 0 },
      { name: 'Bot2', wins: 0, losses: 1 },
    ]);
  
    // Add another bot and check the updated state of bots
    act(() => {
      setBots(prevBots => [
        ...prevBots,
        { name: 'Bot2', wins: 2, losses: 1 },
      ]);
    });
  
    expect(bots).toEqual([
      { name: 'Bot1', wins: 1, losses: 0 },
      { name: 'Bot2', wins: 2, losses: 2 },
    ]);
  });
});
