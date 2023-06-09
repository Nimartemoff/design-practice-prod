FROM python

WORKDIR /flask

COPY . .

RUN python3 -m venv .venv
RUN . .venv/bin/activate
RUN pip install psycopg2
RUN pip install requests
RUN pip install nltk
RUN pip install scikit-learn
RUN pip install joblib
RUN pip install tqdm
RUN pip install Flask

EXPOSE 5000

CMD ["flask", "--app", "app", "run", "-h", "0.0.0.0"]