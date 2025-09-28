'use client';

import '@/styles/layouts/navigation-menu.scss';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { GearFill } from 'react-bootstrap-icons';

export const NavigationMenu = () => {
  const pathname = usePathname();

  const links = [
    { href: '/orders', label: 'Orders' },
    { href: '/products', label: 'Products' },
  ];

  return (
    <nav className="navigation">
      <div className="navigation__avatar-wrapper">
        <div className="position-relative rounded-circle overflow-hidden w-100 h-100">
          <Image
            src="/assets/sticker.webp"
            alt="avatar"
            width={100}
            height={100}
          />
        </div>
        <div className="navigation__avatar-settings">
          <GearFill size={15} color="gray" />
        </div>
      </div>
      <div className="mt-5 fw-bold d-flex flex-column align-items-center gap-4">
        {links.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className={`navigation__link ${pathname === link.href ? 'navigation__link--active' : ''}`}
          >
            {link.label.toUpperCase()}
          </Link>
        ))}
      </div>
    </nav>
  );
};
