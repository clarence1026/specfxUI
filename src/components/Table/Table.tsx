/**
 * Table组件
 * 基于原始speccapitals-crm项目中的BaseTable组件进行改进
 * 提供响应式表格功能，支持导出和自定义列渲染
 */
import React, { useState, useEffect, useCallback } from "react";
import { useMediaQuery } from "react-responsive";
import ReactTable from "react-table-6";
import "react-table-6/react-table.css";
import { FormattedMessage } from "react-intl";
import classNames from "classnames";
import { Button } from "../Button";
import { useTheme } from "../../styles/theme";
import ResponsiveTable from "./ResponsiveTable";
import { tableStyles } from "./styles";
// 导入类型定义
import { TableProps, TableColumn, TablePagination } from "./types";
import styles from "./Table.module.scss";

/**
 * Table组件
 * 提供表格功能，支持响应式布局
 */
export const Table = <T extends Record<string, any>>({
  dataSource,
  columns,
  loading = false,
  pagination,
  bordered = true,
  size = "medium",
  rowKey = "id",
  onRowClick,
  exportOptions,
  isResponsive = true,
  className,
  style,
  renderMobileRow,
  mobileBreakpoint = 768,
  ...restProps
}: TableProps<T> & {
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
}) => {
  const theme = useTheme();
  const [isMobile, setIsMobile] = useState(false);
  const [expandedRows, setExpandedRows] = useState<Record<string, boolean>>({});

  // 使用useMediaQuery钩子创建媒体查询
  const isDesktop = useMediaQuery({ minWidth: 768 });

  // 检测是否为移动设备
  useEffect(() => {
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth <= mobileBreakpoint);
    };

    checkIsMobile();
    window.addEventListener("resize", checkIsMobile);

    return () => {
      window.removeEventListener("resize", checkIsMobile);
    };
  }, [mobileBreakpoint]);

  // 切换行展开状态
  const toggleRowExpand = useCallback((rowId: string) => {
    setExpandedRows((prev) => ({
      ...prev,
      [rowId]: !prev[rowId],
    }));
  }, []);

  // 表格容器类名
  const tableContainerClassNames = classNames(
    styles.tableContainer,
    {
      [styles.tableSmall]: size === "small",
      [styles.tableMedium]: size === "medium",
      [styles.tableLarge]: size === "large",
      [styles.tableBordered]: bordered,
    },
    className
  );

  // 转换列配置为ReactTable格式
  const tableColumns = columns.map(
    ({
      key,
      title,
      dataIndex,
      render,
      sortable = false,
      width,
      ...columnProps
    }: TableColumn<T>) => ({
      Header:
        typeof title === "string"
          ? () => <FormattedMessage id={title} />
          : title,
      accessor: dataIndex,
      sortable,
      // 确保 width 是数字类型
      width: typeof width === "number" ? width : undefined,
      Cell: render
        ? ({ original }: { original: T }) =>
            render(original[dataIndex], original, dataSource.indexOf(original))
        : undefined,
      ...columnProps,
    })
  );

  // 分页配置
  const paginationConfig =
    pagination !== false
      ? {
          page: (pagination?.current || 1) - 1,
          pageSize: pagination?.pageSize || 10,
          pages: pagination
            ? Math.ceil(pagination.total / pagination.pageSize)
            : undefined,
          showPagination: true,
          onPageChange: pagination
            ? (page: number) => {
                pagination.onChange(page + 1, pagination.pageSize);
              }
            : undefined,
          onPageSizeChange: pagination?.showSizeChanger
            ? (pageSize: number, page: number) => {
                pagination.onChange(page + 1, pageSize);
              }
            : undefined,
        }
      : {
          showPagination: false,
        };

  // 行点击处理
  const handleRowClick = onRowClick
    ? (state: any, rowInfo: any) => ({
        onClick: (e: React.MouseEvent) => {
          onRowClick(rowInfo.original, rowInfo.index, e);
        },
      })
    : undefined;

  // 响应式表格渲染
  if (isMobile && renderMobileRow) {
    return (
      <div className={tableContainerClassNames} style={style}>
        {exportOptions &&
          (exportOptions.onExportXls || exportOptions.onExportCsv) && (
            <div className={styles.tableActions}>
              {exportOptions.onExportXls && (
                <Button
                  onClick={() =>
                    exportOptions.onExportXls?.(exportOptions.searchParams)
                  }
                  loading={exportOptions.isXlsLoading}
                  disabled={exportOptions.isXlsLoading}
                >
                  <FormattedMessage id="justExportXls" />
                </Button>
              )}
              {exportOptions.onExportCsv && (
                <Button
                  onClick={() =>
                    exportOptions.onExportCsv?.(exportOptions.searchParams)
                  }
                  loading={exportOptions.isCsvLoading}
                  disabled={exportOptions.isCsvLoading}
                >
                  <FormattedMessage id="justExportCsv" />
                </Button>
              )}
            </div>
          )}
        <div className={styles.responsiveTable}>
          <div className={styles.responsiveTableHead}></div>
          <div>
            {dataSource.map((row, index) => {
              const rowId = `row-${index}`;
              const isExpanded = expandedRows[rowId] || false;

              return (
                <div
                  key={rowId}
                  className={classNames(styles.responsiveTableRow, {
                    [styles.responsiveTableRowOpened]: isExpanded,
                  })}
                >
                  <button
                    className={styles.responsiveTableRowPreview}
                    onClick={() => toggleRowExpand(rowId)}
                  >
                    <div className={styles.responsiveTablePreviewMain}>
                      {renderMobileRow(row, "preview")}
                      <button
                        className={styles.responsiveTableToggleBtn}
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleRowExpand(rowId);
                        }}
                      >
                        {isExpanded ? "收起" : "展开"}
                      </button>
                    </div>
                  </button>
                  {isExpanded && (
                    <div className={styles.responsiveTableRowDetails}>
                      {renderMobileRow(row, "details")}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  }

  // 桌面表格渲染
  return (
    <div className={tableContainerClassNames} style={style}>
      {exportOptions &&
        (exportOptions.onExportXls || exportOptions.onExportCsv) && (
          <div className={styles.tableActions}>
            {exportOptions.onExportXls && (
              <Button
                onClick={() =>
                  exportOptions.onExportXls?.(exportOptions.searchParams)
                }
                loading={exportOptions.isXlsLoading}
                disabled={exportOptions.isXlsLoading}
              >
                <FormattedMessage id="justExportXls" />
              </Button>
            )}
            {exportOptions.onExportCsv && (
              <Button
                onClick={() =>
                  exportOptions.onExportCsv?.(exportOptions.searchParams)
                }
                loading={exportOptions.isCsvLoading}
                disabled={exportOptions.isCsvLoading}
              >
                <FormattedMessage id="justExportCsv" />
              </Button>
            )}
          </div>
        )}
      <ReactTable
        data={dataSource}
        columns={tableColumns}
        loading={loading}
        resizable={false}
        getTrProps={handleRowClick}
        previousText={<FormattedMessage id="justPrevious" />}
        nextText={<FormattedMessage id="justNext" />}
        loadingText={<FormattedMessage id="justLoading" />}
        noDataText={<FormattedMessage id="noData" />}
        pageText={<FormattedMessage id="justPage" />}
        ofText={<FormattedMessage id="justOf" />}
        rowsText=""
        className={`-striped -highlight ${bordered ? "-bordered" : ""}`}
        {...paginationConfig}
        {...restProps}
      />
    </div>
  );
};

export default Table;
