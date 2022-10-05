import MessageService from "./MessageService.js";
import messageRepo from "../../db/repository/indexRepo.js";
import normalizr from "normalizr";

const messageService = new MessageService(messageRepo, normalizr.schema, normalizr.normalize)

export default messageService