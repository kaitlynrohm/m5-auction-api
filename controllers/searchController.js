const { MongoClient } = require("mongodb");
require("dotenv").config();

// ai search function import
const aiSearchController = require("./aiSearchController");

const searchController = async (search) => {
  const uri = process.env.MONGODB_URI;
  const client = new MongoClient(uri);

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

  const result = await aiSearchController(search, items);
  const titleJson = result.slice(7, -3);
  const titleObject = JSON.parse(titleJson);
  const titles = titleObject.titles;

  const cursor = await client
    .db("auction")
    .collection("auctionitems")
    .find({ title: { $in: titles } });
  const list = await cursor.toArray();
  return list;
};

module.exports = searchController;
