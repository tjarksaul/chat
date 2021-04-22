import {writable} from "svelte/store";

export interface ChatState {
    name: string
    connected: boolean
}

const emptyState = {
    name: '',
    connected: false,
}

export const chatStore = writable<ChatState>(emptyState);

export function join(state: ChatState, name: string): ChatState {
    return {...state, name, connected: true};
}

export function leave(state: ChatState): ChatState {
    return {...state, connected: false};
}