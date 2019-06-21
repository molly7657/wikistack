const express = require('express');
const app = express();
const morgan = require('morgan');
const models = require('./models');
const userRouter = require('./routes/user');
const wikiRouter = require('./routes/wiki');

app.use(express.urlencoded({ extended: false }));
app.use(morgan('dev'));
app.use('/wiki', wikiRouter);
app.use(express.static('public'));
app.use(express.json({ extended: false }));


app.get('/', (req, res) => {
    console.log('hello world')
    res.redirect('/wiki')
});

const port = 3000;

// db.authenticate().
// then(() => {
//     console.log('connected to the database');
// })

const init = async () => {
    await models.User.sync()
    await models.Page.sync()
    await models.db.sync()
    app.listen(port, () => {
        console.log(`listening on ${port}`);
    });
};

init();