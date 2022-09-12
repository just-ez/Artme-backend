const Collection = require('../service/collection')
const { success, error } = require('../utils/baseController')


module.exports.getAllCollection = async (req,res) => {
    try {
        const collections = await new Collection().getAllCollection()
        if (collections) return success(res,collections)
        return error(res,400,'unable to get users')
    }catch (err) {
        error(res,400,err)
    }

}

 module.exports.getOneCollection = async (req,res) => {
    try {
        const collection = await new Collection(req.params.Id).getOneCollection()
        if (collection) return success(res,collection,200)
        return error(res,404,'collection not found')
    }
    catch (err) {
        return error(res,400,err)
    }
 }

 module.exports.createCollection = async (req,res) => {
    try {
        const collection = await new Collection({
          Id: req.params.Id,
          decoded: req.decoded,
          ...req.body,
        }).createCollection();
        if (collection) return success(res,collection,'collection created',200)
        return error(res, 404, "cannot find any data");
    }
    catch (err) {
        return error(res,400,err)
    }
 }

 module.exports.updateCollection = async (req,res) => {
    try {
        const updated = await new Collection({Id: req.params.Id,decoded: req.decoded, ...req.body}).updateCollection()
        if (updated) return success(res,updated,200)
        return error(res,400,'can not perform action')
    }
    catch(err) {
        return error(res,400,err)
    }
 }

 module.exports.deleteCollection = async (req,res) => {
    try {
        const deleted = await new Collection({Id: req.params.Id,decoded: req.decoded, ...req.body}).deleteCollection()
        if (deleted) return success(res,deleted,'collection deleted', 200)
        return error(res,400, 'cannot delete collection')
    }
    catch (err) {
        return error(res,400,err)
    }
 }