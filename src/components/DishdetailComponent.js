import React from 'react';
import { Card, CardImg, CardText, CardBody, CardTitle } from 'reactstrap';

function RenderComments({ comments }) {
  if (comments != null) {
    const displayComment = comments.map((comm) => (
      <div className="col-12" key={comm.id}>
        <p>{comm.comment}</p>
        <p>
          <strong> author:</strong> {comm.author} <strong>date:</strong>{' '}
          {new Intl.DateTimeFormat('en-US', {
            year: 'numeric',
            month: 'short',
            day: '2-digit',
          }).format(new Date(Date.parse(comm.date)))}
        </p>
      </div>
    ));
    return (
      <div>
        <h1>Comments</h1>
        {displayComment}
      </div>
    );
  }
  return <p>No Cmments</p>;
}

function RenderDish({ dish }) {
  return (
    <Card>
      <CardImg top src={dish.image} alt={dish.name} />
      <CardBody>
        <CardTitle>{dish.name}</CardTitle>
        <CardText>{dish.description}</CardText>
      </CardBody>
    </Card>
  );
}
const Dishdetail = (props) => {
  if (props.dish != null)
    return (
      <div className="container">
        <div className="row">
          <div className="col-12 col-md-5 m-1">
            <RenderDish dish={props.dish} />
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
