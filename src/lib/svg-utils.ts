/**
 * Shared SVG fill pattern utilities for consistent icon styling.
 * These target non-Lucide SVGs (which use strokes instead of fills).
 * Paths with fill="transparent" are excluded to preserve their transparency.
 */

/** SVG fill for icons on colored/dark backgrounds (white fill) */
export const svgFillWhite =
  'fill-white [&:not(.lucide)>g:not([fill="transparent"])]:fill-white [&:not(.lucide)>path:not([fill="transparent"])]:fill-white';

/** SVG fill for icons that follow the foreground color */
export const svgFillForeground =
  '[&:not(.lucide)>path:not([fill="transparent"])]:fill-foreground [&:not(.lucide)>g:not([fill="transparent"])]:fill-foreground';

/** SVG fill for icons that follow the background color */
export const svgFillBackground =
  '[&:not(.lucide)>path:not([fill="transparent"])]:fill-background [&:not(.lucide)>g:not([fill="transparent"])]:fill-background';

/** SVG fill with hover transition from background to foreground */
export const svgFillBackgroundWithHover =
  '[&:not(.lucide)>path:not([fill="transparent"])]:fill-background [&:not(.lucide)>g:not([fill="transparent"])]:fill-background group-hover:[&:not(.lucide)>path:not([fill="transparent"])]:fill-foreground group-hover:[&:not(.lucide)>g:not([fill="transparent"])]:fill-foreground';
