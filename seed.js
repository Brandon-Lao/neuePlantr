const {db, Vegetable, Plot, Gardener} = require('./models');
let cabbage;

db.sync({ force: true })
  .then(() => {
    console.log('Database synced!');
  })
  // .then(() => {
  //   const cabbage = db.Vegetable.create(
  //   {
  //     name: 'Cabbage',
  //     color: 'green',
  //     plantedOn: date()
  //   }
  //   )
  // })
  .then(() => {
    return Vegetable.create(
      {name: 'Cabbage',
      color: 'green',
      plantedOn: null}
      );})
  .then((veg) => {
    cabbage = veg
    return Gardener.create(
      {name: 'Cabbager',
      age: 22}
      );})
  .then(() => {
    return Plot.create(
      {size: 11,
      shaded: true}
      );})
  .then((newPlot) => {
    return db.model('crop').create({
      vegetableId: cabbage.id,
      plotId: newPlot.id}
      );})

  .catch(err => {
    console.log('Disaster! Something went wrong! ');
    console.log(err);
    db.close();
  })