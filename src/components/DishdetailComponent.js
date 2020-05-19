import React, {Component } from 'react';
import {
  Card,
  CardImg,
  CardText,
  CardBody,
  CardTitle,
  Breadcrumb,
  BreadcrumbItem,
  Button,
  Modal,
  ModalBody,
  ModalHeader,
  Label,
  FormGroup,
} from 'reactstrap';
import { Control, LocalForm, Errors } from 'react-redux-form';
import { Link } from 'react-router-dom';
import { Loading } from './LoadingComponent';
import { baseUrl } from '../shared/baseUrl';

class CommentForm extends Component {
  constructor(props) {
    super(props);

    //this.toggleNav = this.toggleNav.bind(this);
    this.state = {
      modal: false,
      setModal: false,
    };
  }
  toggle = () => {
    this.setState({
      modal: !this.state.modal,
    });
  };

  handleSubmit(values) {
    this.toggle();
    this.props.addComment(this.props.dishId, values.rating, values.author, values.comment);
  }
  render() {
    const required = (val) => val && val.length;
    const maxLength = (len) => (val) => !val || val.length <= len;
    const minLength = (len) => (val) => val && val.length >= len;
    return (
      <div>
        <Button outline color="secondary" onClick={this.toggle}>
          Submit Comment
        </Button>
        <Modal isOpen={this.state.modal} toggle={this.toggle}>
          <ModalHeader toggle={this.toggle}>Submit Comment</ModalHeader>
          <ModalBody>
            <LocalForm onSubmit={(values) => this.handleSubmit(values)}>
              <FormGroup>
                <label>Rating</label>
                <Control.select model=".rating" className="form-control">
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="4">4</option>
                  <option value="5">5</option>
                </Control.select>
              </FormGroup>
              <FormGroup>
                <Label htmlFor="author">Your Name</Label>
                <Control.text
                  model=".author"
                  id="author"
                  name="author"
                  placeholder="Your Name"
                  className="form-control"
                  validators={{
                    required,
                    minLength: minLength(3),
                    maxLength: maxLength(15),
                  }}
                />
                <Errors
                  className="text-danger"
                  model=".author"
                  show="touched"
                  messages={{
                    required: 'Required',
                    minLength: 'Must be greater than 2 characters',
                    maxLength: 'Must be 15 characters or less',
                  }}
                />
              </FormGroup>
              <FormGroup>
                <label>Comment</label>
                <Control.textarea
                  model=".comment"
                  className="form-control"
                  rows="6"
                />
              </FormGroup>
              <FormGroup>
                <Button type="submit" color="primary">
                  Submit
                </Button>
              </FormGroup>
            </LocalForm>
          </ModalBody>
        </Modal>
      </div>
    );
  }
}

function RenderComments({ comments, addComment, dishId }) {
  if (comments != null) {
    return (
      <div>
        <h4>Comments</h4>
        {comments.map((comm) => (
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
        ))}
        <CommentForm dishId={dishId} addComment={addComment} />
      </div>
    );
  }
  return <p>No Cmments</p>;
}

function RenderDish({ dish }) {
  return (
    <Card>
      <CardImg top src={baseUrl + dish.image} alt={dish.name} />
      <CardBody>
        <CardTitle>{dish.name}</CardTitle>
        <CardText>{dish.description}</CardText>
      </CardBody>
    </Card>
  );
}
const Dishdetail = (props) => {
  if (props.isLoading) {
    return(
        <div className="container">
            <div className="row">            
                <Loading />
            </div>
        </div>
    );
}
else if (props.errMess) {
    return(
        <div className="container">
            <div className="row">            
                <h4>{props.errMess}</h4>
            </div>
        </div>
    );
}
else if (props.dish != null) {
  if (props.dish != null)
    return (
      <div className="container">
        <div className="row">
          <Breadcrumb>
            <BreadcrumbItem>
              <Link to="/menu">Menu</Link>
            </BreadcrumbItem>
            <BreadcrumbItem active>{props.dish.name}</BreadcrumbItem>
          </Breadcrumb>
          <div className="col-12">
            <h3>{props.dish.name}</h3>
            <hr />
          </div>
        </div>
        <div className="row">
          <div className="col-12 col-md-5 m-1">
            <RenderDish dish={props.dish} />
          </div>
          <div className="col-12 col-md-5 m-1">
            <RenderComments
              comments={props.comments}
              addComment={props.addComment}
              dishId={props.dish.id}
            />
          </div>
        </div>
      </div>
    );
  else return <div></div>;
}
  
};

export default Dishdetail;
