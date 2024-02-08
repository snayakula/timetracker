const Domains = require("../../Queries/Domains");

const DomainsController = async (req, res) => {
    let result = await Domains.GetDomains()
    res.status(200).send(result.recordset)
}

const AddDomain = async (req, res) => {
    const { domain, comment, FKId } = req.body;

    let result = await Domains.InsertDomain(domain, comment, FKId);

    if (result.rowsAffected.length !== 0) {
        let Id = await Domains.GetLatestDomainId();
        res.status(200).json({ isSuccess: true, DomainId: Id.recordset[0][""] });
    } else {
        res.status(200).json({ isSuccess: false });
    }
}

module.exports = {
    DomainsController,
    AddDomain
}