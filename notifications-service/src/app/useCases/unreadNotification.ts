import { Injectable } from '@nestjs/common';
import { NotificationsRepository } from '../repositories/notificationRepository';
import { NotificationNotFound } from './errors/notificationNotFound';

interface UnreadNotificationRequest {
	notificationId: string;
}

type UnreadNotificationResponse = void;

@Injectable()
export class UnreadNotification {
	constructor(private notificationsRepositorie: NotificationsRepository) {}

	async execute(
		request: UnreadNotificationRequest,
	): Promise<UnreadNotificationResponse> {
		const { notificationId } = request;

		const notification = await this.notificationsRepositorie.findById(
			notificationId,
		);

		if (!notification) {
			throw new NotificationNotFound();
		}

		notification.unread();

		await this.notificationsRepositorie.save(notification);
	}
}
