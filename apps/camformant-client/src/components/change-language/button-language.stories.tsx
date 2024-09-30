import { Meta, StoryObj } from "@storybook/react";
import ButtonLanguage from "./button-language";

const meta: Meta<typeof ButtonLanguage> = {
  title: "Component/button-language",
  component: ButtonLanguage,
  tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof ButtonLanguage>;

export const Primary: Story = {
  render: (args) => <ButtonLanguage {...args} />,
  args: { },
};
