import React, { useState, useEffect } from "react";
//Componentes
import Navbar from "../Components/Navbar";
import Form from "../Components/Form";
import Header from "../Components/Header";
import Cards from "../Components/Cards";
//styles
import "../Assets/Styles/home.css";
import Axios from "axios";

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

  const enterpriseKeyGenerator = (enterpriseName) => {
    return (
      enterpriseName.substring(0, 3) +
      Math.floor(100000 + Math.random() * 900000)
    );
  };

  const handleChange = (event) => {
    setDataForm({
      ...dataForm,
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

  const submitEvent = async (e) => {
    e.preventDefault();
    // for (const index in dataForm) {
    //   console.log(`${index} otro: ${dataForm[index]}`);
    //   if (dataForm[index] !== "" || dataForm[index] !== null) {

    Axios.post("/newOrder", {
      ENTERPRISE_NAME: dataForm.enterprise_name,
      ADDRESS: dataForm.address,
      EMAIL: dataForm.email,
      DESCRIPTION: dataForm.description,
      enterpriseKey: enterpriseKeyGenerator(dataForm.enterprise_name),
    });

    // } else {
    //   alert("No pueden haber campos vacios");
    // }
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
