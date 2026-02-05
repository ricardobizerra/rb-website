import { cn } from '@/lib/utils';
import * as React from 'react';

const Section = React.forwardRef<
  React.ComponentRef<'section'>,
  React.ComponentPropsWithoutRef<'section'>
>(({ className, ...props }, ref) => (
  <section ref={ref} className={cn('w-full space-y-4', className)} {...props} />
));
Section.displayName = 'Section';

const SectionHeader = React.forwardRef<
  React.ComponentRef<'div'>,
  React.ComponentPropsWithoutRef<'div'>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      'flex flex-col items-center justify-center gap-1 text-center',
      className,
    )}
    {...props}
  />
));
SectionHeader.displayName = 'SectionHeader';

const SectionTitle = React.forwardRef<
  React.ComponentRef<'h2'>,
  React.ComponentPropsWithoutRef<'h2'>
>(({ className, ...props }, ref) => (
  <h2
    ref={ref}
    className={cn(
      'text-xl leading-none font-bold sm:text-2xl md:text-3xl',
      className,
    )}
    {...props}
  />
));
SectionTitle.displayName = 'SectionTitle';

const SectionDescription = React.forwardRef<
  React.ComponentRef<'p'>,
  React.ComponentPropsWithoutRef<'p'>
>(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className={cn(
      'text-muted-foreground px-0 text-sm leading-tight sm:px-8 sm:text-lg md:text-xl',
      className,
    )}
    {...props}
  />
));
SectionDescription.displayName = 'SectionDescription';

export { Section, SectionHeader, SectionTitle, SectionDescription };
