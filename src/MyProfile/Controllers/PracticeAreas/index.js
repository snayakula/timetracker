const PracticeArea = require("../../Queries/PracticeAreas/index");


const InsertPracticeArea = async (req, res) => {
    let data = await PracticeArea.InsertPracticeArea(req.body.practiceArea)
    if (data.rowsAffected.length !== 0) {
        let result = await PracticeArea.GetTheLatestInsertedRecordId()
        res.status(200).json({ Id: result.recordset[0][""], isSuccess: true });
    }
}

const AlterPracticeArea = async (req, res) => {
    let data = await PracticeArea.AlterCreatedByPracticearea(
        req.body.Id,
        req.body.FkEmployeeId
    )
    if (data.rowsAffected.length !== 0) {
        let result = await PracticeArea.GetTheLatestInsertedRecordId()
        res.status(200).json({ isSuccess: true, Id: result.recordset[0][""] });
    }
}

module.exports = {
    InsertPracticeArea,
    AlterPracticeArea
}