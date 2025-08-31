import { gql } from "@apollo/client";

export const GET_CUSTOMERS = gql`
  query GetCustomers {
    customers {
      idtb_customers
      name
      last_name
      email
      contact
      status
      created_at
    }
  }
`;