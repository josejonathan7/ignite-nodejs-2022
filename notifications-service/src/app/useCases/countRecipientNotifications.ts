import { Injectable } from '@nestjs/common';
import { NotificationsRepository } from '../repositories/notificationRepository';

interface CountRecipientNotificationsRequest {
	recipientId: string;
}

type CountRecipientNotificationsResponse = {
	count: number;
};

@Injectable()
export class CountRecipientNotification {
	constructor(private notificationsRepositorie: NotificationsRepository) {}

	async execute(
		request: CountRecipientNotificationsRequest,
	): Promise<CountRecipientNotificationsResponse> {
		const { recipientId } = request;

		const count =
			await this.notificationsRepositorie.countManyByRecipientId(
				recipientId,
			);

		return { count };
	}
}
