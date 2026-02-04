/**
 * Shared SVG fill pattern utilities for consistent icon styling.
 * These target non-Lucide SVGs (which use strokes instead of fills).
 */

/** SVG fill for icons on colored/dark backgrounds (white fill) */
export const svgFillWhite =
  'fill-white [&:not(.lucide)>g]:fill-white [&:not(.lucide)>path]:fill-white';

/** SVG fill for icons that follow the foreground color */
export const svgFillForeground =
  '[&:not(.lucide)>path]:fill-foreground [&:not(.lucide)>g]:fill-foreground';

/** SVG fill for icons that follow the background color */
export const svgFillBackground =
  '[&:not(.lucide)>path]:fill-background [&:not(.lucide)>g]:fill-background';

/** SVG fill with hover transition from background to foreground */
export const svgFillBackgroundWithHover =
  '[&:not(.lucide)>path]:fill-background [&:not(.lucide)>g]:fill-background group-hover:[&:not(.lucide)>path]:fill-foreground group-hover:[&:not(.lucide)>g]:fill-foreground';
