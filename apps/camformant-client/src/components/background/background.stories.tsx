import type { Meta, StoryObj } from "@storybook/react";
import Background from "./background";

const meta: Meta<typeof Background> = {
  title: "<Component/Background",
  component: Background,
  tags: ["autodocs"],
  argTypes: {
    children: { control: "text" },
    style: { control: "text" },
    bgColor: { control: "text" },
    bgImage: { control: "text" },
    childStyle: { control: "text" },
  },
};
export default meta;

type Story = StoryObj<typeof meta>;
export const Primary: Story = {
  args: {
    children: "This is some content inside the Background component.",
    style: "bg-red-500",
    bgColor: "bg-blue-500",
    bgImage: "../../../images/G1.png",
    childStyle: "h-full bg-yellow-200 rounded",
  },
};
