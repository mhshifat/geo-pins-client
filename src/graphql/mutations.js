export const CREATE_PIN_MUTATION = `
  mutation($input:CreatePinInput!) {
    createPin(input:$input) {
      _id
      createdAt
      title
      content
      image
      latitude
      longitude
      author {
        _id
        name
        email
        picture
      }
    }
  }
`;

export const DELETE_PIN_MUTATION = `
  mutation($pinId:ID!) {
    deletePin(pinId:$pinId) {
      _id
    }
  }
`;

export const CREATE_COMMENT_MUTATION = `
  mutation($pinId:ID!, $text:String!) {
    createComment(pinId:$pinId, text:$text) {
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
