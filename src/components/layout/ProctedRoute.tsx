import { ReactNode } from "react";
import { useAppSelector } from "../../redux/hooks";
import { useCurrentToken } from "../../redux/fetaures/auth/authSlice";
import { Navigate } from "react-router-dom";

const ProctedRoute = ({ children }: { children: ReactNode }) => {
  const token = useAppSelector(useCurrentToken);

  if (!token) {
    return <Navigate to='/login' replace={true} />;
  }
  return children;
};

export default ProctedRoute;
