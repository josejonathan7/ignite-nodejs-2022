import { Injectable } from '@nestjs/common';
import { NotificationsRepository } from '../repositories/notificationRepository';
import { Notification } from '@app/entities/notification';

interface GetRecipientNotificationsRequest {
	recipientId: string;
}

type GetRecipientNotificationsResponse = {
	notifications: Notification[];
};

@Injectable()
export class GetRecipientNotifications {
	constructor(private notificationsRepositorie: NotificationsRepository) {}

	async execute(
		request: GetRecipientNotificationsRequest,
	): Promise<GetRecipientNotificationsResponse> {
		const { recipientId } = request;

		const notifications =
			await this.notificationsRepositorie.findManyByRecipientId(
				recipientId,
			);

		return { notifications };
	}
}
