import React from 'react';
import BasePage from './BasePage';
import axios from "../axiosInstance";
import { Alert, Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';

class SignupPage extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      file: null,
      errors: []
    }
  }

  onChange = (e) => {
    this.setState({file:e.target.files[0]})
  }


  handleUpload = (e, data) => {
    e.preventDefault()
    let formData = new FormData();
    formData.append("user_csv", this.state.file)

    axios
      .post('/api/users/csv_upload/', formData)
      .then(res => {
        console.log("Uploaded")
      })
      .catch((e) => {
        console.log(e)
        this.setState({
          errors: Object.values(e.response.data).reduce((a, element) => a.concat(element), [])
        });
      })
  };

  render() {
    return (
      <BasePage header="Bulk User Create" {... this.props} >
        {this.state.errors.map((error, indx) => (
              <Alert key={indx} color="danger">
                {error}
              </Alert>
            ))}
        <Form onSubmit={this.handleUpload}>
          <FormGroup>
          <Label for="user_csv">File</Label>
          <Input type="file" name="user_csv" id="user_csv" onChange={this.onChange} />
          <FormText color="muted">
            This is some placeholder block-level help text for the above input.
            It's a bit lighter and easily wraps to a new line.
          </FormText>
        </FormGroup>
        <Button type="submit">Upload</Button>
        </Form>
      </BasePage>
    );
  }
}
export default SignupPage