import { FieldLoginProps } from "@/app/api/login";

export const FormFieldLogin: React.FC<FieldLoginProps> = ({
  type,
  placeholder,
  name,
  register,
  error,
  valueAsNumber,
}) => (
  <>
    <input
      className="p-3 pl-6 outline-none drop-shadow-md rounded-3xl"
      type={type}
      placeholder={placeholder}
      {...register(name, { valueAsNumber })}
    />
    {error && <span className="text-red-500">{error.message}</span>}
  </>
);
