

import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useDispatch } from "react-redux";
import { clearSelectedProduct } from "../../redux/slices/productSlice";

const ProductDetail = ({ route }) => {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const { product } = route.params;

  const [quantity, setQuantity] = useState(1);

  const increaseQty = () => {
    setQuantity(quantity + 1);
  };

  const decreaseQty = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const totalPrice = (product.price * quantity).toFixed(2);

  return (
    <View style={styles.container}>

      {/* 🔥 HEADER (NEW) */}
      <View style={styles.header}>
        
        {/* ⬅️ BACK */}
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.icon}>⬅️</Text>
        </TouchableOpacity>

        <Text style={styles.headerTitle}>Product Detail</Text>

        {/* ❌ CANCEL */}
        <TouchableOpacity
          onPress={() => {
            dispatch(clearSelectedProduct()); // remove item
            navigation.navigate("Home");      // go home
          }}
        >
          <Text style={styles.cancel}>Cancel</Text>
        </TouchableOpacity>

      </View>

      {/* Image */}
      <Image source={{ uri: product.image }} style={styles.image} />

      {/* Title */}
      <Text style={styles.title}>{product.title}</Text>

      {/* Price */}
      <Text style={styles.price}>$ {product.price}</Text>

      {/* Quantity */}
      <View style={styles.qtyContainer}>
        <TouchableOpacity style={styles.qtyBtn} onPress={decreaseQty}>
          <Text style={styles.qtyText}>-</Text>
        </TouchableOpacity>

        <Text style={styles.qtyNumber}>{quantity}</Text>

        <TouchableOpacity style={styles.qtyBtn} onPress={increaseQty}>
          <Text style={styles.qtyText}>+</Text>
        </TouchableOpacity>
      </View>

      {/* Total */}
      <Text style={styles.total}>Total: $ {totalPrice}</Text>

      {/* Checkout */}
      <TouchableOpacity style={styles.checkoutBtn}>
        <Text style={styles.checkoutText}>Checkout</Text>
      </TouchableOpacity>

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff"
  },

  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10
  },

  icon: {
    fontSize: 22
  },

  headerTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "black"
  },

  cancel: {
    color: "red",
    fontWeight: "bold"
  },

  image: {
    width: "100%",
    height: 200,
    resizeMode: "contain"
  },

  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 10,
    color: "black"
  },

  price: {
    fontSize: 16,
    color: "#007BFF",
    marginTop: 5
  },

  qtyContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 20
  },

  qtyBtn: {
    backgroundColor: "#007BFF",
    padding: 10,
    borderRadius: 5
  },

  qtyText: {
    color: "white",
    fontSize: 18
  },

  qtyNumber: {
    marginHorizontal: 15,
    fontSize: 18,
    color: "black"
  },

  total: {
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 20,
    color: "black"
  },

  checkoutBtn: {
    marginTop: 30,
    backgroundColor: "green",
    padding: 15,
    borderRadius: 10,
    alignItems: "center"
  },

  checkoutText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 16
  }
});
export default ProductDetail;