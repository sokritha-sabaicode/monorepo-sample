// stories/Chat.stories.tsx
import React from 'react';
import { Meta, StoryFn } from '@storybook/react';
import Chat from './chat';
 // Adjust the import path according to your project structure

export default {
  title: 'Component/chat/Chat',
  component: Chat,
  argTypes: {
    className: { control: 'text' },
  },
} as Meta;

const Template: StoryFn<typeof Chat> = (args: any) => <Chat {...args} />;

export const Default = Template.bind({});
Default.args = {
  className: '',
};

export const CustomClass = Template.bind({});
CustomClass.args = {
  className: 'custom-class',
};
