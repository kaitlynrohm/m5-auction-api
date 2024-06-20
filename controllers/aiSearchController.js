// Imports
require("dotenv").config();
const { MongoClient } = require("mongodb");

// connect to gemini
const { GoogleGenerativeAI } = require("@google/generative-ai");

// API key
const genAI = new GoogleGenerativeAI(process.env.API_KEY);

const aiSearchController = async (search, items) => {
  const uri = process.env.MONGODB_URI;
  const client = new MongoClient(uri);

  try {
    await client.connect();

    // The Gemini model
    const model = genAI.getGenerativeModel({
      model: "gemini-1.5-flash",
      systemInstruction: `Your job is to go through the given data and select which items match the search "${search}". You should then return the id of every item that matches the criteria using json with the structure of "ids": [id1, id2, id3]. Include all relevant items. 
      
      This is the data:
      ${JSON.stringify(items)}`,
    });

    chat = model.startChat();
    const message = "";

    const result = await chat.sendMessage(message);
    const response = await result.response;
    const text = response.text();

    if (text) {
      return text;
    }
  } catch (e) {
    console.error(e);
  } finally {
    await client.close();
  }
};

aiSearchController().catch(console.error);

// const getItems = async (client) => {
//   const cursor = await client.db("auction").collection("auctionitems").find();
//   const list = await cursor.toArray();
//   return list;
// };

module.exports = aiSearchController;
