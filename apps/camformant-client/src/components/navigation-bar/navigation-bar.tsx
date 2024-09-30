"use client"
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  HiClipboardCheck,
  HiDocument,
  HiHome,
  HiUserCircle,
} from "react-icons/hi";

export const NavigationBar: React.FC = () => {
  const pathname = usePathname();
  return (
    <div className="fixed bottom-0 border-t w-full z-30 bg-white ">
      <div className="flex justify-around gap-x-8 p-4 text-secondary">
        <Link href="/" className={`flex flex-col items-center  ${(pathname === '/' || pathname === '/search') ? 'text-primary' : ''}`}>
          <HiHome className="text-xl" />
          <div className="text-xs">Home</div>
        </Link>
        <Link href="resume" className={`flex flex-col items-center ${(pathname === '/resume' ? 'text-primary' : '')}`}>
          <HiDocument className="text-xl" />
          <div className="text-xs">Resume</div>
        </Link>
        <Link href="applied" className={`flex flex-col items-center ${(pathname === '/applied' ? 'text-primary' : '')}`}>
          <HiClipboardCheck className="text-xl" />
          <div className="text-xs">Applied</div>
        </Link>
        <Link href="profile" className={`flex flex-col items-center ${(pathname === '/profile' ? 'text-primary' : '')}`}>
          <HiUserCircle className="text-xl" />
          <div className="text-xs">Profile</div>
        </Link>
      </div>
    </div>
  );
};
