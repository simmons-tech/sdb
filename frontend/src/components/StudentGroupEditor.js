import React, { Component } from "react";
import DirectoryAutocomplete from "../components/DirectoryAutocomplete";
import axios from "../axiosInstance";
import LoadingSpinner from "../components/LoadingSpinner";
import {
  Form,
  InputGroup,
  InputGroupAddon,
  Button,
  FormGroup,
  Row,
  Col
} from "reactstrap";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { faGripLines } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const reorder = (list, startIndex, endIndex) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};

export default class StudentGroupEditor extends Component {
  constructor(props) {
    super(props);
    this.state = { loading: true, text: "" };
  }

  componentDidMount() {
    axios
      .get(this.props.endpoint)
      .then(res => {
        console.log(res.data)
        this.setState({
          loading: false,
          items: res.data.map(item => item.username)
        })
      });
  }

  onDragEnd = result => {
    // dropped outside the list
    if (!result.destination) {
      return;
    }

    const items = reorder(
      this.state.items,
      result.source.index,
      result.destination.index
    );

    this.setState({
      items
    });
  };

  onChange = (val, index) => {
    const items = this.state.items;
    items[index] = val;
    this.setState({ items });
  };

  removeIndex = (e, index) => {
    e.preventDefault();
    const items = this.state.items;
    items.splice(index, 1);
    this.setState({ items });
  };

  addElement = e => {
    e.preventDefault();
    const items = this.state.items;
    items.push("");
    this.setState({ items });
  };

  handleSubmit = e => {
    e.preventDefault();
    this.setState({ text: "Saving..." });
    axios
      .post(this.props.endpoint, { usernames: this.state.items })
      .then(res => {
        this.setState({ text: "Saved" });
      })
      .catch(e => {
        console.log(e);
        this.setState({ text: "error!" });
      });
  };

  render() {
    if (this.state.loading) {
      return <LoadingSpinner color="black" />;
    }
    return (
      <div className="p-3">
        <h3>{this.props.header}</h3>
        <Form>
          <DragDropContext onDragEnd={this.onDragEnd}>
            <Droppable droppableId="droppable">
              {(provided, snapshot) => (
                <div {...provided.droppableProps} ref={provided.innerRef}>
                  {this.state.items.map((item, index) => (
                    <Draggable
                      key={index}
                      draggableId={index.toString()}
                      index={index}
                    >
                      {(provided, snapshot) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          className="edit-group-box"
                        >
                          <Row>
                            <Col xs={1} className="d-flex align-items-center">
                              <FontAwesomeIcon icon={faGripLines} />
                            </Col>
                            <Col className="pt-3">
                              <FormGroup>
                                <InputGroup>
                                  <InputGroupAddon addonType="prepend">
                                    <Button
                                      onClick={e => this.removeIndex(e, index)}
                                      color="danger"
                                    >
                                      Delete
                                    </Button>
                                  </InputGroupAddon>
                                  <div className="input-group-autocomplete">
                                    <DirectoryAutocomplete
                                      value={item}
                                      onChange={val =>
                                        this.onChange(val, index)
                                      }
                                    />
                                  </div>
                                </InputGroup>
                              </FormGroup>
                            </Col>
                          </Row>
                        </div>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </DragDropContext>
          <div className="d-flex justify-content-around">
            <span>
              <Button color="success" onClick={e => this.addElement(e)}>
                Add
              </Button>
              <br />
            </span>
            <span>
              <Button onClick={this.handleSubmit}>Save</Button>
              <br />
              {this.state.text}
            </span>
          </div>
        </Form>
      </div>
    );
  }
}
