import { Pressable, StyleSheet, Text, View } from 'react-native';
import React from 'react';

const FormButton = ({ handlePress, children }) => {
  return (
    <View style={styles.btnOuterContainer}>
      <Pressable
        style={styles.btnInnerContainer}
        onPress={handlePress}
        android_ripple={{ color: '#ccc' }}
      >
        <Text style={styles.btnText}>{children}</Text>
      </Pressable>
    </View>
  );
};

export default FormButton;

const styles = StyleSheet.create({
  btnOuterContainer: {
    height: 25,
    borderWidth: 1,
    borderColor: 'black',
  },
  btnInnerContainer: {
    flex: 1,
    backgroundColor: '#212121',
    justifyContent: 'center',
    alignItems: 'center',
  },
  btnText: {
    color: 'white',
  },
});
