import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { ChevronRight, Home } from 'lucide-react';
import { institutes } from '../data/mockData'; // To resolve institute names

export default function Breadcrumbs() {
  const location = useLocation();
  const navigate = useNavigate();
  const paths = location.pathname.split('/').filter(p => p);

  // Don't show breadcrumbs on root or public institute page
  if (paths.length === 0 || (paths[0] === 'institute' && paths.length === 2)) return null;

  return (
    <div className="breadcrumbs">
      <div className="breadcrumb-link" onClick={() => navigate('/')}>
        <Home size={16} />
      </div>
      
      {paths.map((path, idx) => {
        // Resolve dynamic IDs to readable names if possible
        let displayName = path.charAt(0).toUpperCase() + path.slice(1);
        if (path.startsWith('inst_')) {
          const inst = institutes.find(i => i.id === path);
          if (inst) displayName = inst.name;
        }

        const isLast = idx === paths.length - 1;
        const routeTo = '/' + paths.slice(0, idx + 1).join('/');

        return (
          <React.Fragment key={path}>
            <ChevronRight size={14} color="var(--border-strong)" />
            {isLast ? (
              <span className="breadcrumb-active">{displayName}</span>
            ) : (
              <span className="breadcrumb-link" onClick={() => navigate(routeTo)}>
                {displayName}
              </span>
            )}
          </React.Fragment>
        );
      })}
    </div>
  );
}
