
const Educations = require("../../Queries/Educations");

const InsertEducations = async (req, res) => {
    let data = await Educations.InsertEducations(req.body.education)
    if (data.rowsAffected.length !== 0) {
        Educations.GetTheLatestInsertedRecordId().then((result) => {
            res.status(200).json({ Id: result.recordset[0][""], isSuccess: true });
        });
    }
}
const AlterEducations = async (req, res) => {
    let data = await Educations.AlterCreatedByEducation(req.body.Id, req.body.FkEmployeeId)
    if (data.rowsAffected.length !== 0) {
        Educations.GetTheLatestInsertedRecordId().then((result) => {
            res.status(200).json({ isSuccess: true, Id: result.recordset[0][""] });
        });
    }
}

module.exports = {
    InsertEducations,
    AlterEducations
}