import React, { useState, useEffect } from "react";

const AdminCategoryEditor = () => {
  const [category, setCategory] = useState({ category: "" });
  const [categories, setCategories] = useState([])

  useEffect(() => {
    async function getCategories() {
        const response = await fetch(`http://localhost:5050/categories`);
        if (!response.ok) {
          const message = `An error occurred: ${response.statusText}`;
          console.error(message);
          return;
        }
        const categories = await response.json();
        setCategories(categories);
      }
      getCategories();
      return;
  }, [categories.length])

  async function onSubmit(e) {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:5050/categories", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(category),
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
    } catch (error) {
      console.log(`Error adding category: ${error}`);
    } finally {
      setCategory({ category: "" });
    }
  }
  function updateCategory(e) {
    setCategory({ category: e });
  }

  return (
    <>
      <form onSubmit={onSubmit}>
        <input
          placeholder="New category"
          type="text"
          name="category"
          id="category"
          value={category.category}
          onChange={(e) => {
            updateCategory(e.target.value);
          }}
        />
        <button>Submit</button>
      </form>
      <select>
        {categories.map((cat) => (
            <option key={cat._id} value={cat.category}>{cat.category}</option>
        ))}
      </select>
    </>
  );
};

export default AdminCategoryEditor;
