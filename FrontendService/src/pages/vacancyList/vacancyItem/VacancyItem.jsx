import React, { useState } from 'react';
import styles from './VacancyItem.module.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import VacancyProgressBar from './vacancyProgressBar/VacancyProgressBar'
import Modal from './modal/Modal';
import { Button } from 'react-bootstrap';



const VacancyItem = (props) => {
  // Преобразуем строку в объект Date

  const [showModal, setShowModal] = useState(false);

  const handleClose = () => setShowModal(false);
  const handleShow = () => setShowModal(true);
  const avt = (props.Avt*100).toFixed(2);

  return (
    <div className={`col-md-6 col-lg-4 ${styles.card}`}>
      <div className={`card h-100 ${styles.card}`}>
        <img src={props.src} className={`card-img-top ${styles.image}`} alt="" />
        <div className={`card-body ${styles.body}`}>
          <h5 className={`card-title ${styles.title}`}>{props.VacName}</h5>
          <p className={`card-text ${styles.text}`}>{props.CompName}</p>
        </div>
        <VacancyProgressBar Avt={avt} />
        <div className={`card-footer ${styles.footer}`}>
          <Button variant="dark" onClick={handleShow} className="btn-block">
            Подробнее
          </Button>
 {/*         <small className={`text-body-secondary ${styles.date}`}>{formattedDate}</small>  */}
          <Modal show={showModal} handleClose={handleClose} title={props.VacName} name={props.CompName} avt={avt}  id={props.id}>
          </Modal>
        </div>
      </div>
    </div>
  )
}

export default VacancyItem;