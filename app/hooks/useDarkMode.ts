'use client';

import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';

/**
 * ダークモードが有効かどうかを判定するカスタムフック
 *
 * @returns {boolean} ダークモードが有効な場合はtrue
 *
 * @example
 * ```tsx
 * function MyComponent() {
 *   const isDarkMode = useDarkMode();
 *   return <div>ダークモード: {isDarkMode ? 'ON' : 'OFF'}</div>
 * }
 * ```
 */
export function useDarkMode(): boolean {
  const { resolvedTheme } = useTheme();
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    setIsDark(resolvedTheme === 'dark');
  }, [resolvedTheme]);

  return isDark;
}
