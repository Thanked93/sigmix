import React, { useState, useLayoutEffect } from "react";
import { StatusBar } from "react-native";
import { KeyboardAvoidingView } from "react-native";
import { StyleSheet, View } from "react-native";
import { Button, Input, Text } from "react-native-elements";
import { auth } from "../firebase";

const RegisterScreen = ({ navigation }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [imageUrl, setImageUrl] = useState("");

  useLayoutEffect(() => {
    navigation.setOptions({
      headerBackTitle: "Back to Login",
    });
  }, [navigation]);

  const register = () => {
    auth
      .createUserWithEmailAndPassword(email, password)
      .then((authUser) => {
        authUser.user.update({
          displayName: name,
          photoURL: imageUrl || "https://cencup.com/wp-content/uploads/2019/07/avatar-placeholder.png",
        });
      })
      .catch((err) => alert(err.message));
  };

  return (
    <KeyboardAvoidingView behavior='padding' style={styles.container}>
      <StatusBar style='light' />
      <Text h3 style={{ marginBottom: 50 }}>
        Create a Signal Account
      </Text>
      <View style={styles.inputContainer}>
        <Input placeholder='Full Name' autoFocus type='text' onChangeText={(text) => setName(text)} value={name} />
        <Input placeholder='Email' type='email' onChangeText={(text) => setEmail(text)} value={email} />
        <Input
          placeholder='Password'
          type='password'
          secureTextEntry
          onChangeText={(text) => setPassword(text)}
          value={password}
          onSubmitEditing={register}
        />
        <Input
          placeholder='Profile Picture URL (optional)'
          type='text'
          onChangeText={(text) => setImageUrl(text)}
          value={imageUrl}
          onSubmitEditing={register}
        />
      </View>
      <Button title='Register' containerStyle={styles.button} raised onPress={register} />
    </KeyboardAvoidingView>
  );
};

export default RegisterScreen;

const styles = StyleSheet.create({
  constainer: { flex: 1, alignItems: "center", justifyContent: "center", backgroundColor: "white", padding: 10 },
  button: { width: 200, marginTop: 10 },
  inputContainer: { width: 300 },
});
