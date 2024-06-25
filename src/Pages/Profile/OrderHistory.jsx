import React, { useEffect } from "react";
import { setCurrentPage } from "../../redux/reducers/orderHistorySlice";
import { useSelector, useDispatch } from "react-redux";
import { convertDateAndTime } from "../../util/utilMethod";

const ITEMS_PER_PAGE = 5;

const OrderHistory = () => {
  const dispatch = useDispatch();
  const orderHistory =
    useSelector((state) => state.orderHistory.orderHistory) || [];
  const currentPage = useSelector((state) => state.orderHistory.currentPage);

  const totalPages = Math.ceil(orderHistory.length / ITEMS_PER_PAGE);

  const handlePageChange = (newPage) => {
    dispatch(setCurrentPage(newPage));
  };

  const currentOrders = orderHistory.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  useEffect(() => {
    // Fetch order history if needed, or ensure it's already loaded
  }, [dispatch]);

  return (
    <div>
      {currentOrders.map((order) => (
        <div key={order.id}>
          <h5>+ Orders have been placed on {convertDateAndTime(order.date)}</h5>
          <table className="table table-striped">
            <thead>
              <tr>
                <th>ID</th>
                <th>Image</th>
                <th>Name</th>
                <th>Price</th>
                <th>Quantity</th>
                <th>Total</th>
              </tr>
            </thead>
            <tbody>
              {order.orderDetail.map((orderDetail, index) => (
                <tr key={index}>
                  <td>{order.id}</td>
                  <td>
                    <img
                      src={orderDetail.image}
                      alt={orderDetail.name}
                      className="img-fluid"
                    />
                  </td>
                  <td>{orderDetail.name}</td>
                  <td>{orderDetail.price}</td>
                  <td>{orderDetail.quantity}</td>
                  <td>{orderDetail.quantity * orderDetail.price}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ))}
      <nav>
        <ul className="pagination">
          {Array.from({ length: totalPages }, (_, i) => (
            <li
              key={i}
              className={`page-item ${currentPage === i + 1 ? "active" : ""}`}
            >
              <button
                className="page-link"
                onClick={() => handlePageChange(i + 1)}
              >
                {i + 1}
              </button>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
};

export default OrderHistory;
