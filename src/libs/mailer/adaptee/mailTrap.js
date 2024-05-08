const { EmailAdapter } = require("../generic/index");

const { MailtrapClient } = require("mailtrap");
const Config = require('../../../config');

const { mailTrapEndpoint, mailTrapToken } = Config.mail

class MailTrapAdapter extends EmailAdapter {
	constructor(config) {
		super(config);
		this.client = new MailtrapClient(config);
	}
	async send(email) {
		const $email = this.convertEmail(email);
		try {
			const client = this.client

			const sender = {
				email: "mailtrap@demomailtrap.com",
				name: "Mailtrap Test",
			};
			const recipients = [
				{
					email: $email.to,
				},
			];

			const response = await client.send({
				from: sender,
				to: recipients,
				subject: $email.subject ?? "Interactro Message",
				text: $email.text,
				category: "Integration Test",
			});

			if (!response.success) return { success: false };
			return { success: true };
		} catch (error) {
			console.log("error ", error);
		}
	}
}

const mailTrapAdapter = new MailTrapAdapter({ endpoint: mailTrapEndpoint, token: mailTrapToken });

module.exports = mailTrapAdapter;