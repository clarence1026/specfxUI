/**
 * 响应式表格组件
 * 基于原始speccapitals-crm项目中的ResponsiveTable组件进行改进
 * 适用于移动设备的表格展示方式
 */
import React from "react";
import { TableColumn } from "./types";
interface ResponsiveTableProps<T = any> {
    /**
     * 表格数据
     */
    data: T[];
    /**
     * 表格列配置
     */
    columns: TableColumn<T>[];
    /**
     * 行点击事件
     */
    onRowClick: (id: string | number, rowData: any) => void;
    /**
     * 是否使用新版表格样式
     */
    isNewTable?: boolean;
    /**
     * 是否为LPA表格
     */
    isLpaTable?: boolean;
    /**
     * 自定义类名
     */
    className?: string;
    /**
     * 是否显示分页
     */
    showPagination?: boolean;
}
export declare const ResponsiveTable: <T extends Record<string, any>>({ data, columns, onRowClick, isNewTable, isLpaTable, className, showPagination, }: ResponsiveTableProps<T>) => React.JSX.Element;
export default ResponsiveTable;
