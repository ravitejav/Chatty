import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {connect} from 'react-redux';

import {commonStyles, percentToVal} from '../styles/CommonStyles';
import {userDetails} from '../../selectors/AuthSelectors';

const props = {};
class Contacts extends Component<props> {
  constructor(props) {
    super(props);
  }

  render() {
    const {contacts = [], onContactSelect} = this.props;
    return (
      <View style={styles.mainContainer}>
        {contacts.map((contact, i) => (
          <TouchableOpacity
            key={i}
            style={styles.userContainer}
            onPress={() => onContactSelect(contact, i)}>
            <Text style={styles.name}>
              {contact.fullName}({contact.nickName})
            </Text>
            <Text style={styles.email}>{contact.emailId}</Text>
          </TouchableOpacity>
        ))}
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
