import logo from "./logo.svg";
import "./App.css";
import CreateCoupon from "./Pages/CreateCoupon";
import { useEffect, useState } from "react";
import API from "./config";
import RedeemCode from "./Pages/RedeemCode";

function App() {
	return (
		<div className="App">
      
			<CreateCoupon />
      <RedeemCode />

			<ShowCouponCode />
		</div>
	);
}

export default App;



const ShowCouponCode = () => {
  const [data, setData] = useState([]);

  const fetchData = async () => {
    try {
      const res = await API.get("/coupon");
      setData(res.data?.data || []);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <table border="1" cellPadding="10">
      <thead>
        <tr>
          <th>#</th>
          <th>Title</th>
          <th>Code</th>
          <th>Max Redemptions</th>
          <th>Redeemed Count</th>
          <th>Expire At</th>
        </tr>
      </thead>

      <tbody>
        {data.length > 0 ? (
          data.map((item, index) => (
            <tr key={item._id}>
              <td>{index + 1}</td>
              <td>{item.title}</td>
              <td>{item.code}</td>
              <td>{item.maxRedemptions}</td>
              <td>{item.redeemedCount || 0}</td>
              <td>
                {item.expireAt
                  ? new Date(item.expireAt).toLocaleDateString()
                  : "-"}
              </td>
            </tr>
          ))
        ) : (
          <tr>
            <td colSpan="6">No Data Found</td>
          </tr>
        )}
      </tbody>
    </table>
  );
};

