import { FieldError, UseFormRegister } from "react-hook-form";
import { z, ZodType } from "zod";

// Register props now have only one field for contact (can be email or phone)
export type RegisterProps = {
  sur_name: string;
  last_name: string;
  contact: string;   // Single field for email or phone number
  password: string;
};

// Zod schema with validation that the contact field can be an email or Cambodian phone number
export const UserSchema: ZodType<RegisterProps> = z.object({
  sur_name: z.string().nonempty({ message: "Surname is required" }),
  last_name: z.string().nonempty({ message: "Last name is required" }),
  contact: z
    .string()
    .nonempty({ message: "Contact is required" })
    .refine((val) => {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      const phoneRegex = /^\+855\d{8,9}$/;
      return emailRegex.test(val) || phoneRegex.test(val);
    }, { message: "Must be a valid email or phone number starting with +855" }), // Updated validation
  password: z.string().min(8, { message: "Password must be at least 8 characters" }),
});

// Updated FieldRegisterProps to account for the new contact field
export type FieldRegisterProps = {
  type: string;
  placeholder: string;
  name: ValidFieldNames;
  register: UseFormRegister<RegisterProps>;
  error: FieldError | undefined;
  valueAsNumber?: boolean;
};

export type ValidFieldNames =
  | "sur_name"
  | "last_name"
  | "contact"  // Single field name for contact (email or phone)
  | "password";
