import Collection from "./Collection";
import React from "react";
import { useState, useEffect } from "react";
import "./index.scss";

const cats = [
  { name: "Все" },
  { name: "Море" },
  { name: "Горы" },
  { name: "Архитектура" },
  { name: "Города" },
];

function App() {
  const [categoryId, setCategoryId] = useState(0);
  const [page, setPage] = useState(1);
  const [collections, setCollections] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      setIsLoading(true);

      const category = categoryId ? `category=${categoryId}` : "";

      const response = await fetch(
        `https://6419a483f398d7d95d45443f.mockapi.io/galary/photoes?page=${page}&limit=3&${category}`,
        {
          method: "GET",
          headers: { "content-type": "application/json" },
        }
      );
      const data = await response.json();

      console.log(data);
      setCollections(data);
    }

    fetchData()
      .catch((e) => console.log(e))
      .finally(() => setIsLoading(false));
  }, [categoryId, page]);

  return (
    <div className="App">
      <h1>Моя коллекция фотографий</h1>
      <div className="top">
        <ul className="tags">
          {cats.map((el, index) => (
            <li
              onClick={() => setCategoryId(index)}
              className={categoryId === index ? "active" : ""}
              key={el.name}
            >
              {el.name}
            </li>
          ))}
        </ul>
        <input
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          className="search-input"
          placeholder="Поиск по названию"
        />
      </div>
      <div className="content">
        {isLoading ? (
          <h2>Loading in procesprogress...</h2>
        ) : (
          collections
            .filter((el) =>
              el.name.toLowerCase().includes(searchValue.toLowerCase())
            )
            .map((collection, index) => {
              return (
                <Collection
                  key={index}
                  name={collection.name}
                  images={collection.photos}
                />
              );
            })
        )}
      </div>
      <ul className="pagination">
        {[...Array(5)].map((_, i) => (
          <li
            onClick={() => setPage(i + 1)}
            className={page === i + 1 ? "active" : ""}
            key={i}
          >
            {i + 1}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
