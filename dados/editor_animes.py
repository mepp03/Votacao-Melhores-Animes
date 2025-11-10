import json
import os
from pathlib import Path

class EditorAnimes:
    def __init__(self, arquivo_db="dados/dbVotos.json"):
        self.arquivo_db = Path(arquivo_db)
        self.carregar_dados()
    
    def carregar_dados(self):
        """Carrega os dados do arquivo JSON"""
        if self.arquivo_db.exists():
            with open(self.arquivo_db, 'r', encoding='utf-8') as f:
                self.dados = json.load(f)
        else:
            self.dados = {}
            print("📁 Arquivo não encontrado. Criando novo banco de dados.")
    
    def salvar_dados(self):
        """Salva os dados no arquivo JSON"""
        with open(self.arquivo_db, 'w', encoding='utf-8') as f:
            json.dump(self.dados, f, ensure_ascii=False, indent=2)
        print("✅ Dados salvos com sucesso!")
    
    def listar_temporadas(self):
        """Lista todas as temporadas disponíveis"""
        print("\n=== TEMPORADAS DISPONÍVEIS ===")
        for temporada in self.dados.keys():
            qtd_animes = len(self.dados[temporada]) if isinstance(self.dados[temporada], list) else 0
            print(f"📺 {temporada} - {qtd_animes} animes")
    
    def carregar_temporada(self, temporada):
        """Carrega uma temporada específica"""
        if temporada in self.dados:
            return self.dados[temporada]
        else:
            print(f"❌ Temporada {temporada} não encontrada!")
            return []
    
    def salvar_temporada(self, temporada, animes):
        """Salva os animes em uma temporada"""
        self.dados[temporada] = animes
        self.salvar_dados()
    
    def adicionar_anime(self, temporada, anime_data):
        """Adiciona um anime à temporada"""
        if temporada not in self.dados:
            self.dados[temporada] = []
        
        # Verificar se anime já existe
        for anime in self.dados[temporada]:
            if anime.get('id') == anime_data.get('id'):
                print(f"⚠️ Anime ID {anime_data['id']} já existe na temporada!")
                return False
        
        self.dados[temporada].append(anime_data)
        self.salvar_dados()
        print(f"✅ Anime '{anime_data['title']['romaji']}' adicionado!")
        return True
    
    def remover_anime(self, temporada, anime_id):
        """Remove um anime da temporada"""
        if temporada in self.dados:
            animes_antes = len(self.dados[temporada])
            self.dados[temporada] = [a for a in self.dados[temporada] if a.get('id') != anime_id]
            animes_depois = len(self.dados[temporada])
            
            if animes_depois < animes_antes:
                self.salvar_dados()
                print(f"✅ Anime ID {anime_id} removido!")
                return True
            else:
                print(f"❌ Anime ID {anime_id} não encontrado!")
                return False
        return False
    
    def editar_anime(self, temporada, anime_id, novos_dados):
        """Edita os dados de um anime"""
        if temporada in self.dados:
            for i, anime in enumerate(self.dados[temporada]):
                if anime.get('id') == anime_id:
                    # Atualiza os dados do anime
                    self.dados[temporada][i].update(novos_dados)
                    self.salvar_dados()
                    print(f"✅ Anime ID {anime_id} atualizado!")
                    return True
        print(f"❌ Anime ID {anime_id} não encontrado!")
        return False
    
    def buscar_anime(self, temporada, termo):
        """Busca animes por termo"""
        resultados = []
        if temporada in self.dados:
            for anime in self.dados[temporada]:
                titulo_romaji = anime.get('title', {}).get('romaji', '').lower()
                titulo_english = anime.get('title', {}).get('english', '').lower()
                if termo.lower() in titulo_romaji or termo.lower() in titulo_english:
                    resultados.append(anime)
        return resultados

def converter_estacao(estacao):
    """Converte estação para português"""
    conversao = {
        'WINTER': 'Inverno',
        'SPRING': 'Primavera', 
        'SUMMER': 'Verao',
        'FALL': 'Outono'
    }
    return conversao.get(estacao, estacao)

