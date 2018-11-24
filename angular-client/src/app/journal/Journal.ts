export interface Journal {
    _id?: string;
    title: string;
    creator: string;
    body: string;
    touchDate?: Date;
}