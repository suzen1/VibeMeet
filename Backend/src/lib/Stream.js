import { StreamChat } from "stream-chat";
import "dotenv/config.js";

const apiKey = process.env.STREM_API_KEY;
const apiSecret = process.env.STREM_SECRET_KEY;

if (!apiKey || !apiSecret) {
  console.log("Stream API key or Secret key is missing");
}

const streamClient = StreamChat.getInstance(apiKey, apiSecret);

export const upsertStreamUser = async (userData) => {
  try {
    if (!userData.id) {
      throw new Error("User ID is required when updating a user");
    }

    await streamClient.upsertUsers([userData]);
    return userData;
  } catch (error) {
    console.log("Stream upsert error:", error);
    throw error;
  }
};
