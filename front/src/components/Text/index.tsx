import { DetailedHTMLProps, HTMLAttributes } from "react";

type Heading = DetailedHTMLProps<
  HTMLAttributes<HTMLHeadingElement>,
  HTMLHeadingElement
>;

type TitleProps = Heading & { children: React.ReactNode };

export const Title = ({ children, ...props }: TitleProps) => (
  <h2
    className={
      "mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900 " +
      props.className
    }
  >
    {children}
  </h2>
);

export const PageTitle = ({ children, className, ...props }: TitleProps) => (
  <h1 {...props} className={`text-2xl font-bold mb-3 ${className}`}>
    {children}
  </h1>
);
