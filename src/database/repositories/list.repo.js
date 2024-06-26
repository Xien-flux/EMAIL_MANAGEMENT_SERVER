const { GenericRepo } = require('./generic/index');
const { ListModel } = require('../models/List');

class ListRepo extends GenericRepo {
  constructor(model) {
    super(model)
  }
  getById(_id) {
    return this.model.findById(_id).populate('user').exec()
  }

  getByName(name) {
    return this.model.findOne({ name })
  }
}

exports.List = new ListRepo(ListModel);