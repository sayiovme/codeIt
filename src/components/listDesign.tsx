
interface ListDesignProps {
    className?: string;  // className을 props로 받아옵니다.
  }
  
  export const CompletedDesign: React.FC<ListDesignProps> = ({ className }) => (
    <svg 
    viewBox="0 0 527 50" 
    fill="none" 
    xmlns="http://www.w3.org/2000/svg">
<rect x="1" y="1" width="525" height="48" rx="24" fill="#EDE9FE" stroke="#0F172A" stroke-width="2"/>
<circle cx="28" cy="25" r="16" fill="#7C3AED"/>
</svg>

  );

  export const NotCompletedDesign: React.FC<ListDesignProps> = ({ className }) => (
    <svg
      viewBox="0 0 527 50"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect x="1" y="1" width="525" height="48" rx="24" fill="white" stroke="#0F172A" strokeWidth="2" />
      <circle cx="28" cy="25" r="15" fill="#FEFCE8" stroke="#0F172A" strokeWidth="2" />
    </svg>
  );

  export const CompletedDetail: React.FC<ListDesignProps> = ({ className }) => (
    <svg width="996" height="64" viewBox="0 0 996 64" fill="none" xmlns="http://www.w3.org/2000/svg">
<rect x="1" y="1" width="994" height="62" rx="23" fill="#DDD6FE" stroke="#0F172A" stroke-width="2"/>
<circle cx="425" cy="32" r="16" fill="#7C3AED"/>
</svg>


  );

  export const NotCompletedDetail: React.FC<ListDesignProps> = ({ className }) => (
    <svg width="996" height="64" viewBox="0 0 996 64" fill="none" xmlns="http://www.w3.org/2000/svg">
<rect x="1" y="1" width="994" height="62" rx="23" fill="white" stroke="#0F172A" stroke-width="2"/>
<circle cx="421.5" cy="32" r="15" fill="#FEFCE8" stroke="#0F172A" stroke-width="2"/>
</svg>

  );