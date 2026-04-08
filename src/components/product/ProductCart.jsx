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
    width: "45%",          // ✅ FIX (2 cards per row)
    backgroundColor: "#fff",
    padding: 10,
    borderRadius: 10,
    marginVertical: 8,
    elevation: 3,
    alignItems: "center",
    marginRight:8,
  },

  title: {
    color: "black",
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 5
  },

  image: {
    width: "100%",
    height: 100,
    resizeMode: "contain",
    marginVertical: 5
  },

  price: {
    color: "#007BFF",
    fontWeight: "bold",
    marginTop: 5
  }
});
// });