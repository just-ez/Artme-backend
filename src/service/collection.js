const collectionModel = require("../models/collection");

class Collection {
    constructor(data) {
        this.data = data
    }

    async createCollection() {
        return await new collectionModel(this.data).save()
    }
}

module.exports = Collection