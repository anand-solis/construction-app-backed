const mongoose = require("mongoose");

const defaultWorkCategorySchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, "Work Category name is required."]
    },
    
}, { timestamps: true });

module.exports = mongoose.model("defaultWorkCategory", defaultWorkCategorySchema);