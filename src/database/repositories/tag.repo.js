const { GenericRepo } = require('./generic/index');
const { TagModel } = require('../models/Tag');

class TagRepo extends GenericRepo {
  constructor(model) {
    super(model)
  }
  getById(_id) {
    return this.model.findById(_id).populate('user').exec()
  }

  getBySlug(slug) {
    return this.model.findOne({slug})
  }

  getRecipientById(tagId, recipientId) {
    return this.model.findOne({
      _id: tagId,
      "emailRecipients._id": recipientId
    });
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

  updateRecipientEmailByRecipientId(tagId, recipientId, newEmail) {
    return this.model.updateOne(
      { _id: tagId, 'emailRecipients._id': recipientId },
      { $set: { 'emailRecipients.$.email': newEmail } }
    );
  }

  deleteRecipientById(tagId, recipientId) {
    return this.model.updateOne(
      { _id: tagId },
      { $pull: { emailRecipients: { _id: recipientId } } }
    );

  }
}

exports.Tag = new TagRepo(TagModel);