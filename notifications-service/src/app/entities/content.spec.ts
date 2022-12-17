import { Content } from './content';

describe('Notification Content', () => {
	it('should be able to create a notification content', () => {
		const content = new Content('você recebeu uma solicitação');

		expect(content).toBeTruthy();
	});

	it('should not be able to create a notification content with less 5 characters', () => {
		expect(() => new Content('você')).toThrow();
	});

	it('should not be able to create a notification content with more 5 characters', () => {
		expect(() => new Content('a'.repeat(241))).toThrow();
	});
});
