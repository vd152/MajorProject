const {doodleNames} = require('../data/utils/data')

exports.saveDatasetImage = async (req, res)=>{
    return res.status(200).json({message: "success"});
}
exports.getAllDoodleNames = async (req, res)=>{
    return res.status(200).json({data: doodleNames});
}