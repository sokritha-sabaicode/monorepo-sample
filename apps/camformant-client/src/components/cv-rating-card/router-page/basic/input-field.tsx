"use client";
import React, { useEffect, useState } from "react";
import { Sheet } from "react-modal-sheet";
import InputDate from "./input-date-field";
import InputComponent from "@/components/input-field/input-component";
import axios from "axios";
import SkeletonLoader from "./skeleton";
import InputDateField from "@/components/input-date/Input-date";

interface PostData {
  post: boolean;
}

const InputField: React.FC<PostData> = ({ post }) => {
  const [surname, setSurname] = useState<string>("");
  const [lastname, setLastname] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const [date, setDate] = useState<string>("");
  const [address, setAddress] = useState<string>("");
  const [status, setStatus] = useState<string>("");
  const [focusedField, setFocusedField] = useState<string | null>(null);
  const [isOpen, setOpen] = useState<boolean>(false);
  const [day, setDay] = useState<string>("");
  const [month, setMonth] = useState<string>("");
  const [year, setYear] = useState<string>("");
  const [sumbit, setSumbit] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  // const ip = 'http://172.20.10.5:3030'
  // const ip = "http://localhost:3040";
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
    withCredentials: true, // Make sure cookies are handled properly
  };

  useEffect(() => {
    async function GetData() {
      try {
        setLoading(true);
        const data = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/v1/user/basic/`, config);
        setLoading(true);
        const res = data.data;
        setEmail(res.email);
        setLastname(res.username.split(" ").slice(1).join(" "));
        setSurname(res.username.split(" ")[0]);
        setPhone(res.phone_number);
        setDate(res.dob);
        setAddress(res.address);
        setStatus(res.martital_status);
      } catch (error) {
      } finally {
        setLoading(false);
      }
    }
    GetData();
  }, []);

  const PostData = async () => {
    try {
      const userData = {
        surName: surname,
        lastName: lastname,
        given_name: "", // Adjust or replace with the actual value
        username: "", // Adjust or replace with the actual value
        email, // Email from state
        phone_number: phone, // Phone number from state
        dob: date, // Date of birth from state
        address, // Address from state
        martital_status: status, // Marital status from state
        role: "", // Adjust or replace with the actual value
      };
      setLoading(true);
      const response = await axios.put(
        `${process.env.NEXT_PUBLIC_API_URL}/v1/user/profile/`,
        userData,
        config
      );
      return response;
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (post) {
      PostData();
    }
  }, [post]);

  useEffect(() => {
    if (sumbit === true) {
      if (day === "" || undefined || null) {
      } else {
        const all = `${day}/${month}/${year}`;
        setDate(all);
      }
    }
  }, [day, month, year, sumbit]);

  return (
    <div className="pb-20">
      <InputComponent
        typeofInput="text"
        values={surname}
        setFocused={setFocusedField}
        focused={focusedField}
        txt="Sur Name"
        setValues={setSurname}
        valuesFouce="surname"
      />
      <InputComponent
        typeofInput="text"
        values={lastname}
        setFocused={setFocusedField}
        focused={focusedField}
        txt="Last Name"
        setValues={setLastname}
        valuesFouce="lastname"
      />
      <InputComponent
        values={email}
        setFocused={setFocusedField}
        focused={focusedField}
        txt="Email"
        setValues={setEmail}
        valuesFouce="email"
      />
      <InputDateField setOpen={() => setOpen(true)} date={date} />
      {loading && <SkeletonLoader text="Loading ..." />}

      <InputComponent
        typeofInput="number"
        values={phone}
        setFocused={setFocusedField}
        focused={focusedField}
        txt="Phone"
        setValues={setPhone}
        valuesFouce="phone"
      />
      <InputComponent
        values={address}
        setFocused={setFocusedField}
        focused={focusedField}
        txt="Adress"
        setValues={setAddress}
        valuesFouce="address"
      />
      <InputComponent
        values={status}
        setFocused={setFocusedField}
        focused={focusedField}
        txt="Martail Status"
        setValues={setStatus}
        valuesFouce="Status"
      />

      <Sheet
        isOpen={isOpen}
        onClose={() => setOpen(false)}
        snapPoints={[400, 200, 100, 0]}
      >
        <Sheet.Container>
          <Sheet.Header />
          <Sheet.Content>
            <InputDate
              setOpen={setOpen}
              setDay={setDay}
              day={day}
              setMonth={setMonth}
              month={month}
              setYear={setYear}
              year={year}
              setSubmitted={setSumbit}
            />
          </Sheet.Content>
        </Sheet.Container>
        <Sheet.Backdrop />
      </Sheet>
    </div>
  );
};

export default InputField;
