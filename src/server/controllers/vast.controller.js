const _ = require('lodash');
const VastService = new (require('../services/vast.service')).VastService();
const VastGenerator = new (require('../utils/vastGenerator')).VastGenerator();

exports.VastController = class {
  async fetchVasts() {
    try {
      return await VastService.fetchVasts();
    } catch (e) {
      throw new Error(e);
    }
  }

  async createVast(request) {
    if (!request.body.vastUrl) { // vast should I throw here error
      throw new Error('Vast Url is required');
    }
    const vast = {
      vastUrl: request.body.vastUrl,
      position: request.body.position || 'bottom_right', // vast add default params
      width: request.body.width || 100,
      height: request.body.height || 100 // should i use body here or in routes
    };
    try {
      return await VastService.createVast(vast);
    } catch (e) {
      throw new Error(e);
    }
  }

  async editVast(request) {
    if (!request.body.id) {
      throw new Error('Vast id is required');
    }
    if (_.isEmpty(_.omit(request.body, 'id'))) {
      throw new Error('At least one of the properties is required');
    }
    const { id } = request.body;
    try {
      const oldVast = await VastService.getVastById(id);
      const updatedVast = {
        vastUrl: request.body.vastUrl ? request.body.vastUrl : oldVast.dataValues.vastUrl,
        position: request.body.position ? request.body.position : oldVast.dataValues.position,
        width: request.body.width ? request.body.width : oldVast.dataValues.width,
        height: request.body.height ? request.body.height : oldVast.dataValues.height,
      };
      return await VastService.editVast(id, updatedVast);
    } catch (err) {
      console.log(`${err.message}`);
      throw new Error(err);
    }
  }

  async getVastById(request) {
    const { id } = request.query;
    if (!id) {
      throw new Error('Vast id is required');
    }
    try {
      const vast = await VastService.getVastById(id);
      const xmlAsVast = vast && vast.id ? VastGenerator.generateVast(vast.id, vast.vastUrl, vast.position, vast.height, vast.width) : VastGenerator.generateEmptyVast();
      return xmlAsVast;
    } catch (e) {
      throw new Error(e);
    }
  }
};
