import { gql } from "apollo-server-express";
const schema = gql`
  "Date time represented as an ISO String"
  scalar DateTime

  type Query {
    now: DateTime
  }
 `;

export default schema;
