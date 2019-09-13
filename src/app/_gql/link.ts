import gql from 'graphql-tag';

export const LINK_QUERY = gql`
  query links($page: Int!) {
    links(page: $page) {
      ID,
      Name,
      CustomName,
      ToSite,
      CreatedUnix,
      LastActionUnix,
      IsActive
    }
  }`;

export const LINK_CREATE = gql`
  mutation createLink($link: NewLink!) {
    createLink(link: $link) {
      ID,
      Name,
      CustomName,
      ToSite,
      LastActionUnix,
      IsActive
    }
  }`;

export const LINK_DELETE = gql`
  mutation deleteLink($id: ID!) {
    deleteLink(id: $id) {
      ID,
      Name,
      CustomName,
      ToSite,
      LastActionUnix,
      IsActive
    }
  }`;

export const LINK_SET_ACTIVE = gql`
  mutation setActiveLink($state: Boolean!, $id: ID!) {
    setActiveLink(state: $state, id: $id) {
      ID,
      Name,
      CustomName,
      ToSite,
      LastActionUnix,
      IsActive
    }
  }`;

