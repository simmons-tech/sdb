import React, { Component } from "react";
import { 
  Container,
  Row, 
  Col, 
  Card, 
  Button,
  ListGroup,
  ListGroupItem
} from "reactstrap";
import Modal from "./Modal";
import axios from "../axiosInstance";

class TodoList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      viewCompleted: false,
      activeItem: {
        title: "",
        description: "",
        completed: false
      },
      todoList: []
    };
  }

  componentDidMount() {
    this.refreshList();
  }


  refreshList = () => {
    axios
      .get("/api/todos/")
      .then(res => this.setState({ todoList: res.data }))
      .catch(err => console.log(err));
  };

  displayCompleted = status => {
    if (status) {
      return this.setState({ viewCompleted: true });
    }
    return this.setState({ viewCompleted: false });
  };


  renderTabList = () => {
    return (
      <div className="my-5 tab-list">
        <span
          onClick={() => this.displayCompleted(true)}
          className={this.state.viewCompleted ? "active" : ""}
        >
          Complete
        </span>
        <span
          onClick={() => this.displayCompleted(false)}
          className={this.state.viewCompleted ? "" : "active"}
        >
          Incomplete
        </span>
      </div>
    );
  };

  renderItems = () => {
    const { viewCompleted } = this.state;
    const newItems = this.state.todoList.filter(
      item => item.completed === viewCompleted
    );
    return newItems.map((item, indx) => (
      <ListGroupItem
        key={indx}
        className="d-flex justify-content-between align-items-center"
      >
        <span
          className={`todo-title mr-2 ${
            this.state.viewCompleted ? "completed-todo" : ""
            }`}
          title={item.description}
        >
          {item.title}
        </span>
        <span>
          <Button
            color="secondary"
            onClick={() => this.editItem(item)}
            className="mr-2"
          >
            {" "} Edit {" "}
          </Button>
          <Button
            color="danger"
            onClick={() => this.handleDelete(item)}
          >
            Delete{" "}
          </Button>
        </span>
      </ListGroupItem>
    ));
  };


  toggle = () => {
    this.setState({ modal: !this.state.modal });
  };


  handleSubmit = item => {
    this.toggle();
    if (item.id) {
      axios
        .put(`/api/todos/${item.id}/`, item)
        .then(res => this.refreshList());
      return;
    }
    axios
      .post("/api/todos/", item)
      .then(res => this.refreshList());
  };


  handleDelete = item => {
    axios
      .delete(`/api/todos/${item.id}`)
      .then(res => this.refreshList());
  };


  createItem = () => {
    const item = { title: "", description: "", completed: false };
    this.setState({ activeItem: item, modal: !this.state.modal });
  };


  editItem = item => {
    this.setState({ activeItem: item, modal: !this.state.modal });
  };

  render() {
    return (
      <Container>
        <Row>
          <Col md="6" sm="10" className="mx-auto p-0">
            <Card className="p-3">
              <div className="">
                <Button color="primary" onClick={this.createItem}>
                  Add task
                </Button>
              </div>
              {this.renderTabList()}
              <ListGroup flush>
                {this.renderItems()}
              </ListGroup>
            </Card>
          </Col>
        </Row>
        {this.state.modal ? (
          <Modal
            activeItem={this.state.activeItem}
            toggle={this.toggle}
            onSave={this.handleSubmit}
          />
        ) : null}
      </Container>
    );
  }
}

export default TodoList;