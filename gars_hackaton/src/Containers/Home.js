import React, { useState, useEffect } from "react";
//Componentes
import Navbar from "../Components/Navbar";
import Form from "../Components/Form";
import Header from "../Components/Header";
import Cards from "../Components/Cards";
//styles
import "../Assets/Styles/home.css";

const Home = () => {
  const [dataCard, setDataCard] = useState([]);
  const [dataForm, setDataForm] = useState({});

  const acceptCard = async (id_random) => {
    let data = {
      ID_ORDER: id_random,
      STATUS: "accept",
    };
    try {
      await fetch("/statusOrder", {
        method: "PUT",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
      });
      getData();
    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = (event) => {
    setDataForm({
      ...dataForm,
      //enterpriseKey: Descomentar e ingresar el codigo que genere el enterpriseKey con los primeros tres caracteres de la empresa, y seis numeros aleatorios
      [event.target.name]: event.target.value,
    });
  };

  const getData = async () => {
    fetch("/orders")
      .then((res) => res.json())
      .then((data) => {
        setDataCard(data.data);
      });
  };

  const rejectOrder = async (orderId) => {
    try {
      let body = {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
        body: JSON.stringify({
          ID_ORDER: orderId,
          STATUS: "reject",
        }),
      };
      fetch("/statusOrder", body)
        .then((res) => res.json())
        .then((data) => {
          getData();
        });
    } catch (error) {
      console.log(error);
    }
  };

  const submitEvent = async () => {
    let randomKey;
    randomKey = Math.floor(Math.random() * (999999 - 100000)) + 100000;
    randomKey = "TES" + randomKey;
    try {
      let body = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
        body: JSON.stringify({
          ENTERPRISE_NAME: "TEST CO",
          ADDRESS: "testing address",
          EMAIL: "testing@email.com",
          ID_ORDER: "",
          ENTERPRISE_KEY: randomKey,
          STATUS: "new",
        }),
      };
      console.log("dos");
      fetch("/newOrder", body)
        .then((res) => res.json())
        .then((data) => {
          getData();
        });
      console.log("ok");
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <>
      <Navbar />
      <Header />
      <div className="wrapper-main-section">
        <Form submitEvent={submitEvent} handleChange={handleChange} />
        <Cards
          dataCard={dataCard}
          acceptCard={acceptCard}
          rejectOrder={rejectOrder}
        />
      </div>
    </>
  );
};

export default Home;
