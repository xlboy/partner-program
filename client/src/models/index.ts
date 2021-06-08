import chatModel from "./modules/chatModel";
import userModel from "./modules/userModel";

export const allModel = {
  [userModel.namespace]: userModel,
  [chatModel.namespace]: chatModel,
} as const;

export { default as mergeProvider } from "./utils/mergeProvider";

export default [userModel.core, chatModel.core];
