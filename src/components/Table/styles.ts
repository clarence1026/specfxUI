/**
 * 表格组件样式
 * 使用主题系统中定义的颜色和样式规范
 */
import css from "styled-jsx/css";
import { defaultTheme } from "../../styles/theme";

// 从主题中获取颜色
const {
  tableBorderColor,
  tableHeaderBg,
  tableHeaderColor,
  tableRowHoverBg,
  tableRowOddBg,
  tableRowEvenBg,
  primary,
} = defaultTheme.colors;

// 从主题中获取边框样式
const { tableRadius } = defaultTheme.border;

/**
 * 表格基础样式
 */
export const tableStyles = css`
  .sc-table {
    position: relative;
    width: 100%;
    margin-bottom: 20px;
  }

  .sc-table-actions {
    display: flex;
    justify-content: flex-end;
    margin-bottom: 10px;
    gap: 10px;
  }

  /* 表格大小变体 */
  .sc-table-small .ReactTable .rt-thead .rt-th,
  .sc-table-small .ReactTable .rt-tbody .rt-td {
    padding: 5px 8px;
  }

  .sc-table-medium .ReactTable .rt-thead .rt-th,
  .sc-table-medium .ReactTable .rt-tbody .rt-td {
    padding: 8px 12px;
  }

  .sc-table-large .ReactTable .rt-thead .rt-th,
  .sc-table-large .ReactTable .rt-tbody .rt-td {
    padding: 12px 16px;
  }

  /* 带边框的表格 */
  .sc-table-bordered .ReactTable {
    border: 1px solid ${tableBorderColor.hex};
    border-radius: ${tableRadius};
    overflow: hidden;
  }

  .sc-table-bordered .ReactTable .rt-thead .rt-th,
  .sc-table-bordered .ReactTable .rt-tbody .rt-td {
    border-right: 1px solid ${tableBorderColor.hex};
  }

  .sc-table-bordered .ReactTable .rt-thead {
    border-bottom: 1px solid ${tableBorderColor.hex};
  }

  .sc-table-bordered .ReactTable .rt-tbody .rt-tr-group {
    border-bottom: 1px solid ${tableBorderColor.hex};
  }

  /* 表头样式 */
  .ReactTable .rt-thead {
    background-color: ${tableHeaderBg.hex};
    font-weight: 500;
  }

  .ReactTable .rt-thead .rt-th {
    text-align: left;
    color: ${tableHeaderColor.hex};
  }

  /* 表格内容样式 */
  .ReactTable .rt-tbody .rt-tr {
    cursor: pointer;
  }

  .ReactTable .rt-tbody .rt-tr:hover {
    background-color: ${tableRowHoverBg.hex};
  }

  .ReactTable .rt-tbody .rt-tr.-odd {
    background-color: ${tableRowOddBg.hex};
  }

  .ReactTable .rt-tbody .rt-tr.-even {
    background-color: ${tableRowEvenBg.hex};
  }

  /* 分页样式 */
  .ReactTable .-pagination {
    box-shadow: none;
    border-top: 1px solid ${tableBorderColor.hex};
  }

  .ReactTable .-pagination .-btn {
    color: ${primary.hex};
    background-color: transparent;
  }

  .ReactTable .-pagination .-btn:not([disabled]):hover {
    background-color: ${tableRowHoverBg.hex};
    color: ${primary.hex};
  }

  .ReactTable .-pagination input,
  .ReactTable .-pagination select {
    border: 1px solid ${tableBorderColor.hex};
    border-radius: ${tableRadius};
  }

  /* 加载状态 */
  .ReactTable .rt-tbody .rt-tr-group .rt-tr.-padRow {
    height: 100%;
  }

  .ReactTable .-loading {
    background: rgba(255, 255, 255, 0.8);
  }

  .ReactTable .-loading > div {
    color: ${primary.hex};
  }
`;

/**
 * 响应式表格样式
 */
export const responsiveTableStyles = css`
  .sc-responsive-table {
    width: 100%;
    margin-bottom: 20px;
  }

  .sc-responsive-table-thead {
    display: none;
  }

  .sc-responsive-table-row {
    margin-bottom: 10px;
    border: 1px solid ${tableBorderColor.hex};
    border-radius: ${tableRadius};
    overflow: hidden;
  }

  .sc-responsive-table-row-preview {
    padding: 12px;
    cursor: pointer;
    background-color: ${tableRowEvenBg.hex};
    display: block;
    width: 100%;
    text-align: left;
    border: none;
    outline: none;
  }

  .sc-responsive-table-preview-main {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .sc-responsive-table-row-item {
    flex: 1;
    margin-right: 10px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .sc-responsive-table-toggle-btn {
    background-color: transparent;
    border: 1px solid ${tableBorderColor.hex};
    border-radius: ${tableRadius};
    padding: 4px 8px;
    cursor: pointer;
    font-size: 12px;
    color: rgba(0, 0, 0, 0.65);
  }

  .sc-responsive-table-toggle-btn:hover {
    color: ${primary.hex};
    border-color: ${primary.hex};
  }

  .sc-responsive-table-row-details {
    padding: 12px;
    background-color: ${tableRowOddBg.hex};
    border-top: 1px solid ${tableBorderColor.hex};
  }

  .sc-responsive-table-details-item {
    margin-bottom: 8px;
    display: flex;
    flex-direction: column;
  }

  .sc-responsive-table-detail-label {
    font-weight: 500;
    margin-bottom: 4px;
    color: rgba(0, 0, 0, 0.45);
  }

  .sc-responsive-table-detail-value {
    color: rgba(0, 0, 0, 0.65);
  }

  /* 已展开行样式 */
  .sc-responsive-table-row-opened .sc-responsive-table-row-preview {
    background-color: ${tableRowHoverBg.hex};
  }
`;
