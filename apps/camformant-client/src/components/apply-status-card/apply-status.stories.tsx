import { Meta, StoryObj } from "@storybook/react";
import ApplyStatus from "./apply-status";
import { useEffect } from "react";

const meta: Meta<typeof ApplyStatus> = {
  title: "Component/apply-status/applyStatus",
  component: ApplyStatus,
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
  },
};

export default meta;

type Story = StoryObj<typeof ApplyStatus>;

export const Default: Story = {
  decorators: [
    (Story) => {
      // Mock local storage data
      useEffect(() => {
        localStorage.setItem('amount', '0');
      }, []);
      
      return <Story />;
    },
  ],
};
