const mongoose = require("mongoose");
require("../db/mongoose");

const Person = mongoose.model("Person", {
    firstName: {
        type: String,
        required: true,
        trim: true,
    },
    lastName: {
        type: String,
        required: true,
        trim: true,
    },
    age: {
        type: Number,
        required: true,
        trim: true,
    },
    email: {
        type: String,
        required: true,
        trim: true,
    }
});
module.exports = Person;