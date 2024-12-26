This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.



src/app/items/[itemId]/page.tsx : 각 데이터 id에 맞는 주소로 이동하여 page.tsx 렌더링. ToDo의 이름, 완성 여부, 사진, 메모를 편집할 수 있습니다.
> src/app/pages/api/NameEditor : 이름 편집 함수
> src/app/pages/api/MemoEditor : 메모 편집 함수
> src/app/pages/api/imgUpload : 이미지 업로드 함수

src/app/page.tsx : 기본 페이지 ( / ) 현재 할 일 목록을 추가하고, isCompleted 여부에 따라 조회하고, isCompleted를 변경할 수 있습니다.
> src/app/pages/api/CreateItemDto : 할 일을 추가하는 함수
>s rc/app/pages/api/printList : 데이터를 Patch 하여 isCompleted에 따라 필터링한 목록을 보여주는 함수. 버튼을 누르면 isCompleted를 바꿀 수 있게 함

src/app/styles/globals.css : 모든 페이지에 적용할 CSS
src/app/layout.tsx : 모든 페이지에 적용되는 것. 헤더 및 헤더 클릭하면 / 로 리다이렉션 되는 것 구현

components 폴더 : 재사용 할 image 저장

