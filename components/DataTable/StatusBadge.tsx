import React from 'react';
import { User } from '../../types';

interface StatusBadgeProps {
  status: User['status'];
}

const LABELS: Record<User['status'], string> = {
  active: 'Active',
  pending: 'Pending',
  inactive: 'Inactive',
};

export const StatusBadge: React.FC<StatusBadgeProps> = ({ status }) => {
  return (
    <span className={`status-badge ${status}`}>
      <span className="status-dot" />
      {LABELS[status]}
    </span>
  );
};
