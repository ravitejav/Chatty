import React, {Component} from 'react';
import {
  View,
  StyleSheet,
  KeyboardAvoidingView,
  TextInput,
  FlatList,
  Text,
  TouchableOpacity,
} from 'react-native';
import {connect} from 'react-redux';

import Message from './Message';
import {removeCurrentContact, addMessage} from '../../redux/Messages/actions';
import {
  currentContactSelector,
  messageSelector,
} from '../../selectors/MessageSelectors';
import {percentToVal} from '../styles/CommonStyles';
import {userDetails} from '../../selectors/AuthSelectors';
import MessageSerivce from '../../services/MessageService';
import {fromEmailToId} from '../../services/Transformer';

class MessagesContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      message: '',
    };
    this.messageService = new MessageSerivce();
  }

  componentDidMount() {
    this.props.navigation.setOptions({
      title: this.props.currentContact.fullName,
    });
  }

  sendMessage() {
    const {user, currentContact, addMessage} = this.props;
    this.messageService.sendMessage(
      this.state.message,
      user.email,
      currentContact.emailId,
      addMessage,
    );
    this.setState({message: ''});
  }

  renderMessage = ({item, index}) => {
    const {
      user: {email},
    } = this.props;
    return (
      <Message
        key={index}
        message={item.message}
        sentByMe={item.sentBy === fromEmailToId(email)}
        at={item.at}
      />
    );
  };

  render() {
    const {messages} = this.props;
    return (
      <KeyboardAvoidingView
        behavior="padding"
        keyboardVerticalOffset={percentToVal(15)}
        style={styles.mainContainer}>
        <View style={styles.mainContainer}>
          <FlatList
            data={Object.keys(messages)
              .map((messageKey) => messages[messageKey])
              .sort((mes1, mes2) => mes1.at - mes2.at)}
            renderItem={this.renderMessage}
            keyExtractor={(message) => message.at.toString()}
          />
          <View style={styles.messageBox}>
            <TextInput
              style={styles.textBox}
              placeholder={'Enter you message....'}
              onChangeText={(message) => this.setState({message})}
              value={this.state.message}
            />
            <TouchableOpacity
              style={styles.sendButton}
              onPress={() => this.sendMessage()}>
              <Text style={styles.sendText}>Send</Text>
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>
    );
  }
}

const mapStateToProps = (state, ownProps) => ({
  currentContact: currentContactSelector(state, ownProps),
  user: userDetails(state, ownProps).userDetails,
  messages: messageSelector(state, ownProps),
});

export default connect(mapStateToProps, {removeCurrentContact, addMessage})(
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
    display: 'flex',
    flexDirection: 'row',
    height: percentToVal(5),
    margin: percentToVal(0.5),
    borderRadius: percentToVal(3),
    paddingLeft: percentToVal(1.5),
  },
  textBox: {
    height: percentToVal(5),
    fontSize: percentToVal(2),
    width: percentToVal(75, true),
  },
  sendButton: {
    height: percentToVal(4.9),
    width: percentToVal(19.5, true),
    backgroundColor: 'green',
    borderWidth: 1,
    borderRadius: percentToVal(5),
  },
  sendText: {
    textAlign: 'center',
    paddingVertical: percentToVal(3, true),
  },
});
