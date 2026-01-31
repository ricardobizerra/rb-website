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
import { ProfileHeader } from './profile';
import { useIsMobile } from '@/hooks/use-mobile';

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
        'fixed top-0 left-0 right-0 z-50 flex mx-4 my-2 rounded-lg items-center border-b bg-foreground/80 px-4 py-0.5 sm:py-1 text-background backdrop-blur-md sm:px-4 lg:px-8 md:py-2 sm:mx-8 sm:my-4 transition-all duration-300',
        isVisible ? 'justify-between md:max-w-5xl md:mx-auto' : 'justify-center md:w-fit md:mx-auto',
      )}
    >
      <ProfileHeader isVisible={isVisible} />

      <div className={cn("flex items-center gap-2 sm:gap-1", isVisible ? "gap-2 sm:gap-1" : "gap-4 sm:gap-2 md:gap-1" )}>
        <NavbarSocialLinks />
        <ThemeToggle />
      </div>
    </div>
  );
}

function NavbarSocialLinks() {
  const isMobile = useIsMobile();

  return Object.entries(data.socialLinks).map(([key, link]) => {
    const IconComponent = Icons[link.id];

    return (
      <NavbarLink key={key} url={link.url}>
        <Button variant="ghost" size={isMobile ? 'icon-sm' : 'sm'} className="group">
          <IconComponent className='[&:not(.lucide)>path]:fill-background [&:not(.lucide)>g]:fill-background group-hover:[&:not(.lucide)>path]:fill-foreground group-hover:[&:not(.lucide)>g]:fill-foreground' />
          <span className="hidden md:inline">{link.label}</span>
        </Button>
      </NavbarLink>
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
    >
      {children}
    </Component>
  );
}
