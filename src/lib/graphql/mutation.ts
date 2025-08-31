import { gql } from "@apollo/client";

export const LOGIN_MUTATION = gql`
  mutation Login($loginInput: LoginResquestDto!, $deviceName: String!) {
    login(loginInput: $loginInput, deviceName: $deviceName) {
      accessToken
    }
  }
`;