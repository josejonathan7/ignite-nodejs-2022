import { Content } from '@app/entities/content';
import { Notification } from '@app/entities/notification';
import { InMemoryNotificationsRepository } from '@test/repositories/inMemoryNotificationRepositorie';
import { CancelNotification } from './cancelNotification';
import { NotificationNotFound } from './errors/notificationNotFound';

describe('Cancel Notification', () => {
	it('should be able to cancel a notification', async () => {
		const notificationsRepository = new InMemoryNotificationsRepository();
		const cancelNotification = new CancelNotification(
			notificationsRepository,
		);
		const notification = new Notification({
			category: 'social',
			content: new Content('solicitação'),
			recipientId: 'example',
		});

		await notificationsRepository.create(notification);

		await cancelNotification.execute({ notificationId: notification.id });

		expect(notificationsRepository.notifications[0].canceledAt).toEqual(
			expect.any(Date),
		);
	});

	it('should not be able to cancel a non existing notification', async () => {
		const notificationsRepository = new InMemoryNotificationsRepository();
		const cancelNotification = new CancelNotification(
			notificationsRepository,
		);

		await expect(() => {
			return cancelNotification.execute({
				notificationId: 'fake id',
			});
		}).rejects.toThrow(NotificationNotFound);
	});
});
