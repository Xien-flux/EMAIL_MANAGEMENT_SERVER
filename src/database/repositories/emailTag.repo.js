const { GenericRepo } = require('./generic/index');
const { EmailTagModel } = require('../models/EmailTags');

class EmailTagRepo extends GenericRepo {
  constructor(model) {
    super(model)
  }
  getById(_id) {
    return this.model.findById(_id).populate('user').exec()
  }

  getBySlug(slug) {
    return this.model.findOne({slug})
  }

  getRecipientByEmail(tagId, recipientEmail) {
    return this.model.findOne({
      _id: tagId,
      'emailRecipients.email': recipientEmail
    });

  }

  updateRecipientByTagId(tagId, recipientEmail) {
    return this.model.findByIdAndUpdate(
      tagId,
      { $push: { emailRecipients: { email: recipientEmail } } },
      { new: true, useFindAndModify: false }
    );

  }
}

exports.EmailTag = new EmailTagRepo(EmailTagModel);