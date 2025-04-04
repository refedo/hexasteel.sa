import Link from 'next/link';

interface LogoProps {
  variant?: 'light' | 'dark';
  className?: string;
}

export default function Logo({ variant = 'dark', className = '' }: LogoProps) {
  return (
    <Link href="/" className={`block ${className}`}>
      <div className={`font-bold text-2xl ${variant === 'light' ? 'text-white' : 'text-gray-900'}`}>
        <span className="text-primary-500">Hexa</span>
        <span>steel</span>
      </div>
    </Link>
  );
}
