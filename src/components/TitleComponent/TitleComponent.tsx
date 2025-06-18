import "./TitleComponent.css";
interface TitleComponentProps {
  heading: string;
  subheading: string;
}

const TitleComponent = ({ heading, subheading }: TitleComponentProps) => {
  return (
    <>
      <img src="/task5/images/Auth/Logo.png" alt="logo" className="mb-3 mb-lg-4 title-logo" />
      <p className="fw-semibold text-black fs-22 mb-1 mb-lg-2 title-heading">{heading}</p>
      <p className="fs-14 fw-normal mb-2 mb-lg-4 text-gray text-center title-subheading">{subheading}</p>
    </>
  );
};

export default TitleComponent;
