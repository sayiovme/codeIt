"use client";

import React, { useState, useEffect } from "react";
import { CreateItemDto, Item } from "./types";
import { ActiveAddButton } from "@/components/buttons";
import InputImg from "@/components/input";
const API_URL = "https://assignment-todolist-api.vercel.app/api/hwang/items";


const AddTodo: React.FC<{ setTodos: React.Dispatch<React.SetStateAction<Item[]>> }> = ({ setTodos }) => {
  const [newTodo, setNewTodo] = useState<string>(""); 

  // 함수: 할 일 입력값 업데이트
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewTodo(e.target.value);
  };
  //함수: 할 일 추가
  const handleAddTodo = async () => {
    if (!newTodo) return; //공백이면 미처리
    console.log("We will add! ");
    console.log(newTodo);

    const newItem = {
      name: newTodo,
    };

    try { /* POST 요청 및 응답 관리 */
      const response = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(
          newItem
        
        ), // API 요청
      });

      if (!response.ok) {
        throw new Error("Failed to add todo");
      }

      const result: Item = await response.json(); // 응답 타입 지정
      setTodos((prevTodos) => {
        const updatedTodos = [...prevTodos, result]; // 새로운 항목 추가
        return updatedTodos; // 상태 업데이트 (즉시 렌더링)
      });
      setNewTodo("") //입력필드 초기화
      console.log("Added todo:", result); // 추가된 데이터 확인

    } catch (error) {
      console.error("Error adding todo:", error);
    }
  };


  
  return (
    
    <div className="top w-[80%] h-[70px] flex flex-row justify-center items-align">
        <div className="inputImg relative w-[75%] h-[56px]">          
        <InputImg />
        <input
            type="text"
            value={newTodo}
            onChange={handleInputChange}
            className=" absolute inset-0 bg-transparent text-gray-700 px-4 overflow-x-auto"
            style={{ whiteSpace: "nowrap" }} /* 글자 길어지면 오른쪽 스크롤 되도록 처리 */
            placeholder="이곳에 입력하세요"
        />
        </div>

        <div className="AddButton relative w-[25%] h-[56px] pl-1">          
                        
        <button 
        className=''
        onClick={handleAddTodo}>
          <ActiveAddButton />
        </button>
        </div>
    </div>


  );
};

export default AddTodo;