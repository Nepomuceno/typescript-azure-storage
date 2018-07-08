import { Storage } from "./storage";

const tableName = "sampletable";

(async () => {
  await Storage.Create(tableName);
  console.log("Table created");
})();
