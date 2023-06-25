const mongoose = require('mongoose');
const content = new mongoose.Schema({
    username: { type: string },
    title: { type: String },
    body: { type: String },
})

const Content = mongoose.model('Content', content);

module.exports = Content;