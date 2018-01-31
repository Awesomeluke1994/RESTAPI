var ObjectID = require('mongodb').ObjectID;


module.exports = function (app, db) {
    app.get('/user/:id', (req, res) => {
        const id = req.params.id;
        const details = { '_id': new ObjectID(id) };
        db.collection('user').findOne(details, (err, item) => {
            if (err) {
                res.send({ 'error': 'An Error as occured' });
            } else {
                res.send(item);
            }
        })
    })

    app.post('/user', (req, res) => {
        const user = {
            id: req.body.id,
            email: req.body.email,
            forename: req.body.forename,
            surname: req.body.surname,
            created: req.body.created
        };
        db.collection('user').insert(user, (err, result) => {
            if (err) {
                res.send({ 'error': 'An error has occurred' });
            } else {
                res.send(result.ops[0]);
            }
        })
    })

    app.delete('/user/:id', (req, res) => {
        const id = req.params.id;
        const details = { '_id': new ObjectID(id) };
        db.collection('user').remove(details, (err, item) => {
            if (err) {
                res.send({ 'error': 'An Error as occured' });
            } else {
                res.send('user has been removed');
            }
        })
    })

    app.put('/user/:id', (req,res) => {
        const id =  req.params.id;
        const details = {'_id': new ObjectID(id)};
        const user = {
            id: req.body.id,
            email: req.body.email,
            forename: req.body.forename,
            surname: req.body.surname,
            created: req.body.created
        };
        db.collection('user').update(details, user, (err,item) => {
            if (err) {
                res.send({ 'error': 'An Error as occured' });
            } else {
                res.send(user);
            }
        })
    })
}
