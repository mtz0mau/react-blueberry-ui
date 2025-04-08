import { Tag } from "antd";
import { FileTypeEnum, FileTypeEnumToColor, FileTypeEnumToLabel } from "enums/FileTypeEnum";

interface Props {
  type: FileTypeEnum;
}

export const FileTypeBadge = ({ type }: Props) => {
  return (
    <Tag
      className={'rounded-lg py-0.5 px-3 font-medium text-sm text-white'}
      style={{
        backgroundColor: `${FileTypeEnumToColor[type]}30`,
        borderColor: FileTypeEnumToColor[type],
        color: FileTypeEnumToColor[type]
      }}
    >
      {FileTypeEnumToLabel[type]}
    </Tag>
  );
};
