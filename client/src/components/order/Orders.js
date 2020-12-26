import { CheckCircleFilled, CloseCircleOutlined } from "@ant-design/icons";
import ShowPaymentInfo from "../cards/ShowPaymentInfo";

const Orders = ({ orders, handleStatusChange }) => (
  <>
    {orders.map((order) => (
      <div key={order._id} className="row pb-5">
        <div className="btn btn-block bg-light">
          <ShowPaymentInfo order={order} showStatus={false} />

          <div className="row">
            <div className="col-md-4">Delivery Status</div>
            <div className="col-md-8">
              <select
                className="form-control"
                defaultValue={order.orderStatus}
                name="status"
                onChange={(e) => handleStatusChange(order._id, e.target.value)}
              >
                <option value="Not Processed">Not Processed</option>
                <option value="Processing">Processing</option>
                <option value="Dispatched">Dispatched</option>
                <option value="Not Processed">Not Processed</option>
                <option value="Cancelled">Cancelled</option>
                <option value="Complited">Complited</option>
              </select>
            </div>
          </div>
        </div>
      </div>
    ))}
  </>
);

export default Orders;
