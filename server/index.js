const express = require("express");
require("dotenv").config();
const ibm_db = require("ibm_db");
const app = express();

app.use(express.json());

app.get("/orders", (req, res) => {
  ibm_db.open(process.env.DB, (err, con) => {
    if (err) {
      res.status(500).json({
        mensaje: "Error al intentar concectar con la DB",
        error: err,
      });
    } else {
      con.query("SELECT * FROM JFV11323.ORDERS", (err, data) => {
        if (err) {
          res.status(500).json({
            mensaje: "Error al ejecutar el query",
            error: err,
          });
          con.close();
        } else {
          res.status(200).json({
            mensaje: "Consulta realizada con exito",
            data: data,
          });
          con.close();
        }
      });
    }
  });
});

app.post("/newOrder", (req, res) => {
  //let id_random: Descomentar e ingresar el codigo que genere un nuemero aleatorio,
  let id_random = Math.floor(Math.random() * 9999999);
  ibm_db.open(process.env.DB, (err, con) => {
    if (err) {
      res.status(500).json({
        mensaje: "Error al intentar concectar con la DB",
        error: err,
      });
    } else {
      con.query(
        `INSERT INTO JFV11323.ORDERS(ID_ORDER,ENTERPRISE_NAME,ADDRESS,EMAIL,ENTERPRISE_KEY,DESCRIPTION,STATUS) VALUES('${id_random}',' ${req.body.ENTERPRISE_NAME}',' ${req.body.ADDRESS}','${req.body.EMAIL}','${req.body.ENTERPRISE_KEY}','${req.body.DESCRIPTION}','${req.body.STATUS}')`,
        (err, data) => {
          if (err) {
            res.status(500).json({
              mensaje: "Error al ejecutar el query",
              error: err,
            });
            con.close();
          } else {
            res.status(200).json({
              mensaje: "nueva orden registrada",
            });
            con.close();
          }
        }
      );
    }
  });
});

app.put("/statusOrder", (req, res) => {
  ibm_db.open(process.env.DB, (err, con) => {
    if (err) {
      res.status(500).json({
        mensaje: "Error Conectarse a la db",
        error: err,
      });
    } else {
      con.query(
        `UPDATE JFV11323.ORDERS SET STATUS = '${req.body.STATUS}' WHERE ID_ORDER = ${req.body.ID_ORDER}`,
        (err, data) => {
          if (err) {
            res.status(500).json({
              mensaje: "Error ejecutar el query",
              error: err,
            });
            con.close();
          } else {
            res.status(200).json({
              mensaje: "Status actualizado",
              data: data,
            });
            con.close();
          }
        }
      );
    }
  });
});

app.delete("/deleteOrder", (req, res) => {
  ibm_db.open(process.env.DB, (err, con) => {
    if (err) {
      res.status(500).json({
        mensaje: "Error Conectarse a la db",
        error: err,
      });
    } else {
      con.query(
        `DELETE * FROM JFV11323 WHERE ID_ORDER = ${req.body.ID_ORDER}`,
        (err, data) => {
          if (err) {
            res.status(500).json({
              mensaje: "Error ejecutar el query",
              error: err,
            });
            con.close();
          } else {
            res.status(200).json({
              mensaje: "Opcion eliminada",
              data: data,
            });
            con.close();
          }
        }
      );
    }
  });
});

app.listen(process.env.PORT, () => {
  console.log(`Example app listening at http://localhost:${process.env.PORT}`);
});
