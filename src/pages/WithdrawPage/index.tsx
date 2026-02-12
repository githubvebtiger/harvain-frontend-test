import { useState, useEffect } from "react";
import "../../styles/_financial-tables.scss";
import WrapperPage from "../../components/WrapperPage";
import { useTheme } from "../../provider/ThemeProvider";
import Header from "../../components/Header";
import { fetchTransactions } from "../../api/fetchTransactions";
import moment from "moment";
import EmptyState from "../../components/EmptyState";
import { SkeletonTable } from "../../components/Skeleton";
import PaymentIcon from "../../components/PaymentIcon";

type Props = {};

type TableData = {
  id: number;
  date: string;
  sum: number;
  paymentSystem: string;
  status: "In Progress" | "Success" | "Canceled";
  comment: string | null;
};

const getStatusFromCode = (
  statusCode: number
): "In Progress" | "Success" | "Canceled" => {
  switch (statusCode) {
    case 1:
      return "In Progress";
    case 2:
      return "Success";
    case 3:
      return "Canceled";
    default:
      return "In Progress";
  }
};

const WithdrawTable = () => {
  const [withdrawData, setWithdrawData] = useState<TableData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    fetchTransactions("withdraw")
      .then((data) => {
        const transformedData = data.map((item: any) => ({
          id: item.id,
          date: moment(item.created_at).format("DD.MM.YYYY HH:mm:ss"),
          sum: item.amount,
          paymentSystem: item.system,
          status: getStatusFromCode(item.status),
          comment: item.comment,
        }));
        setWithdrawData(transformedData);
      })
      .catch((error) => {
        console.error("Error fetching transactions:", error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <SkeletonTable rows={5} columns={5} />;
  }

  if (withdrawData.length === 0) {
    return (
      <EmptyState
        icon="transactions"
        title="No withdrawals yet"
        description="Your withdrawal history will appear here after your first withdrawal"
      />
    );
  }

  return (
    <>
      {/* Desktop Table */}
      <div className="desktop-only">
        <table className="unified-table">
          <thead>
            <tr>
              <th>Date</th>
              <th style={{ width: 120 }}>Sum</th>
              <th>Payment System</th>
              <th style={{ width: 140 }}>Status</th>
              <th>Comment</th>
            </tr>
          </thead>
          <tbody>
            {withdrawData.map((row) => (
              <tr key={row.id}>
                <td className="cell-date">{row.date}</td>
                <td className="cell-sum">${row.sum.toLocaleString()}</td>
                <td>
                  <div className="cell-method">
                    <PaymentIcon paymentSystem={row.paymentSystem} />
                    <span>{row.paymentSystem}</span>
                  </div>
                </td>
                <td>
                  <span className={`status-badge ${row.status.toLowerCase().replace(/\s+/g, "-")}`}>
                    {row.status}
                  </span>
                </td>
                <td className="cell-comment">
                  {row.comment || <span className="cell-empty">—</span>}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile Cards */}
      <div className="unified-mobile-cards mobile-only">
        {withdrawData.map((row) => (
          <div key={row.id} className="unified-mobile-card">
            <div className="mobile-card-header">
              <div className="mobile-card-method">
                <PaymentIcon paymentSystem={row.paymentSystem} />
                <span>{row.paymentSystem}</span>
              </div>
              <span className={`status-badge ${row.status.toLowerCase().replace(/\s+/g, "-")}`}>
                {row.status}
              </span>
            </div>
            <div className="mobile-card-body">
              <div className="mobile-detail-row">
                <span className="mobile-detail-label">Sum</span>
                <span className="mobile-detail-value sum">${row.sum.toLocaleString()}</span>
              </div>
              <div className="mobile-detail-row">
                <span className="mobile-detail-label">Date</span>
                <span className="mobile-detail-value">{row.date}</span>
              </div>
              {row.comment && (
                <div className="mobile-detail-row">
                  <span className="mobile-detail-label">Comment</span>
                  <span className="mobile-detail-value">{row.comment}</span>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default function WithdrawPage(props: Props) {
  return (
    <div className="financial-page-wrapper">
      <div className="hide-on-mobile">
        <Header disableContainer isAuth />
      </div>
      <WrapperPage>
        <div className="financial-page">
          <div className="page-header">
            <h2>Withdraw</h2>
            <p className="subtitle">Your withdrawal history</p>
          </div>
          <WithdrawTable />
        </div>
      </WrapperPage>
    </div>
  );
}
