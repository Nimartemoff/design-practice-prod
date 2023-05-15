import axios from 'axios'
import React, { useEffect, useState } from 'react';
import { Pagination, PaginationItem, Stack } from '@mui/material';
import { Button } from '@mui/material';
import VacancyList from '../vacancyList/VacancyList';
import {Link} from 'react-router-dom';

import { Form } from 'react-bootstrap';

import styles from './HomePage.module.css';

const BASE_URL = 'http://app:3001/vacancy/';

const HomePage = (props) => {
    const [asc, setAsc] = useState(true);
    const [sortBy, setSortBy] = useState(true);
    const [vacancies, setVacancies] = useState([]);
    const [page, setPage] = useState(parseInt(props.location?.search?.split('=')[1]) || 1);
    const [pageQty, setPageQty] = useState(0);
    const count = '20';
    const sortParam = sortBy ? 'autopercent' : 'date';

    useEffect(() => {
      axios
        .get(`${BASE_URL}?asc=${asc}&sort=${sortParam}&p=${page}&count=${count}`)
        .then(({ data }) => {
          setVacancies(data);
          setPageQty(data.pageCount);

          if (data.pageCount < page) {
            setPage(1);
          }
        });
    }, [asc, page, sortBy, sortParam]);

    return (
      <div className={styles.Content}>
        <div className={styles.Sort}>
            <Form.Group>
                <Form.Label>Сортировать по</Form.Label>
                <Form.Select
                value={sortBy ? 'auto' : 'date'}
                onChange={(e) => setSortBy(e.target.value === 'auto')}
                aria-label="Выберите способ сортировки"
                style={{ width: 'fit-content' }} // добавляем стиль для установки ширины
                >
                <option value="auto">Автоматизации</option>
                <option value="date">Дате</option>
                </Form.Select>
            </Form.Group>
            <Button
                sx={{
                    color: 'black',
                    border: 'none',
                    fontWeight: 'normal', // убираем жирный шрифт
                    '&:hover': {
                    backgroundColor: 'transparent',
                    },
                    '&:active': {
                    backgroundColor: 'transparent',
                    },
                }}
                onClick={() => setAsc(!asc)}
                >
                {asc ? 'Возрастание ▲' : 'Убывание ▼'}
            </Button>
        </div>

    
        {vacancies.data && <VacancyList vacancies={vacancies.data} />}
        <Stack spacing={2}>
          {!!pageQty && (
            <Pagination
            count={pageQty}
            page={page}
            showFirstButton
            showLastButton
            onChange={(_, num) => setPage(num)}
            sx={{marginY:3, marginX: 'auto'}}
            renderItem={
                (item) => (
                    <PaginationItem
                        component={Link}
                        to={`/?page=${item.page}`}
                        {...item}
                    />
                )
            }
            />
          )}
        </Stack>
      </div>
    );
  };
  
  export default HomePage;