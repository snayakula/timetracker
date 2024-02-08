const Designations = require("../../Queries/Designations");

const InsertDesignation = async (req, res) => {
    let data = await Designations.InsertDesignations(req.body.designation)
    if (data.rowsAffected.length !== 0) {
        let result = await Designations.GetTheLatestInsertedRecordId()
        res.status(201).json({ isSuccess: true, Id: result.recordset[0][""] });
    }

}

const AlterDesignation = async (req, res) => {
    let data = await Designations.AlterCreatedByDesignation(
        req.body.Id,
        req.body.FkEmployeeId
    )
    if (data.rowsAffected.length !== 0) {
        let result = await Designations.GetTheLatestInsertedRecordId()
        res.status(200).json({ isSuccess: true, Id: result.recordset[0][""] });
    }
}

module.exports = {
    InsertDesignation,
    AlterDesignation
}