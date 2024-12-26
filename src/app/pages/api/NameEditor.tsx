"use client";

import React, { memo } from 'react';
import {useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { UpdateItemDto, Item } from "./types";
import { NotCompletedDesign } from '@/components/listDesign';
import { MemoImg } from '@/components/images';

interface EditableNameSectionProps {
  name: string;
  onNameChange: (newName: string) => void;
  className?: string;
}

const EditName: React.FC<EditableNameSectionProps> = ({ name, onNameChange }) => {
  const [tempName, setTempName] = useState(name);
  const [isEditing, setIsEditing] = useState(false);


  /* 수정 함수 */
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTempName(e.target.value);
  };

  /* 수정 완료되었을 경우 상위 컴포넌트에 임시 값 전달달 */
  const handleBlur = () => {
    onNameChange(tempName); // name 수정 완료 후 상위 컴포넌트에 전달
    setIsEditing(false); // 편집 모드 종료
  };


  

  return (
    <div className="editable-name-section w-full h-full object-contain absolute inset-0 flex justify-center items-center">
      {isEditing ? (
        <input
          type="text"
          value={tempName}
          onChange={handleChange}
          onBlur={handleBlur} // blur 이벤트로 수정 완료
          autoFocus
        />
      ) : (
        <span className='txt' onClick={() => setIsEditing(true)}>{name}</span> // span을 클릭하면 수정 모드로 전환
      )}
    </div>
  );
};
  
  export default EditName;
