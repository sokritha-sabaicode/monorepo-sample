import { Meta, StoryObj } from "@storybook/react";
import React, { useState } from "react";
import InputComponent from "./input-component"; // Adjust the import path if necessary

const meta: Meta<typeof InputComponent> = {
  title: "Component/Input-Component",
  component: InputComponent,
  tags: ["autodocs"],
  argTypes: {
    values: { control: "text" },
    setValues: { action: "setValues" },
    setFocused: { action: "setFocused" },
    focused: { control: "text" },
    txt: { control: "text" },
    valuesFouce: { control: "text" },
  },
};

export default meta;

type Story = StoryObj<typeof InputComponent>;

export const Default: Story = {
  render: (args) => {
    const [values, setValues] = useState("");
    const [focused, setFocused] = useState<string | null>(null);

    return (
      <InputComponent
        {...args}
        values={values}
        setValues={setValues}
        focused={focused}
        setFocused={setFocused}
      />
    );
  },
  args: {
    txt: "Label Text",
    valuesFouce: "Focus Value",
  },
};

export const WithInitialValue: Story = {
  render: (args) => {
    const [values, setValues] = useState("Initial Value");
    const [focused, setFocused] = useState<string | null>(null);

    return (
      <InputComponent
        {...args}
        values={values}
        setValues={setValues}
        focused={focused}
        setFocused={setFocused}
      />
    );
  },
  args: {
    txt: "Label Text",
    valuesFouce: "Focus Value",
  },
};
