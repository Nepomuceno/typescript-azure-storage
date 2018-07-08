import * as storage from "azure-storage";
import * as dotenv from "dotenv";
import { resolve } from "url";

dotenv.load();

export class Storage {
  private tableService: storage.TableService;
  private tableName: string = "default";
  private constructor() {
    this.tableService = storage.createTableService();
  }
  static async Create(tableName: string): Promise<Storage> {
    var me = new Storage();
    me.tableName = tableName;
    await me.CreateIfDoesntExistTable();
    return me;
  }
  private async CreateIfDoesntExistTable(): Promise<
    storage.TableService.TableResult
  > {
    return new Promise((resolve, reject) => {
      try {
        this.tableService.createTableIfNotExists(
          this.tableName,
          (err, result) => {
            if (err) throw err;
            resolve(result);
          }
        );
      } catch (err) {
        reject(err);
      }
    });
  }

  async AddOrMergeRecord(record: ITableEntity): Promise<ITableEntity> {
    return new Promise<ITableEntity>((resolve, reject) => {
      try {
        const tr = this.convertToTableRecord(record);
        this.tableService.insertOrMergeEntity(this.tableName, tr, err => {
          if (err) throw err;
          resolve(record);
        });
      } catch (err) {
        reject(err);
      }
    });
  }

  private convertToTableRecord(entity: ITableEntity) {
    let result: any = {};
    Object.keys(entity).forEach(k => {
      let prop = Object.getOwnPropertyDescriptor(entity, k);
      if (prop) {
        result[k] = new storage.TableUtilities.entityGenerator.EntityProperty(
          prop.value
        );
      }
    });
    return result;
  }
}

export interface ITableEntity {
  PartitionKey: string;
  RowKey: string;
  [key: string]: string | number | boolean | undefined;
}
