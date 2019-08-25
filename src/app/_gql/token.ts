import gql from 'graphql-tag';

export const TOKEN_QUERY = gql`
  query tokens($page: Int!) {
    tokens(page: $page) {
      ID,
      Name,
      Token,
      LastActionUnix,
      Type
    }
  }`;

export const TOKEN_CREATE = gql`
  mutation createToken($token: NewToken!) {
    createToken(token: $token) {
      ID,
      Name,
      Token,
      LastActionUnix,
      Type
    }
  }`;

