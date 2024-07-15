const mongoose = require("mongoose");

const FeatureSchema = mongoose.Schema({
    key: {
        type: String,
        required: [true, "Feature key is required."]
    },
    name: {
        type: String,
        required: [true, "Feature name is required."]
    },
    description: {
        type: String,
        required: false
    }
}, { timestamps: true });

FeatureSchema.pre("save", async function (next) {
    const feature = this;
    const existingFeature = await mongoose.model("Feature").findOne({ name: feature.name });

    if (existingFeature) {
        next("Feature name must be unique.");
    } else {
        next();
    }
});

FeatureSchema.pre("save", async function (next) {
    const feature = this;
    const existingFeature = await mongoose.model("Feature").findOne({ key: feature.key });

    if (existingFeature) {
        next("Feature key must be unique.");
    } else {
        next();
    }
});

FeatureSchema.pre("findOneAndUpdate", async function (next) {
    const update = this._update;
    const existingFeature = await mongoose.model("Feature").findOne({ name: update.name });

    if (existingFeature && !existingFeature._id == this._id) {
        next("Feature name exist, It must be unique.");
    } else {
        next();
    }
});

FeatureSchema.pre("findOneAndUpdate", async function (next) {
    const update = this._update;
    const existingFeature = await mongoose.model("Feature").findOne({ key: update.key });

    if (existingFeature && !existingFeature._id == this._id) {
        next("Feature key exist, It must be unique.");
    } else {
        next();
    }
});

module.exports = mongoose.model("Feature", FeatureSchema);