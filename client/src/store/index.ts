import chatModel from "./modules/chat";
import userModel from "./modules/user";

export const allModel = {
  [userModel.namespace]: userModel,
  [chatModel.namespace]: chatModel,
} as const;

export { default as mergeProvider } from "./utils/mergeProvider";

export default [userModel.core, chatModel.core];
