import { FC } from "react";
import { cn } from "../../../libs";

import { ISelectedProps } from ".";

import styles from "./Selected.module.css";

export const Selected: FC<ISelectedProps> = (props) => {
  return (
    <div
      className={cn(
        styles.Selected,
        (props.isRemoved && styles.Selected__remove) || ""
      )}
    >
      {props.children}
      <span className={styles.Selected__close} onClick={props.onClose}>
        <svg
          width="16"
          height="16"
          viewBox="0 0 16 16"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g fill="none" fill-rule="evenodd">
            <path d="M0 0h16v16H0z"></path>
            <path
              d="m8 6.73 3.46-3.47a.9.9 0 1 1 1.28 1.28L9.27 8l3.47 3.46a.9.9 0 1 1-1.28 1.28L8 9.27l-3.46 3.47a.9.9 0 1 1-1.28-1.28L6.73 8 3.26 4.54a.9.9 0 0 1 1.28-1.28L8 6.73z"
              fill="currentColor"
              fill-rule="nonzero"
            ></path>
          </g>
        </svg>
      </span>
    </div>
  );
};
