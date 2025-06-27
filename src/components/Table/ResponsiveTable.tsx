/**
 * 响应式表格组件
 * 基于原始speccapitals-crm项目中的ResponsiveTable组件进行改进
 * 适用于移动设备的表格展示方式
 */
import React, { useState } from "react";
import classNames from "classnames";
import { FormattedMessage } from "react-intl";
import { TableColumn } from "./types";
import { responsiveTableStyles } from "./styles";
import styles from "./Table.module.scss";

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

export const ResponsiveTable = <T extends Record<string, any>>({
  data,
  columns,
  onRowClick,
  isNewTable = false,
  isLpaTable = false,
  className,
  showPagination = false,
}: ResponsiveTableProps<T>) => {
  const [detailedRows, setDetailedRows] = useState<{ id: string | number }[]>(
    []
  );

  const toggleRowDetails = (e: React.MouseEvent, id: string | number) => {
    e.stopPropagation();
    if (detailedRows.some((item) => item.id === id)) {
      setDetailedRows(detailedRows.filter((item) => item.id !== id));
    } else {
      setDetailedRows([...detailedRows, { id }]);
    }
  };

  // 预览列 - 在移动视图中始终显示的列
  const previewColumns = columns.filter(
    (column) => column.responsive?.alwaysShow
  );

  // 详情列 - 点击展开后显示的列
  const detailColumns = columns.filter(
    (column) => !column.responsive?.alwaysShow
  );

  return (
    <div className={classNames(styles.responsiveTable, className)}>
      <div className="responsive-table-content">
        <div className="sc-responsive-table">
          <div className="sc-responsive-table-thead">
            {previewColumns.map((column, columnId) => (
              <span key={columnId}>
                {typeof column.title === "string" ? (
                  <FormattedMessage id={column.title} />
                ) : (
                  column.title
                )}
              </span>
            ))}
            <span />
          </div>

          <div className="sc-responsive-table-tbody">
            {data.map((rowItem, index) => {
              const rowItemId = isLpaTable
                ? index
                : typeof rowItem.id !== "undefined"
                ? rowItem.id
                : index;
              const isDetailedOpen = detailedRows.some(
                (item) => item.id === rowItemId
              );

              return (
                <div
                  className={classNames("sc-responsive-table-row", {
                    "sc-responsive-table-row-opened": isDetailedOpen,
                  })}
                  key={rowItemId}
                >
                  <div
                    role="button"
                    onClick={() => {
                      const id =
                        isLpaTable && rowItem.user
                          ? rowItem.user.id
                          : rowItemId;
                      onRowClick(id, { original: rowItem });
                    }}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" || e.key === " ") {
                        const id =
                          isLpaTable && rowItem.user
                            ? rowItem.user.id
                            : rowItemId;
                        onRowClick(id, { original: rowItem });
                      }
                    }}
                    className="sc-responsive-table-row-preview"
                    tabIndex={0}
                  >
                    <div className="sc-responsive-table-preview-main">
                      {previewColumns.map((column, columnId) => (
                        <div
                          className="sc-responsive-table-row-item"
                          key={`sc-responsive-table-${rowItemId}-${columnId}`}
                        >
                          {column.render
                            ? column.render(
                                rowItem[column.dataIndex],
                                rowItem,
                                index
                              )
                            : rowItem[column.dataIndex]}
                        </div>
                      ))}
                      <button
                        className="sc-responsive-table-toggle-btn"
                        onClick={(e) => toggleRowDetails(e, rowItemId)}
                        aria-label={isDetailedOpen ? "收起详情" : "展开详情"}
                      >
                        {isDetailedOpen ? "收起" : "展开"}
                      </button>
                    </div>
                  </div>

                  {isDetailedOpen && (
                    <div className="sc-responsive-table-row-details">
                      {detailColumns.map((column, columnId) => (
                        <div
                          className="sc-responsive-table-details-item"
                          key={`sc-responsive-table-detail-${rowItemId}-${columnId}`}
                        >
                          <span className="sc-responsive-table-detail-label">
                            {typeof column.title === "string" ? (
                              <FormattedMessage id={column.title} />
                            ) : (
                              column.title
                            )}
                            :
                          </span>
                          <span className="sc-responsive-table-detail-value">
                            {column.render
                              ? column.render(
                                  rowItem[column.dataIndex],
                                  rowItem,
                                  index
                                )
                              : rowItem[column.dataIndex]}
                          </span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {showPagination && (
        <div className="responsive-table-pagination">{/* 分页组件 */}</div>
      )}

      {React.createElement("style", {
        dangerouslySetInnerHTML: { __html: responsiveTableStyles.toString() },
      })}
    </div>
  );
};

export default ResponsiveTable;
