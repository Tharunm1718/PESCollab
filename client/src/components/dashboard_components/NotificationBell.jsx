import React from 'react';
import { useInteractiveCard } from './useInteractiveEffects'; // <-- 1. Import

const NotificationBell = () => {
  const cardRef = useInteractiveCard(); // <-- 2. Call hook

  return (
    // 3. Attach ref to the button
    <button ref={cardRef} className="interactive-container" style={{ width: '64px', height: '64px', border: 'none', background: 'transparent', padding: 0, cursor: 'pointer' }}>
      <div className="glass-card card-6 flex-center">
        <svg className="text-primary" viewBox="0 0 24 24" fill="currentColor" style={{ width: '36px', height: '36px' }}>
          <path d="M12 22c1.1 0 2-.9 2-2h-4c0 1.1.89 2 2 2zm6-6v-5c0-3.07-1.64-5.64-4.5-6.32V4c0-.83-.67-1.5-1.5-1.5s-1.5.67-1.5 1.5v.68C7.63 5.36 6 7.92 6 11v5l-2 2v1h16v-1l-2-2z" />
        </svg>
      </div>
    </button>
  );
};

export default NotificationBell;