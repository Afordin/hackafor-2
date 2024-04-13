type Props = {
  role: string;
  amount: number;
  disabled: boolean;
  increase: (role: string) => void;
  decrease: (role: string) => void;
};

export const Counter = ({ role, amount, disabled, increase, decrease }: Props) => {
  return (
    <div className="flex items-center text-6 gap-x-2 text-cWhite">
      <span>{role}</span>
      <div
        className={`flex items-center px-2 py-1 gap-x-2 border border-pBorder rounded-full ${amount > 0 ? 'border-secondary-500' : ''} `}
      >
        <button onClick={() => decrease(role)} className={`i-lucide-minus ${amount === 0 ? 'text-cDisabled' : ''} `}></button>
        <span className="text-md">{amount}</span>
        <button onClick={() => increase(role)} className={`i-lucide-plus ${disabled ? 'text-cDisabled' : ''} `}>
          +
        </button>
      </div>
    </div>
  );
};
