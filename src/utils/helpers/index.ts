/**
 * 通用工具函数
 * 提供常用的辅助函数
 */

/**
 * 判断对象是否为空
 * @param obj - 要检查的对象
 * @returns 如果对象为空返回true，否则返回false
 */
export const isEmpty = (obj: Record<string, any>): boolean => 
  Object.keys(obj).length === 0 && obj.constructor === Object;

/**
 * 设置cookie
 * @param name - cookie名称
 * @param value - cookie值
 * @param days - 过期天数，默认7天
 * @param path - cookie路径，默认'/'
 */
export const setCookie = (name: string, value: string, days: number = 7, path: string = '/'): void => {
  const expires = new Date(Date.now() + days * 864e5).toUTCString();
  document.cookie = `${name}=${encodeURIComponent(value)}; expires=${expires}; path=${path}`;
};

/**
 * 获取cookie值
 * @param name - cookie名称
 * @returns cookie值，如果不存在则返回空字符串
 */
export const getCookie = (name: string): string =>
  document.cookie.split('; ').reduce((r, v) => {
    const parts = v.split('=');
    return parts[0] === name ? decodeURIComponent(parts[1]) : r;
  }, '');

/**
 * 删除cookie
 * @param name - cookie名称
 * @param path - cookie路径
 */
export const deleteCookie = (name: string, path: string = '/'): void => {
  setCookie(name, '', -1, path);
};

/**
 * 获取所有cookie作为对象
 * @returns 包含所有cookie的对象
 */
export const getCookieObj = (): Record<string, string> => {
  const cookieArr = document.cookie.split('; ').map(item => item.split('='));
  const obj: Record<string, string> = {};
  for (const [prop, value] of cookieArr) obj[prop] = value;
  return obj;
};

/**
 * 将字符串分割成指定大小的块
 * @param str - 要分割的字符串
 * @param size - 每个块的大小
 * @returns 分割后的字符串数组
 */
export const chunkString = (str: string, size: number): string[] => {
  const numChunks = Math.ceil(str.length / size);
  const chunks = new Array(numChunks);

  for (let i = 0, o = 0; i < numChunks; i += 1, o += size) {
    chunks[i] = str.substr(o, size);
  }

  return chunks;
};

/**
 * 节流函数
 * 限制函数在一定时间内只能执行一次
 * @param callee - 要节流的函数
 * @param timeout - 节流时间间隔（毫秒）
 * @returns 节流后的函数
 */
export const throttle = <T extends (...args: any[]) => any>(callee: T, timeout: number): ((...args: Parameters<T>) => void) => {
  let timer: number | null = null;
  
  return function perform(...args: Parameters<T>): void {
    if (timer) return;
    
    timer = window.setTimeout(() => {
      callee(...args);
      timer = null;
    }, timeout);
  };
};

/**
 * 防抖函数
 * 延迟函数执行，如果在延迟时间内再次调用则重新计时
 * @param callee - 要防抖的函数
 * @param timeout - 防抖时间间隔（毫秒）
 * @returns 防抖后的函数
 */
export const debounce = <T extends (...args: any[]) => any>(callee: T, timeout: number): ((...args: Parameters<T>) => void) => {
  let timer: number | null = null;
  
  return function perform(...args: Parameters<T>): void {
    if (timer) {
      clearTimeout(timer);
    }
    
    timer = window.setTimeout(() => {
      callee(...args);
      timer = null;
    }, timeout);
  };
};

/**
 * 截断数字到指定小数位
 * @param amount - 要截断的数字
 * @param digit - 小数位数，默认为2
 * @returns 截断后的数字
 */
export const truncateToDecimals = (amount: number, digit: number = 2): number => {
  const re = new RegExp(`(\\d+\\.\\d{${digit}})(\\d)`);
  const m = amount.toString().match(re);
  return m ? parseFloat(m[1]) : amount;
};

/**
 * 格式化金额显示
 * @param amount - 金额数值
 * @param options - 格式化选项
 * @returns 格式化后的金额字符串
 */
export const formatAmount = (
  amount: number,
  options: {
    locale?: string;
    currency?: string;
    minimumFractionDigits?: number;
    maximumFractionDigits?: number;
  } = {}
): string => {
  const {
    locale = 'en-US',
    currency = 'USD',
    minimumFractionDigits = 2,
    maximumFractionDigits = 2
  } = options;
  
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency,
    minimumFractionDigits,
    maximumFractionDigits
  }).format(amount);
}; 