import { FieldRegisterProps } from "@/app/api/register";

export const FormFieldRegister: React.FC<FieldRegisterProps> = ({
  type,
  placeholder,
  name,
  register,
  error,
  valueAsNumber,
}) => (
  <>
    <input
      className="p-3 w-full pl-6 outline-none drop-shadow-md rounded-3xl"
      type={type}
      placeholder={placeholder}
      {...register(name, { valueAsNumber })}
    />
    {error && <span className="text-red-500">{error.message}</span>}
  </>
);
