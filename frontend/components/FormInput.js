import { StyleSheet, Text, TextInput } from 'react-native';
import React from 'react';

const FormInput = ({ children, placeHolder, onChange, val }) => {
  return (
    <>
      <Text>{children}</Text>
      <TextInput
        value={val}
        onChangeText={onChange}
        style={styles.input}
        placeholder={placeHolder}
        autoCapitalize='none'
      />
    </>
  );
};

export default FormInput;

const styles = StyleSheet.create({
  input: {
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 5,
    width: 300,
    height: 40,
    padding: 8,
    marginVertical: 10,
  },
});
