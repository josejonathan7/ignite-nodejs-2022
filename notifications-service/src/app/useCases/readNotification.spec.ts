import { makeNotification } from '@test/factories/notificationFactory';
import { InMemoryNotificationsRepository } from '@test/repositories/inMemoryNotificationRepositorie';
import { NotificationNotFound } from './errors/notificationNotFound';
import { ReadNotification } from './readNotifications';

describe('Cancel Notification', () => {
	it('should be able to read a notification', async () => {
		const notificationsRepository = new InMemoryNotificationsRepository();
		const readNotification = new ReadNotification(notificationsRepository);
		const notification = makeNotification();

		await notificationsRepository.create(notification);

		await readNotification.execute({ notificationId: notification.id });

		expect(notificationsRepository.notifications[0].readAt).toEqual(
			expect.any(Date),
		);
	});

	it('should not be able to read a non existing notification', async () => {
		const notificationsRepository = new InMemoryNotificationsRepository();
		const readNotification = new ReadNotification(notificationsRepository);

		await expect(() => {
			return readNotification.execute({
				notificationId: 'fake id',
			});
		}).rejects.toThrow(NotificationNotFound);
	});
});
