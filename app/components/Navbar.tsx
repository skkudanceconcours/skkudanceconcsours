"use client";
import useLoginStore from "@/lib/zustand/store";
import { useRouter } from "next/navigation";
import { usePathname } from "next/navigation";
import { ReactNode } from "react";

const Navbar = ({ className }: { className?: string }): ReactNode => {
  const router = useRouter();
  const path: string = usePathname();
  const { loginState } = useLoginStore();
  const loggedIn = loginState === 'admin';
  const home: boolean = path === "/";
  const notification: boolean = path === "/notification?page-1";
  const receptionAdmin: boolean = path === "/receptionadmin";

  const className_li =
    'relative flex-1 h-24 p-3 flex justify-center items-end text-center text-xl cursor-pointer transition-colors duration-[400ms] after:content-[""] after:absolute after:left-0 after:bottom-0 after:h-[3px] after:bg-black after:w-full after:opacity-0 hover:after:opacity-100 after:origin-left after:duration-150 after:ease-in';
  const className_route_li =
    'relative flex-1 w-max h-24 p-3 flex justify-center items-end text-center text-xl cursor-pointer transition-colors duration-[400ms] after:content-[""] after:absolute after:left-0 after:bottom-0 after:h-[3px] after:bg-black after:w-full after:opacity-100';
    //#20CE88
  return (
    <div className={`${className} relative z-10`}>
      <ul className="flex w-1/3 max-w-lg gap-2">
        <li
          className={`${home ? className_route_li : className_li} `}
          onClick={() => router.push("/")}
        >
          홈
        </li>
        <li
          className={`${notification ? className_route_li : className_li}`}
          onClick={() => router.push("/notification?page=1")}
        >
          공지사항
        </li>
        {loggedIn && <li className={`${receptionAdmin ? className_route_li : className_li}`}
                onClick={()=>router.push('/receptionadmin')}>접수 관리</li> }
      </ul>
    </div>
  );
};

export default Navbar;
