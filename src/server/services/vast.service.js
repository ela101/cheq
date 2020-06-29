const Vast = require('../db/models/Vast');

exports.VastService = class {
  async fetchVasts() {
    try {
      return await Vast.findAll();
    } catch (e) {
      throw new Error(e);
    }
  }

  async createVast(vast) {
    try {
      return await Vast.create(vast);
    } catch (e) {
      throw new Error(e);
    }
  }

  async editVast(id, vast) {
    const updatedVast = await Vast.update(vast,
      { where: { id } });
    return updatedVast;
  }

  async getVastById(id) {
    return Vast.findOne({ where: { id } });
  }
};
