import React, { useEffect } from "react";
import Card from "../../components/Card/Card";
import Navbar from "../../components/Navbar/Navbar";
import Searchbar from "../../components/Searchbar/Searchbar";
import Footer from "../../components/Footer/Footer";
import { fetchAllProducts, fetchCategories,getProductsByCategory } from "../../helper";
import "./Home.css";
import { useSelector } from "react-redux";

export default function Home() {
  const [products, setProducts] = React.useState([]);
  const [selectedCategory, setSelectedCategory] = React.useState(null);
  const [categories, setCategories] = React.useState([]);
  const [searchTerm, setSearchTerm] = React.useState("");
  const [filtered, setFiltered] = React.useState([]);
  const cart= useSelector((state) => state.cart);
  useEffect(() => {
    fetchAllProducts().then((products) => {
      setProducts(products);
    });

    fetchCategories().then((categories) => {
      setCategories(categories);
    });
  }, []);
  useEffect(() => {
    if (searchTerm === "") {
      setFiltered(products);
    }
  }, [searchTerm, products]);

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
    getProductsByCategory(category).then((products) => {
        setProducts(products);
    });
    // Call any function you want to execute when a category is clicked
  };
  const onChange = (e) => {
    const searchTerm = e.target.value.toLowerCase();
    setSearchTerm(searchTerm);
  
    if (!searchTerm) {
      setFiltered(products);
      return;
    }
  
    const filteredProducts = products.filter((product) =>
      product.title.toLowerCase().includes(searchTerm)
    );
    setFiltered(filteredProducts);
  };

  return (
    <div>
      <Navbar cartItemsCount={cart.length} />
      <Searchbar onChange={onChange}style={{ marginTop: "20px" }} />
      <div className="category-bubbles">
        {categories.map((category) => (
          <div
            key={category}
            className={`category-bubble ${
              category === selectedCategory ? "selected" : ""
            }`}
            onClick={() => handleCategoryClick(category)}
          >
            {category}
          </div>
        ))}
      </div>
      <div className="card-list">
        {filtered.map((product) => (
            
          <Card key={product.id} product={product} />
        ))}
      </div>
        <Footer />
    </div>
  );
}
