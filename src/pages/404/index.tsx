import { startTransition } from "react";
import { Button, Result } from "antd";
import { useNavigate } from "react-router-dom";
import { ROOT } from "../../constants/internal-routes";
import StickyHeader from "../../components/StickyHeader";

const NotFound: React.FC = () => {
  const navigate = useNavigate();
  const handleBackToHomeClick = () => {
    startTransition(() => {
      navigate(ROOT);
    });
  };

  return (
    <>
      <StickyHeader />
      <div
        style={{
          height: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Result
          status="404"
          title="404"
          subTitle="Sorry, the page you visited does not exist."
          extra={
            <Button type="primary" onClick={handleBackToHomeClick}>
              Back Home
            </Button>
          }
        />
      </div>
    </>
  );
};

export default NotFound;
