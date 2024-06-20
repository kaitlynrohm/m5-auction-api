const { MongoClient } = require("mongodb");
require("dotenv").config();

// ai search function import
const aiSearchController = require("./aiSearchController");

const searchController = async (search) => {
  const uri = process.env.MONGODB_URI;
  const client = new MongoClient(uri);
  console.log("SEARCH", search);

  try {
    await client.connect();

    const result = await searchCollection(client, search);
    return result;
  } catch (e) {
    console.error(e);
  } finally {
    await client.close();
  }
};

searchController().catch(console.error);

const searchCollection = async (client, search) => {
  const cursor1 = await client.db("auction").collection("auctionitems").find();
  const items = await cursor1.toArray();

  const idObject = await aiSearchController(search, items);
  const ids = idObject.ids;

  console.log("IDS", idObject);

  const cursor = await client.db("auction").collection("auctionitems").find();
  const list = await cursor.toArray();
  return list;
};

module.exports = searchController;
