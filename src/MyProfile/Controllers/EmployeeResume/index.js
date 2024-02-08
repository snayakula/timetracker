const EmpResume = require("../../Queries/EmployeeResume");


const UploadEmployeeEesume = async (req, res) => {
    try {

        // const { filename } = req.file;
        const { FKEmpId } = req.body;

        let data = await EmpResume.InsertEmployeeResume(req.file.filename, FKEmpId)
        if (data.rowsAffected.length !== 0) {
            let result = await EmpResume.GetEmployeeResumeById(FKEmpId)
            res.status(200).json({
                isSuccess: true,
                EmpResume: result.recordset,
                message: "Successfully Uploaded",
            });
        }
        else {
            res.status(400).json({ isSuccess: false });
        }
    }
    catch (err) {
        console.log(err)
        res.status(422).json({ isSuccess: false, message: 'Please provide the correct file' })
    }
}

const UpdateEmployeeResume = async (req, res) => {
    try {

        // const { filename } = req.file;
        const { FKEmpId } = req.body;

        let data = await EmpResume.UpdateEmployeeResume(req.file.filename, FKEmpId)
        if (data.rowsAffected.length !== 0) {
            let result = await EmpResume.GetEmployeeResumeById(FKEmpId)
            res.status(200).json({
                isSuccess: true,
                EmpResume: result.recordset,
                message: "Successfully Updated",
            });
        }
        else {
            res.status(400).json({ isSuccess: false });
        }
    }
    catch (err) {
        console.log(err)
        res.status(422).json({ isSuccess: false, message: 'Please provide the correct file' })
    }
}


const GetEmployeeResumeById = async (req, res) => {

    let data = await EmpResume.GetEmployeeResumeById(req.body.FKEmpId)
    if (data === undefined || data.recordset.length === 0) {
        res
            .status(200)
            .json({ isSuccess: false, message: "File Not Found...!" });
    } else {
        res.status(200).json({
            isSuccess: true,
            EmpResume: data.recordset,
            message: "File Found...!",
        });
    }
}


const DeleteEmployeeResume = async (req, res) => {
    await EmpResume.DeleteResumeByFKId(req.body.FKId)
    res.status(200).json({ isSuccess: true });
}


module.exports = {
    UploadEmployeeEesume,
    GetEmployeeResumeById,
    DeleteEmployeeResume,
    UpdateEmployeeResume
}