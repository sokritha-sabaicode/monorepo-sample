import { Meta, StoryObj } from "@storybook/react";
import { CategoryPosition } from "./category-position";

const meta: Meta<typeof CategoryPosition> = {
  title: "Component/category-position",
  component: CategoryPosition,
  tags: ["autodocs"],
  argTypes: {
    text: { control: "text" },
    className: { control: "text" },
    onClick: { action: "clicked" },
  },
};

export default meta;

type Story = StoryObj<typeof CategoryPosition>;

export const Primary: Story = {
  render: (args) => (
    <div className="flex justify-center items-center h-3">
      <CategoryPosition {...args} />
    </div>
  ),
  args: {
    text: "Click Me",
    className: "bg-blue-500 text-white",
    onClick: () => console.log("Button clicked!"),
  },
};

export const Secondary: Story = {
  args: {
    text: "Secondary",
    className: "bg-green-500 text-white",
    onClick: () => console.log("Secondary button clicked!"),
  },
};

export const Tertiary: Story = {
  args: {
    text: "Tertiary",
    className: "bg-red-500 text-white",
    onClick: () => console.log("Tertiary button clicked!"),
  },
};
