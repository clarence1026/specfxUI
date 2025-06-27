/**
 * Table组件
 * 基于原始speccapitals-crm项目中的BaseTable组件进行改进
 * 提供响应式表格功能，支持导出和自定义列渲染
 */
import React from "react";
import "react-table-6/react-table.css";
import { TableProps } from "./types";
/**
 * Table组件
 * 提供表格功能，支持响应式布局
 */
export declare const Table: <T extends Record<string, any>>({ dataSource, columns, loading, pagination, bordered, size, rowKey, onRowClick, exportOptions, isResponsive, className, style, renderMobileRow, mobileBreakpoint, ...restProps }: TableProps<T> & {
    exportOptions?: {
        onExportXls?: (searchParams?: any) => void;
        onExportCsv?: (searchParams?: any) => void;
        isXlsLoading?: boolean;
        isCsvLoading?: boolean;
        searchParams?: any;
    };
    isResponsive?: boolean;
    renderMobileRow?: (row: T, type: string) => React.ReactNode;
    mobileBreakpoint?: number;
}) => React.JSX.Element;
export default Table;
