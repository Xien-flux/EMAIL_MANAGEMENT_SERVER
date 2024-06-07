const { recipientModel } = require('../models/Recipient');
const { GenericRepo } = require('./generic');

// const RecipientRepo = new GenericRepo(recipientModel);
class RecipientRepo extends GenericRepo{
  constructor(model) {
    super(model);
  }

  getByIdAndTagId(tagId, _id) {
    return this.model.findOne({ _id, tagId });
  }

  getByEmailAndTagId(tagId, email) {
    return this.model.findOne({ email, tagId });
  }
}

const Recipient = new RecipientRepo(recipientModel);

exports.Recipient = Recipient;
