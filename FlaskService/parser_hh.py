import requests
from concurrent.futures import ThreadPoolExecutor
from tqdm import tqdm
import json
URL = "https://api.hh.ru/vacancies"


def get_vacancy(vacancy_id: str):
    url = f"{URL}/{vacancy_id}"
    vacancy = requests.api.get(url).json()
    return vacancy


def collect_vacancies():
    target_url = URL + "?area=1342"
    response = requests.get(target_url)
    data = response.json()
    num_pages = min(data["pages"], 1500 // 20)

    ids = []
    for idx in range(num_pages + 1):
        response = requests.get(target_url, {"page": idx})
        data = response.json()
        if "items" not in data:
            break
        ids.extend(x["id"] for x in data["items"])

    jobs_list = []
    with ThreadPoolExecutor(max_workers=1) as executor:
        for vacancy in tqdm(
                executor.map(get_vacancy, ids),
                desc="Get data via HH API",
                ncols=100,
                total=len(ids),
        ):
            jobs_list.append(vacancy)

    return jobs_list

def main():
    return collect_vacancies()


if __name__ == "__main__":
    main()