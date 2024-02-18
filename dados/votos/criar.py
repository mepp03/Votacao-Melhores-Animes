import json

# Carrega o JSON
with open('votos2021Inverno.json', 'r') as file:
    data = json.load(file)

# Zera os valores, exceto a imagem
for anime in data:
    anime['id'] = ""
    anime['nomeJ'] = ""
    anime['nomeE'] = ""
    anime['imagem'] = "../imagem/1333.jpg"
    anime['ponto'] = ""
    anime['extra'] = ""

    # Mantém a imagem como '../imagem/1333.jpg'
    anime['imagem'] = '../imagem/1333.jpg'

# Salva o JSON modificado
with open('inverno2019_modified.json', 'w') as file:
    json.dump(data, file, indent=4)

input("3")