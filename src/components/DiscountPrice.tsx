import { formatCurrency } from "utils/CurrencyUtils";

interface Props {
  price: number;
  discount: number;
}

export const DiscountPrice = ({ price, discount }: Props) => {
  return (
    <div>
      <p className={`m-0 ${discount > 0 ? 'opacity-50 line-through' : ''}`}>{formatCurrency(price)}</p>
      {discount > 0 && (
        <p className={'m-0'}>{formatCurrency(price - discount)}</p>
      )}
    </div>
  );
};
