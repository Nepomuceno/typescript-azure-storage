import { Storage } from "./storage";

const tableName = "sampletable";

(async () => {
  const storage = await Storage.Create(tableName);
  await storage.AddOrMergeRecord({
    PartitionKey: "SamplePartition",
    RowKey: "SampleRow",
    SampleInt: 42,
    SampleString: "Amazing!"
  });
  console.log("Table created");
})();
