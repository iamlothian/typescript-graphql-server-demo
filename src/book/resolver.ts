import { IResolvers, IResolverObject, IFieldResolver } from "graphql-tools/dist/Interfaces";
import { GraphQLResolveInfo } from "graphql";
import { Book } from "./model"
import * as Author from "../author/"
import * as BookRepo from "./repository"
import { resolve } from "path";

/**
 * Resolve to a list of all books avaialble
 * @param obj 
 * @param args 
 * @param context 
 * @param info 
 */
function getBooks(obj:Book, args:any, context:any, info: GraphQLResolveInfo): Promise<Array<Book>> {
    return BookRepo.GetMany()
} 

/**
 * Resolve to a single book referenced by ID
 * @param obj 
 * @param args 
 * @param context 
 * @param info 
 */
function getBookbyId(obj:Book, args:any, context:any, info: GraphQLResolveInfo): Promise<Book> {
    return BookRepo.GetbyId(args.bookId).then(book => book) 
    //book.author = (book.author as string[]).filter(a => authors != undefined ? authors.includes(a) : true)
}

/**
 * Resolve to a list of authors based on the book's authors array
 * @param obj 
 * @param args 
 * @param context 
 * @param info 
 */
function getAuthersbyId(obj:Book, args:any, context:any, info: GraphQLResolveInfo): Promise<Author.Model>[] {   
    return (obj.author as Array<string>)
    .filter(
        a=>args.ids != undefined ? (args.ids as Array<string>).includes(a) : true
    )
    .map(
        a => Author.GetbyId(a).then(d=>d)
    )
} 

/**
 * Resolve to a list of books based on an authors ID
 * @param obj 
 * @param args 
 * @param context 
 * @param info 
 */
function getBooksByAuthor(obj:Author.Model, args:any, context:any, info: GraphQLResolveInfo): Promise<Array<Book>> {
    return BookRepo.GetManyByAutherId(obj.books as Array<string>)
} 

/**
 * Resolve adding a book with an author to the data store and returning it
 * @param title 
 * @param author 
 */
async function addBook(obj:Author.Model, args:any, context:any, info: GraphQLResolveInfo): Promise<Book> {
    console.log(args.title, args.author)
    let a:Author.Model = await Author.AddAuthor(args.author)
    let b:Book = await BookRepo.addBook(args.title, [a.id])
    await Author.AddBookToAuthor(a.id, b)
    return BookRepo.GetbyId(b.id)
}

/**
 * The exported resolver
 */
export const Resolver: IResolvers = {
    Query: {
        Books: getBooks,
        Book: getBookbyId 
    } as IResolverObject,
    Book: { // type
        author: getAuthersbyId, // feild
    } as IResolverObject,
    Author: { // type
        books: getBooksByAuthor // feild
    } as IResolverObject,
    Mutation: {
        addBook: addBook
    } as IResolverObject
}