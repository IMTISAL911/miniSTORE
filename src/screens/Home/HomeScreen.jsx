


import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  FlatList
} from "react-native";
import { setSelectedProduct } from "../../redux/slices/productSlice";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchProducts,
  searchProduct,
  filterCategory,
} from "../../redux/slices/productSlice";

import ProductCart from "../../components/product/ProductCart";
import Loader from "../../components/Common/Loader";

const HomeScreen = ({ navigation }) => {
  const dispatch = useDispatch();

  const { filteredData, loading } = useSelector(state => state.product);

  const [activeCategory, setActiveCategory] = useState("all");

  useEffect(() => {
    dispatch(fetchProducts());
  }, []);

  const handleSearch = (text) => {
    dispatch(searchProduct(text));
  };

  const handleCategory = (category) => {
    setActiveCategory(category);
    dispatch(filterCategory(category));
  };

  const goToDetail = (item) => {
    dispatch(setSelectedProduct(item));
    navigation.navigate("ProductDetail", { product: item });
  };

  if (loading) return <Loader />;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Products</Text>

      <TextInput
        placeholder="Search..."
        style={styles.input}
        onChangeText={handleSearch}
      />

      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={[styles.button, activeCategory === "all" && styles.activeButton]}
          onPress={() => handleCategory("all")}
        >
          <Text>ALL</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.button, activeCategory === "electronics" && styles.activeButton]}
          onPress={() => handleCategory("electronics")}
        >
          <Text>Electronics</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={filteredData}
        keyExtractor={(item) => item.id.toString()}
        numColumns={2}
        renderItem={({ item }) => (
          <ProductCart item={item} onPress={goToDetail} />
        )}
      />
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5"
  },
  title: {
    color: "black",
    fontSize: 25,
    fontWeight: "bold",
    paddingHorizontal: "5%",
    marginTop: 30
  },
  input: {
    width: "90%",
    borderWidth: 1,
    padding: 10,
    marginLeft: 18,
    marginTop: 10,
    borderRadius: 10,
    backgroundColor: "#e0e0e0",
    color: "black"
  },
  buttonContainer: {
    flexDirection: "row",
    gap: 10,
    marginLeft: 18,
    marginTop: 10
  },
  button: {
    backgroundColor: "#e0e0e0",
    padding: 10,
    borderRadius: 8
  },
  activeButton: {
    backgroundColor: "#007BFF"
  }
});
export default HomeScreen;