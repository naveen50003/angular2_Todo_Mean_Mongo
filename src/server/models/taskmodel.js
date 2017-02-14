var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// create a Scheme
var taskScheme = new Schema({
    title: { type: String, require: true },
    updated_at: { type: Date },
    created_at: { type: Date },
    isDone: Boolean
})
taskScheme.methods.taskify = function() {

    this.title = this.title + '-task';
}
taskScheme.pre('save', function(next) {
    console.log("entered pre save");
    var currentDate = new Date();
    this.updated_at = currentDate;

    if (!this.created_at) {
        this.created_at = currentDate;
    }
    next();
})
var Task = mongoose.model('Task', taskScheme);
module.exports = Task;
