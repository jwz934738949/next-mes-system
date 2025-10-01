-- Current sql file was generated after introspecting the database
-- If you want to run this migration please uncomment this code before executing migrations
/*
CREATE TABLE `_prisma_migrations` (
	`id` varchar(36) NOT NULL,
	`checksum` varchar(64) NOT NULL,
	`finished_at` datetime(3),
	`migration_name` varchar(255) NOT NULL,
	`logs` text,
	`rolled_back_at` datetime(3),
	`started_at` datetime(3) NOT NULL DEFAULT (CURRENT_TIMESTAMP(3)),
	`applied_steps_count` int unsigned NOT NULL DEFAULT 0,
	CONSTRAINT `_prisma_migrations_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `sys_menu` (
	`menu_id` int AUTO_INCREMENT NOT NULL,
	`menu_name` varchar(50) NOT NULL,
	`menu_type` char(1) NOT NULL DEFAULT 'M',
	`parent_id` int NOT NULL,
	`path` varchar(200) NOT NULL DEFAULT '',
	`query` varchar(255) NOT NULL DEFAULT '',
	`component` varchar(255) NOT NULL DEFAULT '',
	`order_num` int NOT NULL DEFAULT 0,
	`icon` varchar(100) NOT NULL DEFAULT '',
	`is_frame` char(1) NOT NULL DEFAULT '1',
	`is_cache` char(1) NOT NULL DEFAULT '0',
	`perms` varchar(100) NOT NULL DEFAULT '',
	`visible` char(1) NOT NULL DEFAULT '0',
	`status` char(1) NOT NULL DEFAULT '0',
	`del_flag` char(1) NOT NULL DEFAULT '0',
	`create_by` varchar(64) NOT NULL DEFAULT '',
	`create_time` datetime(6) NOT NULL DEFAULT (CURRENT_TIMESTAMP(6)),
	`update_by` varchar(64) NOT NULL DEFAULT '',
	`update_time` datetime(6) NOT NULL DEFAULT (CURRENT_TIMESTAMP(6)),
	`remark` varchar(500) NOT NULL DEFAULT '',
	CONSTRAINT `sys_menu_menu_id` PRIMARY KEY(`menu_id`)
);

*/