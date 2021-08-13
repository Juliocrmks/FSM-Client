import React from "react";
import { Button, Card, CardContent, Form } from "semantic-ui-react";
import { useForm } from "../utils/hooks";
import gql from "graphql-tag";
import { useMutation } from "@apollo/react-hooks";
import { FETCH_POSTS_QUERY } from "../utils/graphql";

function PostForm() {
  const { values, onChange, onSubmit } = useForm(createPostCallback, {
    body: "",
  });
  const [createPost, { error }] = useMutation(CREATE_POST_MUTATION, {
    variables: values,
    refetchQueries: (refetchPosts) => [{ query: FETCH_POSTS_QUERY }],
    onError() {
      console.log("error");
    },
  });

  function createPostCallback() {
    createPost();
  }

  return (
    <>
      <Card fluid>
        <CardContent>
          <Form onSubmit={onSubmit}>
            <h2>Create a Post:</h2>
            <Form.Field>
              <Form.Input
                placeholder="Write your Post here"
                name="body"
                onChange={onChange}
                value={values.body}
                error={error ? true : false}
              />
              <Button type="submit" color="teal" floated="right">
                Submit
              </Button>
            </Form.Field>
          </Form>
        </CardContent>
      </Card>
      {error && (
        <div className="ui error message" style={{ marginBottom: 20 }}>
          <ul className="list">
            <li>{error.graphQLErrors[0].message}</li>
          </ul>
        </div>
      )}
    </>
  );
}

const CREATE_POST_MUTATION = gql`
  mutation createPost($body: String!) {
    createPost(body: $body) {
      id
      body
      createdAt
      username
      likes {
        id
        username
        createdAt
      }
      likeCount
      comments {
        id
        body
        username
        createdAt
      }
      commentCount
    }
  }
`;
export default PostForm;
