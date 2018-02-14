import { Book } from "./model";
export declare const Data: Book[];
export declare function GetMany(): Promise<Array<Book>>;
export declare function GetManyByAutherId(AutherIds: Array<string>): Promise<Array<Book>>;
export declare function GetbyId(id?: string): Promise<Book>;