def menu_principal():
    """Menu principal da aplicação"""
    editor = EditorAnimes()
    
    while True:
        print("\n" + "="*50)
        print("🎌 EDITOR DE ANIMES - BANCO DE DADOS")
        print("="*50)
        print("1. Listar temporadas")
        print("2. Ver animes de uma temporada")
        print("3. Adicionar anime")
        print("4. Remover anime")
        print("5. Editar anime")
        print("6. Buscar anime")
        print("7. Sair")
        
        opcao = input("\nEscolha uma opção: ").strip()
        
        if opcao == '1':
            editor.listar_temporadas()
        
        elif opcao == '2':
            temporada = input("Digite a temporada (ex: 2024Primavera): ").strip()
            animes = editor.carregar_temporada(temporada)
            if animes:
                print(f"\n=== ANIMES DE {temporada} ===")
                for i, anime in enumerate(animes, 1):
                    titulo = anime.get('title', {}).get('romaji', 'Sem título')
                    episodios = anime.get('episodes', '?')
                    print(f"{i}. {titulo} - {episodios} episódios")
        
        elif opcao == '3':
            temporada = input("Temporada (ex: 2024Primavera): ").strip()
            
            # Dados básicos do anime
            anime_id = input("ID do anime: ").strip()
            titulo_romaji = input("Título em japonês: ").strip()
            titulo_english = input("Título em inglês: ").strip()
            episodios = input("Número de episódios: ").strip()
            
            anime_data = {
                'id': int(anime_id),
                'title': {
                    'romaji': titulo_romaji,
                    'english': titulo_english
                },
                'episodes': int(episodios) if episodios.isdigit() else None,
                'opening': {'edges': []},
                'ending': {'edges': []}
            }
            
            editor.adicionar_anime(temporada, anime_data)
        
        elif opcao == '4':
            temporada = input("Temporada: ").strip()
            anime_id = input("ID do anime a remover: ").strip()
            if anime_id.isdigit():
                editor.remover_anime(temporada, int(anime_id))
            else:
                print("❌ ID deve ser um número!")
        
        elif opcao == '5':
            temporada = input("Temporada: ").strip()
            anime_id = input("ID do anime a editar: ").strip()
            
            if anime_id.isdigit():
                print("\nO que deseja editar?")
                print("1. Títulos")
                print("2. Episódios")
                print("3. Openings/Endings")
                
                sub_opcao = input("Escolha: ").strip()
                
                if sub_opcao == '1':
                    novo_romaji = input("Novo título japonês: ").strip()
                    novo_english = input("Novo título inglês: ").strip()
                    
                    novos_dados = {
                        'title': {
                            'romaji': novo_romaji,
                            'english': novo_english
                        }
                    }
                    editor.editar_anime(temporada, int(anime_id), novos_dados)
                
                elif sub_opcao == '2':
                    novos_episodios = input("Novo número de episódios: ").strip()
                    if novos_episodios.isdigit():
                        editor.editar_anime(temporada, int(anime_id), {'episodes': int(novos_episodios)})
                    else:
                        print("❌ Número de episódios inválido!")
            
            else:
                print("❌ ID deve ser um número!")
        
        elif opcao == '6':
            temporada = input("Temporada: ").strip()
            termo = input("Termo de busca: ").strip()
            resultados = editor.buscar_anime(temporada, termo)
            
            if resultados:
                print(f"\n🔍 {len(resultados)} resultado(s) encontrado(s):")
                for anime in resultados:
                    titulo = anime.get('title', {}).get('romaji', 'Sem título')
                    anime_id = anime.get('id', '?')
                    print(f"ID: {anime_id} - {titulo}")
            else:
                print("❌ Nenhum resultado encontrado!")
        
        elif opcao == '7':
            print("👋 Saindo...")
            break
        
        else:
            print("❌ Opção inválida!")

# Script para uso rápido via linha de comando
def uso_rapido():
    """Uso rápido: python editor_animes.py <comando> <args>"""
    import sys
    
    if len(sys.argv) < 2:
        menu_principal()
        return
    
    comando = sys.argv[1]
    editor = EditorAnimes()
    
    if comando == 'listar':
        editor.listar_temporadas()
    
    elif comando == 'ver' and len(sys.argv) >= 3:
        temporada = sys.argv[2]
        animes = editor.carregar_temporada(temporada)
        if animes:
            print(f"Animes em {temporada}:")
            for anime in animes:
                print(f"- {anime['title']['romaji']} (ID: {anime['id']})")
    
    elif comando == 'add' and len(sys.argv) >= 4:
        temporada = sys.argv[2]
        anime_id = sys.argv[3]
        # Aqui você pode expandir para adicionar mais dados
    
    else:
        print("Comandos disponíveis:")
        print("  listar - Lista todas as temporadas")
        print("  ver <temporada> - Mostra animes de uma temporada")
        print("  add <temporada> <id> - Adiciona anime (em desenvolvimento)")

if __name__ == "__main__":
    uso_rapido()