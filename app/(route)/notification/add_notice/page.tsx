import React from "react";
// editor
import { QuillEditor } from "@/app/components/QuillEditor";
import NoticeHeader from "@/app/components/notification/NoticeHeader";
// components

const page = () => {
  return (
    <main className="relative flex h-screen min-h-screen w-full flex-col items-center justify-start">
      <QuillEditor />
    </main>
  );
};

export default page;
