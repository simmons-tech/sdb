import React from "react";
import BasePage from "../BasePage";
import axios from "../../axiosInstance";
import {
  Alert,
  Button,
  Form,
  FormGroup,
  Label,
  Input,
  FormText
} from "reactstrap";

class SignupPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      file: null,
      errors: [],
      text: "",
      overfilledRooms: [],
      underfilledRooms: []
    };
  }

  onChange = e => {
    this.setState({ file: e.target.files[0] });
  };

  handleUpload = (e, data) => {
    e.preventDefault();
    this.setState({
      text: "Saving...",
      errors: [],
      underfilledRooms: [],
      overfilledRooms: []
    });
    let formData = new FormData();
    formData.append("user_csv", this.state.file);

    axios
      .post("/api/users/csv_upload/", formData)
      .then(res => {
        console.log(res);
        let underfilledRooms = res.data.underfilled.map(item => item.number);
        let overfilledRooms = res.data.overfilled.map(item => item.number);

        let numWarnings = underfilledRooms.length + overfilledRooms;
        this.setState({
          text: numWarnings === 0 ? "Saved" : "Saved (with some warnings)",
          underfilledRooms: underfilledRooms,
          overfilledRooms: overfilledRooms
        });
      })
      .catch(e => {
        console.log(e);
        this.setState({
          text: "Error! Nothing was changed on the DB.",
          errors: Object.values(e.response.data).reduce(
            (a, element) => a.concat(element),
            []
          )
        });
      });
  };

  render() {
    return (
      <BasePage header="" {...this.props}>
        {this.state.errors.map((error, indx) => (
          <Alert key={indx} color="danger">
            <span>{error}</span>
          </Alert>
        ))}
        {this.state.underfilledRooms.length > 0 && (
          <Alert color="warning">
            <span>
              The following rooms are underfilled:{" "}
              {this.state.underfilledRooms.join(", ")}
            </span>
          </Alert>
        )}
        {this.state.overfilledRooms.length > 0 && (
          <Alert color="warning">
            The following rooms are overfilledRooms:{" "}
            {this.state.overfilledRooms.join(", ")}
          </Alert>
        )}
        <p>
          Use this form to bulk upload/create residents. Provide a CSV file with
          the following fields:
        </p>
        <ul>
          <li>username</li>
          <li>firstname</li>
          <li>lastname</li>
          <li>year</li>
          <li>room</li>
          <li>email</li>
          <li>type</li>
        </ul>
        <p>where type is one of</p>
        <ul>
          <li>AHOH</li>
          <li>GRA</li>
          <li>HOH</li>
          <li>MGR</li>
          <li>OTHER</li>
          <li>RLA</li>
          <li>TEMP</li>
          <li>U</li>
          <li>VS</li>
        </ul>
        <p>
          If a username already exists on the DB, their information will be
          updated. Otherwise, a new account will be created for them, which they
          can log into with an MIT certificate.
          <br />
          If no email is specified, a default email of "username@mit.edu" will
          be used.
        </p>
        <Form onSubmit={this.handleUpload}>
          <FormGroup>
            <Label for="user_csv">File</Label>
            <Input
              type="file"
              name="user_csv"
              id="user_csv"
              onChange={this.onChange}
            />
            <FormText color="muted">
              This is some placeholder block-level help text for the above
              input. It's a bit lighter and easily wraps to a new line.
            </FormText>
          </FormGroup>
          <Button type="submit">Upload</Button> {this.state.text}
        </Form>
      </BasePage>
    );
  }
}
export default SignupPage;
