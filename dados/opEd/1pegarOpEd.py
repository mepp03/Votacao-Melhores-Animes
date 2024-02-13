import requests
from bs4 import BeautifulSoup

# URL da página que queremos raspar
url = "https://themes.moe/list/season/2019/winter"

# Fazendo a solicitação GET
response = requests.get(url)

# Verifica se a solicitação foi bem-sucedida (código de status 200)
if response.status_code == 200:
    # Parsing do HTML com BeautifulSoup
    soup = BeautifulSoup(response.text, 'html.parser')

    # Encontrando todas as entradas de séries
    series_entries = soup.find_all("div", class_="entry-container")

    # Iterando sobre as entradas e extraindo as informações
    for entry in series_entries:
        # Obtendo o nome da série
        series_name = entry.find("h4", class_="theme-name").text.strip()

        # Obtendo o nome e o link do vídeo
        video_name = entry.find("div", class_="theme-song-title").text.strip()
        video_link = entry.find("a", class_="theme-song-link")['href']

        # Exibindo as informações
        print("Série:", series_name)
        print("Nome do vídeo:", video_name)
        print("Link do vídeo:", video_link)
        print()
        input(":3")
    print(soup)
    input(":3")
else:
    input("Falha ao obter a página:", response.status_code)
