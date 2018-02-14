import { Author } from "./model"
//import * as Book from "../book"

// Some fake data
export const Data = [
    {
        id: "0",
        books: ["0"],
        title: 'J.K. Rowling',
    },
    {
        id: "1",
        books: ["0","1"],
        title: 'Michael Crichton',
    },
] as Array<Author>;

export async function GetbyId(id?: string) : Promise<Author> {
    return new Promise<Author>(resolve => {
        resolve(id !== undefined ? Data.filter(b => b.id === id)[0] : undefined)
    })
}