const express = require("express");
const expressAsyncHandler = require("express-async-handler");
const { TempGetClients, GetTempEmployeeClientByEmpId, InsertTempEmployeeClient, DeleteTempEmployeeClient } = require("./Controllers/TempraryEmployeeClients");
const { DomainsController, GetTempEmployeeDomainById, AddTempEmployeeDomain, DeleteTempDomainsWithEmployeeId } = require("./Controllers/TempraryEmployeeDomains");
const { GetTempEmployees, GetTempEmployeeById, InsertTempEmployee, DeleteTempEmployee, ApproveEmployee, RejectEmployee } = require("./Controllers/TempraryEmployees");


const router = express.Router();



// Temporary Employee Clients

router.get("/temp-get-clients", expressAsyncHandler(TempGetClients));

router.post("/get-temp-employee-client-by-emp-id", expressAsyncHandler(GetTempEmployeeClientByEmpId));

router.post("/insert-temp-employee-client", expressAsyncHandler(InsertTempEmployeeClient));

router.post("/delete-temp-employee-client", expressAsyncHandler(DeleteTempEmployeeClient));


// Temporary Employee Domains

router.get("/domains", expressAsyncHandler(DomainsController));

router.post("/get-temp-employee-domain-by-id", expressAsyncHandler(GetTempEmployeeDomainById));

router.post("/add-temp-employee-domain", expressAsyncHandler(AddTempEmployeeDomain));

router.post("/delete-temp-domains-with-employee-id", expressAsyncHandler(DeleteTempDomainsWithEmployeeId));


// Temporary Employees



router.get("/get-temp-employees", expressAsyncHandler(GetTempEmployees));

router.post("/get-temp-employee-by-id", expressAsyncHandler(GetTempEmployeeById));

router.post("/insert-temp-employee", expressAsyncHandler(InsertTempEmployee));

router.post("/delete-temp-employee", expressAsyncHandler(DeleteTempEmployee));

router.post("/approve-employee", expressAsyncHandler(ApproveEmployee));

router.post("/reject-employee", expressAsyncHandler(RejectEmployee));




module.exports = router;
