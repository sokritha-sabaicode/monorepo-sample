import { Meta, StoryObj } from "@storybook/react";
import { NavigationBar } from "./navigation-bar"; // Adjust the import path if necessary
import { Color } from "aws-cdk-lib/aws-cloudwatch";

const meta: Meta<typeof NavigationBar> = {
  title: "Component/NavigationBar",
  component: NavigationBar,
  tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof NavigationBar>;

export const Default: Story = {
  render: (args) => (
    <div className="flex justify-center items-center h-screen">
      <NavigationBar {...args} />
    </div>
  ),
};
