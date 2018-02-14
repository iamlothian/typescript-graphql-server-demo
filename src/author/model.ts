import { Book } from '../book/model'

export interface Author {
    id: string,
    title: String, 
    books: Array<string> | Array<Book>
}