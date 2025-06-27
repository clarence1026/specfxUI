/**
 * Table组件类型定义
 */
import { ReactNode } from "react";

/**
 * 表格列配置
 */
export interface TableColumn<T = any> {
  /**
   * 列标识，用于数据索引
   */
  key: string;

  /**
   * 列标题
   */
  title: ReactNode;

  /**
   * 数据索引，支持嵌套路径，如 'user.name'
   */
  dataIndex: string;

  /**
   * 列宽度，必须为数字类型
   */
  width?: number;

  /**
   * 是否固定列
   */
  fixed?: "left" | "right";

  /**
   * 对齐方式
   */
  align?: "left" | "center" | "right";

  /**
   * 自定义渲染函数
   */
  render?: (value: any, record: T, index: number) => ReactNode;

  /**
   * 是否可排序
   */
  sortable?: boolean;

  /**
   * 是否可筛选
   */
  filterable?: boolean;

  /**
   * 筛选选项
   */
  filters?: { text: string; value: string | number | boolean }[];

  /**
   * 自定义类名
   */
  className?: string;

  /**
   * 自定义样式
   */
  style?: React.CSSProperties;

  /**
   * 响应式配置
   */
  responsive?: {
    /**
     * 是否在移动视图中始终显示
     */
    alwaysShow?: boolean;

    /**
     * 是否在移动视图中作为预览描述
     */
    isPreviewDescription?: boolean;
  };

  /**
   * 表尾渲染函数
   */
  Footer?: ReactNode | (() => ReactNode);
}

/**
 * 分页配置
 */
export interface TablePagination {
  /**
   * 当前页码
   */
  current: number;

  /**
   * 每页条数
   */
  pageSize: number;

  /**
   * 总数据条数
   */
  total: number;

  /**
   * 页码改变回调
   */
  onChange: (page: number, pageSize: number) => void;

  /**
   * 是否显示快速跳转
   */
  showQuickJumper?: boolean;

  /**
   * 是否显示页码选择器
   */
  showSizeChanger?: boolean;

  /**
   * 每页条数选项
   */
  pageSizeOptions?: string[];

  /**
   * 是否显示总数
   */
  showTotal?: (total: number, range: [number, number]) => ReactNode;
}

/**
 * 表格属性
 */
export interface TableProps<T = any> {
  /**
   * 数据源
   */
  dataSource: T[];

  /**
   * 列配置
   */
  columns: TableColumn<T>[];

  /**
   * 是否显示边框
   */
  bordered?: boolean;

  /**
   * 表格大小
   */
  size?: "small" | "medium" | "large";

  /**
   * 是否加载中
   */
  loading?: boolean;

  /**
   * 分页配置
   */
  pagination?: TablePagination | false;

  /**
   * 行选择配置
   */
  rowSelection?: {
    /**
     * 选中的行key数组
     */
    selectedRowKeys: (string | number)[];

    /**
     * 选择项发生变化时的回调
     */
    onChange: (selectedRowKeys: (string | number)[], selectedRows: T[]) => void;

    /**
     * 是否可选择多行
     */
    type?: "checkbox" | "radio";
  };

  /**
   * 行key获取函数
   */
  rowKey?: string | ((record: T) => string);

  /**
   * 表格行点击事件
   */
  onRowClick?: (record: T, index: number, event: React.MouseEvent) => void;

  /**
   * 自定义类名
   */
  className?: string;

  /**
   * 自定义样式
   */
  style?: React.CSSProperties;

  /**
   * 表格标题
   */
  title?: ReactNode | (() => ReactNode);

  /**
   * 表格底部
   */
  footer?: ReactNode | (() => ReactNode);
}
