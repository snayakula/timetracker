const Domains = require("../../Queries/EmployeeDomains");

const EmployeeDomains = async (req, res) => {
    let result = await Domains.GetEmployeeDomains()
    res.status(200).json({ isSuccess: true, empDomains: result.recordset });
}

const GetDomainsById = async (req, res) => {
    let data = await Domains.GetEmployeeDomainByFKEmpId(req.body.Id)
    if (data.recordset.length !== 0) {
        res.status(200).json({ isSuccess: true, data: data.recordset });
    } else {
        res.status(200).json({ isSuccess: false });
    }
}

const GetEmployeeDomainsById = async (req, res) => {
    let data = await Domains.GetEmployeeDomainByFKEmpId(req.body.Id)
    if (data === undefined) {
        res.status(200).json({ isSuccess: false });
    } else {
        res.status(200).json({ isSuccess: true, Domains: data.recordset });
    }
}

const PostDomains = async (req, res) => {
    await Domains.InsertEmployeeDomain(
        req.body.FKEmpId,
        req.body.FKDomainId,
        req.body.domainExp
    );
    res.status(200).json({ isSucces: true })
}

const UpdateDomains = async (req, res) => {
    await Domains.UpdateEmployeeDomains(
        req.body.FKEmpId,
        req.body.domainId,
        req.body.domainExp
    );
    res.status(200).json({ isSucces: true })
}

const DeleteDomain = async (req, res) => {
    await Domains.DeleteEmployeeDomainById(req.body.Id);
    res.status(200).json({ isSucces: true })
}

const DeleteDomainsWithEmployeeId = async (req, res) => {
    await Domains.DeleteEmployeeDomainByEmployeeId(req.body.FKEmpId);
    res.status(200).json({ isSucces: true })
}


module.exports = {
    EmployeeDomains,
    GetDomainsById,
    GetEmployeeDomainsById,
    PostDomains,
    UpdateDomains,
    DeleteDomain,
    DeleteDomainsWithEmployeeId
}