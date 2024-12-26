"use client"
import React from 'react';
import {useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import EditName from '@/app/pages/api/NameEditor';
import EditableMemoSection from '@/app/pages/api/MemoEditor';
import ImageUpload from '@/app/pages/api/imgUpload';
import '@/styles/global.css'; // 글로벌 CSS 파일 경로
import { Item } from '@/app/pages/api/types';
const API_URL = "https://assignment-todolist-api.vercel.app/api/hwang/items/${itemId}";

import { NotCompletedDesign, CompletedDesign } from '@/components/listDesign';
import { DefaultEditBTN, ActiveEditBTN, DeleteBTN } from '@/components/images';




const ItemDetail: React.FC = () => {
  const { itemId } = useParams(); // URL에서 itemId를 가져옵니다
  const [item, setItem] = useState<any>(null);
  const [tempItem, setTempItem] = useState<any>(null); // 임시로 수정된 item
  const router = useRouter();  // useRouter 훅을 사용하여 페이지 이동

  useEffect(() => {
    const fetchItem = async () => {
      const response = await fetch(`https://assignment-todolist-api.vercel.app/api/hwang/items/${itemId}`);
      const data = await response.json();
      setItem(data); // 데이터를 받아서 상태에 저장
      setTempItem(data); // tempItem 초기화
    };
    
    fetchItem();
  }, [itemId]);


  /* 함수 : TempItem의 이름, 메모, isCompleted, url 상태를를 바꿈 */
  const handleNameChange = (newName: string) => {
    setTempItem({ ...tempItem, name: newName });
  };

  const handleMemoChange = (newMemo: string) => {
    setTempItem({ ...tempItem, memo: newMemo });
  };

  const toggleCompletion = () => {
    if (tempItem) {
      setTempItem({ ...tempItem, isCompleted: !tempItem.isCompleted }); // 임시로 isCompleted 상태 반전
    }
  };
  const handleImageChange = (newImageUrl: string) => {
    if (tempItem) {
      setTempItem({ ...tempItem, imageUrl: newImageUrl }); // 이미지 URL을 상태에 반영
    }
  };
  
  /* 함수: 변경 사항 여부 확인 */
  const isItemModified = () => {
    return JSON.stringify(tempItem) !== JSON.stringify(item);
  };

  /* 함수: Temp 값을 실제 DB에 저장 */
  const saveChanges = async () => {
    if (tempItem) {
      try {
        const response = await fetch(`https://assignment-todolist-api.vercel.app/api/hwang/items/${tempItem.id}`, {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            name: tempItem.name, // 수정된 name 값
            memo: tempItem.memo,
            imageUrl: tempItem.imageUrl,
            isCompleted: tempItem.isCompleted,
          }),
        });

        if (!response.ok) {
          const errorData = await response.json();
          console.error('Error:', errorData);
          throw new Error('Failed to update item');
        }

        const data = await response.json();
        setItem(data); // 서버에서 받은 최신 데이터로 상태 업데이트
        console.log(`Updated: ${data.id}`);

        // 리다이렉션 (메인 홈으로 이동)
        router.push('/'); // '/'로 이동하여 메인 페이지로 리다이렉트
      } catch (error) {
        console.error('Error updating memo:', error);
      }
    }
  };

  const deleteItem = async () => {
    try {
      const response = await fetch(`https://assignment-todolist-api.vercel.app/api/hwang/items/${itemId}`, {
        method: 'DELETE', // DELETE 요청으로 데이터를 삭제
      });

      if (!response.ok) {
        throw new Error('Failed to delete item');
      }

      console.log(`Item with id ${itemId} deleted successfully`);

      // 삭제 후 홈 페이지로 리다이렉트
      router.push('/');  // 홈으로 리다이렉트
    } catch (error) {
      console.error('Error deleting item:', error);
    }
  };

  if (!item) {
    return <div>Loading...</div>;
  }




  return (
    
    <div className="container max-w-[1920px] mx-auto min-h-screen flex justify-center">
      <div className="body responsive-padding flex flex-col items-center w-full max-w-[1250px] min-h-screen relative"> {/* body가 전체의 중앙을 차지할 수 있도록 함. 최대 1250px */}

      <div className="top w-full h-[70px] flex flex-row justify-center relative">

          {/* isCompleted 편집 섹션 */}
          <button 
            className='rounded absolute top-0 left-0 z-50 w-[15%] h-full'
            onClick={toggleCompletion}>
            </button>

          {/* item.isCompleted 값에 따라 조건부 이미지 렌더링 */}
          {tempItem.isCompleted ? (
            <CompletedDesign className="w-full h-full " />
          ) : (
            <NotCompletedDesign className="w-full h-full" />
          )}

          {/* Name 편집 섹션 */}
          <EditName
            name={tempItem.name}
            onNameChange={handleNameChange} 
          />


      </div> {/* Top */}

{/* MAIN */}
    <div className="main pt-10 relative w-full h-auto">
      <div className='imgMain'>

      <ImageUpload
        imageUrl={item.imageUrl}
        onImageChange={handleImageChange} 
      />


      </div>

      <div className='memoMain relative'>
          <EditableMemoSection 
            memo={tempItem.memo || ''}
            onMemoChange={handleMemoChange} 
          />
          
      </div>

    </div> {/* Main */}

{/* Footer */}
      <div className='footer w-full h-[20%] '>
      {/* 수정 완료 버튼 */}
      <button 
      className='flex justify-center'
      onClick={saveChanges}>
            {isItemModified() ? (
                  <ActiveEditBTN /> // 수정된 경우 "Active" 상태 SVG
                ) : (
                  <DefaultEditBTN />// 수정되지 않은 경우 "Default" 상태 SVG
                )}
              </button>
      {/* 삭제 버튼 */}
      <button 
      className='flex justify-center'
      onClick={deleteItem} >
        <DeleteBTN />
      </button>
      </div> {/* footer */}







      </div> {/* BODY */}
    </div> /* CONTAINER */
  );
};

export default ItemDetail;



