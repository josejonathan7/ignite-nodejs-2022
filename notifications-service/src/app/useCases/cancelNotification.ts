import { Injectable } from '@nestjs/common';
import { NotificationsRepository } from '../repositories/notificationRepository';
import { NotificationNotFound } from './errors/notificationNotFound';

interface CancelNotificationRequest {
	notificationId: string;
}

type CancelNotificationResponse = void;

@Injectable()
export class CancelNotification {
	constructor(private notificationsRepositorie: NotificationsRepository) {}

	async execute(
		request: CancelNotificationRequest,
	): Promise<CancelNotificationResponse> {
		const { notificationId } = request;

		const notification = await this.notificationsRepositorie.findById(
			notificationId,
		);

		if (!notification) {
			throw new NotificationNotFound();
		}

		notification.cancel();

		await this.notificationsRepositorie.save(notification);
	}
}
