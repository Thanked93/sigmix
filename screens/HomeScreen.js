import React, { useLayoutEffect, useState, useEffect } from "react";
import { TouchableOpacity } from "react-native";
import { SafeAreaView, ScrollView, StyleSheet, View } from "react-native";
import { Avatar } from "react-native-elements";
import CustomListItem from "../components/CustomListItem";
import { auth } from "../firebase";
import { AntDesign, SimpleLineIcons } from "@expo/vector-icons";
import { db } from "../firebase";

const HomeScreen = ({ navigation }) => {
  const [chats, setChats] = useState([]);

  useEffect(() => {
    const unsubscribe = db.collection("chats").onSnapshot((snapShot) =>
      setChats(
        snapShot.docs.map((doc) => {
          return {
            id: doc.id,
            data: doc.data(),
          };
        })
      )
    );

    return unsubscribe;
  }, []);

  const signOut = () => {
    auth
      .signOut()
      .then(() => {
        navigation.replace("Login");
      })
      .catch((err) => alert(err));
  };

  const enterChat = (id, chatName) => {
    navigation.navigate("Chat", {
      id,
      chatName,
    });
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      title: "Sigmix",
      headerStyle: { backgroundColor: "#fff" },
      headerTitleStyle: { color: "black" },
      headerTintColor: "black",
      headerLeft: () => (
        <View style={{ marginLeft: 20 }}>
          <TouchableOpacity activeOpacity={0.5} onPress={signOut}>
            <Avatar
              rounded
              source={{
                uri:
                  auth?.currentUser?.photoUrl || "https://cencup.com/wp-content/uploads/2019/07/avatar-placeholder.png",
              }}
            />
          </TouchableOpacity>
        </View>
      ),
      headerRight: () => (
        <View
          style={{
            flexDirection: "row",
            justifyContent: "center",
            width: 80,
            marginRight: 20,
          }}
        >
          <TouchableOpacity opacity={0.5} style={{ marginRight: 10 }}>
            <AntDesign name='camerao' size={24} color='black' />
          </TouchableOpacity>
          <TouchableOpacity opacity={0.5} onPress={() => navigation.navigate("AddChat")}>
            <SimpleLineIcons name='pencil' size={24} color='black' />
          </TouchableOpacity>
        </View>
      ),
    });
  }, [navigation]);

  return (
    <SafeAreaView>
      <ScrollView style={styles.container}>
        {chats.map(({ id, data: { chatName } }) => {
          return <CustomListItem key={id} id={id} chatName={chatName} enterChat={enterChat} />;
        })}
      </ScrollView>
    </SafeAreaView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    height: "100%",
  },
});
