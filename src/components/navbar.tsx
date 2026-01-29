'use client';

import { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';
import Image from 'next/image';
import { data } from '@/data';
import RbPhoto from '@/assets/rblf-photo.png';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { PropsWithChildren } from 'react';
import { ThemeToggle } from './theme-toggle';
import { Icons } from './icons';
import { Profile } from './profile';

export function Navbar() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const profileSection = document.getElementById('profile-section');
      if (profileSection) {
        const { bottom } = profileSection.getBoundingClientRect();
        // Show navbar when profile section is mostly out of view (scrolled up)
        setIsVisible(bottom < 5);
      } else {
        // Fallback if element not found
        setIsVisible(window.scrollY > 300);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div
      className={cn(
        'fixed top-0 left-0 right-0 z-50 flex mx-4 my-2 rounded-lg items-center border-b bg-foreground/80 px-4 py-1 text-background backdrop-blur-md sm:px-4 lg:px-8 sm:py-2 sm:mx-8 sm:my-4 transition-all duration-300',
        isVisible ? 'justify-between' : 'justify-center',
      )}
    >
      <Profile isHeader={true} isVisible={isVisible} />

      <div className="flex items-center gap-1">
        <NavbarSocialLinks />
        <ThemeToggle />
      </div>
    </div>
  );
}

function NavbarSocialLinks() {
  return Object.entries(data.socialLinks).map(([key, link]) => {
    const IconComponent = Icons[link.id];

    return (
      <Button key={key} variant="ghost" size="xs" className="group">
        <NavbarLink url={link.url}>
          <IconComponent className='w-[18px] h-[18px] sm:w-[20px] sm:h-[20px] [&:not(.lucide)>path]:fill-background [&:not(.lucide)>g]:fill-background group-hover:[&:not(.lucide)>path]:fill-foreground group-hover:[&:not(.lucide)>g]:fill-foreground' />
          <span className="hidden sm:inline">{link.label}</span>
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
