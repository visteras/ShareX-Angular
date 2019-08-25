import gql from 'graphql-tag';

export const USERS_QUERY = () => {
  return gql`
  query users($page: Int!) {
    users(page: $page) {
      Id,
      Name,
      Password,
      CreatedUnix,
      IsAdmin    
    }
  }`
};
