const Client = require("../../Queries/TempraryEmployeeClients/index");

const TempGetClients = async (req, res) => {
  let result = await Client.GetTempEmployeeClients()
  res.status(200).json({ isSuccess: true, temp_Clients: result.recordset });
}

const GetTempEmployeeClientByEmpId = async (req, res) => {
  let result = await Client.GetTempEmployeeClientByFKId(req.body.Id)
  if (result.recordset.length !== 0) {
    res.status(200).json({ isSuccess: true, ClientId: result.recordset });
  } else {
    res.status(200).json({ isSuccess: false });
  }
}

const InsertTempEmployeeClient = async (req, res) => {

  const { FK_TempEmployeeId, FK_ClientId, Billable } = req.body;

  let result = await Client.InsertTempEmployeeClient(
    FK_TempEmployeeId,
    FK_ClientId,
    Billable
  )
  res.status(200).send(result);
}

const DeleteTempEmployeeClient = async (req, res) => {

  const { FKId } = req.body;

  await Client.DeleteTempEmployeeClientByEmployeeId(FKId)

  res.status(200).json({ isSuccess: true })


}

module.exports = {
  TempGetClients,
  GetTempEmployeeClientByEmpId,
  InsertTempEmployeeClient,
  DeleteTempEmployeeClient
}