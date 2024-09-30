import { Meta, StoryObj } from "@storybook/react";
import React from "react";
import ButtonSigOut from "./sign-out"; // Adjust the import path if necessary
import { action } from "@storybook/addon-actions";

const meta: Meta<typeof ButtonSigOut> = {
  title: "Component/ButtonSigOut",
  component: ButtonSigOut,
  tags: ["autodocs"],
  argTypes: {
    logout: { control: "text" },
    Logout: { action: "Logout" },
  },
};

export default meta;

type Story = StoryObj<typeof ButtonSigOut>;

export const Default: Story = {
  args: {
    logout: "Sign Out",
    Logout: action("Logout clicked"),
  },
};

export const RegisterAccount: Story = {
  args: {
    logout: null,
    Logout: action("Logout clicked"),
  },
};
