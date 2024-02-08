const Client = require("../../Queries/Clients");

const GetClients = async (req, res) => {
  let result = await Client.GetClients()

  if (result.recordset.length !== 0) {
    res.status(200).json({ isSuccess: true, Clients: result.recordset });
  } else {
    res.status(200).json({ isSuccess: false });
  }
}

const InsertClients = async (req, res) => {
  const { ClientName, TypeOfContract, GenzeonPOC, ClientPOC, ProjectManager, FKEmployeeId, } = req.body;

  let result = await Client.InsertClient(
    ClientName,
    TypeOfContract,
    GenzeonPOC,
    ClientPOC,
    ProjectManager,
    FKEmployeeId)


  if (result !== undefined) {
    if (result.rowsAffected.length !== 0) {
      res.status(200).json({ isSuccess: true });
    }
  } else {
    res.status(200).json({ isSuccess: false });
  }

}

const GetByClient = async (req, res) => {
  let result = await Client.GetClientById(req.body.id)

  if (result.recordset.length !== 0) {
    res.status(200).json({ isSuccess: true, ClientData: result.recordset });
  }
  else {
    res.status(200).json({ isSuccess: false })
  }

}

const RemoveClient = async (req, res) => {
  const { Id } = req.body;

  let result = await Client.DeleteClientById(Id)
  if (result.rowsAffected.length !== 0) {
    res.status(200).json({ isSuccess: true });
  } else {
    res.status(200).json({ isSuccess: false });
  }

}

const UpdateClient = async (req, res) => {
  const { id, ClientName, TypeOfContract, GenzeonPOC, ClientPOC, ProjectManager, FKEmployeeId } = req.body;

  let result = await Client.UpdateClientById(
    id,
    ClientName,
    TypeOfContract,
    GenzeonPOC,
    ClientPOC,
    ProjectManager,
    FKEmployeeId
  )

  res.status(200).json({ isSuccess: true });

}

module.exports = {
  GetClients,
  InsertClients,
  GetByClient,
  RemoveClient,
  UpdateClient
}