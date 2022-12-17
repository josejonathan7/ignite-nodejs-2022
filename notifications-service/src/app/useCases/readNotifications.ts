import { Injectable } from '@nestjs/common';
import { NotificationsRepository } from '../repositories/notificationRepository';
import { NotificationNotFound } from './errors/notificationNotFound';

interface ReadNotificationRequest {
	notificationId: string;
}

type ReadNotificationResponse = void;

@Injectable()
export class ReadNotification {
	constructor(private notificationsRepositorie: NotificationsRepository) {}

	async execute(
		request: ReadNotificationRequest,
	): Promise<ReadNotificationResponse> {
		const { notificationId } = request;

		const notification = await this.notificationsRepositorie.findById(
			notificationId,
		);

		if (!notification) {
			throw new NotificationNotFound();
		}

		notification.read();

		await this.notificationsRepositorie.save(notification);
	}
}
