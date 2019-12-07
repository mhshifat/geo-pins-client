export const ME_QUERY = `
  query {
    me {
      _id
      name
      email
      picture
    }
  }
`;

export const GET_PINS_QUERY = `
  query {
    getPins {
      _id
      createdAt
      title
      content
      image
      latitude
      longitude
      author {
        _id
        email
        name
        picture
      }
      comments {
        createdAt
        text
        author {
          _id
          name
          picture
        }
      }
    }
  }
`;
