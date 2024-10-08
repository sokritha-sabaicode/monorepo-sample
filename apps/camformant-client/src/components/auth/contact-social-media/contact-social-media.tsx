import Image from "next/image";
import { useAuth } from '../../../context/auth';

export const ContactSocialMedia: React.FC = () => {
  const { siginWithGoogle } = useAuth()

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
          onClick={siginWithGoogle}
          type="button"
        >
          <Image src="/images/search.png" alt="Facebook" width={20} height={20} /> Sign in
          with Google
        </button>
        <button
          className="p-4 flex items-center justify-start gap-x-12 bg-white drop-shadow-md w-full rounded-2xl 
         "
        >
          <Image src="/images/facebook.png" alt="Facebook" width={20} height={20} /> Sign in
          with Facebook
        </button>
      </div>
    </div>
  );
};
