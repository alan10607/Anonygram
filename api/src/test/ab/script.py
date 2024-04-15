import requests
import json
import subprocess
from pathlib import Path
from requests.packages.urllib3.exceptions import InsecureRequestWarning

requests.packages.urllib3.disable_warnings(InsecureRequestWarning)
base_url = "https://localhost"
body_file_path = Path(__file__).resolve().parent / "body"

def get(path):
    response = requests.get(base_url + path, verify=False)
    if response.status_code // 100 != 2:
        print(f"Get request for {path}, response error code:", response.status_code)
    return response.json()


def post(path, file):
    response = requests.post(base_url + path, json=read_data_from_file(body_file_path / file), verify=False)
    if response.status_code // 100 != 2:
        print(f"Post request for {path}, response error code:", response.status_code)
    return response.json()


def run_ab_test(path, file_name=None):
    print(f"================= ApacheBench start for {path} =================")
    if file_name is None:
        subprocess.run(["ab", "-n", "1000", "-c", "100", base_url + path], check=False)
    else:
        subprocess.run(["ab", "-n", "1000", "-c", "100", "-p", body_file_path / file_name, "-T", "application/json", base_url + path], check=False)
    print(f"================= ApacheBench done for {path} ==================")


def read_data_from_file(filename):
    with open(filename, 'r') as file:
        data = json.load(file)
    return data


# Scaling test function
def test_create_article():
    firstArticle = post("/article", "create_article.json")
    articleId = firstArticle["articleId"]
    run_ab_test(f"/article", "create_article.json")
    run_ab_test(f"/article/{articleId}", "reply_article.json")

def test_query_article():
    articleIds = []
    for i in range(10):
        firstArticle = post("/article", "create_article.json")
        articleId = firstArticle["articleId"]
        articleIds.append(articleId)
        for j in range(9):
            firstArticle = post(f"/article/{articleId}", "reply_article.json")

    run_ab_test(f"/query/articles/{','.join(articleIds)}")
    run_ab_test(f"/query/article/{articleId}?page=1")
    run_ab_test(f"/query/article?query=ocean")


if __name__ == "__main__":
    test_create_article()
    test_query_article()
