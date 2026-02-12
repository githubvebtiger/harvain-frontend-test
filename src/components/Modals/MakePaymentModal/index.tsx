import React, { useEffect, useRef, useState } from "react";
import "./styles.scss";
import ModalWrapper from "../ModalWrapper";
import { CopyIcon, WhiteCopyIcon } from "../../../assets";
import Button, { EButtonType } from "../../UI/Button";
import { useModal } from "../../../provider/ModalContext";
import ThankYouModal from "../ThankYouModal";
import { fetchPaymentPlan } from "../../../api/fetchPaymentPlan";
import PricingModal from "../PricingModal";
import { SessionStorageService } from "../../../utils/SessionStorageService";
import { createPayment } from "../../../api/createPayment";
import { useTheme } from "../../../provider/ThemeProvider";

type Props = {
  onClose: () => void;
  plan: string;
};

export default function MakePaymentModal(props: Props) {
  const { openModal } = useModal();
  const { theme } = useTheme();
  const isDarkTheme = theme === "dark";
  const [timeLeft, setTimeLeft] = useState(20 * 60);
  const timerRef = useRef<any>(null);
  const [propsData, setPropsData] = useState<any>(null);

  useEffect(() => {
    fetchPaymentPlan(props.plan).then((data) => {
      setPropsData(data);
    });
    timerRef.current = setInterval(() => {
      setTimeLeft((prevTime) => {
        if (prevTime <= 1) {
          clearInterval(timerRef.current);
          openModal(PricingModal, {});
          return 0;
        }
        return prevTime - 1;
      });
    }, 1000);

    return () => clearInterval(timerRef.current);
  }, []);

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  const copyToClipboard = (value: string) => {
    navigator.clipboard.writeText(value);
  };

  const handleOnClick = () => {
    SessionStorageService.get("user_id") &&
      createPayment({
        full_name: propsData.full_name,
        total_price: propsData.total_price,
        requisite: propsData.requisite,
        to_be_paid: propsData.to_be_paid,
        user: Number(SessionStorageService.get("user_id")),
      });
    openModal(ThankYouModal, {});
  };
  if (!propsData) return null;
  return (
    <ModalWrapper onClose={props.onClose}>
      <div className="make-payment-modal">
        <h2>
          <span>Make</span> a payment{" "}
        </h2>
        <div className="df-column total-price-wrapper">
          <p className="subtitle">Total price</p>
          <p className="totalPrice">{propsData.total_price}</p>
        </div>

        <div className="df-column">
          <p className="subtitle">Requisite for payment</p>
          <div
            className="df-row-jsb"
            onClick={() => copyToClipboard(propsData.requisite)}
          >
            <p>{propsData.requisite}</p>
            <img src={isDarkTheme ? WhiteCopyIcon : CopyIcon} alt="CopyIcon" />
          </div>
        </div>

        <span style={{ height: 24 }} />

        <div className="df-column">
          <p className="subtitle">Amount to be paid</p>
          <div
            className="df-row-jsb"
            onClick={() => copyToClipboard(propsData.to_be_paid)}
          >
            <p>{propsData.to_be_paid}</p>
            <img src={isDarkTheme ? WhiteCopyIcon : CopyIcon} alt="CopyIcon" />
          </div>
        </div>

        <div className="btns">
          <Button fullWidth label="Press if you paid" onClick={handleOnClick} />
          <Button
            fullWidth
            label="Cancel"
            onClick={props.onClose}
            variant={EButtonType.BUTTON_SECONDARY}
          />
        </div>

        <div className="timer">
          <p className="timer-text">Time left:</p>
          <p className="timer-count">
            {String(minutes).padStart(2, "0")}:
            {String(seconds).padStart(2, "0")}
          </p>
        </div>
      </div>
    </ModalWrapper>
  );
}
