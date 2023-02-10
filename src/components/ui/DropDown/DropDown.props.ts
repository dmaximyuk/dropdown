export interface IDropDownItemsProps {
  key: string;
  label: string;
  value: string;
}

export interface IDropDownSelectedItemsProps {
  key: string;
  label: string;
  value: string;
}

export interface IDropDownProps
  extends React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLDivElement>,
    HTMLDivElement
  > {
  items?: IDropDownItemsProps[];
  placeholder: string;
}
