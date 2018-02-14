import { Author } from "../author/model";
export interface Book {
    id: string;
    title: String;
    author: Array<string> | Array<Author>;
}
