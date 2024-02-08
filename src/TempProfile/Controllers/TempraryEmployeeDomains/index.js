const Domains = require("../../Queries/TempraryEmployeeDomains/index");

const DomainsController = async (req, res) => {
    let data = await Domains.GetEmployeeDomains()
    res.json({ isSuccess: true, temp_employee_domains: data.recordset })
}

const GetTempEmployeeDomainById = async (req, res) => {
    const { Id } = req.body;
    let data = await Domains.GetTempEmployeeDomainsByEmployeeId(Id)
    res.json({ isSuccess: true, temp_employee_domain: data.recordset })
}

const AddTempEmployeeDomain = async (req, res) => {
    let result = await Domains.InsertEmpDomain(
        req.body.FK_TempEmployeeId,
        req.body.FK_DomainId,
        req.body.DomainExperience
    )
    res.json({ isSuccess: true, data: result.recordset });
}

const DeleteTempDomainsWithEmployeeId = async (req, res) => {
    await Domains.DeleteTempEmployeeDomainById(req.body.Id)
    res.json({ isSuccess: true });
}

module.exports = {
    DomainsController,
    GetTempEmployeeDomainById,
    AddTempEmployeeDomain,
    DeleteTempDomainsWithEmployeeId
}