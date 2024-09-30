import { Meta, StoryObj } from "@storybook/react";
import { Search } from "./search";
import { useState } from "react";

// Mock data
const defaultPerson = { id: 0, name: "default" };

const meta: Meta<typeof Search> = {
  title: "Component/Search",
  component: Search,
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
  },
  // argTypes: {
  //   reset: { control: "number", defaultValue: 0 },
  //   selectedWorkSchedule: {
  //     control: "object",
  //     defaultValue: defaultPerson,
  //   },
  //   selectedEmploymentType: {
  //     control: "object",
  //     defaultValue: defaultPerson,
  //   },
  //   selectedWorkLocation: {
  //     control: "object",
  //     defaultValue: defaultPerson,
  //   },
  //   setSelectedWorkSchedule: { action: "setSelectedWorkSchedule" },
  //   setSelectedEmploymentType: { action: "setSelectedEmploymentType" },
  //   setSelectedWorkLocation: { action: "setSelectedWorkLocation" },
  //   setIsopen: { action: "setIsopen" },
  // },
};

export default meta;

type Story = StoryObj<typeof Search>;

export const Default: Story = {
  render: (args) => {
    const [reset, setReset] = useState(20);
    const [isOpen, setOpen] = useState(false);

    const [selectedWorkSchedule, setSelectedWorkSchedule] =
      useState(defaultPerson);
    const [selectedEmploymentType, setSelectedEmploymentType] =
      useState(defaultPerson);
    const [selectedWorkLocation, setSelectedWorkLocation] =
      useState(defaultPerson);

    const handleReset = () => {
      setReset(0);
      setSelectedWorkSchedule(defaultPerson);
      setSelectedEmploymentType(defaultPerson);
      setSelectedWorkLocation(defaultPerson);
    };

    return (
      <Search
        {...args}
        // reset={reset}
        // setReset={setReset}
        // selectedWorkSchedule={selectedWorkSchedule}
        // selectedEmploymentType={selectedEmploymentType}
        // selectedWorkLocation={selectedWorkLocation}
        // setSelectedWorkSchedule={setSelectedWorkSchedule}
        // setSelectedEmploymentType={setSelectedEmploymentType}
        // setSelectedWorkLocation={setSelectedWorkLocation}
        // setIsopen={setOpen}
      />
    );
  },
};
