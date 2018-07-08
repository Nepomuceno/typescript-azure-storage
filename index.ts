import * as storage from "azure-storage"
import * as dotenv from "dotenv";

dotenv.load();

const storageClient = storage.createTableService();
const tableName = "sampletable";
storageClient.createTableIfNotExists(tableName,(err, result) => {
    if(err) throw err;
    console.info(result);
});