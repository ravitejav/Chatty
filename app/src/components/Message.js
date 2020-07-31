import React, {Component} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {connect} from 'react-redux';
import {percentToVal} from '../styles/CommonStyles';

const props = {};
class Message extends Component<props> {
  constructor(props) {
    super(props);
  }

  render() {
    const {sentByMe, message = ''} = this.props;
    return (
      <View
        style={[
          styles.mainContainer,
          sentByMe ? styles.sentbyMe : styles.sentByFriend,
        ]}>
        <Text style={styles.message}>{message}</Text>
      </View>
    );
  }
}

const mapStateToProps = (state, ownProps) => ({});

export default connect(mapStateToProps, {})(Message);

const styles = StyleSheet.create({
  mainContainer: {
    width: '70%',
    borderWidth: 1,
    borderColor: '#121212',
    margin: percentToVal(0.7),
    padding: percentToVal(1),
  },
  message: {
    fontSize: percentToVal(1.5),
  },
  sentbyMe: {
    alignSelf: 'flex-end',
    backgroundColor: '#d0d0d0',
    borderTopLeftRadius: percentToVal(1.3),
    borderBottomLeftRadius: percentToVal(1.3),
    borderTopRightRadius: percentToVal(1.3),
  },
  sentByFriend: {
    alignSelf: 'flex-start',
    borderTopRightRadius: percentToVal(1.3),
    borderBottomRightRadius: percentToVal(1.3),
    borderTopLeftRadius: percentToVal(1.3),
    backgroundColor: '#80f2FF',
  },
});
