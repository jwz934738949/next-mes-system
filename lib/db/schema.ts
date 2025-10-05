import { sql } from "drizzle-orm";
import {
  char,
  datetime,
  int,
  mysqlTable,
  primaryKey,
  text,
  varchar,
} from "drizzle-orm/mysql-core";

export const prismaMigrations = mysqlTable(
  "_prisma_migrations",
  {
    id: varchar({ length: 36 }).notNull(),
    checksum: varchar({ length: 64 }).notNull(),
    finishedAt: datetime("finished_at", { mode: "string", fsp: 3 }),
    migrationName: varchar("migration_name", { length: 255 }).notNull(),
    logs: text(),
    rolledBackAt: datetime("rolled_back_at", { mode: "string", fsp: 3 }),
    startedAt: datetime("started_at", { mode: "string", fsp: 3 })
      .default(sql`(CURRENT_TIMESTAMP(3))`)
      .notNull(),
    appliedStepsCount: int("applied_steps_count", { unsigned: true })
      .default(0)
      .notNull(),
  },
  (table) => [
    primaryKey({ columns: [table.id], name: "_prisma_migrations_id" }),
  ]
);

export const sysMenu = mysqlTable(
  "sys_menu",
  {
    menuId: int("menu_id").autoincrement().notNull(),
    menuName: varchar("menu_name", { length: 50 }).notNull(),
    menuType: char("menu_type", { length: 1 }).default("M").notNull(),
    parentId: int("parent_id").notNull(),
    path: varchar({ length: 200 }).default("").notNull(),
    component: varchar({ length: 255 }).default("").notNull(),
    orderNum: int("order_num").default(0).notNull(),
    icon: varchar({ length: 100 }).default("").notNull(),
    isFrame: char("is_frame", { length: 1 }).default("1").notNull(),
    isCache: char("is_cache", { length: 1 }).default("0").notNull(),
    perms: varchar({ length: 100 }).default("").notNull(),
    visible: char({ length: 1 }).default("0").notNull(),
    delFlag: char("del_flag", { length: 1 }).default("0").notNull(),
    createBy: varchar("create_by", { length: 64 }).default("").notNull(),
    createTime: datetime("create_time", { mode: "string", fsp: 6 })
      .default(sql`(CURRENT_TIMESTAMP(6))`)
      .notNull(),
    updateBy: varchar("update_by", { length: 64 }).default("").notNull(),
    updateTime: datetime("update_time", { mode: "string", fsp: 6 })
      .default(sql`(CURRENT_TIMESTAMP(6))`)
      .notNull(),
    remark: varchar({ length: 500 }).default("").notNull(),
  },
  (table) => [primaryKey({ columns: [table.menuId], name: "sys_menu_menu_id" })]
);
