import React, {Component} from 'react';
import {Text, StyleSheet, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import PropTypes from 'prop-types';

import {percentToVal} from '../styles/CommonStyles';

export default class CustomButton extends Component {
  static propTypes = {
    style: PropTypes.object,
    handleOnPress: PropTypes.func,
    label: PropTypes.string,
    icon: PropTypes.string,
    iconSize: PropTypes.number,
  };

  constructor(props) {
    super(props);
  }

  render() {
    const {style = {}, handleOnPress, label, icon, iconSize = 18} = this.props;
    return (
      <TouchableOpacity
        onPress={handleOnPress}
        style={{...styles.buttonStyle, ...style}}>
        {icon && <Icon name={icon} size={iconSize} style={styles.iconStyle} />}
        {label && <Text style={styles.label}>{label}</Text>}
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  buttonStyle: {
    flexDirection: 'column',
    justifyContent: 'space-around',
    height: percentToVal(6),
    width: percentToVal(16),
    backgroundColor: '#60B2FF',
    borderRadius: percentToVal(1.5),
    alignSelf: 'center',
    marginTop: percentToVal(5),
  },
  label: {
    fontSize: 18,
    color: '#000',
    alignSelf: 'center',
  },
  iconStyle: {
    alignSelf: 'center',
  },
});
