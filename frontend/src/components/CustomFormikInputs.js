import React from "react";
import DirectoryAutocomplete from './DirectoryAutocomplete';
import { FormFeedback, Input } from "reactstrap"

export function CustomDirectoryAutocomplete({ field, form: { touched, errors }, ...props }) {
  return(<div>
    <DirectoryAutocomplete
      invalid={!!(touched[field.name] && errors[field.name])}
      {...field}
      {...props} />
    {touched[field.name] && errors[field.name] && <FormFeedback>{errors[field.name]}</FormFeedback>}
  </div>)
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
