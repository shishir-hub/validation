import React, { useEffect, useRef, useState } from "react";
import "./Verification.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Verification() {
  const navigate = useNavigate();
  const inputRef = useRef([]);

  const [codes, setCodes] = useState(["", "", "", "", "", ""]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState({
    state: false,
    message: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    let temp = "";
    codes.forEach((el) => {
      return (temp += el);
    });
    let data = {
      verification_number: Number(temp),
    };
    axios
      .post(`${process.env.REACT_APP_SERVER_URL}/verification`, data)
      .then((res) => {
        console.log(res.data.message);
        navigate("/success");
      })
      .catch((err) => {
        console.log(err.response.data.message);
        setError({
          state: true,
          message: err.response.data.message || "Verification Error!",
        });

        setTimeout(() => {
          setError({ ...error, state: false });
        }, 2000);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const handleChange = (e, i) => {
    let temp = [...codes];
    if (e.target.value !== "") {
      let value = Number(e.target.value) % 10;
      temp[i] = value;
      setCodes(temp);
      if (i !== 5) {
        inputRef.current[i + 1].focus();
      }
    } else {
      temp[i] = "";
      setCodes(temp);
    }
  };

  const handlePaste = (e) => {
    let value = (e.clipboardData || window.clipboardData).getData("Text");
    if (value.toString().length === inputRef.current.length && Number(value)) {
      let temp = [...codes];
      inputRef.current.forEach((el, i) => {
        temp[i] = value[i];
        el.focus();
      });
      setCodes(temp);
    }
  };

  useEffect(() => {
    inputRef.current[0] && inputRef.current[0].focus();
  }, []);

  return (
    <main className="home">
      <div className={`error ${error.state ? "show" : ""}`}>
        <p>{error.message}</p>
      </div>
      <div className="container">
        <form onSubmit={handleSubmit}>
          <h4>Verification code:</h4>
          <div className="inputs">
            {codes?.map((code, i) => {
              return (
                <input
                  ref={(element) => {
                    inputRef.current.push(element);
                  }}
                  value={code}
                  type="number"
                  onChange={(e) => {
                    handleChange(e, i);
                  }}
                  key={i}
                  required
                  min="0"
                  max="9"
                  disabled={loading}
                  onPaste={handlePaste}
                />
              );
            })}
          </div>
          <button type="submit" disabled={loading}>
            SUBMIT
          </button>
        </form>
      </div>
    </main>
  );
}

export default Verification;
