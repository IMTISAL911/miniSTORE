// import React from "react";
// import { StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";





// const Home = () =>{
//     return(
//         <View style={styles.containner}>
//             <Text style={styles.title}>Product</Text>
//             <View>
//                 <TextInput  
//                 placeholder="search"
//                 placeholderTextColor="gray"
//                 style={styles.input}          
//                 />
//                 <View style={styles.butoncontainer}> 
//                     <TouchableOpacity style={styles.buton}>
//                         <Text style={styles.btntext}>ALL</Text>
//                     </TouchableOpacity>

//                     <TouchableOpacity style={styles.buton}>
//                         <Text style={styles.btntext}>Electronics</Text>
//                     </TouchableOpacity>
//                 </View>
//             </View>
//         </View>
//     )
// }

// const styles = StyleSheet.create({
//     containner:{
//         flex:1
//     },
//     title:{
       
//         color:"black",
//         fontSize:25,
//         fontWeight:"bold",
//         paddingHorizontal:"5%",
//         marginTop:30,
//     },
//     input:{
//         width:"90%",
//         borderColor:"gray",
//         borderWidth:1,
//         paddingHorizontal:"10%",
//         marginLeft:18,
//         marginTop:10,
//         borderRadius:10,
//         backgroundColor: "#e0e0e0",
//         color:"gray",   
    
//     },
//     butoncontainer:{
//         flexDirection:"row",
//         gap:"10%",
//         marginLeft:"5%",
//         marginTop:"5%"

//     },
//     buton:{
//         backgroundColor: "#007BFF",
//         padding:10,
//         alignItems:"center",
//         borderRadius:8
//     },
//     btntext:{
//         color:"white",
//         fontWeight:"bold"
//     }
// })
// export default Home




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
import ProductCart from "../../components/product/ProductCart.jsx";
import Loader from "../../components/Common/Loader.jsx";

const HomeScreen = ({ navigation }) => {
  const [products, setProducts] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch API
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const data = await getProducts();
    setProducts(data);
    setFilteredData(data);
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
          style={styles.button}
          onPress={() => filterCategory("all")}
        >
          <Text style={styles.btnText}>ALL</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.button}
          onPress={() => filterCategory("electronics")}
        >
          <Text style={styles.btnText}>Electronics</Text>
        </TouchableOpacity>
      </View>

      {/* Product List */}
      <FlatList
        data={filteredData}
        keyExtractor={(item) => item.id.toString()}
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
  button: {
    backgroundColor: "#007BFF",
    padding: 10,
    borderRadius: 8
  },
  btnText: {
    color: "white",
    fontWeight: "bold"
  }
});