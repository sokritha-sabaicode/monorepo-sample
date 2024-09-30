/* eslint-disable storybook/story-exports */
import type { Meta, StoryObj } from '@storybook/react';
import { Button } from './button';


const meta: Meta<typeof Button> = {
  title: "Component/Button",
  component: Button,
  tags: ['autodocs'],
  argTypes: {
    // backgroundColor: { control: 'color' },
    text: { control: 'text' },
    link: { control: 'text' },
    icon: { control: 'text' },
  },
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    text: 'Primary Button',
    link: '/',
    icon: null,
  },
};

export const WithIcon: Story = {
  args: {
    text: 'Button with Icon',
    link: '/',
    icon: '🔔', // replace with actual icon component if available
  },
};


