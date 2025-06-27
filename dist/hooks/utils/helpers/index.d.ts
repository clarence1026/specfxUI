/**
 * 通用工具函数
 * 提供常用的辅助函数
 */
/**
 * 判断对象是否为空
 * @param obj - 要检查的对象
 * @returns 如果对象为空返回true，否则返回false
 */
export declare const isEmpty: (obj: Record<string, any>) => boolean;
/**
 * 设置cookie
 * @param name - cookie名称
 * @param value - cookie值
 * @param days - 过期天数，默认7天
 * @param path - cookie路径，默认'/'
 */
export declare const setCookie: (name: string, value: string, days?: number, path?: string) => void;
/**
 * 获取cookie值
 * @param name - cookie名称
 * @returns cookie值，如果不存在则返回空字符串
 */
export declare const getCookie: (name: string) => string;
/**
 * 删除cookie
 * @param name - cookie名称
 * @param path - cookie路径
 */
export declare const deleteCookie: (name: string, path?: string) => void;
/**
 * 获取所有cookie作为对象
 * @returns 包含所有cookie的对象
 */
export declare const getCookieObj: () => Record<string, string>;
/**
 * 将字符串分割成指定大小的块
 * @param str - 要分割的字符串
 * @param size - 每个块的大小
 * @returns 分割后的字符串数组
 */
export declare const chunkString: (str: string, size: number) => string[];
/**
 * 节流函数
 * 限制函数在一定时间内只能执行一次
 * @param callee - 要节流的函数
 * @param timeout - 节流时间间隔（毫秒）
 * @returns 节流后的函数
 */
export declare const throttle: <T extends (...args: any[]) => any>(callee: T, timeout: number) => ((...args: Parameters<T>) => void);
/**
 * 防抖函数
 * 延迟函数执行，如果在延迟时间内再次调用则重新计时
 * @param callee - 要防抖的函数
 * @param timeout - 防抖时间间隔（毫秒）
 * @returns 防抖后的函数
 */
export declare const debounce: <T extends (...args: any[]) => any>(callee: T, timeout: number) => ((...args: Parameters<T>) => void);
/**
 * 截断数字到指定小数位
 * @param amount - 要截断的数字
 * @param digit - 小数位数，默认为2
 * @returns 截断后的数字
 */
export declare const truncateToDecimals: (amount: number, digit?: number) => number;
/**
 * 格式化金额显示
 * @param amount - 金额数值
 * @param options - 格式化选项
 * @returns 格式化后的金额字符串
 */
export declare const formatAmount: (amount: number, options?: {
    locale?: string;
    currency?: string;
    minimumFractionDigits?: number;
    maximumFractionDigits?: number;
}) => string;
