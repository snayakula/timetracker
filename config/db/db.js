const sql = require("mssql");
const { DefaultAzureCredential } = require("@azure/identity");
const { SecretClient } = require("@azure/keyvault-secrets");

let dbSecretCredentails;

const Get_Secret_From_keyvault = async () => {

    const clientCredentials = new DefaultAzureCredential();
    const client = new SecretClient(process.env.VAULT_URL, clientCredentials);
    try {
        const secret = await client.getSecret(process.env.SECRET_NAME);

        const secretval = JSON.parse(secret.value)

        return secretval

    } catch (error) {
        console.error("Error retrieving the secret:", error.message);
        return { error: 'Internal Server Error' };
    }

}

const handleRunQuery = async (query, methodName) => {

    if (dbSecretCredentails === undefined) {
        let result = await Get_Secret_From_keyvault()
        dbSecretCredentails = result
    }

    let dbConfiguration = {
        user: dbSecretCredentails.DATABASE_USER,
        password: dbSecretCredentails.DATABASE_PASSWORD,
        server: dbSecretCredentails.DATABASE_SERVER,
        database: dbSecretCredentails.DATABASE_NAME,
        options: {
            encrypt: true // Enable encryption if required
        }
    }

    try {
        const response = await new Promise((resolved, reject) => {
            sql.connect(dbConfiguration).then(() => {
                sql.query(query).then((result) => {
                    // console.log()
                    console.log(methodName + " DB ")
                    console.log('Success')
                    // console.log('End')
                    // console.log()
                    resolved(result)
                }).catch((error) => {
                    reject(error)
                })
            }).catch((err) => {
                reject(err)
            })
        })

        return response

    }
    catch (err) {
        console.log()
        console.log(methodName + " Catch ")
        console.log('-----------Query---------')
        console.log(query)
        console.log()
        console.log(`-----------ERROR----------`)
        console.log(err)
        console.log('End')
        console.log()
        return { recordset: [] }
    }

}

module.exports = { handleRunQuery }
