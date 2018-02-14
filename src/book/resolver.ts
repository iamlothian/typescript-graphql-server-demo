import { IResolvers, IResolverObject, IFieldResolver } from "graphql-tools/dist/Interfaces";
import { GraphQLResolveInfo } from "graphql";
import { Book } from "./model"
import * as Author from "../author/"
import * as repository from "./repository"
import { resolve } from "path";

/**
 * Resolve to a list of all books avaialble
 * @param obj 
 * @param args 
 * @param context 
 * @param info 
 */
function getBooks(obj:Book, args:any, context:any, info: GraphQLResolveInfo): Promise<Array<Book>> {
    return repository.GetMany()
} 

/**
 * Resolve to a single book referenced by ID
 * @param obj 
 * @param args 
 * @param context 
 * @param info 
 */
function getBookbyId(obj:Book, args:any, context:any, info: GraphQLResolveInfo): Promise<Book> {
    let authors:string[] = args.authorIds;
    return repository.GetbyId(args.bookId).then(book => {
        // this is destroying the internal state
        book.author = (book.author as string[]).filter(a => authors != undefined ? authors.includes(a) : true)
        return book
    })
}

/**
 * Resolve to a list of authors based on the book's authors array
 * @param obj 
 * @param args 
 * @param context 
 * @param info 
 */
function getAuthersbyId(obj:Book, args:any, context:any, info: GraphQLResolveInfo): Promise<Author.Model>[] {   
    return (obj.author as Array<string>).map(
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
    return repository.GetManyByAutherId(obj.books as Array<string>)
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
        author: getAuthersbyId // feild
    } as IResolverObject,
    Author: { // type
        books: getBooksByAuthor // feild
    } as IResolverObject,
}