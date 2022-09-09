import MessageService from "./MessageService.js";
import MessageRepo from "../../db/repository/MessageRepo.js";
import normalizr from "normalizr";

const messageService = new MessageService(MessageRepo, normalizr.schema, normalizr.normalize)

export default messageService