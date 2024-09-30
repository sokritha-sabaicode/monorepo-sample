// CardLocation.stories.tsx

import React from 'react';
import { Meta, StoryFn } from '@storybook/react';
import { CardLocation } from './card-location';

export default {
    title: 'Component/card-detail/CardLocation',
    component: CardLocation,
    tags: ['autodocs'],
} as Meta;

const Template: StoryFn = (args) => <CardLocation {...args} />;

export const Default = Template.bind({});
Default.args = {};
