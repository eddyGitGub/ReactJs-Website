import React from 'react';
import { Card, CardImg, CardText, CardBody, CardTitle } from 'reactstrap';

function RenderComments(props) {
  if (props.comments != null) {
    const comments = props.comments.map((comm) => (
      <div className="col-12" key={comm.id}>
        <p>{comm.comment}</p>
        <p>
          author: {comm.author} date: {comm.date}
        </p>
      </div>
    ));
    return (
      <div>
        <h1>Comments</h1>
        {comments}
      </div>
    );
  }
  return <p>No Cmments</p>;
}

const Dishdetail = (props) => {
  if (props.dish != null)
    return (
      <div className="container">
        <div className="row">
          <div className="col-12 col-md-5 m-1">
            <Card>
              <CardImg top src={props.dish.image} alt={props.dish.name} />
              <CardBody>
                <CardTitle>{props.dish.name}</CardTitle>
                <CardText>{props.dish.description}</CardText>
              </CardBody>
            </Card>
          </div>
          <div className="col-12 col-md-5 m-1">
            <RenderComments comments={props.dish.comments} />
          </div>
        </div>
      </div>
    );
  else return <div></div>;
};

export default Dishdetail;
