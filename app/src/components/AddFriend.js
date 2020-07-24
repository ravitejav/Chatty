import React, {Component} from 'react';
import {View, ScrollView, StyleSheet, Alert} from 'react-native';
import {connect} from 'react-redux';

import {commonStyles, percentToVal} from '../styles/CommonStyles';
import CustomTextInput from '../CommonComponents/CustomTextInput';
import CustomButton from '../CommonComponents/CustomButton';
import Contacts from './Contacts';

import {
  setSearchContext,
  addFriendToContactList,
} from '../../redux/Dashboard/actions';
import {searchContextSelector} from './../../selectors/SearchSelector';
import FriendService from './../../services/FriendSerivce';

import {fromEmailToId} from './../../services/Transformer';
import {userDetails} from '../../selectors/AuthSelectors';

const props = {};
class AddFriend extends Component<props> {
  constructor(props) {
    super(props);
    this.friendService = new FriendService();
    this.state = {
      contacts: [],
    };
  }

  handleInputchange = (change) => {
    this.props.setSearchContext(change.emailId);
  };

  handleSearchFriends = () => {
    const {searchContext} = this.props;
    const response = this.friendService.getFirends(
      fromEmailToId(searchContext),
    );
    response
      .then((results) => {
        this.setState({contacts: [results.val()]});
      })
      .catch((error) => {
        alert('No user found');
      });
  };

  handleOnFriendSelect = (friend, index) => {
    Alert.alert('', `Are you sure about adding ${friend.fullName}?`, [
      {
        text: 'Add',
        onPress: () => this.updateFriendList(friend),
        style: 'cancel',
      },
      {text: 'No'},
    ]);
  };

  updateFriendList = (friend) => {
    const {
      user: {
        userDetails: {email},
        userDetails,
      },
      addFriendToContactList,
    } = this.props;
    this.friendService
      .updateFriendlist(email, friend)
      .then((results) => {
        this.friendService
          .updateFriendlist(friend.emailId, userDetails)
          .then()
          .catch();
        addFriendToContactList({
          ...friend,
          id: fromEmailToId(friend.emailId),
        });
        this.props.navigation.goBack();
      })
      .catch((error) => {});
  };

  render() {
    return (
      <View style={styles.mainContainer}>
        <CustomTextInput
          placeholder="your friends email Id"
          style={commonStyles.inputField}
          handleOnChange={this.handleInputchange}
          name="emailId"
          value={this.props.searchContext}
        />
        <CustomButton label="Search" handleOnPress={this.handleSearchFriends} />
        <ScrollView style={styles.resultView}>
          <Contacts
            contacts={this.state.contacts}
            onContactSelect={this.handleOnFriendSelect}
          />
        </ScrollView>
      </View>
    );
  }
}

const mapStateProps = (state, ownProps) => ({
  searchContext: searchContextSelector(state, ownProps),
  user: userDetails(state, {}),
});

export default connect(mapStateProps, {
  setSearchContext,
  addFriendToContactList,
})(AddFriend);

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    height: '100%',
    width: '100%',
    flexDirection: 'column',
  },
  resultView: {
    paddingTop: 5,
  },
});
