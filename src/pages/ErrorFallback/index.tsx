import { useRouteError } from "react-router-dom";
import StickyHeader from "../../components/StickyHeader";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const ErrorFallback = () => {
  const error = useRouteError() as Error;

  return (
    <>
      <StickyHeader />
      <div style={{ padding: "2rem", textAlign: "center" }}>
        <h2>Oops, something went wrong.</h2>
        <p>{error?.message || "Unexpected error occurred"}</p>
        <a href="/">Go back home</a>
      </div>
    </>
  );
};
