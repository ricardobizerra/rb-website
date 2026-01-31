export function Background() {
  return (
    <>
      <div className="absolute inset-0 z-0 bg-linear-to-tr from-blue-100/20 via-transparent to-purple-100/10 dark:from-blue-900/20 dark:via-transparent dark:to-purple-900/10"></div>
      <div className="absolute inset-0 z-0 bg-[radial-gradient(ellipse_at_top_right,var(--tw-gradient-stops))] from-blue-200/10 via-transparent to-transparent dark:from-blue-800/10 dark:via-transparent dark:to-transparent"></div>
      <div className="absolute inset-0 z-0 bg-[radial-gradient(ellipse_at_bottom_left,var(--tw-gradient-stops))] from-indigo-200/10 via-transparent to-transparent dark:from-indigo-800/10 dark:via-transparent dark:to-transparent"></div>
    </>
  );
}
