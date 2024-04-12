"use client";
import React, { ReactNode } from "react";
import DOMPurify from "isomorphic-dompurify";
import "react-quill/dist/quill.core.css";
import { useRouter } from "next/navigation";

// Types
import { NoticeViewType } from "@/template/notice";
import { Path } from "@/template/paths";

// Icons
import FilePreview from "./FilePreview";
// context
import useLoginStore from "@/lib/zustand/loginStore";

const NoticeView = ({
  contents,
  timeStamp,
  title,
  viewCount,
  files,
  id,
}: NoticeViewType): ReactNode => {
  timeStamp = new Date(timeStamp);
  const formattedDate: string = timeStamp
    ? `${timeStamp.getFullYear().toString().slice(-2)}-${(timeStamp.getMonth() + 1).toString().padStart(2, "0")}-${timeStamp.getDate().toString().padStart(2, "0")} ${timeStamp.getHours().toString().padStart(2, "0")}:${timeStamp.getMinutes().toString().padStart(2, "0")}`
    : "";
  // Context
  const { loginState } = useLoginStore();

  // useRouter
  const router = useRouter();
  // Functions
  const modifyHandler = () => {
    router.push(`/notification/addNotice` as Path);
  };
  return (
    <div className="relative flex w-4/5 flex-col justify-start">
      <section className="flex h-[8vh] w-full items-center justify-start text-3xl font-semibold hover:cursor-pointer">
        {title}
      </section>

      <section className="flex h-[4vh] w-full items-center border-b-2 border-solid border-[#d8d8d8]">
        무용학과 | 조회수 {viewCount} | {formattedDate}
        {loginState === "admin" ? (
          <p
            onClick={modifyHandler}
            className="absolute right-0 hover:cursor-pointer hover:text-red-300"
          >
            수정하기
          </p>
        ) : null}
      </section>
      <section className="flex w-full items-start justify-start border-b-2 border-solid border-[#d8d8d8]">
        {files ? <FilePreview files={files} /> : null}
      </section>
      <div
        className="view ql-editor h-[10vh] w-full p-0 scrollbar-hide" // react-quill css
        dangerouslySetInnerHTML={{
          __html: DOMPurify.sanitize(contents),
        }}
      />
      {/* <section className="w-full py-5">{contents}</section> */}
    </div>
  );
};

export default NoticeView;
