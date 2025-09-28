'use client';

import '@/styles/layouts/top-menu.scss';
import { ActiveSessions, Clock, Logo, SearchInput } from '@/components/ui';
import { useSocket } from '@/hooks';

export const TopMenu = () => {
  const { activeSessions } = useSocket();

  return (
    <header className="topmenu">
      <div className="container d-flex align-items-center justify-content-between h-100">
        <div className="topmenu__left">
          <Logo />
          <SearchInput />
        </div>
        <div className="d-flex align-items-center gap-3">
          <ActiveSessions count={activeSessions} />
          <Clock />
        </div>
      </div>
    </header>
  );
};
