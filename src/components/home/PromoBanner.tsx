import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';

type PromoBannerProps = {
  title: string;
  subtitle: string;
  ctaText: string;
  ctaLink: string;
  bgColor?: string;
  textColor?: string;
  className?: string;
};

export function PromoBanner({
  title,
  subtitle,
  ctaText,
  ctaLink,
  bgColor = 'bg-primary-600',
  textColor = 'text-white',
  className = '',
}: PromoBannerProps) {
  return (
    <div className={cn('relative overflow-hidden', bgColor, textColor, className)}>
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[url('https://tailwindui.com/img/beams-pattern.svg')] bg-center opacity-10" />
      </div>
      <div className="relative mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            {title}
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-xl">
            {subtitle}
          </p>
          <div className="mt-8">
            <Link
              to={ctaLink}
              className="inline-flex items-center justify-center rounded-md border border-transparent bg-white px-5 py-3 text-base font-medium text-primary-700 hover:bg-primary-50 sm:px-10"
            >
              {ctaText}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
