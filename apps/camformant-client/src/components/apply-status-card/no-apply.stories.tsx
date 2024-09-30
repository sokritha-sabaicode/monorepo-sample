import { Meta, StoryObj } from '@storybook/react';
import NoApply from './no-apply';

const meta: Meta<typeof NoApply> = {
  title: 'Component/apply-status/no-apply',
  component: NoApply,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
  },
};

export default meta;

type Story = StoryObj<typeof NoApply>;

export const Default: Story = {};
