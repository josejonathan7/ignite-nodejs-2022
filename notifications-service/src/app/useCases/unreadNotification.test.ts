import { makeNotification } from '@test/factories/notificationFactory';
import { InMemoryNotificationsRepository } from '@test/repositories/inMemoryNotificationRepositorie';
import { NotificationNotFound } from './errors/notificationNotFound';
import { UnreadNotification } from './unreadNotification';

describe('Unread Notification', () => {
	it('should be able to unread a notification', async () => {
		const notificationsRepository = new InMemoryNotificationsRepository();
		const unreadNotification = new UnreadNotification(
			notificationsRepository,
		);
		const notification = makeNotification({
			readAt: new Date(),
		});

		await notificationsRepository.create(notification);

		await unreadNotification.execute({ notificationId: notification.id });

		expect(notificationsRepository.notifications[0].readAt).toBeNull();
	});

	it('should not be able to unread a non existing notification', async () => {
		const notificationsRepository = new InMemoryNotificationsRepository();
		const unreadNotification = new UnreadNotification(
			notificationsRepository,
		);

		await expect(() => {
			return unreadNotification.execute({
				notificationId: 'fake id',
			});
		}).rejects.toThrow(NotificationNotFound);
	});
});
