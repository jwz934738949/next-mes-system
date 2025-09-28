-- CreateTable
CREATE TABLE `sys_menu` (
    `menu_id` INTEGER NOT NULL AUTO_INCREMENT,
    `menu_name` VARCHAR(50) NOT NULL,
    `menu_type` CHAR(1) NOT NULL DEFAULT 'M',
    `parent_id` INTEGER NOT NULL,
    `path` VARCHAR(200) NOT NULL DEFAULT '',
    `query` VARCHAR(255) NOT NULL DEFAULT '',
    `component` VARCHAR(255) NOT NULL DEFAULT '',
    `order_num` INTEGER NOT NULL DEFAULT 0,
    `icon` VARCHAR(100) NOT NULL DEFAULT '',
    `is_frame` CHAR(1) NOT NULL DEFAULT '1',
    `is_cache` CHAR(1) NOT NULL DEFAULT '0',
    `perms` VARCHAR(100) NOT NULL DEFAULT '',
    `visible` CHAR(1) NOT NULL DEFAULT '0',
    `status` CHAR(1) NOT NULL DEFAULT '0',
    `del_flag` CHAR(1) NOT NULL DEFAULT '0',
    `create_by` VARCHAR(64) NOT NULL DEFAULT '',
    `create_time` DATETIME(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
    `update_by` VARCHAR(64) NOT NULL DEFAULT '',
    `update_time` DATETIME(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
    `remark` VARCHAR(500) NOT NULL DEFAULT '',

    PRIMARY KEY (`menu_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
