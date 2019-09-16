import gql from 'graphql-tag';

export * from './token'
export * from './user'
export * from './link'
export * from './image'

export const COUNT_QUERY = gql`
  query getCountElements($typeElement: String!) {
    getCountElements(typeElement: $typeElement) {
      TypeElement,
      CountElement,
      ItemPerPage
    }
  }`;
