import React from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";

const ProductCart = ({ item, onPress }) => {
  return (
    <TouchableOpacity style={styles.card} onPress={() => onPress(item)}>
      <Image source={{ uri: item.image }} style={styles.image} />

      <Text numberOfLines={1} style={styles.title}>
        {item.title}
      </Text>

      <Text style={styles.price}>${item.price}</Text>
    </TouchableOpacity>
  );
};

export default ProductCart;

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    margin: 10,
    padding: 10,
    borderRadius: 10,
    elevation: 3
  },
  image: {
    height: 100,
    resizeMode: "contain"
  },
  title: {
    color: "black",
    marginTop: 5
  },
  price: {
    color: "#007BFF",
    fontWeight: "bold",
    marginTop: 5
  }
});