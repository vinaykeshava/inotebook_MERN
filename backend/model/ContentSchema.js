const mongoose = require('mongoose');
const content = new mongoose.Schema({
    username: { type: String },
    id: { type: String },
    note: { type: String },
})

const Content = mongoose.model('Content', content);

module.exports = Content;