import React from 'react';
import { Menu } from 'lucide-react';

interface MobileMenuButtonProps {
  onClick: () => void;
}

export const MobileMenuButton: React.FC<MobileMenuButtonProps> = ({ onClick }) => {
  return (
    <div className="lg:hidden p-3 border-b border-[var(--border)]">
      <button
        onClick={onClick}
        className="p-2 hover:bg-[var(--surface)] rounded-lg transition-colors"
        aria-label="Open menu"
      >
        <Menu className="h-5 w-5 text-[var(--text)]" />
      </button>
    </div>
  );
};
