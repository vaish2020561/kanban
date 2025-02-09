

const { MongoClient } = require("mongodb");

const MONGO_URI = "mongodb+srv://vaishnavibharti71:bsYMThZsquqMTqAk@kanban-board.rayeu.mongodb.net/";
const client = new MongoClient(MONGO_URI);
const dbName = "Helloworld";
async function main() {
  // Use connect method to connect to the server
  await client.connect();
  console.log("Connected successfully to server");
  const db = client.db(dbName);
  const collection = db.collection("User");
  const data = {
    firstName: "Deepika",
    lastName: "padukone",
    city: "Mumbai",
    age: 28,
  };
  const insertResult = await collection.insertMany([
   data
  ]);
  console.log("Inserted documents =>", insertResult);

  const updateResult = await collection.updateOne({ a: 3 }, { $set: { b: 1 } });
console.log('Updated documents =>', updateResult);
  // the following code examples can be pasted here...
  const findResult = await collection.find({}).toArray();
  console.log("Found documents =>", findResult);
  return "done.";
}
main()
  .then(console.log)
  .catch(console.error)
  .finally(() => client.close());
