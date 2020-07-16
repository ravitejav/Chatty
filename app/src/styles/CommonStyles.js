import {StyleSheet, Dimensions} from 'react-native';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
export const percentToVal = (percentage, width = false) => {
  const total = width ? windowWidth : windowHeight;
  return (percentage / 100) * total;
};

export const commonStyles = StyleSheet.create({
  inputField: {
    borderBottomWidth: 0.6,
    width: '80%',
    height: percentToVal(5),
    fontSize: percentToVal(3),
    alignSelf: 'center',
    marginVertical: 20,
  },
  otherEclipseOption: {
    width: percentToVal(8),
    height: percentToVal(8),
    borderRadius: percentToVal(10),
    backgroundColor: '#fff',
    borderWidth: 1,
  },
});
