import { Meta, StoryObj } from "@storybook/react";
import CardMessage from "./card-message"; // Adjust the import path if necessary
import logo1 from "@/../../public/images/logo.png";

const meta: Meta<typeof CardMessage> = {
  title: "Component/CardMessage",
  component: CardMessage,
  tags: ["autodocs"],
  argTypes: {
    // logo: { control: "text" },
    txt: { control: "text" },
    location: { control: "text" },
  },
};

export default meta;

type Story = StoryObj<typeof CardMessage>;

export const Default: Story = {
  args: {
    // logo: logo1,
    txt: "Sample Text",
    location: "Sample Location",
  },
};
