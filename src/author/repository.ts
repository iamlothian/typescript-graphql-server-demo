import { Author } from "./model"
import * as Book from "../book"

let mockData = [
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

// Some fake data
let fetchData = function(): Array<Author> { 
    return mockData
}

export async function GetbyId(id?: string) : Promise<Author> {
    return new Promise<Author>(resolve => {
        resolve(id !== undefined ? fetchData().filter(b => b.id === id)[0] : undefined)
    })
}

export async function AddAuthor(title: string, books?: Array<string>) : Promise<Author> {
    return new Promise<Author>(resolve => {
        let a = {
            id: mockData.length.toString(),
            title: title,
            books: books != undefined ? books : []
        }
        mockData.push(a)
        resolve(a);
    })
}

export async function AddBookToAuthor(authorId: string, book: Book.Model) : Promise<Author> {
    let a = await GetbyId(authorId);
    return new Promise<Author>(resolve => {
        (a.books as Array<string>).push(book.id)
        resolve(a);
    })
}