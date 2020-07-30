import React, {Component} from 'react';
import {View, StyleSheet, KeyboardAvoidingView} from 'react-native';
import {connect} from 'react-redux';
import {FlatList, TextInput} from 'react-native-gesture-handler';

import Message from './Message';
import {removeCurrentContact} from '../../redux/Messages/actions';
import {currentContactSelector} from '../../selectors/MessageSelectors';
import {percentToVal} from '../styles/CommonStyles';

class MessagesContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      message: '',
    };
  }

  componentDidMount() {
    this.props.navigation.setOptions({
      title: this.props.currentContact.fullName,
    });
  }

  renderMessage = ({item, index}) => {
    return <Message key={index} sentByMe={item.sentbyMe} />;
  };

  render() {
    return (
      <KeyboardAvoidingView
        behavior="padding"
        keyboardVerticalOffset={percentToVal(15)}
        style={styles.mainContainer}>
        <View style={styles.mainContainer}>
          <FlatList
            data={[
              {at: 1234567, sentbyMe: true},
              {at: 12345678, sentbyMe: false},
            ]}
            renderItem={this.renderMessage}
            keyExtractor={(message) => message.at.toString()}
          />
          <TextInput
            style={styles.messageBox}
            placeholder={'Enter you message....'}
            onChangeText={(message) => this.setState({message})}
            value={this.state.message}
          />
        </View>
      </KeyboardAvoidingView>
    );
  }
}

const mapStateToProps = (state, ownProps) => ({
  currentContact: currentContactSelector(state, ownProps),
});

export default connect(mapStateToProps, {removeCurrentContact})(
  MessagesContainer,
);

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    height: '100%',
    width: '100%',
    flexDirection: 'column',
    display: 'flex',
  },
  messageBox: {
    borderWidth: 1,
    height: percentToVal(5),
    margin: percentToVal(0.5),
    borderRadius: percentToVal(3),
    paddingLeft: percentToVal(3),
    fontSize: percentToVal(2),
  },
});
