import { Meta, StoryObj } from "@storybook/react";
import ProcessApply from "./process-apply";

const meta: Meta<typeof ProcessApply> = {
  title: "Component/apply-status/process-apply",
  component: ProcessApply,
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
  },
};

export default meta;

type Story = StoryObj<typeof ProcessApply>;

export const Default: Story = {};
