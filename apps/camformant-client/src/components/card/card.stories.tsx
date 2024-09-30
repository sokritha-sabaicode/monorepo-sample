/* eslint-disable storybook/story-exports */
import type { Meta, StoryObj } from '@storybook/react';
import { Card } from './card';

const meta: Meta<typeof Card> = {
  title: "Component/Card",
  component: Card,
  tags: ['autodocs'],
  // argTypes: {
  //   id: { control: 'number' },
  //   date: { control: 'date' },
  //   title: { control: 'text' },
  //   salary: { control: 'text' },
  //   jobActive: { control: 'text' },
  //   description: { control: 'text' },
  // },
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Original: Story = {
  // args: {
  //   id: 1,
  //   date: new Date(),
  //   title: 'Job Title',
  //   salary: '$300-$500',
  //   jobActive: '5 jobOpening',
  //   description: 'This is a job description.',
  // },
};
