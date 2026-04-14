import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  FlatList
} from "react-native";

import { getProducts } from "../../services/api";
import ProductCart from "../../components/product/ProductCart";
import Loader from "../../components/Common/Loader";
import ProductDetail from "../../screens/Product/ProductDeatails"

const HomeScreen = ({ navigation }) => {
  const [products, setProducts] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCatgory] = useState("all");

  // Fetch API
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const data = await getProducts();
    setProducts(data);
    setFilteredData(data);
    setActiveCatgory("all")
    setLoading(false);
  };

  // Search filter
  const handleSearch = (text) => {
    const filtered = products.filter(item =>
      item.title.toLowerCase().includes(text.toLowerCase())
    );
    setFilteredData(filtered);
  };

  // Category filter
  const filterCategory = (category) => {
    setActiveCatgory(category);
    if (category === "all") {
      setFilteredData(products);
    } else {
      const filtered = products.filter(item =>
        item.category.toLowerCase().includes(category)
      );
      setFilteredData(filtered);
    }
  };

  // Navigate to detail
  const goToDetail = (item) => {
    navigation.navigate("ProductDetail", { product: item });
  };

  if (loading) return <Loader />;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Products</Text>

      {/* Search */}
      <TextInput
        placeholder="Search..."
        placeholderTextColor="gray"
        style={styles.input}
        onChangeText={handleSearch}
      />

      {/* Buttons */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={[styles.button, activeCategory=== "all" && styles.activeButton]}
          onPress={() => filterCategory("all")}
        >
          <Text style={[styles.btnText, activeCategory ==="all" && styles.activeText]}>ALL</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.button, activeCategory=== "electronics" && styles.activeButton]}
          onPress={() => filterCategory("electronics")}
        >
          <Text style={[styles.btnText, activeCategory==="electronics" && styles.activeText]}>Electronics</Text>
        </TouchableOpacity>
      </View>

      {/* Product List */}
      <FlatList
        data={filteredData}
        keyExtractor={(item) => item.id.toString()}
        numColumns={2} // ✅ 2 cards in one row
        // contentContainerStyle={{ paddingBottom: 20 }}
        columnWrapperStyle={{
    justifyContent: "space-between", // space between 2 cards
    paddingHorizontal: 10
  }}

  contentContainerStyle={{
    paddingBottom: 20,
    paddingTop: 10
  }}
        renderItem={({ item }) => (
          <ProductCart item={item} onPress={goToDetail} />
        )}
      />
    </View>
  );
};

export default HomeScreen;

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
  // button: {
  //   backgroundColor: "#007BFF",
  //   padding: 10,
  //   borderRadius: 8
  // },
  // btnText: {
  //   color: "white",
  //   fontWeight: "bold"
  // }
  button: {
  backgroundColor: "#e0e0e0",   // default = disabled look
  padding: 10,
  borderRadius: 8
},

activeButton: {
  backgroundColor: "#007BFF"    // active = blue
},

btnText: {
  color: "black"
},

activeText: {
  color: "white",
  fontWeight: "bold"
}
});