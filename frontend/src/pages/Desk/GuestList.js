import React, { Component } from "react";
import BasePage from "../BasePage";
import { CustomDirectoryAutocomplete } from "../../components/CustomFormikInputs";
import { Formik, Form, Field } from "formik";
import { FormGroup, Label, Button } from "reactstrap";
import UserTable from "../../components/StripedTable";
import axios from "../../axiosInstance";
import * as Yup from "yup";
import Alert from "reactstrap/lib/Alert";

class DeskGuestList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      username: null,
      rows: [],
      error: null,
    };
  }

  searchGuests = (values) => {
    this.setState({ loading: true });
    axios
      .get(`/api/users/guest_list?username=${values.username}`)
      .then((res) => {
        let guestList = res.data.guest_list
          .concat(
            res.data.one_time_events.map((event) => event.guest_list).flat()
          )
          .map((guest) => [guest.last_name, guest.first_name]);
        console.log(guestList);
        this.setState({
          rows: guestList,
          username: values.username,
          error: null,
          loading: false,
        });
      })
      .catch((error) => {
        this.setState({
          rows: [],
          username: null,
          error: `Could not find guest list for "${values.username}"`,
          loading: false,
        });
      });
  };

  render() {
    const Schema = Yup.object().shape({
      username: Yup.string().required("Required"),
    });

    return (
      <BasePage loading={this.state.loading}>
        { this.state.error ? (
          <Alert color="danger">
            <span>{this.state.error}</span>
          </Alert>
        ) : null }
        
        <Formik
          initialValues={{
            username: "",
          }}
          validationSchema={Schema}
          onSubmit={(values) => this.searchGuests(values)}
        >
          <Form>
            <FormGroup>
              <Label for="username">Username</Label>
              <Field
                name="username"
                type={"username"}
                id="username"
                component={CustomDirectoryAutocomplete}
              />
            </FormGroup>
            <Button type="submit" className="mb-3">
              Search
            </Button>
          </Form>
        </Formik>

        {this.state.username ? (
          <>
            <h3>Guest list for <strong>{this.state.username}</strong></h3>
            <UserTable
              rows={this.state.rows}
              headers={["Last name", "First name"]}
            />
          </>
        ) : null}
      </BasePage>
    );
  }
}

export default DeskGuestList;
