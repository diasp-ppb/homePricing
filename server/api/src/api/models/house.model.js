let mongoose = require('mongoose');

let Schema = mongoose.Schema;

let HouseSchema = new Schema(
    {
        title: { type: String, required: true }
    }
);

// Virtual for house's URL
HouseSchema
    .virtual('url')
    .get(function () {
        return '/house/' + this._id;
    });

//Export model
module.exports = mongoose.model('House', HouseSchema);