export interface ISelectedProps
  extends React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLDivElement>,
    HTMLDivElement
  > {
  onClose: () => void;
  isRemoved: boolean;
}
