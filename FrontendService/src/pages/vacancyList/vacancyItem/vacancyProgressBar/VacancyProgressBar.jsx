import React from 'react';
import styles from './VacancyProgressBar.module.css';
import { OverlayTrigger, Tooltip } from 'react-bootstrap';
import { ProgressBar } from 'react-bootstrap';

const VacancyProgressBar = ({ Avt }) => {
  return (
    <>
      <OverlayTrigger
        placement="top"
        overlay={
          <Tooltip id="tooltip">
            Процент автоматизации обязанностей
          </Tooltip>
        }
      >
        <ProgressBar now={Avt} variant="dark" animated />
      </OverlayTrigger>
      <p className={`card-text ${styles.prec} number`} title="Процент автоматизации обязанностей">{Avt}%</p>
    </>
  )
}

export default VacancyProgressBar;