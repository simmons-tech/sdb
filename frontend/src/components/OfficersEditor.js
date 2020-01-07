import React, { Component } from "react"
import DirectoryAutocomplete from './DirectoryAutocomplete'
import axios from '../axiosInstance';
import LoadingSpinner from "./LoadingSpinner"
import {
  Form,
  Input,
  Button,
  FormGroup,
  Row,
  Col
} from "reactstrap"
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { faGripLines, faWindowClose } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const reorder = (list, startIndex, endIndex) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};


export default class OfficersEditor extends Component {
  constructor(props) {
    super(props)
    this.state = { loading: true, text: "" }
  }

  componentDidMount() {
    axios
      .get("/api/officers/")
      .then(res => this.setState({ loading: false, items: res.data }))
  }

  onDragEnd = (result) => {
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
  }

  onChange = (e, index) => {
    let items = this.state.items
    let prop = e.target.name
    items[index][prop] = e.target.value
    this.setState({ items })
  }

  updateUsername = (value, index) => {
    let items = this.state.items;
    items[index].username = value
    this.setState({ items })
  }

  removeIndex = (e, index) => {
    e.preventDefault()
    const items = this.state.items
    items.splice(index, 1)
    this.setState({ items })
  }

  addElement = e => {
    e.preventDefault()
    const items = this.state.items
    items.push({ title: '', username: '', position: '' })
    this.setState({ items })
  }

  handleSubmit = e => {
    e.preventDefault()
    this.setState({ text: "Saving..." })
    axios
      .post("/api/officers/", { positions: this.state.items })
      .then(res => {
        this.setState({ text: "Saved" })
      })
      .catch(e => {
        console.log(e)
        this.setState({ text: "error!" })
      })
  }

  render() {
    if (this.state.loading) {
      return (<LoadingSpinner />)
    }
    return (
      <div className="p-3">
        <h3>{this.props.header}</h3>
        <Row>
          <Col xs="auto" className="d-flex justify-content-center">
            #
                            </Col>
          <Col className="d-flex justify-content-center">
            Title
                            </Col>
          <Col className="d-flex justify-content-center">
            Position
                            </Col>
          <Col className="d-flex justify-content-center">
            Username
                            </Col>
        </Row>
        <Form>
          <DragDropContext onDragEnd={this.onDragEnd}>
            <Droppable droppableId="droppable">
              {(provided, snapshot) => (
                <div
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                >
                  {this.state.items.map((item, index) => (
                    <Draggable key={index} draggableId={index.toString()} index={index}>
                      {(provided, snapshot) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          className="edit-group-box"
                        >
                          <Row>
                            <Col xs="auto" className="d-flex align-items-center pr-0">
                              <FontAwesomeIcon icon={faGripLines} />
                            </Col>
                            <Col className="pr-0 pl-2">
                              <FormGroup className="pt-3">
                                <Input index={index} name="title" type="text" onChange={e => this.onChange(e, index)} value={item.title} />
                              </FormGroup>
                            </Col>
                            <Col className="pr-0 pl-2">
                              <FormGroup className="pt-3">
                                <Input index={index} name="position" type="text" onChange={e => this.onChange(e, index)} value={item.position} />
                              </FormGroup>
                            </Col>
                            <Col className="pr-0 pl-2">
                              <FormGroup className="pt-3">
                                <DirectoryAutocomplete name="username" value={item.username} onChange={value => this.updateUsername(value, index)} />
                              </FormGroup>
                            </Col>
                            <Col xs="auto" className="d-flex align-items-center pr-0">
                              <Button size="sm" onClick={e => this.removeIndex(e, index)} color="danger">
                                <FontAwesomeIcon size="sm" color="white" icon={faWindowClose} />
                              </Button>
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
            <span><Button color="success" onClick={e => this.addElement(e)}>Add</Button><br /></span>
            <span><Button onClick={this.handleSubmit}>Save</Button><br />{this.state.text}</span>
          </div>
        </Form>
      </div>
    )
  }
}