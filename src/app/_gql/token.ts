import gql from 'graphql-tag';

export const TOKEN_QUERY = gql`
  query tokens($page: Int!) {
    tokens(page: $page) {
      ID,
      Name,
      Token,
      LastActionUnix,
      Type,
      IsActive
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

export const TOKEN_DELETE = gql`
  mutation deleteToken($token: String!) {
    deleteToken(token: $token) {
      Name,
      Token,
      Type
    }
  }`;

export const TOKEN_SET_ACTIVE = gql`
  mutation setActiveToken($state: Boolean!, $token: String!) {
    setActiveToken(state: $state, token: $token) {
      ID,
      Name,
      Token,
      LastActionUnix,
      Type,
      IsActive
    }
  }`;

