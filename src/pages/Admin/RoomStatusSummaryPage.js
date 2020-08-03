import React, { Component } from "react";
import BasePage from "../BasePage";
import UserTable from "../../components/StripedTable";
import axios from "../../axiosInstance";


class RoomStatusSummaryPage extends Component {

  constructor(props) {
    super(props);
    this.state = { loading: true, overfilled: [], underfilled: [] };
  }

  componentDidMount() {
    this.setState({ loading: true });
    axios.get("/api/rooms/get_overfilled_rooms")
    .then(res => {
      this.setState({
        overfilled: res.data.map(item =>
          [
            item.number,
            item.capacity,
            item.num_occupants,
          ]
        )
      });
    })
    .then(() => {
      axios.get("/api/rooms/get_underfilled_rooms")
      .then(res => {
        this.setState({
          loading: false,
          underfilled: res.data.map(item =>
            [
              item.number,
              item.capacity,
              item.num_occupants,
            ]
          )
        });
      })
    });
  }

  render() {
    return(
      <BasePage loading={this.state.loading}>
        <h2>Overfilled Rooms</h2>
        <UserTable
            rows={this.state.overfilled}
            headers={["Room", "Capacity", "Num. Occupants"]}
          />

          <br />

          <h2>Underfilled Rooms</h2>
          <UserTable
              rows={this.state.underfilled}
              headers={["Room", "Capacity", "Num. Occupants"]}
            />
      </BasePage>
    )
  }
};

export default RoomStatusSummaryPage 