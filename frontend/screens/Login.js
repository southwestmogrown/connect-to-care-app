import { StyleSheet, View } from 'react-native';
import { useState } from 'react';
import axios from 'axios';

import FormInput from '../components/FormInput';
import FormButton from '../components/FormButton';

const LOCAL_URL = 'http://192.168.254.2:8000/api';

const Login = () => {
  const [username, onChangeUsername] = useState('');
  const [password, onChangePassword] = useState('');

  const onSubmit = async () => {
    try {
      const res = await axios.post(`${LOCAL_URL}/session`, {
        credential: username,
        password: password,
      });
      console.log(res.data);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <View style={styles.container}>
      <FormInput val={username} onChange={onChangeUsername} placeHolder='email'>
        Email or UserName
      </FormInput>
      <FormInput
        val={password}
        onChange={onChangePassword}
        placeHolder='password'
      >
        Password
      </FormInput>
      <FormButton handlePress={onSubmit}>Login</FormButton>
    </View>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
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
