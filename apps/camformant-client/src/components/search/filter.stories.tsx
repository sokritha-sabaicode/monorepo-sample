import { Meta, StoryObj } from "@storybook/react";
import { Filter } from "./filter";
import { useState } from "react";

// Mock data for Select components
const mockWorkSchedule = { id: 1, name: "Full Time" };
const mockEmploymentType = { id: 1, name: "Permanent" };
const mockWorkLocation = { id: 1, name: "Remote" };

const meta: Meta<typeof Filter> = {
  title: "Component/Filter",
  component: Filter,
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
  },
};

export default meta;

type Story = StoryObj<typeof Filter>;

export const Default: Story = {
  render: () => {
    // State management for Storybook
    const [reset, setReset] = useState(2000);
    const [selectedWorkSchedule, setSelectedWorkSchedule] = useState(mockWorkSchedule);
    const [selectedEmploymentType, setSelectedEmploymentType] = useState(mockEmploymentType);
    const [selectedWorkLocation, setSelectedWorkLocation] = useState(mockWorkLocation);
    const [isOpen, setIsOpen] = useState(true);

    return (
      <Filter
        reset={reset}
        setReset={setReset}
        selectedWorkSchedule={selectedWorkSchedule}
        selectedEmploymentType={selectedEmploymentType}
        selectedWorkLocation={selectedWorkLocation}
        setSelectedWorkSchedule={setSelectedWorkSchedule}
        setSelectedEmploymentType={setSelectedEmploymentType}
        setSelectedWorkLocation={setSelectedWorkLocation}
        setIsopen={setIsOpen}
      />
    );
  },
};
