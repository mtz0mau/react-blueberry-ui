interface Props {
  url: string;
}

export const PDFPreviewModal = ({ url }: Props) => {
  return (
    <div className={'w-full h-full rounded-lg overflow-hidden'}>
      <iframe
        src={url}
        className={'w-full h-[500px]'}
      />
    </div>
  );
};
