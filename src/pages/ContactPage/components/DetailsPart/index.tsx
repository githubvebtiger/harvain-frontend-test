import React, { useState } from "react";
import "./styles.scss";
import { BlackRightTopArrowIcon } from "../../../../assets";
import Input from "../../../../components/UI/Input";
import TextArea from "../../../../components/UI/TextArea";
import Button, { EButtonType } from "../../../../components/UI/Button";
import { GoogleMap, LoadScript } from "@react-google-maps/api";
import { createSupportTicket } from "../../../../api/createSupportTicket";
import * as Yup from "yup";
import { validateForm } from "../../../../utils/validation/validateForm";

type Props = {};

const API_KEY = "AIzaSyAX5dwM7DrE-S4aYuKYq6nNXQWJIUn-oOE";
const mapStyles = { height: "100%", width: "100%" };
const defaultCenter = { lat: 1.281074, lng: 103.851175 };

const initData = {
  full_name: "",
  email: "",
  account_number: "",
  subject: "",
  description: "",
};

export default function DetailsPart(props: Props) {
  const [formData, setFormData] = useState(initData);
  const [fullNameError, setFullNameError] = useState<string | null>(null);
  const [emailError, setEmailError] = useState<string | null>(null);
  const [accountNumberError, setAccountNumberError] = useState<string | null>(
    null
  );
  const [subjectError, setSubjectError] = useState<string | null>(null);
  const [descriptionError, setDescriptionError] = useState<string | null>(null);

  // Схема валидации Yup
  const validationSchema = Yup.object().shape({
    full_name: Yup.string()
      .required("Full name is required")
      .min(2, "Must be at least 2 characters"),
    email: Yup.string()
      .email("Invalid email format")
      .required("Email is required"),
    account_number: Yup.string()
      .matches(/^\d{6}$/, "Account number must be a 6 digit number")
      .required("Account number is required"),
    subject: Yup.string().required("Subject is required"),
    description: Yup.string()
      .required("Description is required")
      .min(10, "Must be at least 10 characters"),
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async () => {
    const setErrorHandlers = {
      full_name: setFullNameError,
      email: setEmailError,
      account_number: setAccountNumberError,
      subject: setSubjectError,
      description: setDescriptionError,
    };

    // Проверка формы перед отправкой
    const isValid = await validateForm(
      validationSchema,
      formData,
      setErrorHandlers
    );
    if (!isValid) return;

    // Отправка данных формы
    try {
      await createSupportTicket(formData);
      setFormData(initData);
    } catch (error) {
      console.error("Error submitting support ticket:", error);
    }
  };

  return (
    <div className="details-part">
      <div className="left">
        <LoadScript googleMapsApiKey={API_KEY} language="en">
          <GoogleMap
            mapContainerStyle={mapStyles}
            zoom={13}
            center={defaultCenter}
          />
        </LoadScript>
      </div>
      <div className="right">
        <h2>Have Questions?</h2>

        <div className="form">
          <div className="form-field">
            <p>Your Name</p>
            <Input
              name="full_name"
              placeholder="Full name"
              value={formData.full_name}
              errorMessage={fullNameError}
              onChange={handleChange}
            />
          </div>

          <div className="form-field">
            <p>Your Email</p>
            <Input
              name="email"
              placeholder="name@company.com"
              value={formData.email}
              errorMessage={emailError}
              onChange={handleChange}
            />
          </div>

          <div className="form-field">
            <p>Trading account number</p>
            <Input
              name="account_number"
              placeholder="6 digit number"
              value={formData.account_number}
              errorMessage={accountNumberError}
              onChange={handleChange}
            />
          </div>

          <div className="form-field">
            <p>Subject</p>
            <Input
              name="subject"
              placeholder="Your query here"
              value={formData.subject}
              errorMessage={subjectError}
              onChange={handleChange}
            />
          </div>

          <div className="form-field">
            <p>Description</p>
            <TextArea
              name="description"
              minHeight={126}
              placeholder="Your query here"
              value={formData.description}
              errorMessage={descriptionError}
              onChange={handleChange}
            />
          </div>

          <Button
            label="Submit"
            onClick={handleSubmit}
            variant={EButtonType.BUTTON_SECONDARY}
            icon={BlackRightTopArrowIcon}
          />
        </div>
      </div>
    </div>
  );
}
