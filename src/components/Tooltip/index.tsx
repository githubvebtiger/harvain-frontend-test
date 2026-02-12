import React, { useState, useRef, FC } from "react";
import ReactDOM from "react-dom";
import dangerIcon from '../../assets/icons/danger.svg'
import successIcon from '../../assets/icons/success.svg'
import warningIcon from '../../assets/icons/warning.svg'
import "./styles.scss";

type TooltipType = "success" | "danger" | "warning";

interface TooltipProps {
  message: string;
  type?: TooltipType;
}

const Tooltip: FC<TooltipProps> = ({ message, type = "warning" }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [pos, setPos] = useState({ top: 0, left: 0 });
  const iconRef = useRef<HTMLDivElement>(null);

  const getTypeStyles = () => {
    switch (type) {
      case "success":
        return {
          icon: successIcon,
          wrapperClass: "tooltip-icon success",
          tooltipClass: "tooltip-box success",
        };
      case "danger":
        return {
          icon: dangerIcon,
          wrapperClass: "tooltip-icon danger",
          tooltipClass: "tooltip-box danger",
        };
      case "warning":
      default:
        return {
          icon: warningIcon,
          wrapperClass: "tooltip-icon warning",
          tooltipClass: "tooltip-box warning",
        };
    }
  };

  const handleMouseEnter = () => {
    if (iconRef.current) {
      const rect = iconRef.current.getBoundingClientRect();
      setPos({
        top: rect.top + rect.height / 2,
        left: rect.right + 12,
      });
    }
    setIsVisible(true);
  };

  const { icon: IconComponent, wrapperClass, tooltipClass } = getTypeStyles();

  return (
    <div className="tooltip-container">
      <div
        ref={iconRef}
        className={wrapperClass}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={() => setIsVisible(false)}
      >
        <img src={IconComponent} alt="Tooltip Icon" />
      </div>

      {isVisible && ReactDOM.createPortal(
        <div
          className="tooltip-content"
          style={{ top: pos.top, left: pos.left, transform: 'translateY(-50%)' }}
        >
          <div className={tooltipClass}>
            <p className="tooltip-message">{message}</p>
          </div>
        </div>,
        document.body
      )}
    </div>
  );
};

export default Tooltip;
