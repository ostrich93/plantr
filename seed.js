const {db, Gardener, Plot, Vegetable} = require('./models.js');

const initialSeed = [
    {
        name: 'carrot',
        color: 'orange',
        planted_on: Date.now()
    },
    {
        name: 'tomato',
        color: 'red',
        planted_on: Date.now()
    }
];

db.sync({force: true})
    .then(() => {
        return Vegetable.bulkCreate(initialSeed)
        .then(()=> {console.log('Database synced');})
    })
    .catch(err => {
        console.log('Something went wrong. ');
        console.log(err);
    })
    .finally(() => { 
        db.close();
    });

