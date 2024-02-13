from bs4 import BeautifulSoup

def extrair_informacoes(html_file):
    with open(html_file, 'r', encoding='utf-8') as f:
        html_content = f.read()

    soup = BeautifulSoup(html_content, 'html.parser')

    anime_infos = []

    # Encontrar todas as linhas da tabela
    linhas_tabela = soup.find_all('tr')

    for linha in linhas_tabela:
        # Verificar se a linha contém um link
        link = linha.find('a', class_='mirror-url')
        if link:
            # Encontrar o nome do anime
            nome_anime = link.text.strip()

            # Encontrar os links dos vídeos
            links = linha.find_all('a')
            videos = {}
            for link in links:
                tipo = link.get('data-theme-type')
                nome_video = link.get('data-theme-name')
                url_video = link['href']
                if tipo and nome_video:
                    videos[tipo] = {'nome': nome_video, 'url': url_video}

            anime_info = {'anime': nome_anime, 'videos': videos}
            anime_infos.append(anime_info)

    return anime_infos




def salvar_html(anime_infos, output_file):
    with open(output_file, 'w', encoding='utf-8') as f:
        f.write('<!DOCTYPE html>\n<html>\n<head>\n<title>Informações dos Animes</title>\n</head>\n<body>\n')

        for anime_info in anime_infos:
            f.write(f"<h3><u>{anime_info['anime']}</u></h3>\n")
            for tipo, video_info in anime_info['videos'].items():
                f.write(f"<p>{tipo.upper()}</p>\n")
                f.write(f"<h3>{video_info['nome']}</h3>\n")
                f.write(f"<h3>{video_info['url']}</h3>\n")
                f.write("<br>\n")
                
        f.write('</body>\n</html>')
        f.write('<script>\n')
        f.write('document.addEventListener(\'DOMContentLoaded\', function() {\n')
        f.write('    const h3Elements = document.querySelectorAll(\'h3\');\n')
        f.write('    function copiarTexto(texto) {\n')
        f.write('        navigator.clipboard.writeText(texto).then(function() {\n')
        f.write('            console.log(\'Texto copiado para a área de transferência:\', texto);\n')
        f.write('        }, function(err) {\n')
        f.write('            console.error(\'Erro ao copiar texto:\', err);\n')
        f.write('        });\n')
        f.write('    }\n')
        f.write('    h3Elements.forEach(function(h3Element) {\n')
        f.write('        h3Element.addEventListener(\'click\', function() {\n')
        f.write('            const texto = this.innerText;\n')
        f.write('            copiarTexto(texto);\n')
        f.write('        });\n')
        f.write('    });\n')
        f.write('});\n')
        f.write('</script>\n')

if __name__ == "__main__":
    html_file = '2021Verao.html'  # Substitua pelo nome do seu arquivo HTML
    output_file = 'informacoes_animes2021Verao.html'  # Nome do arquivo de saída
    infos = extrair_informacoes(html_file)
    salvar_html(infos, output_file)
