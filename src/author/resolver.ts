import { IResolvers, IResolverObject, IFieldResolver } from "graphql-tools/dist/Interfaces";
import { GraphQLResolveInfo } from "graphql";
import { Author } from "./model"
import { Book } from "../book/model"
import * as AuthorRepo from "./repository"

function Authorsbyid(obj:Author, args:Author, context:any, info: GraphQLResolveInfo): Promise<Author> {
    return AuthorRepo.GetbyId(args.id)
} 

export const Resolver: IResolvers = {
    Query: {
        Authors: Authorsbyid 
    } as IResolverObject
}