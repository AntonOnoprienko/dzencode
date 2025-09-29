'use client';

import '@/styles/layouts/top-menu.scss';
import { ActiveSessions, Clock, Logo, SearchInput } from '@/components/ui';
import { useSocket } from '@/hooks';
import { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import { LanguageSwitcher, RegisterModal } from '../shared';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { setUser, logout } from '@/store/slices/user-slice';
import { useTranslations } from 'next-intl';

export const TopMenu = ({ locale }: { locale: string }) => {
  const { activeSessions } = useSocket();
  const [showRegister, setShowRegister] = useState(false);
  const t = useTranslations('topmenu');

  const dispatch = useAppDispatch();
  const userName = useAppSelector((state) => state.user.name);

  useEffect(() => {
    const storedName = localStorage.getItem('userName');
    if (storedName) {
      dispatch(setUser(storedName));
    }
  }, [dispatch]);

  const handleLogout = () => {
    localStorage.removeItem('userName');
    dispatch(logout());
  };

  return (
    <header className="topmenu">
      <div className="container d-flex align-items-center justify-content-between h-100">
        <div className="topmenu__left">
          <Logo />
          <SearchInput />
        </div>
        {userName ? (
          <div className="d-flex gap-2 align-items-center">
            <span>
              {t('greeting')},{' '}
              {userName.length > 12 ? userName.slice(0, 12) + '…' : userName}
            </span>
            <Button variant="danger" onClick={handleLogout}>
              {t('logout')}
            </Button>
          </div>
        ) : (
          <Button variant="success" onClick={() => setShowRegister(true)}>
            {t('register')}
          </Button>
        )}
        <LanguageSwitcher locale={locale} />
        <div className="d-flex align-items-center gap-3">
          <ActiveSessions count={activeSessions} />
          <Clock />
        </div>
      </div>
      <RegisterModal
        show={showRegister}
        onHide={() => setShowRegister(false)}
      />
    </header>
  );
};
