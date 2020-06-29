const Sequelize = require('sequelize');
const db = require('../config/database').dbConfiguration;

const vastDefaultValues = {
  POSITION: 'bottom_right',
  WIDTH: 100,
  HEIGHT: 100,
};

const Vast = db.define('Vast', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  vastUrl: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notNull: { msg: 'vast_url is required' },
    },
  },
  position: {
    type: Sequelize.STRING,
    defaultValue: vastDefaultValues.POSITION,
    validate: {
      isIn: {
        args: [['top_left', 'top_middle', 'top_right', 'middle_left', 'middle_right', 'bottom_left', 'bottom_middle', 'bottom_right']],
        msg: 'Must be a valid type',
      },
    },
  },
  width: {
    type: Sequelize.INTEGER,
    defaultValue: vastDefaultValues.WIDTH,
    validate: {
      min: 100,
      max: 1000
    }
  },
  height: {
    type: Sequelize.INTEGER,
    defaultValue: vastDefaultValues.HEIGHT,
    validate: {
      min: 100,
      max: 1000
    }
  },
},
{
  timestamps: false
});

// Vast.sync().then(() => {
//   console.log('table vasts created');
// });

module.exports = Vast;
