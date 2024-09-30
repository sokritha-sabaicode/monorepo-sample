import { Meta, StoryObj } from "@storybook/react";
import { Header } from "./header"; // Update the path if needed

const meta: Meta<typeof Header> = {
  title: "Component/header",
  component: Header,
  tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof Header>;

export const Default: Story = {
  render: (args) => <Header {...args} />,
  args: {},
};
