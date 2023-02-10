import { IDropDownItemsProps } from "..";

export interface IDropDownSearchElementProps extends IDropDownItemsProps {
  onClick?: (e: React.MouseEvent<HTMLElement>) => void;
}
