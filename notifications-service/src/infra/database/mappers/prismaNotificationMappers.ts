import { Content } from '@app/entities/content';
import { Notification } from '@app/entities/notification';
import { Notification as RawNotification } from '@prisma/client';

export class PrismaNotificationMapper {
	static toPrisma(notification: Notification) {
		return {
			category: notification.category,
			content: notification.content.value,
			recipientId: notification.recipientId,
			createdAt: notification.createdAt,
			readAt: notification.readAt,
			id: notification.id,
		};
	}

	static toDomain(raw: RawNotification): Notification {
		return new Notification(
			{
				category: raw.category,
				content: new Content(raw.content),
				recipientId: raw.recipientId,
				canceledAt: raw.canceledAt,
				createdAt: raw.createdAt,
				readAt: raw.readAt,
			},
			raw.id,
		);
	}
}
