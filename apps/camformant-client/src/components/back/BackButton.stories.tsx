import {Meta, StoryObj } from "@storybook/react";
import {BackButton_md} from "./BackButton"

const meta: Meta<typeof BackButton_md> = {
    title:  "Component/back",
    component: BackButton_md,
    tags: ["autodocs"],
    argTypes: {
      styles: { control: "text" },
      
    },
  };
  export default meta;
  
  type Story = StoryObj<typeof meta>;
  export const Primary: Story = {
    render: (args) => (
        <div className="flex justify-center items-center h-3">
          <BackButton_md {...args} />
        </div>
      ),
    args: {
      styles:'bg-orange-500 text-white p-2 rounded ',
    },
  };
  
  