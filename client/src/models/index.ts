import { getAppStore } from '@/utils/dva';
import { Provider } from 'react-redux';
import chatModel from './modules/chatModel';
import userModel from './modules/userModel';
import React, {FC } from 'react';

export default [userModel.core, chatModel.core];

const allModelName = {
    [userModel.namespace]: userModel,
    [chatModel.namespace]: chatModel
} as const


type PickModelName<T extends keyof typeof allModelName> = T

export type AllModelEffect =
    `${PickModelName<'user'>}/${keyof typeof allModelName['user']['core']['effects']}` |
    `${PickModelName<'chat'>}/${keyof typeof allModelName['chat']['core']['effects']}`;

// 哭了…尽力了，若ts里的静态类型能与动态类型部分相结合（相关联的const固定值），就能一劳永逸了…
// [k in keyof typeof allModelName]: `${keyof typeof allModelName[k]['core']['effects']}`

export { default as mergeProvider } from './utils/mergeProvider'