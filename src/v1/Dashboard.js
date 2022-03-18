import { useQuery, useMutation } from "@apollo/client";
import gql from "graphql-tag";
import { app } from "../originpages/Client";
import { useNavigate } from "react-router-dom";
import { Loading } from "../assets/Loaders";

const CUSTOMER = gql`
  query {
    customer {
      email
      name
    }
  }
`;
function Dahboard() {
  const navigate = useNavigate();
  const { loading, error, data } = useQuery(CUSTOMER);
  if (loading) {
    return (
      <div>
        <Loading />
      </div>
    );
  }
  if (error) {
    return <div>encountered an error: {error}</div>;
  }
  console.log(data);

  return (
    <>
      {app.currentUser ? <div>{data.customer.name}</div> : null}
      <div
        onClick={() => {
          app.currentUser.logOut();
          navigate("/login");
          window.location.reload();
        }}
      >
        logout
      </div>
    </>
  );
}
export default Dahboard;
