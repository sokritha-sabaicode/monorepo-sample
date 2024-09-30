import { Meta, StoryObj } from "@storybook/react";
import { Heading } from "./heading"; // Adjust the import path if necessary

const meta: Meta<typeof Heading> = {
  title: "Component/heading",
  component: Heading,
  tags: ["autodocs"],
  argTypes: {
    title: { control: "text" },
    subTitle: { control: "text" },
    link: { control: "text" },
  },
};

export default meta;

type Story = StoryObj<typeof Heading>;

export const Default: Story = {
  args: {
    title: "Recommend Company",
    subTitle: "find",
    link: "/more-info",
  },
};

export const WithoutSubTitle: Story = {
  args: {
    title: "Main Title",
    link: "/more-info",
  },
};

export const NoProps: Story = {
  args: {},
};
