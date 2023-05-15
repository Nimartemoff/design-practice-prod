import React from 'react';
import VacancyItem from './vacancyItem/VacancyItem';
import './VacancyList.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-bootstrap';

const VacancyList = ({vacancies, loading}) => {
    if(loading){
        return <h2>Loading... </h2>
    }
    return (
      <div className="row row-cols-1 row-cols-md-4 g-4 mx-auto cards">
        {vacancies.map((item) => (
          <VacancyItem
            key={item?.id}
            id={item?.id}
            src={item?.img_href ? item?.img_href : "./utmn.png"}
            VacName={item?.title}
            CompName={item?.name}
            VacDate={item?.date}
            Avt={item?.automation_percent}
            functions={item?.functions}
          />
        ))}
      </div>
    )
  }
  
  export default VacancyList
  