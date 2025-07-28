import { Messages } from "@prisma/client";

export default class messagesEntity implements Messages {
    id: string;
    text: string;
    userId: string;
    createdAt: Date | null;
    updatedAt: Date | null;

    constructor(partial: Partial<messagesEntity>) {
        Object.assign(this, partial);
    }
}