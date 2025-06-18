export type SubmitButtonProps = {
  buttonText: string;
  to?: string;
  linkText?: string;
  linkLabel?: string;
  onClick?: () => void;
  type?: "button" | "submit";
  className?: string;
  authClass?: string;
};