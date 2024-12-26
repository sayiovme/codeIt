import React, { useState } from 'react';
import { MemoImg } from '@/components/images';
import '@/styles/global.css'; // 글로벌 CSS 파일 경로

interface EditableMemoSectionProps {
  memo: string;
  onMemoChange: (newMemo: string) => void;
}

const EditableMemoSection: React.FC<EditableMemoSectionProps> = ({ memo, onMemoChange }) => {
  const [tempMemo, setTempMemo] = useState(memo);
  const [isEditing, setIsEditing] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTempMemo(e.target.value);
  };

  const handleBlur = () => {
    onMemoChange(tempMemo);  // 수정된 메모를 부모 컴포넌트로 전달
    setIsEditing(false);  // 편집 모드 종료
  };

  return (
    <div className="editable-memo-section w-full h-full ">
      {isEditing ? (
        <input
          type="text"
          value={tempMemo}
          onChange={handleChange}
          onBlur={handleBlur} // blur 이벤트로 수정 완료
          autoFocus
          className="w-full h-full p-2 resize-none"
        />
      ) : (
        
        <div className='w-full h-full relative overflow-hidden'>
          <MemoImg/>
            <div 
            className="absolute inset-0 w-full h-full p-2 resize-none"
            onClick={() => setIsEditing(true)}
            style={{
              maxHeight: '500px',           // 최대 높이 설정
              overflowY: 'auto',            // 넘칠 경우 스크롤 표시
              wordWrap: 'break-word',       // 자동 줄바꿈
              whiteSpace: 'normal'          // 텍스트가 넘치면 줄바꿈
            }}>
              <span className='txt' >{memo}</span>
              </div>
        
        </div>
      )}
    </div>
  );
};

export default EditableMemoSection;