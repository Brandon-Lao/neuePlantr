const Sequelize = require('sequelize');
const sequelize = new Sequelize('postgres://localhost:5432/plantr');

const Gardener = sequelize.define('gardners', {
  name: {
    type: Sequelize.STRING,
  },
  age: {
    type: Sequelize.INTEGER,
  },
});

const Plot = sequelize.define('plots', {
  size: {
    type: Sequelize.INTEGER,
  },
  shaded: {
    type: Sequelize.BOOLEAN,
  },
});

const Vegetable = sequelize.define('vegetables', {
  name: {
    type: Sequelize.STRING
  },
  color: {
    type: Sequelize.STRING
  },
  plantedOn: {
    type: Sequelize.DATE,
    allowNull: true
  },
});

Plot.belongsTo(Gardener);
Gardener.hasOne(Plot);

Vegetable.belongsToMany(Plot, { through: 'crop' });
Plot.belongsToMany(Vegetable, { through: 'crop' });

Gardener.belongsTo(Vegetable, { as: 'favorite_vegetable' });

module.exports = {db: sequelize, Vegetable, Plot, Gardener};

/* By exporting the modules like this, we export the modules as
a sequelize database object, allowing us to directly affect the models
with sequelize commands.  If we just raw export sequelize, then we'd
need to call sequelize commands on the models that we export
with db.model('modelname').name({}).

I'm probably remembering this wrong, but faulty understanding that allows
reproducable functional code is better than no understanding and failing code.
Probably.*/
