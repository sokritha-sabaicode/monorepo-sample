import { Meta, StoryObj } from "@storybook/react";
import { MdCalendarToday } from "react-icons/md";
import { CardApply } from "./card-apply";

// Define mock data for the CardApply component
const mockData = {
  txt: "Software Engineer",
  logo: "",
  location: "New York",
  position: 3,
  date: "Sep 29, 2024",
  styles: "",
};

const meta: Meta<typeof CardApply> = {
  title: "Component/card-detail/CardApply",
  component: CardApply,
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
  },
  // argTypes: {
  //   txt: { control: "text" },
  //   logo: { control: "text" },
  //   location: { control: "text" },
  //   position: { control: "text" },
  //   date: { control: "text" },
  //   styles: { control: "text" },
  // },
};

export default meta;

type Story = StoryObj<typeof CardApply>;

export const Default: Story = {
  args: mockData,
};
