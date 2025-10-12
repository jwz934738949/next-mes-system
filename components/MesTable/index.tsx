"use client";

import { Table } from "antd";
import type { ColumnProps } from "antd/es/table";

type MesTableProps<T extends Record<string, unknown>> = {
  columns: ColumnProps<T>[];
  data: T[];
  headerBtns?: React.ReactNode;
  rowKey?: string;
  // 树形数据相关属性
  treeExpandAll?: boolean; // 是否默认展开所有节点
  defaultExpandedKeys?: Set<string>; // 默认展开的节点ID集合
};

const MesTable = <T extends Record<string, unknown>>({
  columns,
  data,
  headerBtns,
  rowKey = "id",
}: MesTableProps<T>) => (
  <div>
    <div className="flex items-center justify-between pb-4">
      <div />
      {headerBtns}
    </div>
    <Table columns={columns} dataSource={data} rowKey={rowKey} />
  </div>
);

export default MesTable;
