const builder = require('xmlbuilder');

const generateUrl = (base_url, vastUrl, position, vast_id) => `${base_url}=${vastUrl}&position=${position}&vastId=${vast_id}`;

const vastDefaultConfig = {
  version: '2.0',
  adSystem: '2.0',
  mediaFile: {
    type: 'application/javascript',
    apiFramework: 'VAPID'
  },
  base_url: 'https://cheq.com/vpaid.js?vast',
};

exports.VastGenerator = class {
  generateVast(vast_id, vastUrl, position, height, width,
    version = vastDefaultConfig.version,
    adSystem = vastDefaultConfig.adSystem, mediaFileType = vastDefaultConfig.mediaFile.type,
    apiFramework = vastDefaultConfig.mediaFile.apiFramework,
    base_url = vastDefaultConfig.base_url) {
    const vastConfig = {
      version,
      adSystem,
      mediaFile: {
        type: mediaFileType,
        apiFramework,
        height,
        width,
      },
      cdata: {
        url: generateUrl(base_url, vastUrl, position, vast_id),
      }
    };

    const xml = builder.create('Vast').att('Version', '2.0')
      .ele('Ad')
      .ele('InLine')
      .ele('AdSystem', '2.0')
      .up()
      .ele('Creatives')
      .ele('Creative')
      .ele('Linear')
      .ele('MediaFiles')
      .ele('MediaFile', {
        type: vastConfig.mediaFile.type,
        apiFramework: vastConfig.mediaFile.apiFramework,
        height: vastConfig.mediaFile.height,
        width: vastConfig.mediaFile.width
      })
      .dat(vastConfig.cdata.url)
      .end({ pretty: true });
    return xml;
  }

  generateEmptyVast() {
    const xml = builder.create('Vast').att('Version', '2.0')
      .end({ pretty: true, allowEmpty: true });
    return xml;
  }
};
