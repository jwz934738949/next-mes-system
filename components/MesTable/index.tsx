'use client'

import {
    Table,
    TableHeader,
    TableBody,
    TableColumn,
    TableRow,
    TableCell,
    Button
} from "@heroui/react";
import { Key, Fragment, useState } from "react";
import { ChevronDown, ChevronRight } from 'lucide-react'

export type MesTableColumnProps<T> = {
    key: string;
    label: string;
    align?: 'start' | 'center' | 'end'; // start | center | end
    width?: number | `${number}%`;
    minWidth?: number | `${number}%`;
    maxWidth?: number | `${number}%`;
    render?: (item: T) => React.ReactNode;
}

type MesTableProps<T> = {
    columns: MesTableColumnProps<T>[];
    data: T[];
    headerBtns?: React.ReactNode;
    rowKey?: string;
    // 树形数据相关属性
    treeExpandAll?: boolean; // 是否默认展开所有节点
    defaultExpandedKeys?: Set<string>; // 默认展开的节点ID集合
}





const MesTable = <T,>({
    columns,
    data,
    headerBtns,
    rowKey = 'id',
    treeExpandAll = false,
    defaultExpandedKeys = new Set<string>()
}: MesTableProps<T>) => {
    const [expandedIds, setExpandedIds] = useState<Set<string>>(
        treeExpandAll ? new Set(data.map(item => (item as any)[rowKey])) : defaultExpandedKeys
    );

    const formatTableCell = (item: T, columnKey: Key) => {
        const currentColumn = columns.find(item => item.key === columnKey);
        if (currentColumn?.render) {
            return currentColumn.render(item);
        }

        return item[columnKey as keyof T] as string;
    }

    // 递归渲染树形结构
    const renderTreeItems = (
        items: any[],
        level = 0,
        expandedIds: Set<string>,
        setExpandedIds: (ids: Set<string>) => void
    ) => {
        return items.map((item) => {
            const hasChildren = item.children && item.children.length > 0;
            const isExpanded = expandedIds.has(item.id);

            const toggleExpand = () => {
                if (hasChildren) {
                    const newExpandedIds = new Set(expandedIds);
                    if (isExpanded) {
                        newExpandedIds.delete(item.id);
                    } else {
                        newExpandedIds.add(item.id);
                    }
                    setExpandedIds(newExpandedIds);
                }
            };

            return (
                <Fragment key={item.id}>
                    <TableRow>
                        {columns.map((column) => {
                            // 第一列添加缩进和展开/折叠按钮
                            if (column.key === columns[0].key) {
                                return (
                                    <TableCell key={column.key}>
                                        <div className="flex items-center gap-2">
                                            {/* 缩进显示层级 */}
                                            <div style={{ width: `${level * 2}rem` }} />

                                            {/* 展开/折叠按钮 */}
                                            {hasChildren && (
                                                <div className="cursor-pointer">
                                                    {isExpanded ? (
                                                        <ChevronDown size={16} onClick={toggleExpand} />
                                                    ) : (
                                                        <ChevronRight size={16} onClick={toggleExpand} />
                                                    )}
                                                </div>
                                            )}
                                            <span>{item[column.key]}</span>
                                        </div>
                                    </TableCell>
                                );
                            }
                            // 其他列正常渲染
                            return (
                                <TableCell key={column.key}>
                                    {formatTableCell(item, column.key)}
                                </TableCell>
                            );
                        })}
                    </TableRow>

                    {/* 递归渲染子节点 */}
                    {hasChildren && isExpanded && (
                        renderTreeItems(item.children, level + 1, expandedIds, setExpandedIds)
                    )}
                </Fragment>
            );
        });
    };

    return (
        <div>
            <div className="flex justify-between items-center pb-4">
                <div>

                </div>
                {headerBtns}
            </div>
            <Table aria-label="MesTable">
                <TableHeader columns={columns}>
                    {({ key, ...rest }) => <TableColumn key={key} {...rest}>{rest.label}</TableColumn>}
                </TableHeader>
                <TableBody emptyContent={"No rows to display."}>
                    {renderTreeItems(data, 0, expandedIds, setExpandedIds)}
                </TableBody>
            </Table>
        </div>
    )
}

export default MesTable;