const { MongoClient } = require("mongodb");
require("dotenv").config();

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

const searchCollection = async (client, searchWords) => {
  const cursor = await client.db("auction").collection("auctionitems").find();
  const list = await cursor.toArray();
  return list;
};

module.exports = searchController;
