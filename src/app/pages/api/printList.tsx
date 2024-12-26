"use client";

import React, { useState, useEffect} from "react";
import { Item } from "./types";
import { ZeroDone, ZeroTodo } from "@/components/images";
import { Done, ToDo } from "@/components/images";
import { CompletedDesign, NotCompletedDesign } from "@/components/listDesign";
import '@/styles/global.css'; // 글로벌 CSS 파일 경로
import Link from "next/link";


const API_URL = "https://assignment-todolist-api.vercel.app/api/hwang/items";




/* 완료된 목록 */
export const ShowList: React.FC = () => {
    const [todos, setTodos] = useState<Item[]>([]);
    const [error, setError] = useState<string | null>(null);
  

    // API 데이터 가져오기
    const fetchTodos = async () => {
      try {
        const response = await fetch(API_URL, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
  
        if (!response.ok) {
          throw new Error(`Error: ${response.status}`);
        }
  
        const data: Item[] = await response.json();
        setTodos(data); // 모든 항목 저장
      } catch (err) {
        setError(`Failed to fetch todos: ${err}`);
      }
    };

    const toggleCompletion = async (id: string) => {
        try {
          // 해당 아이템의 isCompleted 값을 반전
          const updatedTodos = todos.map((todo) =>
            todo.id === id ? { ...todo, isCompleted: !todo.isCompleted } : todo
          );
    
          // 상태 업데이트
          setTodos(updatedTodos);
          const updatedIsCompleted = updatedTodos.find((todo) => todo.id === id)?.isCompleted;

          console.log("Sending PATCH request to:", `${API_URL}/${id}`);
          console.log("Body:", {
            isCompleted: updatedTodos.find((todo) => todo.id === id)?.isCompleted,
          });
    
          // API로 업데이트된 데이터를 서버에 전송
           const response = await fetch(`${API_URL}/${id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                isCompleted: updatedIsCompleted,  // isCompleted만 보내기
            }),
            });
    
        // 에러처리
          if (!response.ok) {
            throw new Error(`Failed to update todo with id: ${id}`);
          }
        } catch (error) {
          console.error(error);
          setError(`Failed to update todo: ${error}`);
        }
      };
    

    useEffect(() => {  // 컴포넌트가 처음 렌더링될 때 실행
    fetchTodos(); 
    }, []); // 빈 배열은 첫 렌더링 시 한 번만 실행

  const completedTodos = todos.filter((todo) => todo.isCompleted);
  const notCompletedTodos = todos.filter((todo) => !todo.isCompleted);

    //return

    return (
        <div className='content flex flex-row w-full min-h-screen'>

          {/* 할 일 목록 */}
        <div className="contentBody relative" id="ToDoList">
          <ToDo/>
        {notCompletedTodos.length === 0 ?(
          <div className="flex flex-col items-center w-full h-full">
            <ZeroDone />
            <p className="basicText"> 할 일이 없어요. </p>
            <p className="basicText">TODO를 새롭게 추가해주세요! </p>
          </div>
        ) : (
          // 데이터가 있을 경우
          <div className="w-full" style={{ marginTop: '20px' }}>
          <ul className="list-disc pl-5">
            {notCompletedTodos.map((todo) => (

              <li key={todo.id} className="w-[90%] h-[50px] mb-5 relative flex justify-start items-center">

                <NotCompletedDesign className="absolute left-0 w-[90%] h-auto z-0 object-cover" />
                <span className="absolute left-0 z-10 w-[100%] h-auto text-center" >{todo.name}</span>

                {/* 버튼, 링크 */}
                <div className='absolute inset-0  w-full h-full flex flex-row justify-between'>
                <button
                  onClick={() => toggleCompletion(todo.id)}
                  className="z-100 rounded w-[15%] h-full"
                />
                <Link
                  href={`/items/${todo.id}`} 
                  className="w-[80%] h-full z-50"
                />
                </div>
            
              </li>
            ))}
          </ul>

          </div>
        )}
      </div> {/* 할일 목록 */}

       {/* 완료된 할 일 */}
       <div className="contentBody" id="Done">
        <Done/>
        {completedTodos.length === 0 ? (
          <div className="flex flex-col items-center w-full h-auto">
            <ZeroTodo />
            <p className="basicText">아직 다 한 일이 없어요. </p>
            <p className="basicText">해야 할 일을 체크해보세요! </p>
          </div>
        ) : (
          /* 데이터가 있을 경우 */
          <div className="w-full" style={{ marginTop: '20px' }}>
          <ul className="list-disc pl-5">
            {completedTodos.map((todo) => (
              <li key={todo.id} className="w-[90%] h-[50px] mb-5 relative flex justify-start items-center">
                <CompletedDesign className="absolute left-0 w-[90%] h-auto z-0 object-cover" />
                <span className="absolute left-0 z-10 w-[100%] h-auto text-center">{todo.name}</span>

                {/* 버튼, 링크 */}
                <div className='absolute inset-0  w-full h-full flex flex-row justify-between'>
                <button
                  onClick={() => toggleCompletion(todo.id)}
                  className="z-100 rounded w-[15%] h-full"
                />
                <Link
                  href={`/items/${todo.id}`} 
                  className="w-[80%] h-full z-50"
                />

                </div>
              </li>
            ))}
          </ul>
          </div>
        )}
      </div>


      </div> /* Content */



    );
  };
  



  