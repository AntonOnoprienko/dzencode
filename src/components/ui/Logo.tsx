import Link from 'next/link';
import Image from 'next/image';

export const Logo = () => {
  return (
    <Link href="/">
      <div className="d-flex align-items-center">
        <Image
          src="/logo.png"
          alt="Inventory Logo"
          width={32}
          height={32}
          className="me-2"
        />
        <span className="fw-bold text-success">INVENTORY</span>
      </div>
    </Link>
  );
};
