import React, { useEffect, useState } from "react";
import { Card } from "reactstrap";

import axios from "../axiosInstance";
import "./AlertsModal.css";

const AlertsModal = (props) => {
  const [showModal, setShowModal] = useState(false);
  const [alerts, setAlerts] = useState([]);

  useEffect(() => {
    let alerts_close_time = localStorage.getItem("alerts_close_time");
    if (alerts_close_time != null) {
      let time_delta = Date.now() - Date.parse(alerts_close_time);
      // Wait a day to elapse before re-opening the alerts modal
      if (time_delta / (1000 * 60 * 60 * 24) < 1) {
        return;
      }
    }
    // Fetch alerts if possible
    axios.get(`/api/users/${props.user.pk}/alerts`).then((res) => {
      setAlerts(res.data);
      setShowModal(true);
    });
  }, [props.user]);

  function closeModal() {
    setShowModal(false);
    localStorage.setItem("alerts_close_time", new Date().toString());
  }

  return (
    <Card
      className="alerts-modal"
      style={{ visibility: showModal ? "visible" : "hidden", opacity: showModal ? 1 : 0 }}
    >
      <div style={{ display: "flex", justifyContent: "end" }}>
        <span className="close-button" onClick={closeModal}>
          ×
        </span>
      </div>
      <ul>
        {alerts.map((alert) => (
          <li>{alert}</li>
        ))}
      </ul>
    </Card>
  );
};

export default AlertsModal;
