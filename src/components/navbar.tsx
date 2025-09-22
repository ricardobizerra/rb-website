import { data } from '@/data';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { PropsWithChildren } from 'react';
import { ThemeToggle } from './theme-toggle';
import { Icons } from './icons';

export function Navbar() {
  return (
    <div className="fixed top-4 right-4 z-1 flex items-center gap-1">
      <NavbarSocialLinks />
      <ThemeToggle />
    </div>
  );
}

function NavbarSocialLinks() {
  return Object.entries(data.socialLinks).map(([key, link]) => {
    const IconComponent = Icons[link.id];

    return (
      <Button key={key} variant="ghost" size="sm">
        <NavbarLink url={link.url}>
          <IconComponent width={20} height={20} />
          {link.label}
        </NavbarLink>
      </Button>
    );
  });
}

function NavbarLink({ children, url }: PropsWithChildren<{ url: string }>) {
  const Component = url.startsWith('http') ? 'a' : Link;

  return (
    <Component
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="flex items-center gap-[inherit]"
    >
      {children}
    </Component>
  );
}
