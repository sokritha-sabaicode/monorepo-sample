import Image from "next/image";
import apple from "../../../../public/images/apple-logo.png";
import google from "../../../../public/images/search.png";
import facebook from "../../../../public/images/facebook.png";

export const ContactSocialMedia: React.FC = () => {
  return (
    <div className="flex flex-col gap-5">
      <div className="flex justify-center gap-x-2 items-center ">
        <hr className="h-1 w-[40%] " />
        <h3>or</h3>
        <hr className="h-1 w-[40%] " />
      </div>
      <div className="flex flex-col gap-5 justify-center items-center ">
        <button
          className="p-4 flex items-center justify-start gap-x-12 bg-white drop-shadow-md w-full rounded-2xl 
         "
        >
          <Image src={facebook} alt="Facebook" width={20} height={20} /> Sign in
          with Facebook
        </button>
        <button
          className="p-4 flex items-center justify-start gap-x-12 bg-white drop-shadow-md w-full rounded-2xl 
         "
        >
          <Image src={google} alt="Facebook" width={20} height={20} /> Sign in
          with Google
        </button>
        <button
          className="p-4 flex items-center justify-start gap-x-12 bg-white drop-shadow-md w-full rounded-2xl 
         "
        >
          <Image src={apple} alt="Facebook" width={20} height={20} /> Sign in
          with Apple ID
        </button>
      </div>
    </div>
  );
};
