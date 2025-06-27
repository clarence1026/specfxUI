/**
 * useOutsideClick hook
 * 检测点击元素外部的事件
 */

import { RefObject, useEffect } from 'react';

/**
 * 检测点击元素外部的Hook
 * @param ref - 要监听的元素引用
 * @param callback - 点击外部时触发的回调函数
 */
export const useOutsideClick = <T extends HTMLElement = HTMLElement>(
  ref: RefObject<T>,
  callback: () => void
): void => {
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent): void => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        callback();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [ref, callback]);
};

export default useOutsideClick; 