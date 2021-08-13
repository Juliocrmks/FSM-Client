import React, { useContext } from "react";
import { useQuery } from "@apollo/react-hooks";
import { Grid, Transition } from "semantic-ui-react";
import PostCard from "../components/PostCard";
import { AuthContext } from "../context/auth";
import PostForm from "../components/PostForm";
import { FETCH_POSTS_QUERY } from "../utils/graphql";

function Home() {
  const { loading, data: { getPosts: posts } = {} } =
    useQuery(FETCH_POSTS_QUERY);
  const { user } = useContext(AuthContext);
  return (
    <Grid columns={3}>
      <Grid.Row className="page-title">
        <h1>Recent Posts</h1>
      </Grid.Row>
      {user && (
        <Grid.Row>
          <PostForm></PostForm>
        </Grid.Row>
      )}
      {loading ? (
        <h1>Loading Posts...</h1>
      ) : (
        <Transition.Group>
          {posts &&
        posts.map((post) => (
          <Grid.Row key={post.id} style={{ marginBottom: 20 }}>
            <PostCard post={post} />
          </Grid.Row>
        ))}
        </Transition.Group>
      )}
    </Grid>
  );
}

export default Home;
