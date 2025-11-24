import React, { useEffect, useState } from "react";
import "./styles.scss";
import WrapperPage from "../../components/WrapperPage";
import Input from "../../components/UI/Input";
import Button, { EButtonType } from "../../components/UI/Button";
import { useTheme } from "../../provider/ThemeProvider";
import Header from "../../components/Header";
import { fetchRequisites, saveRequisite } from "../../api/requisite";
import { PaymentSystems } from "../../utils/choices";

interface Requisite {
  id: number;
  title: string;
  icon: number;
  show: boolean;
  client: number;
}

type Props = {};

export default function WithdrawalRequisitiesPage(props: Props) {
  const [newRequisites, setNewRequisites] = useState<string | undefined>(
    undefined
  );
  const [requisites, setRequisites] = useState<Requisite[]>([]);
  const [selectedRequisite, setSelectedRequisite] = useState<Requisite | null>(
    null
  );
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchRequisites()
      .then((response: Requisite[]) => {
        if (response && response.length > 0) {
          setRequisites(response);
          setSelectedRequisite(response[0]);
          setNewRequisites(response[0].title);
        }
      })
      .catch((err) => {
        setError(err.message || "Не удалось загрузить реквизиты");
      });
  }, []);

  const { theme } = useTheme();
  const isDarkTheme = theme === "dark";

  return (
    <div
      className={`withdrawal-page withdrawal-requisities-page-wrapper ${
        isDarkTheme ? "dark-theme" : ""
      } ${selectedRequisite?.show ? "" : "show"}`}
    >
      <div className="hide-on-mobile">
        <Header disableContainer isAuth />
      </div>
      <WrapperPage>
        <div className="withdrawal-page withdrawal-requisities-page">
          <h2>Withdrawal requisites</h2>
          <div className="form">
            {requisites.map((requisite) => (
              <div key={requisite.id} className="requisite-item">
                {requisite.icon && (
                  <img
                    src={PaymentSystems[requisite.icon - 1]}
                    alt="Payment System Icon"
                    height={48}
                  />
                )}
                <Input
                  placeholder="0000 0000 0000 0000"
                  value={requisite.title}
                  readOnly
                  disabled
                  className={requisite.show ? "" : "active-requisite"}
                />
              </div>
            ))}
            {/*<Button*/}
            {/*  label="Send the details"*/}
            {/*  onClick={onHandleEditProfile}*/}
            {/*  fullWidth*/}
            {/*  variant={EButtonType.BUTTON_PRIMARY}*/}
            {/*/>*/}
          </div>
        </div>
      </WrapperPage>
    </div>
  );
}
