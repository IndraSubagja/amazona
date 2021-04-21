import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { listOrderMine } from '../actions/orderActions';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';

export default function OrderHistoryScreen({ history }) {
  const dispatch = useDispatch();
  const orderMineList = useSelector((state) => state.orderMineList);
  const { loading, error, orders } = orderMineList;

  const optimizePrice = (num) => {
    num = num.toFixed(2);
    let realNum = parseInt(num);
    let decNum = num.match(/\.\d*/)[0];
    realNum = realNum
      .toString()
      .split(/(?=(?:\d{3})*$)/)
      .join(',');

    return realNum + decNum;
  };

  useEffect(() => {
    dispatch(listOrderMine());
  }, [dispatch]);

  return (
    <div>
      <h1>Order History</h1>
      {loading ? (
        <LoadingBox />
      ) : error ? (
        <MessageBox variant="danger">{error}</MessageBox>
      ) : (
        <table className="table">
          <thead>
            <tr>
              <th>ID</th>
              <th>DATE</th>
              <th>TOTAL</th>
              <th>PAID</th>
              <th>DELIVERED</th>
              <th>ACTIONS</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order._id}>
                <td>{order._id}</td>
                <td>{order.createdAt.substring(0, 10)}</td>
                <td>${optimizePrice(order.totalPrice)}</td>
                <td>{order.isPaid ? order.paidAt.substring(0, 10) : 'No'}</td>
                <td>{order.isDelivered ? order.deliveredAt.substring(0, 10) : 'No'}</td>
                <td>
                  <button
                    type="button"
                    onClick={() => {
                      history.push(`/order/${order._id}`);
                    }}
                    className="small"
                  >
                    Details
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
