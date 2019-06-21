const express = require('express');
const wikiRouter = express.Router();
const models = require('../models');
const { addPage } = require('../views'); 


wikiRouter.get('/', async (req, res, next) => {
    const pages = await models.Page.findAll();
    res.send(pages);
})

wikiRouter.post('/', async (req, res, next) => {
    const page = new models.Page({
        title: req.body.title,
        content: req.body.content
    });
    try {
        await page.save();
        res.redirect('/');
    } catch (error) { next(error)}
})

wikiRouter.get('/add', (req, res, next) => {
    res.send(addPage());
})

wikiRouter.get('/:slug', (req, res, next) => {
    res.send(`hit dynamic route at ${req.params.slug}`)
})
module.exports = wikiRouter;