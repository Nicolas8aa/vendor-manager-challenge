type InputProps = JSX.IntrinsicElements["input"] & {
  label: string;
};

export const Input = ({ label, ...props }: InputProps) => (
  <div className="flex flex-col mt-2">
    <label
      htmlFor={props.id}
      className="block text-sm font-medium leading-6 text-gray-900"
    >
      {label}
    </label>
    <input
      {...props}
      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
    />
  </div>
);

export const Button = ({
  children,
  ...props
}: JSX.IntrinsicElements["button"]) => (
  <button
    {...props}
    className={
      "flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 " +
      props.className
    }
  >
    {children}
  </button>
);
