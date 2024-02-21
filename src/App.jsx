import { useEffect, useState } from "react";
import "./App.css";
import BottomPage from "./bottomPage";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://dummyjson.com/",
  timeout: 1000,
  headers: {
    Accept: "application/json",
  },
});

function App() {
  const [currentPage, setCurrentPage] = useState(1);

  let total = 100 / 10;

  const { data, isPending, error, refetch } = useQuery({
    queryKey: ["dummyJson"],
    queryFn: async () => {
      const result = await axiosInstance.get(
        `products?limit=9&skip=${(currentPage - 1) * 9}`
      );
      // const result = await axios.get(
      //   "https://jsonplaceholder.typicode.com/todos"
      // );
      let header = Object.keys(result.data.products[0]).reduce((acc, curr) => {
        acc[curr] = undefined;
        return acc;
      }, {});
      let modified = [header, ...result.data.products];
      return modified;
    },
  });

  const handleButton = async (btn) => {
    setCurrentPage(btn);
  };

  useEffect(() => {
    refetch();
  }, [currentPage, refetch]);

  if (isPending) return "pending request .....";
  if (error) return `Error ${error.message}`;

  return (
    <main>
      <table>
        {data.map((item, index) => {
          if (index === 0) {
            return (
              <thead key={index}>
                <tr>
                  {Object.keys(item).map((val) => (
                    <th>{val}</th>
                  ))}
                </tr>
              </thead>
            );
          }
          return (
            <tr key={item.id}>
              {Object.values(item).map((field, index) => {
                return (
                  <td key={index}>
                    {typeof field === "string" && field.slice(0, 10)}
                    {typeof field === "number" && field}
                    {typeof field === "boolean" && field}
                    {Array.isArray(field) && field[0]}
                  </td>
                );
              })}
            </tr>
          );
        })}
      </table>
      <BottomPage
        currentPage={currentPage}
        total={total}
        handleButton={handleButton}
      />
    </main>
  );
}

export default App;
