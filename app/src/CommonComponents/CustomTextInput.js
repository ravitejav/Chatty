import React, {Component} from 'react';
import {TextInput} from 'react-native';

import PropTypes from 'prop-types';

import {commonStyles} from './../styles/CommonStyles';

export default class CustomTextInput extends Component {
  static propTypes = {
    style: PropTypes.object,
    handleOnChange: PropTypes.func,
    placeholder: PropTypes.string,
    name: PropTypes.string,
    readOnly: PropTypes.bool,
  };

  constructor(props) {
    super(props);
  }

  handleInputTextChange = (text) => {
    const {name, handleOnChange = () => {}} = this.props;
    handleOnChange({[name]: text});
  };

  render() {
    const {style = {}, placeholder = '', readOnly = false} = this.props;
    return (
      <TextInput
        placeholder={placeholder}
        onChangeText={(text) => this.handleInputTextChange(text)}
        style={{...commonStyles.inputField, ...style}}
        editable={!readOnly}
        {...this.props}
      />
    );
  }
}
