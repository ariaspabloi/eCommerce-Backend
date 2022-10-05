import MessageRepo from "./MessageRepo.js";
import messageDao from "../indexMessage.js";

const messageRepo = new MessageRepo(messageDao)

export default messageRepo