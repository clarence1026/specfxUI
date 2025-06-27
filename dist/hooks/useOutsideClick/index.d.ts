/**
 * useOutsideClick hook
 * 检测点击元素外部的事件
 */
import { RefObject } from 'react';
/**
 * 检测点击元素外部的Hook
 * @param ref - 要监听的元素引用
 * @param callback - 点击外部时触发的回调函数
 */
export declare const useOutsideClick: <T extends HTMLElement = HTMLElement>(ref: RefObject<T>, callback: () => void) => void;
export default useOutsideClick;
