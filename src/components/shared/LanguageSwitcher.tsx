'use client';

import { useRouter } from 'next/navigation';

export function LanguageSwitcher({ locale }: { locale: string }) {
  const router = useRouter();

  const changeLocale = (newLocale: string) => {
    document.cookie = `locale=${newLocale}; path=/; max-age=${60 * 60 * 24 * 365}`;
    router.refresh();
  };

  return (
    <select
      className="btn btn-success"
      value={locale}
      onChange={(e) => changeLocale(e.target.value)}
      style={{
        padding: '0.375rem 0.75rem',
        height: '38px',
        borderRadius: '0.375rem',
      }}
    >
      <option value="en">EN</option>
      <option value="ru">RU</option>
    </select>
  );
}
