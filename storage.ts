import * as storage from "azure-storage"
import * as dotenv from "dotenv";

dotenv.load();

export class Storage{
    private tableService : storage.TableService;
    private tableName: string = "default";
    private constructor() {
        this.tableService = storage.createTableService();
    }
    static async Create(tableName: string) : Promise<Storage> {
        var me = new Storage()
        me.tableName = tableName;
        await me.CreateIfDoesntExistTable();
        return me;
    }
    private async CreateIfDoesntExistTable() : Promise<storage.TableService.TableResult> {
        return new Promise((resolve, reject) =>{
            try {
                this.tableService.createTableIfNotExists(this.tableName, (err,result) => {
                    if(err) throw err;
                    resolve(result);
                });
            } catch (err) { reject(err); }
        })
    }
}