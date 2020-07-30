import React, {Component} from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {connect} from 'react-redux';

import {percentToVal} from '../styles/CommonStyles';
import {userDetails} from '../../selectors/AuthSelectors';
import {FlatList} from 'react-native-gesture-handler';

const props = {};
class Contacts extends Component<props> {
  constructor(props) {
    super(props);
  }

  renderItem = ({item, index}) => {
    const {onContactSelect} = this.props;
    return (
      <TouchableOpacity
        style={styles.userContainer}
        key={index}
        onPress={() => onContactSelect(item, index)}>
        <Text style={styles.name}>
          {item.fullName}({item.nickName})
        </Text>
        <Text style={styles.email}>{item.emailId}</Text>
      </TouchableOpacity>
    );
  };

  render() {
    const {contacts = []} = this.props;
    return (
      <View style={styles.mainContainer}>
        <FlatList
          data={contacts}
          renderItem={this.renderItem}
          keyExtractor={(contact) => contact.emailId}
        />
      </View>
    );
  }
}

const mapStateToProps = () => ({
  user: userDetails,
});

export default connect(mapStateToProps, {})(Contacts);

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    height: '100%',
    width: '100%',
    flexDirection: 'column',
  },
  userContainer: {
    width: '100%',
    flex: 1,
    padding: percentToVal(2),
    borderWidth: 0.3,
  },
  email: {
    fontSize: percentToVal(1.5),
  },
  name: {
    fontSize: percentToVal(3),
  },
});
