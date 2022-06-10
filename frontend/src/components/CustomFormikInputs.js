import React from "react";
import DirectoryAutocomplete from './DirectoryAutocomplete';
import { FormFeedback, Input, InputGroup, InputGroupAddon, InputGroupText } from "reactstrap"
import { connect } from 'formik';

function MyDirectoryAutocomplete({ field, form: { touched, errors }, ...props }) {
  return<div>
    <DirectoryAutocomplete
      invalid={!!(touched[field.name] && errors[field.name])}
      {...field}
      {...props} />
    {touched[field.name] && errors[field.name] && <FormFeedback style={{display: "block"}}>{errors[field.name]}</FormFeedback>}
  </div>
}

export function CustomInputForm({ field, form: { touched, errors }, ...props }) {
  return(<div>
    <Input
      invalid={!!(touched[field.name] && errors[field.name])}
      {...field}
      {...props} />
    {touched[field.name] && errors[field.name] && <FormFeedback>{errors[field.name]}</FormFeedback>}
  </div>)
}

export const CustomDirectoryAutocomplete = connect(MyDirectoryAutocomplete)

export function CustomCurrencyInputForm({ field, form: { touched, errors }, ...props }) {
  return(<div>
    <InputGroup>
      <InputGroupAddon addonType="prepend">
        <InputGroupText>$</InputGroupText>
      </InputGroupAddon>
      <Input
        style={{ borderRadius: '0 .25em .25em 0' }}
        type="number"
        step=".01"
        invalid={!!(touched[field.name] && errors[field.name])}
        {...field}
        {...props} />
      {touched[field.name] && errors[field.name] && <FormFeedback>{errors[field.name]}</FormFeedback>}
    </InputGroup>
  </div>)
}
