import React, { useEffect, useState } from "react";
import "./styles.scss";
import Input from "../../../../components/UI/Input";
import Button from "../../../../components/UI/Button";
import PhoneInput from "../../../../components/UI/PhoneInput";
import {
  getSatellite,
  saveSatellite,
} from "../../../../utils/getDataFromLocalStore/satellite";
import { updateSatelliteById } from "../../../../api/satellites";
import CountrySelect from "../../../../components/UI/CountrySelect";
import * as Yup from "yup";
import CustomDatePicker from "../../../../components/UI/CustomDatePicker";
import moment from "moment";

type Props = {};

export default function PersonalInfo(props: Props) {
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [city, setCity] = useState("");
  const [phone, setPhone] = useState("");
  const [countryCode, setCountryCode] = useState("");
  const [address, setAddress] = useState("");
  const [email, setEmail] = useState("");
  const [country, setCountry] = useState("");
  const [date, setDate] = useState("");
  const [errors, setErrors] = useState<any>({});

  useEffect(() => {
    const satellite = getSatellite();

    if (satellite) {
      let letters, numbers;
      if (satellite.phone) {
        const phone = satellite.phone as string;
        // @ts-ignore
        letters = phone?.match(/[A-Za-z]+/g)?.join("");
        // @ts-ignore
        numbers = phone?.match(/\d+/g)?.join("");
        if (numbers) {
          setPhone(numbers);
          letters && setCountryCode(letters);
        }
      }
      satellite.name && setName(satellite.name);
      satellite.last_name && setSurname(satellite.last_name);
      satellite.city && setCity(satellite.city);
      satellite.address && setAddress(satellite.address);

      satellite.email && setEmail(satellite.email);
      satellite.country && setCountry(satellite.country);
      satellite.born && setDate(satellite.born);
    }
  }, []);

  const validationSchema = Yup.object().shape({
    name: Yup.string().required("First name is required"),
    surname: Yup.string().required("Last name is required"),
    city: Yup.string().required("City is required"),
    phone: Yup.string()
      .matches(/^\+?[0-9 ]*$/, "Phone number is not valid")
      .max(10, "Phone number is not valid")
      .required("Phone number is required"),
    address: Yup.string().required("Address is required"),
    email: Yup.string()
      .email("Invalid email format")
      .required("Email is required"),
    date: Yup.string()
      .matches(/^\d{4}\-\d{2}\-\d{2}$/, "Date must be in format YYYY-MM-DD")
      .required("Date is required"),
  });

  const onHandleCountyCode = (value: string) => {
    setCountryCode(value);
  };

  const validateForm = async () => {
    try {
      await validationSchema.validate({
        name,
        surname,
        city,
        phone: phone,
        address,
        email,
        date,
      });
      return true;
    } catch (error: any) {
      setErrors(
        error.errors.reduce((acc: any, curr: any) => {
          acc[curr.split(" ")[0].toLowerCase()] = curr;
          return acc;
        }, {})
      );
      return false;
    }
  };

  const onHandlePersonalInfo = async () => {
    const isValid = await validateForm();
    if (!isValid) return;

    const satelliteData = {
      name,
      last_name: surname,
      country,
      city,
      born: moment(date).format("YYYY-MM-DD"),
      address,
      phone: countryCode + phone,
      email,
    };

    const satelliteId = localStorage.getItem("loginId");
    if (satelliteId) {
      updateSatelliteById(+satelliteId, satelliteData)
        .then((data) => {
          data && saveSatellite(data);
        })
        .catch(() => {});
    }
  };

  return (
    <div className="personal-info">
      <Input
        label="First Name"
        placeholder="Enter first name"
        value={name}
        onChange={(e) => {
          setName(e.target.value);
          setErrors((prev: any) => ({ ...prev, name: null }));
        }}
        errorMessage={errors.name}
      />
      <Input
        label="Last Name"
        placeholder="Enter last name"
        value={surname}
        onChange={(e) => {
          setSurname(e.target.value);
          setErrors((prev: any) => ({ ...prev, surname: null }));
        }}
        errorMessage={errors.surname}
      />
      <div className="field-with-label">
        <label className="field-label">Country</label>
        <CountrySelect
          placeholder="Country"
          value={country}
          onCountrySelect={setCountry}
        />
      </div>
      <Input
        label="City"
        placeholder="Enter city"
        value={city}
        onChange={(e) => {
          setCity(e.target.value);
          setErrors((prev: any) => ({ ...prev, city: null }));
        }}
        errorMessage={errors.city}
      />
      <Input
        label="Address"
        placeholder="Your address"
        value={address}
        onChange={(e) => {
          setAddress(e.target.value);
          setErrors((prev: any) => ({ ...prev, address: null }));
        }}
        errorMessage={errors.address}
      />
      <div className="field-with-label">
        <label className="field-label">Date of Birth</label>
        <CustomDatePicker
          placeholder="Date of birth"
          onChange={setDate}
          errorMessage={errors.date}
          value={date}
        />
      </div>
      <Input
        label="Email"
        placeholder="Email address"
        type="email"
        value={email}
        onChange={(e) => {
          setEmail(e.target.value);
          setErrors((prev: any) => ({ ...prev, email: null }));
        }}
        errorMessage={errors.email}
      />
      <div className="field-with-label">
        <label className="field-label">Phone</label>
        <PhoneInput
          id="phone-border"
          countryCode={countryCode}
          onChangeCode={onHandleCountyCode}
          placeholder=" 00 000 000 00"
          value={phone}
          onChange={(e) => {
            setPhone(e.target.value);
            setErrors((prev: any) => ({ ...prev, phone: null }));
          }}
          errorMessage={errors.phone}
        />
      </div>
      <Button
        label="Save Changes"
        onClick={onHandlePersonalInfo}
        fullWidth
      />
    </div>
  );
}
