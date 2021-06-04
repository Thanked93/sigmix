import React, { useLayoutEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { Button, Input, Image } from "react-native-elements";
import Icon from "@expo/vector-icons/FontAwesome";
import { db } from "../firebase";
import firebase from "firebase/app";
const AddChatScreen = ({ navigation }) => {
  const [input, setInput] = useState("");

  useLayoutEffect(() => {
    navigation.setOptions({
      title: "Add a new Chat",
      headerBackTitle: "Chats",
    });
  }, [navigation]);

  const createChat = async () => {
    await db
      .collection("chats")
      .add({ chatName: input, timestamp: firebase.firestore.FieldValue.serverTimestamp() })
      .then(() => {
        navigation.goBack();
      })
      .catch((err) => alert(err));
  };

  return (
    <View style={styles.container}>
      <Input
        placeholder='Enter a Chat name'
        value={input}
        onChangeText={(text) => setInput(text)}
        leftIcon={<Icon name='wechat' type='antdesign' color='black' size={24} />}
        onSubmitEditing={createChat}
      />
      <Button onPress={createChat} title='Create new Chat' />
    </View>
  );
};

export default AddChatScreen;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    padding: 30,
    height: "100%",
  },
});
