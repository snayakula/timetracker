const EmployeeClient = require("../../Queries/EmployeeClients");

const GetEmployeeClient = async (req, res) => {
    let result = await EmployeeClient.GetEmployeeClients()
    res.status(200).json({ isSuccess: true, EmpClient: result.recordset });
}

const GetEmployeeClientByEmployee = async (req, res) => {
    let data = await EmployeeClient.GetEmployeeClientById(req.body.FKId)
    if (data === undefined) {
        res.status(200).json({ isSuccess: false, ClientId: [] });
    }

    if (data.recordset.length !== 0) {
        res.status(200).json({ isSuccess: true, ClientId: data.recordset });
    } else {
        res.status(200).json({ isSuccess: false, ClientId: [] });
    }
}

const InsertEmployeeClient = async (req, res) => {
    const { FKEmpId, FKClientId, Billable } = req.body;

    let result = await EmployeeClient.InsertEmployeeClients(FKEmpId, FKClientId, Billable)
    res.status(200).send(result.recordset);

}

const UpdateEmployeeClient = async (req, res) => {
    const { FKEmpId, FKClientId, Billable } = req.body;

    let data = await EmployeeClient.UpdateEmployeeClientById(FKEmpId, FKClientId, Billable)
    if (data.protocol41) {
        res.status(200).json({ isSuccess: true });
    } else {
        res.status(200).json({ isSuccess: false });
    }
}

const DeleteEmployeeClient = async (req, res) => {
    const { FKId } = req.body;

    await EmployeeClient.DeleteEmployeeClientByFKId(FKId)
    res.status(200).json({ isSuccess: true })
}

module.exports = {
    GetEmployeeClient,
    GetEmployeeClientByEmployee,
    InsertEmployeeClient,
    UpdateEmployeeClient,
    DeleteEmployeeClient
}