import type { Meta, StoryObj } from "@storybook/react";
import {CardTips} from "./card-tips"

const meta: Meta<typeof CardTips> = {
  title:  "Component/Cardnotification/Card-tips",
  component: CardTips,
  tags: ["autodocs"],
  argTypes: {
    image: { control: "text" }, 
    title: { control: "text" },
    description: { control: "text" },
    
  },
};
export default meta;

type Story = StoryObj<typeof meta>;
export const Primary: Story = {
  args: {
    title: "How to prepare for an Interview?",
    description:
      "Life presents a variety of situations in which someone will want to interview you.",
    image: "../../../images/tips1.png",
  },
};
