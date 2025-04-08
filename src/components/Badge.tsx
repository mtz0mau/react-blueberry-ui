import { Tag } from "antd";

interface Props {
  children: React.ReactNode;
  color?: string;
  onClick?: () => void;
}

export const Badge = ({
  color,
  children,
  onClick = () => {
  }
}: Props) => {
  return (
    <Tag
      className={'text-white px-3 py-0.5 rounded-lg'}
      color={color}
      onClick={onClick}
    >
      {children}
    </Tag>
  );
};
