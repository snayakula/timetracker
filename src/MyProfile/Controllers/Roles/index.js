const { GetRoles } = require("../../Queries/Roles");

const GetUserRoles = async (req, res) => {
    let result = await GetRoles()
    res.status(200).json({ isSuccess: true, Roles: result.recordset });
}

module.exports = { GetUserRoles }