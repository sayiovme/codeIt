const tenantId: string = "hwang"; // 본인 고유 식별자

/* 스키마 정의 */
export interface Item {
    id: string; // Primary Key
    tenantId: string;
    name: string;
    memo: string;
    imageUrl: string;
    isCompleted: boolean;
  }

export interface CreateItemDto {
    name: string; // 필수 값
    }

export interface UpdateItemDto {
    name?: string; // 선택 값
    memo?: string;
    imageUrl?: string;
    isCompleted?: boolean;
  }


