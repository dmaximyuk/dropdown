import { FC } from "react";

import { IDropDownSearchElementProps } from ".";

import styles from "./DropDownSearchElement.module.css";

export const DropDownSearchElement: FC<IDropDownSearchElementProps> = (
  props
) => {
  return (
    <li
      className={styles.DropDownSearchElement}
      key={props.key}
      onClick={props.onClick}
    >
      <p className={styles.DropDownSearchElement__header}>{props.label}</p>

      {props.value.length >= 1 && (
        <p className={styles.DropDownSearchElement__subheader}>{props.value}</p>
      )}
    </li>
  );
};
