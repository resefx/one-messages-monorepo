import { Posts } from "@prisma/client";

export default class postsEntity implements Posts {
    id: string;
    text: string;
    value: number;
    messageId: string;
    createdAt: Date | null;

    constructor(partial: Partial<postsEntity>) {
        Object.assign(this, partial);
    }
}