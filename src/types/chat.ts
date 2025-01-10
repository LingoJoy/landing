export type TAgent = {
    id: string;
    agentId: string;
    clipBox: string;
    greeting: string;
    idleVideo: string;
    previewName: string;
    previewImage: string;
    prompt: string;
};

export type TAgentResponse = {
    data: TAgent[];
    status: number;
};

export type TChatResponse = {
    data: {
        answers: string[];
        clip: string;
        history: IMessage[];
    };
};

export interface IMessage {
    content: string;
    role: "user" | 'assistant';
}
