import { gql } from "@apollo/client";

export const GET_CUSTOMERS_QUERY = gql`
  query GetCustomers {
    customers {
      public_id_customers
      name
      last_name
      cpf
      email
      contact
      status
      image_url
      created_at
      created_by
    }
  }
`;