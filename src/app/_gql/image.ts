import gql from 'graphql-tag';

export const IMAGES_QUERY = gql`
  query images($page: Int!) {
    images(page: $page) {
      ID,
      Name,
      CustomName,
      FileName,
      Size,
      MIMEType,
      CreatedUnix,
      LastActionUnix,
      IsActive,
      URI,
      User {
        Name
      }
    }
  }`;
export const IMAGE_DELETE = gql`
  mutation deleteImage($id: ID!) {
    deleteImage(id: $id) {
      ID,
      Name,
      CustomName,
      FileName,
      Size,
      MIMEType,
      CreatedUnix,
      LastActionUnix,
      IsActive
    }
  }`;
