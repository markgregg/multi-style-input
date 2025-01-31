import React from 'react';

export const useSizeWatcher = (
  element: HTMLElement | null,
  handler: (width: number, height: number) => void,
) => {
  React.useEffect(() => {
    const observer = new ResizeObserver(() => {
      const { width, height } = element?.getBoundingClientRect() ?? {};
      handler(width ?? 0, height ?? 0);
    });
    if (element) {
      observer.observe(element);
      const { width, height } = element?.getBoundingClientRect() ?? {};
      handler(width ?? 0, height ?? 0);
    }
    return () => {
      if (element) {
        observer.unobserve(element);
      }
    };
  }, [element]);
};
