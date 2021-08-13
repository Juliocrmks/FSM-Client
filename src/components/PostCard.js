import React from "react";
import { Card, Icon, Label, Button, Image } from "semantic-ui-react";
import moment from "moment";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/auth";
import { useContext } from "react/cjs/react.development";
import LikeButton from'../components/LikeButton';
import DeleteButton from "./DeleteButton";

function PostCard({
  post: { body, createdAt, id, username, likeCount, commentCount, likes },
}) {
  const { user } = useContext(AuthContext);
  function likePost() {}
  function deletePost() {}
  return (
    <Card fluid>
      <Card.Content>
        <Image
          floated="right"
          circular
          size="tiny"
          src="https://www.unicef.org/chile/sites/unicef.org.chile/files/styles/hero_desktop/public/Bodoque.PNG?itok=BbVmmHu-"
        />
        <Card.Header>{username}</Card.Header>
        <Card.Meta as={Link} to={`posts/${id}`}>
          {moment(createdAt).fromNow(true)}
        </Card.Meta>
        <Card.Description>{body}</Card.Description>
      </Card.Content>
      <Card.Content extra>
        <LikeButton user={user} post={{id, likes, likeCount}}></LikeButton>
        <Button labelPosition="right" as={Link} to={`posts/${id}`}>
          <Button color="blue" basic>
            <Icon name="comments" />
          </Button>
          <Label basic color="blue" pointing="left">
            {commentCount}
          </Label>
        </Button>
        {user && user.username === username && <DeleteButton postId={id}/>}
      </Card.Content>
    </Card>
  );
}

export default PostCard;
