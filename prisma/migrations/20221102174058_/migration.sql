-- CreateTable
CREATE TABLE `clients` (
    `id` VARCHAR(191) NOT NULL,
    `client` VARCHAR(191) NOT NULL,
    `stepsId` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `clients_client_key`(`client`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `steps` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `isInitial` BOOLEAN NOT NULL DEFAULT false,
    `type` VARCHAR(191) NOT NULL,
    `message` VARCHAR(191) NOT NULL,
    `form` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `chat_history` (
    `id` VARCHAR(191) NOT NULL,
    `message_id` VARCHAR(191) NOT NULL,
    `ack` INTEGER NOT NULL,
    `has_media` BOOLEAN NOT NULL DEFAULT false,
    `body` LONGTEXT NOT NULL,
    `type` VARCHAR(191) NOT NULL,
    `timestamp` INTEGER NOT NULL,
    `from` VARCHAR(191) NOT NULL,
    `to` VARCHAR(191) NOT NULL,
    `author` VARCHAR(191) NULL,
    `device_type` VARCHAR(191) NULL,
    `is_forwarded` BOOLEAN NOT NULL DEFAULT false,
    `from_me` BOOLEAN NOT NULL DEFAULT false,
    `has_quoted_msg` BOOLEAN NOT NULL DEFAULT false,
    `is_gif` BOOLEAN NOT NULL DEFAULT false,
    `is_ephemeral` BOOLEAN NOT NULL DEFAULT false,
    `has_reaction` BOOLEAN NOT NULL DEFAULT false,
    `is_dynamic_reply_buttons_msg` BOOLEAN NOT NULL DEFAULT false,
    `v_cards` VARCHAR(191) NULL,
    `mentioned_ids` VARCHAR(191) NULL,
    `links` VARCHAR(191) NULL,
    `location` VARCHAR(191) NULL,
    `quotedStanzaID` VARCHAR(191) NULL,
    `quotedParticipant` VARCHAR(191) NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    UNIQUE INDEX `chat_history_message_id_key`(`message_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `clients` ADD CONSTRAINT `clients_stepsId_fkey` FOREIGN KEY (`stepsId`) REFERENCES `steps`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
