import React, { Component } from "react";
import {Input} from "reactstrap"
import Autosuggest from 'react-autosuggest';
import axios from "../axiosInstance";
import './common.css'

function getSuggestionValue(suggestion) {
  return suggestion.username;
}

function renderSuggestion(suggestion) {
  return (
    <span>{suggestion.username} ({suggestion.first_name} {suggestion.last_name})</span>
  );
}

class DirectoryAutocomplete extends Component {
  static defaultProps = {
    onChange: () => {}
  }

  constructor(props) {
    super(props)
    this.state = {
      suggestions: [],
      isLoading: false
    }

    this.lastRequestId = null;
  }

  updateItems = (query) => {
    this.setState({isLoading: true})
    axios
    .get('/api/users/', {
      params: {
        query: query
      }})
    .then(res => {
      this.setState({isLoading: false, suggestions: res.data})
    })
  }

  queryEndpoint = (query) => {
    let input = query.toLowerCase();
    if (input && input.length >= 2) {
      this.updateItems(input);
    } else {
      this.setState({items: [], value: input})
    }
  };

  loadSuggestions(value) {
    // Cancel the previous request
    if (this.lastRequestId !== null) {
      clearTimeout(this.lastRequestId);
    }
    
    this.setState({
      isLoading: true
    });
    
    this.lastRequestId = setTimeout(() => {
      this.queryEndpoint(value)
    }, 1);
  }

    
    onSuggestionsFetchRequested = ({ value }) => {
      this.loadSuggestions(value);
    };

    onSuggestionsClearRequested = () => {
      this.setState({
        suggestions: []
      });
    };

  onChange = (e, data) => {
    e.preventDefault()
    e.target.value = data.newValue
    const { name, formik } = this.props;
    if (formik) {
      formik.setFieldValue(name, data.newValue)
    }
    this.props.onChange(data.newValue)
  }

  onSuggestionSelected = (e, data) => {
    e.preventDefault();
  }
  render() {
    const inputProps = {
      onChange: this.onChange,
      value: this.props.value,
      invalid: this.props.invalid
    }
    return(
      <Autosuggest
          className="is-invalid" 
          suggestions={this.state.suggestions}
          onSuggestionSelected={this.onSuggestionSelected}
          onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
          onSuggestionsClearRequested={this.onSuggestionsClearRequested}
          getSuggestionValue={getSuggestionValue}
          renderSuggestion={renderSuggestion}
          inputProps={inputProps}
          renderInputComponent = {
            inputProps => (
              <Input type="text" name={this.props.name} {...inputProps}/>
            )
          } 
          renderSuggestionsContainer = {
            ({ containerProps , children, query }) => (
              <span className="mycont" {...containerProps}>
                {children}
              </span>
            )
          }
          />

    )
  }
}

export default DirectoryAutocomplete