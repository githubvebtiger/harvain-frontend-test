import React, { useEffect, useState } from "react";
import "../../styles.scss";
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
    name: Yup.string(),
    surname: Yup.string(),
    city: Yup.string(),
    phone: Yup.string()
      .matches(/^\+?[0-9 ]*$/, "Phone number is not valid")
      .max(10, "Phone number is not valid"),
    address: Yup.string(),
    email: Yup.string()
      .email("Invalid email format"),
    date: Yup.string(),
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
      born: date ? moment(date).format("YYYY-MM-DD") : "",
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
      <div className="settings-fields-grid">
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
            placeholder="DD-MM-YYYY"
            onChange={(val: string) => {
              setDate(val);
              setErrors((prev: any) => ({ ...prev, date: null }));
            }}
            errorMessage={errors.date}
            value={date}
          />
        </div>
      </div>

      <div className="settings-actions">
        <Button
          label="Save Changes"
          onClick={onHandlePersonalInfo}
        />
      </div>
    </div>
  );
}
