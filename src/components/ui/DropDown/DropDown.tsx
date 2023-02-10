import { KeyboardEvent, FC, useEffect, useRef, useState } from "react";
import { cn } from "../../../libs";

import { DropDownSearchElement, Selected } from "..";

import {
  IDropDownProps,
  IDropDownSelectedItemsProps,
  IDropDownItemsProps,
} from ".";

import styles from "./DropDown.module.css";

export const DropDown: FC<IDropDownProps> = (props) => {
  const [selected, setSelected] = useState<IDropDownSelectedItemsProps[]>([]);
  const [items, setItems] = useState<
    Array<IDropDownItemsProps | undefined> | undefined
  >([]);
  const [search, setSearch] = useState<string | undefined>(undefined);
  const [focused, setFocused] = useState<boolean>(false);
  const [isRemove, setIsRemove] = useState<number | undefined>(undefined);

  const inputRef = useRef<HTMLInputElement>(null);

  const addSelectItem = (item: IDropDownItemsProps) => {
    const searchItem = selected.find((obj) => obj.key === item.key);

    setIsRemove(undefined);

    if (!searchItem) {
      setSelected([...selected, item]);
    }
  };

  const removeSelectItem = (key: string) => {
    const newArray = selected.filter((item) => {
      return item.key !== key;
    });

    setIsRemove(undefined);
    setSelected(newArray);
  };

  const keyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    setIsRemove(undefined);

    switch (e.key) {
      case "Escape":
        setFocused(false);
        (e.target as HTMLInputElement).blur();
        break;
      case "Backspace":
        if (search?.length === 0 || !search) {
          if (typeof isRemove === "number") {
            const newArray = selected.filter((_, i) => {
              return i !== isRemove;
            });
            setSelected(newArray);
            setIsRemove(undefined);
          } else {
            setIsRemove(selected.length - 1);
          }
        }
        break;
    }
  };

  useEffect(() => {
    if (search) {
      if (props.items) {
        const result = props.items.map((item) => {
          const res = new RegExp(search).test(item.label);
          return res ? item : undefined;
        });

        setItems(result);
      }
    } else {
      setItems(props.items);
    }
  }, [search]);

  return (
    <div
      className={cn(styles.DropDown, focused ? styles.DropDown__active : "")}
    >
      <div className={styles.DropDown__container}>
        {selected.map((item, index) => (
          <Selected
            key={`drop-down-selected-${item.key}`}
            onClose={() => removeSelectItem(item.key)}
            isRemoved={isRemove === index}
          >
            {item.label}
          </Selected>
        ))}

        <input
          className={styles.DropDown__input}
          ref={inputRef}
          onFocus={() => {
            setFocused(true);
            setIsRemove(undefined);
          }}
          onBlur={() => setTimeout(() => setFocused(false), 200)}
          onKeyDown={(e) => keyDown(e)}
          placeholder={(selected.length < 1 && props.placeholder) || undefined}
          onChange={(e) =>
            setSearch(e.target.value.length > 0 ? e.target.value : undefined)
          }
        />
      </div>

      <div
        className={styles.DropDown__arrow}
        onClick={() => setFocused(!focused)}
      />

      <ul
        className={cn(styles.DropDown__list)}
        style={{ display: focused ? "block" : "none" }}
      >
        {items?.map((item) => {
          if (item) {
            return (
              <DropDownSearchElement
                {...item}
                key={`drop-down-item-${item.key}`}
                onClick={() => {
                  addSelectItem(item);
                  setFocused(false);
                }}
              />
            );
          }
        })}
      </ul>
    </div>
  );
};
