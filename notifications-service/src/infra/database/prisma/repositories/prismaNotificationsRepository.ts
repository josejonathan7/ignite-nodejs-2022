import { Injectable } from '@nestjs/common';
import { Notification } from '@app/entities/notification';
import { NotificationsRepository } from '@app/repositories/notificationRepository';
import { PrismaService } from '../prisma.service';
import { PrismaNotificationMapper } from '@infra/database/mappers/prismaNotificationMappers';

@Injectable()
export class PrismaNotificationsRepository implements NotificationsRepository {
	constructor(private prisma: PrismaService) {}

	async findManyByRecipientId(recipientId: string): Promise<Notification[]> {
		const notifications = await this.prisma.notification.findMany({
			where: {
				recipientId,
			},
		});

		return notifications.map(PrismaNotificationMapper.toDomain);
	}

	async findById(notificationId: string): Promise<Notification | null> {
		const notification = await this.prisma.notification.findUnique({
			where: {
				id: notificationId,
			},
		});

		if (!notification) {
			return null;
		}

		return PrismaNotificationMapper.toDomain(notification);
	}

	async save(notification: Notification): Promise<void> {
		const raw = PrismaNotificationMapper.toPrisma(notification);

		await this.prisma.notification.update({
			where: {
				id: raw.id,
			},
			data: raw,
		});
	}

	async countManyByRecipientId(recipientId: string): Promise<number> {
		const count = await this.prisma.notification.count({
			where: {
				recipientId,
			},
		});

		return count;
	}

	async create(notification: Notification): Promise<void> {
		const raw = PrismaNotificationMapper.toPrisma(notification);

		await this.prisma.notification.create({
			data: raw,
		});
	}
}
