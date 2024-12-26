import React, { useState } from 'react';
import { DefaultURLImg } from '@/components/images';

interface ImageUploadProps {
  imageUrl?: string; // 기존 이미지 URL
  onImageChange: (newImageUrl: string) => void; // 부모 컴포넌트로 이미지 URL 전달
}

const ImageUpload: React.FC<ImageUploadProps> = ({ imageUrl, onImageChange }) => {
  const [previewUrl, setPreviewUrl] = useState<string>(imageUrl || ''); // 이미지 미리보기 상태
  const [error, setError] = useState<string>(''); // 에러 상태 (파일 이름, 크기 오류)


  // 이미지 파일 이름이 영어만 포함되는지 확인하는 함수
  const isValidFileName = (fileName: string) => {
    const regex = /^[a-zA-Z0-9_-]+\.(jpg|jpeg|png|gif)$/; // 영어와 숫자, .jpg, .jpeg, .png, .gif 확장자만 허용
    return regex.test(fileName);
  };

  // 이미지 파일 크기 검증 함수 (최대 5MB)
  const isValidFileSize = (file: File) => {
    return file.size <= 5 * 1024 * 1024; // 최대 5MB
  };

  // 이미지 변경 처리 함수
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // 파일 이름 검증
      if (!isValidFileName(file.name)) {
        setError('파일 이름은 영어로만 작성되어야 하며, jpg, jpeg, png, gif 파일만 업로드할 수 있습니다.');
        return;
      }

      // 파일 크기 검증
      if (!isValidFileSize(file)) {
        setError('파일 크기는 5MB 이하여야 합니다.');
        return;
      }

      // 오류 초기화
      setError('');

      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewUrl(reader.result as string); // 미리보기 URL 설정
        onImageChange(reader.result as string); // 부모 컴포넌트로 URL 전달
      };
      reader.readAsDataURL(file); // 파일을 Base64로 변환하여 미리보기용 URL 생성
    }
  };



  return (
    <div className="w-full h-full bg-gray-200 flex justify-center items-center relative overflow-hidden">
      {/* 이미지가 있을 경우 해당 이미지 표시, 없을 경우 기본 이미지 (SVG) 표시 */}
      {previewUrl ? (
        <img
          src={previewUrl}
          alt="Preview"
          className="w-full h-full object-cover"
        />
      ) : (
        <DefaultURLImg/> // 기본 이미지 (SVG) 표시
      )}

      {/* 이미지 업로드 input */}
      <input
        type="file"
        accept="image/*"
        className="absolute bottom-2 right-2"
        onChange={handleImageChange}
      />

      {/* 에러 메시지 표시 */}
      {error && <div className="absolute bottom-10 text-red-500">{error}</div>}
    </div>
  );
};

export default ImageUpload;