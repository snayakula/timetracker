const Organization = require("../../Queries/Organizations");


const GetOrganization = async (req, res) => {
    let data = await Organization.GetOrganizations()
    res.status(200).json({ isSuccess: true, Organization: data.recordset });
}


const InsertORG = async (req, res) => {
    const organization = req.body.company;
    await Organization.InsertOrganization(organization)
    res.status(200).json({ isSuccess: true })
}

module.exports = {
    GetOrganization,
    InsertORG
}