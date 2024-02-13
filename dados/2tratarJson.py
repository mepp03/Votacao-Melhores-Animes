import json
import sys
from pathlib import Path

def substituir_null(obj):
    if isinstance(obj, dict):
        for chave, valor in obj.items():
            if valor is None:
                obj[chave] = ""
            else:
                substituir_null(valor)
    elif isinstance(obj, list):
        for i, item in enumerate(obj):
            obj[i] = substituir_null(item)
    return obj

if len(sys.argv) != 2:
    print("Por favor, arraste um arquivo JSON para este script.")
    sys.exit(1)

# Caminho para o arquivo JSON original
arquivo_original = Path(sys.argv[1])

# Verificar se o arquivo existe
if not arquivo_original.is_file():
    print(f'O arquivo "{arquivo_original}" não foi encontrado.')
    sys.exit(1)

# Carregar o conteúdo do arquivo original
with open(arquivo_original, 'r', encoding='utf-8') as f:
    dados = json.load(f)

# Substituir todos os valores "null" por uma string vazia ""
dados = substituir_null(dados)

# Ordenar os animes alfabeticamente
dados = sorted(dados, key=lambda x: x['title']['romaji'])

# Adicionar a estrutura de "opening" e "ending" com "edges" e "node" contendo os campos "op" e "ed"
for anime in dados:
    anime['opening'] = {
        'edges': [{
            'node': {
                'op': {
                    'name': '',
                    'video': ''
                }
            }
        }]
    }
    anime['ending'] = {
        'edges': [{
            'node': {
                'ed': {
                    'name': '',
                    'video': ''
                }
            }
        }]
    }

# Salvar o conteúdo atualizado no arquivo original
with open(arquivo_original, 'w', encoding='utf-8') as f:
    json.dump(dados, f, indent=4, ensure_ascii=False)

print(f'O arquivo "{arquivo_original}" foi atualizado com sucesso!')
