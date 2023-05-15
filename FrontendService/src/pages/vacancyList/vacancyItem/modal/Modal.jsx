import React from 'react';
import styles from "./Modal.module.css";
import { Modal, Button } from 'react-bootstrap';
import CircleProgressBar from '../circleProgressBar/CircleProgressBar';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import axios from 'axios';



const CustomModal = ({show, handleClose, title, data, id, avt }) => {


  const [loading, setLoading] = useState(false);
  const [modalData, setModalData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`http://app:3001/vacancy/${id}`);
        setModalData(response.data[0]);
        console.log(response.data[0]?.functions);
      } catch (error) {
        console.log(error);
        // handle error
      } finally {
        setLoading(false);
      }
    };
  
    if (show) {
      fetchData();
    }
  }, [show, data, id]);

  const date = new Date(modalData?.date);;
  const formattedDate = `${date.getDate()}.${date.getMonth()+1}.${date.getFullYear()}`;

  return (
    <>
    {loading && <p>Loading...</p>}
    {modalData && (
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{title}</Modal.Title>
        </Modal.Header>
        <Modal.Body className={styles.Main}>
        <div className={styles.Circle}>
          <CircleProgressBar percentage={parseFloat(avt)} />
        </div>
        <div className={styles.Functions}>
          <p className={styles.Title}>Автоматизируемые обязанности:</p>
          {modalData?.functions.map(func => (
              <div key={func} style={{ 
                  color: "black",
                  padding: "5px 0",
                  borderBottom: "1px solid #E0E0E0",
              }}>{func.charAt(0).toUpperCase() + func.slice(1)}</div>
          ))}
      </div>
        </Modal.Body>
        <Modal.Footer className={styles.Footer}>
        <Link to={modalData?.vacancy_link} target="_blank">
          <Button variant="secondary" onClick={handleClose}>
            Перейти на HH
          </Button>
        </Link>
          <p>{formattedDate}</p>
        </Modal.Footer>
      </Modal>
  )}
  </>
)}

export default CustomModal;