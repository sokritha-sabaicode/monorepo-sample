import { Meta, StoryObj } from "@storybook/react";
import ButtonApply from "./button-apply";

const meta: Meta<typeof ButtonApply> = {
  title: "Component/card-detail/ButtonApply",
  component: ButtonApply,
 
  parameters: {
    layout: "fullscreen",
  },
  argTypes: {
    handleClick: { action: "clicked" },
  },
};

export default meta;

type Story = StoryObj<typeof ButtonApply>;

export const Default: Story = {
  args: {
    handleClick: () => console.log("Apply Now clicked"),
  },
};
