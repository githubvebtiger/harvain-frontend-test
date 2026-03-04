import React, { useEffect, useState } from "react";
import "../../styles/_financial-tables.scss";
import WrapperPage from "../../components/WrapperPage";
import { useTheme } from "../../provider/ThemeProvider";
import Header from "../../components/Header";
import { fetchRequisites } from "../../api/requisite";
import EmptyState from "../../components/EmptyState";
import { SkeletonTable } from "../../components/Skeleton";
import PaymentIcon, { PaymentSystemNames, getNetworkInfo } from "../../components/PaymentIcon";

interface Requisite {
  id: number;
  title: string;
  icon: number;
  show: boolean;
  client: number;
}

type Props = {};

export default function WithdrawalRequisitiesPage(props: Props) {
  const [requisites, setRequisites] = useState<Requisite[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    fetchRequisites()
      .then((response: Requisite[]) => {
        if (response && response.length > 0) {
          setRequisites(response);
        }
      })
      .catch((err) => {
        setError(err.message || "Failed to load payment methods");
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const { theme } = useTheme();
  const isDarkTheme = theme === "dark";

  return (
    <div className={`financial-page-wrapper ${isDarkTheme ? "dark-theme" : ""}`}>
      <div className="hide-on-mobile">
        <Header disableContainer isAuth />
      </div>
      <WrapperPage>
        <div className="financial-page">
          <div className="page-header">
            <h2>Payment Methods</h2>
            <p className="subtitle">Your saved withdrawal methods</p>
          </div>

          {loading ? (
            <SkeletonTable rows={3} columns={3} />
          ) : error ? (
            <div className="error-message">{error}</div>
          ) : requisites.length === 0 ? (
            <EmptyState
              icon="transactions"
              title="No payment methods"
              description="Your saved payment methods will appear here"
            />
          ) : (
            <>
              {/* Desktop Table */}
              <div className="desktop-only">
                <table className="unified-table">
                  <thead>
                    <tr>
                      <th style={{ width: 200 }}>Method</th>
                      <th>Address</th>
                      <th style={{ width: 110 }}>Network</th>
                    </tr>
                  </thead>
                  <tbody>
                    {requisites.map((requisite) => {
                      const networkInfo = getNetworkInfo(requisite.icon);
                      return (
                        <tr key={requisite.id} className={requisite.show ? 'dimmed' : ''}>
                          <td>
                            <div className="cell-method">
                              <PaymentIcon iconId={requisite.icon} />
                              <span style={{ fontWeight: 600, color: 'white' }}>
                                {PaymentSystemNames[requisite.icon] || 'Payment Method'}
                              </span>
                            </div>
                          </td>
                          <td className="cell-address">{requisite.title}</td>
                          <td>
                            {networkInfo ? (
                              <span className={`network-badge ${networkInfo.networkClass}`}>
                                {networkInfo.network}
                              </span>
                            ) : (
                              <span className="cell-empty">—</span>
                            )}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>

              {/* Mobile Cards */}
              <div className="unified-mobile-cards mobile-only">
                {requisites.map((requisite) => {
                  const networkInfo = getNetworkInfo(requisite.icon);
                  return (
                    <div key={requisite.id} className={`unified-mobile-card ${requisite.show ? 'dimmed' : ''}`}>
                      <div className="mobile-card-header">
                        <div className="mobile-card-method">
                          <PaymentIcon iconId={requisite.icon} />
                          <span>{PaymentSystemNames[requisite.icon] || 'Payment Method'}</span>
                        </div>
                        {networkInfo && (
                          <span className={`network-badge ${networkInfo.networkClass}`}>
                            {networkInfo.network}
                          </span>
                        )}
                      </div>
                      <div className="mobile-card-address">
                        {requisite.title}
                      </div>
                    </div>
                  );
                })}
              </div>
            </>
          )}
        </div>
      </WrapperPage>
    </div>
  );
}
