import { FC, useState, useEffect } from "react";

import { DropDown } from "./components/ui";

import "./App.css";

type TItems = {
  id: string;
  parent_id: null;
  name: string;
  areas?: Array<any>;
};

export const App: FC = () => {
  const [items, setItems] = useState<TItems | undefined>();

  useEffect(() => {
    if (!items) {
      fetch("https://api.hh.ru/areas")
        .then((response) => response.json())
        .then((result) => setItems(result["0"].areas["6"]))
        .catch((error) => console.log(error));
    }
  }, [items, setItems]);

  return (
    <div className="App">
      {items && (
        <DropDown
          placeholder="Выберите город..."
          items={items.areas?.map((item) => {
            return {
              key: `cities-${item.id}`,
              label: item.name,
              value: "Города",
            };
          })}
        />
      )}

      <DropDown
        placeholder="Выберите тестовый вариант..."
        items={Array.from(Array(10), (_, index) => {
          return {
            key: `test-${index}`,
            label: `label-${index}`,
            value: "",
          };
        })}
      />
    </div>
  );
};
