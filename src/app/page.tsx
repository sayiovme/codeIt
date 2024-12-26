'use client'

import React, { useState } from "react";
import Image from "next/image";
import Header from "@/components/header";

import { ToDo, Done } from "@/components/images";
import { ShowList } from "./pages/api/printList";

import AddTodo from "./pages/api/CreateItemDto";
import '@/styles/global.css'; // 글로벌 CSS 파일 경로
import type { AppProps } from 'next/app';







export default function Home() {


  const [todos, setTodos] = useState<any[]>([]); // todos 상태 정의



  return (
    
    <div className="container max-w-[1920px] mx-auto min-h-screen flex flex-col items-center justify-center">
      {/* Header: layout.tsx */}
      <AddTodo setTodos={setTodos} />
 
          <ShowList/>

    </div> /* Container */
  );
}
