import { gql } from "@apollo/client";

export const CREATE_CUSTOMER_MUTATION = gql`
  mutation CreateCustomer($input: CustomerInput!) {
    createCustomer(input: $input) {
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

export const UPDATE_CUSTOMER_MUTATION = gql`
  mutation UpdateCustomer($id: ID!, $input: CustomerInput!) {
    updateCustomer(id: $id, input: $input) {
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

export const DELETE_CUSTOMER_MUTATION = gql`
  mutation DeleteCustomer($id: ID!) {
    deleteCustomer(id: $id)
  }
`;