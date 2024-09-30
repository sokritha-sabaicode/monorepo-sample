import type { Meta, StoryObj } from "@storybook/react";
import {CardGeneral} from "./card-general"

const meta: Meta<typeof CardGeneral> = {
  title:  "Component/Cardnotification/card-general",
  component: CardGeneral,
  tags: ["autodocs"],
  argTypes: {
    image: { control: "text" }, 
    title: { control: "text" },
    description: { control: "text" },
    time: { control: "text" },
  },
};
export default meta;

type Story = StoryObj<typeof meta>;
export const Primary: Story = {
  args: {
    title: "You have a New post to see in CamHR",
    description:
      "Life presents a variety of situations in which someone will want to interview you.",
    time: "1 hour ago",
    image: "../../../images/G3.png",
  },
};
