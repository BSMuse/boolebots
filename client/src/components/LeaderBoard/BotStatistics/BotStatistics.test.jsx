import React from 'react';
import { render, screen } from '@testing-library/react';
import BotStatistics from './BotStatistics';

describe('BotStatistics', () => {
  const mockBots = [
    {
      name: 'Bot1',
      wins: 11,
      losses: 0,
    },
    {
      name: 'Bot2',
      wins: 17,
      losses: 5,
    },
    {
      name: 'Bot3',
      wins: 1,
      losses: 10,
    },
  ];

  test('renders the BotStatistics component with the correct number of bots', () => {
    render(<BotStatistics bots={mockBots} />);

    // Assert that the BotStatistics component is rendered
    const botStatisticsComponent = screen.getByTestId('bot-statistics');
    expect(botStatisticsComponent).toBeInTheDocument();
  });

  test('renders the bot details correctly within the BotStatistics component', () => {
    render(<BotStatistics bots={mockBots} />);

    // Assert that the bot names, wins, and losses are rendered correctly
    mockBots.forEach((bot, index) => {
      const botNameElement = screen.getByText(bot.name);
      const botWinsElement = screen.getByText(bot.wins.toString());
      const botLossesElement = screen.getByText(bot.losses.toString());

      expect(botNameElement).toBeInTheDocument();
      expect(botWinsElement).toBeInTheDocument();
      expect(botLossesElement).toBeInTheDocument();
    });
  });
});
