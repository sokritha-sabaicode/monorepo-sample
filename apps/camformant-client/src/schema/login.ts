import { FieldError, UseFormRegister } from "react-hook-form";
import { z, ZodType } from "zod";

export type LoginProps = {
  email: string;
  password: string;
};

export const UserSchemaLogin: ZodType<LoginProps> = z.object({
  email: z.string().email(),
  password: z
    .string()
    .min(8, { message: "Invalid Password" })
});

export type FieldLoginProps = {
  type: string;
  placeholder: string;
  name: ValidFieldNames;
  register: UseFormRegister<LoginProps>;
  error: FieldError | undefined;
  valueAsNumber?: boolean;
};

export type ValidFieldNames = "email" | "password";
