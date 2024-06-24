const mongoose = require('mongoose')
const {Schema} = mongoose;

const NotesSchema = new Schema({

    //=> It's Like  a Foreign Key
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    title:{
        type: String,
        required: true
    },
    description:{
        type: String,
        required: true,
    },
    type:{
        type: String,
        default: "General"
    },
    date:{
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model('notes',NotesSchema);