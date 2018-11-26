export interface Journal {
    _id?: string;
    title: string;
    creator: string;
    body: string;
    tags: string[];
    timestamps?: {
        createdAt: Date,
        updatedAt: Date
    };
}