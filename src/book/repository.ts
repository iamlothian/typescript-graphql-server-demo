import { Book } from "./model"
//import * as Author from "../author"

// Some fake data
export const Data = [
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

export async function GetMany() : Promise<Array<Book>> {
    return new Promise<Array<Book>>(resolve => 
        resolve(Data)
    )
}

export async function GetManyByAutherId(AutherIds: Array<string>) : Promise<Array<Book>> {
    return new Promise<Array<Book>>(resolve => 
        resolve(
            Data.filter(
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
            id !== undefined ? Data.filter(b => b.id === id)[0] : undefined
        )
    )
} 