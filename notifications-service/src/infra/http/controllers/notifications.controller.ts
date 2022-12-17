import { Body, Controller, Post } from '@nestjs/common';
import { SendNotification } from '@app/useCases/sendNotification';
import { CreateNotificationBody } from '../dtos/create-notification-body';
import { NotificationViewModel } from '../view-models/notificationViewModel';
import { Get, Param, Patch } from '@nestjs/common/decorators';
import { CancelNotification } from '@app/useCases/cancelNotification';
import { ReadNotification } from '@app/useCases/readNotifications';
import { UnreadNotification } from '@app/useCases/unreadNotification';
import { CountRecipientNotification } from '@app/useCases/countRecipientNotifications';
import { GetRecipientNotifications } from '@app/useCases/getRecipientNotification';

@Controller('notifications')
export class NotificationsController {
	constructor(
		private sendNotification: SendNotification,
		private cancelNotification: CancelNotification,
		private readNotification: ReadNotification,
		private unreadNotification: UnreadNotification,
		private countRecipientNotification: CountRecipientNotification,
		private getRecipientNotification: GetRecipientNotifications,
	) {}

	@Patch(':id/cancel')
	async cancel(@Param('id') id: string) {
		await this.cancelNotification.execute({ notificationId: id });
	}

	@Get('count/from/:recipientId')
	async countFromRecipient(@Param('recipientId') recipientId: string) {
		const { count } = await this.countRecipientNotification.execute({
			recipientId,
		});

		return { count };
	}

	@Get('from/:recipientId')
	async getFromRecipient(@Param('recipientId') recipientId: string) {
		const { notifications } = await this.getRecipientNotification.execute({
			recipientId,
		});

		return {
			notifications: notifications.map(NotificationViewModel.toHTTP),
		};
	}

	@Patch(':id/read')
	async read(@Param('id') id: string) {
		await this.readNotification.execute({ notificationId: id });
	}

	@Patch(':id/unread')
	async unread(@Param('id') id: string) {
		await this.unreadNotification.execute({ notificationId: id });
	}

	@Post()
	async create(@Body() body: CreateNotificationBody) {
		const { category, content, recipientId } = body;

		const { notification } = await this.sendNotification.execute({
			category,
			content,
			recipientId,
		});

		return {
			notification: NotificationViewModel.toHTTP(notification),
		};
	}
}
