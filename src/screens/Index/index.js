import React, { useContext, useState, useEffect } from "react";
import {
  StyleSheet,
  FlatList,
  Button,
  TouchableOpacity,
  Modal,
  Text,
} from "react-native";
import { Context } from "../../context/BlogContext";
import { FontAwesome5, Feather } from "@expo/vector-icons";

import * as S from "./styles";

const index = ({ navigation }) => {
  const { state, getBlogPosts, deleteBlogPost } = useContext(Context);
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    getBlogPosts();

    const listener = navigation.addListener('didFocus', () => {
      getBlogPosts();
    });

    return () => {
      listener.remove();
    };
  }, []);

  return (
    <S.Wrapper>
      {state && (
        <S.CardHeader>
          <S.TitleText>Blog List</S.TitleText>
        </S.CardHeader>
      )}
      <FlatList
        data={state}
        keyExtractor={(data) => data.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => navigation.navigate("Details", { id: item.id })}
          >
            <S.Container>
              <S.CardHeader>
                <S.DataText>March 23, 2020</S.DataText>
                <S.IconsWrapper>
                  <TouchableOpacity onPress={() => deleteBlogPost(item.id)}>
                    <FontAwesome5 name="trash" size={20} color="#D74E09" />
                  </TouchableOpacity>
                </S.IconsWrapper>
              </S.CardHeader>
              <S.TitleText>
                {item.title} - {item.id}
              </S.TitleText>
              <S.DataText>Ragnar Lothbrok</S.DataText>
            </S.Container>
          </TouchableOpacity>
        )}
      />
      <Modal animationType="slide" transparent={true} visible={modalVisible}>
        <Text>teste</Text>
      </Modal>
    </S.Wrapper>
  );
};

index.navigationOptions = ({ navigation }) => {
  return {
    headerRight: () => (
      <TouchableOpacity
        onPress={() => navigation.navigate("Create")}
        style={{ marginRight: 10 }}
      >
        <Feather name="plus" size={30} color="#D74E09" />
      </TouchableOpacity>
    ),
    title: "Create an article",
  };
};

export default index;

const styles = StyleSheet.create({});
