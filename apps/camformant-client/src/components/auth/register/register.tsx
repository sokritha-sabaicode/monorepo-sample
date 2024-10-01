"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { IoArrowBack } from "react-icons/io5";
import { useAuth } from "@/context/auth";
import { useNotification } from "@/hooks/user-notification";
import { isAPIErrorResponse } from "@/utils/types/common";
import { ContactSocialMedia } from "@/components/auth/contact-social-media/contact-social-media";
import { FormFieldRegister } from "@/components/auth/form/form-field-register";
import { RegisterProps, UserSchema } from "@/schema/register";

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const Register: React.FC = () => {
  const { signup, loading } = useAuth();
  const { addNotification, NotificationDisplay } = useNotification();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterProps>({
    resolver: zodResolver(UserSchema), // Apply the zodResolver
  });

  const onSubmit = async (data: RegisterProps) => {
    let contactMethod = "";
    if (emailRegex.test(data.contact)) {
      contactMethod = "email"
    } else {
      contactMethod = "phone_number"
    }

    try {
      await signup({ ...data, [contactMethod]: data.contact })
    } catch (error) {
      if (isAPIErrorResponse(error)) {
        // @ts-ignore
        addNotification(error.response.data.message, 'error');
      } else {
        addNotification(error as string, 'error');
      }
    }
  };

  return (
    <>
      <NotificationDisplay />
      <form className="container" onSubmit={handleSubmit(onSubmit)}>
        <div className="pt-4">
          <button onClick={() => history.back()}>
            <span className="text-2xl">
              <IoArrowBack />
            </span>
          </button>
        </div>
        <h1 className="flex w-full justify-center items-center text-xl font-bold my-5">
          Register Account
        </h1>
        <div className="flex flex-col gap-5">
          <FormFieldRegister
            type="text"
            placeholder="Sur Name"
            name="sur_name"
            register={register}
            error={errors.sur_name}
          />
          <FormFieldRegister
            type="text"
            placeholder="Last Name"
            name="last_name"
            register={register}
            error={errors.last_name}
          />
          <FormFieldRegister
            type="text"
            placeholder="Email or Phone Number"
            name="contact"
            register={register}
            error={errors.contact}
          />
          <FormFieldRegister
            type="password"
            placeholder="Password"
            name="password"
            register={register}
            error={errors.password}
          />

          <div className="flex gap-x-2 pl-6 font-semibold">
            <span>have an account already? </span>
            <Link href={"/login"} className=" text-orange-500 ">
              Sign in
            </Link>
          </div>
          <button
            type="submit"
            className="mt-2 px-10 py-4 bg-primary text-white rounded-3xl"
          >
            {loading ? "Loading..." : "Register"}
          </button>
        </div>
        <div className="mt-5 mb-24">
          <ContactSocialMedia />
        </div>
      </form>
    </>

  );
};
