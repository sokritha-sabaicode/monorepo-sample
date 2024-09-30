// src/components/Chatbox.stories.tsx

import React from 'react';
import { Meta, StoryFn } from '@storybook/react';
import Chatbox from './chatbox';

export default {
  title: 'Component/chat/Chatbox',
  component: Chatbox,
} as Meta;

const Template: StoryFn<typeof Chatbox> = (args) => <Chatbox {...args} />;

export const Default = Template.bind({});
Default.args = {
  logo: 'https://via.placeholder.com/40',
  title: 'Chatbox Title',
  subtitle: 'This is a subtitle for the chatbox',
};

export const WithoutLogo = Template.bind({});
WithoutLogo.args = {
  title: 'Chatbox Title',
  subtitle: 'This is a subtitle for the chatbox',
};

export const CustomLogo = Template.bind({});
CustomLogo.args = {
  logo: 'https://via.placeholder.com/40',
  title: 'Custom Chatbox Title',
  subtitle: 'This is a custom subtitle for the chatbox',
};
