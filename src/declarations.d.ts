// //import { IExecutableSchemaDefinition } from "graphql-tools/dist/Interfaces";
// declare module "*.graphql" {
//   var _: string;
//   export default  _;
// }
declare module '*.graphql' {
  import {DocumentNode} from 'graphql';

  const value: DocumentNode;
  export = value;
}