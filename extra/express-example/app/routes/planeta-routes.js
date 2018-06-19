module.exports = (app) => {
    const controller = require('../controllers/planeta-controller');

    app.post('/planetas', controller.create);

    app.get('/planetas', controller.findAll);

    app.get('/planetas/:id', controller.findOne);

    app.delete('/planetas/:id', controller.delete);
}
