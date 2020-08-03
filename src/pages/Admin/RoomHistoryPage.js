import React, { Component } from "react";
import BasePage from "../BasePage";
import DirectoryAutocomplete from "../../components/DirectoryAutocomplete";
import axios from "../../axiosInstance";
import { Form, Input, FormGroup, Button, Col, Table } from "reactstrap";
import saveToken from "../../login";

class RoomHistoryPage extends Component {
  constructor(props) {
    super(props);
    this.state = { username: "", room: "" };
  }

  onSubmit = values => {
    axios
      .post("/impersonate/", values)
      .then(res => saveToken(res.data, this.props.history));
  };

  updateUsername = value => {
    this.setState({ username: value });
  };

  updateRoom = e => {
    e.preventDefault();
    this.setState({ room: e.target.value });
  };

  searchUsername = e => {
    e.preventDefault();
    axios
      .get("/api/rooms/get_user_history/", {
        params: {
          username: this.state.username
        }
      })
      .then(res => {
        this.setState({ items: res.data });
      });
  };

  searchRoom = e => {
    e.preventDefault();
    axios
      .get("/api/rooms/get_room_history/", {
        params: {
          room: this.state.room
        }
      })
      .then(res => {
        this.setState({ items: res.data });
      });
  };

  render() {
    return (
      <BasePage {...this.props}>
        <Form>
          <FormGroup row>
            <Col xs={5}>
              <DirectoryAutocomplete
                name="username"
                placeholder="Username"
                value={this.state.username}
                onChange={value => this.updateUsername(value)}
              />
            </Col>
            <Col xs={"auto"}>
              <Button type="submit" onClick={this.searchUsername}>
                Search by user
              </Button>
            </Col>
          </FormGroup>
          <FormGroup row>
            <Col xs={5}>
              <Input
                type="text"
                name="room"
                placeholder="Room"
                value={this.state.room}
                onChange={this.updateRoom}
              />
            </Col>
            <Col>
              <Button type="submit" onClick={this.searchRoom}>
                Search by room
              </Button>
            </Col>
          </FormGroup>
        </Form>
        {this.state.items && (
          <Table
            striped
            bordered
            responsive
            style={{ backgroundColor: "white" }}
          >
            <thead>
              <tr>
                <th>Resident</th>
                <th>Username</th>
                <th>Room</th>
                <th>Move In</th>
                <th>Move Out</th>
              </tr>
            </thead>
            <tbody>
              {this.state.items.map((item, index) => (
                <tr key={index}>
                  <td>{item.user.display_name}</td>
                  <td>{item.user.username}</td>
                  <td>{item.room.number}</td>
                  <td>{item.move_in_date}</td>
                  <td>{item.move_out_date}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        )}
      </BasePage>
    );
  }
}
export default RoomHistoryPage;
