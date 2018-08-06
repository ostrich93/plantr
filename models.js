const {Sequelize} = require('sequelize');

const db = new Sequelize('postgres://localhost:5432/plantr');
module.exports = db;

const Gardener = db.define('gardener', {
    name: Sequelize.STRING,
    age: Sequelize.INTEGER
});

const Plot = db.define('plot', {
    size: Sequelize.INTEGER,
    shaded: Sequelize.BOOLEAN
});

const Vegetable = db.define('vegetable', {
    name: Sequelize.STRING,
    color: Sequelize.STRING,
    planted_on: Sequelize.DATE
});

Plot.belongsTo(Gardener);
Gardener.hasOne(Plot);

Vegetable.belongsToMany(Plot, {through: 'vegetable_plot'});
Plot.belongsToMany(Vegetable, {through: 'vegetable_plot'});

Gardener.belongsTo(Vegetable, {as: 'favorite_vegetable'});

const carrot = Vegetable.findOrCreate({where: {name: 'carrot', color: 'orange', planted_on: '1995-12-17T03:24:00'}});
const tomato = Vegetable.findOrCreate({where: {name: 'tomato', color: 'red', planted_on: '1995-12-17T03:24:00'}});

Promise.all([carrot, tomato]).then(console.log())
