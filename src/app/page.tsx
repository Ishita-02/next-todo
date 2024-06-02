'use client';

import { toast } from 'react-hot-toast';

export default function Home() {
  const handleButtonClick = () => {
    toast.success('You did it!'); // Displays a success message
  };

  return (
    <div>
      <button onClick={handleButtonClick}>Show Success Toast</button>
    </div>
  );
}