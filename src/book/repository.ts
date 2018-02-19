import { Book } from "./model"
//import * as Author from "../author"

let mockData = [
    {
        id: "0",
        title: "Harry Potter and the Sorcerer's stone",
        author: ["0","1"],
    },
    {
        id: "1",
        title: 'Jurassic Park',
        author: ["1"],
    },
] as Array<Book>;

// Some fake data
let fetchData = function(): Array<Book>  {
    return mockData
}

export async function GetMany() : Promise<Array<Book>> {
    return new Promise<Array<Book>>(resolve => 
        resolve(fetchData())
    )
}

export async function GetManyByAutherId(AutherIds: Array<string>) : Promise<Array<Book>> {
    return new Promise<Array<Book>>(resolve => 
        resolve(
            fetchData().filter(
                b => AutherIds.some(
                    a => (b.author as string[]).includes(a)
                )
            )
        )
    )
}

export async function GetbyId(id?: string) : Promise<Book> {
    return new Promise<Book>(resolve => 
        resolve(
            id !== undefined ? fetchData().filter(b => b.id === id)[0] : undefined
        )
    )
} 

export async function addBook(title: string, authorIds: Array<string>) : Promise<Book> {
    return new Promise<Book>(resolve => {
        let b = {
            id: mockData.length.toString(),
            title: title,
            author: authorIds != undefined ? authorIds : []
        }
        mockData.push(b)
        resolve(b)
    })
}