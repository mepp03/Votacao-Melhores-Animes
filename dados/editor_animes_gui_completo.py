import json
import tkinter as tk
from tkinter import ttk, messagebox, simpledialog
from pathlib import Path

class EditorAnimesGUI:
    def __init__(self, root):
        self.root = root
        self.root.title("Editor de Animes - GUI Completo")
        self.root.geometry("900x700")
        
        # Caminho do arquivo JSON - AJUSTE AQUI SE PRECISAR
        self.arquivo_db = Path(r"C:\ssd\Área de Trabalho\alura\votacao animes\dados\dbVotos.json")
        self.dados = {}
        self.animes_atuais = []
        self.temporada_atual = ""
        self.anime_selecionado = None
        
        self.carregar_dados()
        self.criar_interface()
        self.atualizar_lista_temporadas()
    
    def carregar_dados(self):
        """Carrega os dados do arquivo JSON"""
        try:
            if self.arquivo_db.exists():
                with open(self.arquivo_db, 'r', encoding='utf-8') as f:
                    self.dados = json.load(f)
                print(f"✅ Dados carregados: {len(self.dados)} temporadas")
            else:
                self.dados = {}
                messagebox.showinfo("Info", "Arquivo não encontrado. Criando novo banco de dados.")
        except Exception as e:
            messagebox.showerror("Erro", f"Erro ao carregar dados: {e}")
            self.dados = {}
    
    def salvar_dados(self):
        """Salva os dados no arquivo JSON"""
        try:
            with open(self.arquivo_db, 'w', encoding='utf-8') as f:
                json.dump(self.dados, f, ensure_ascii=False, indent=2)
            messagebox.showinfo("Sucesso", "Dados salvos com sucesso!")
        except Exception as e:
            messagebox.showerror("Erro", f"Erro ao salvar dados: {e}")
    
    def criar_interface(self):
        """Cria a interface gráfica com abas"""
        # Notebook (abas)
        self.notebook = ttk.Notebook(self.root)
        self.notebook.pack(fill=tk.BOTH, expand=True, padx=10, pady=10)
        
        # Aba 1: Gerenciar Temporadas
        self.aba_temporadas = ttk.Frame(self.notebook)
        self.notebook.add(self.aba_temporadas, text="Temporadas")
        self.criar_aba_temporadas()
        
        # Aba 2: Editar Openings/Endings
        self.aba_op_ed = ttk.Frame(self.notebook)
        self.notebook.add(self.aba_op_ed, text="Openings/Endings")
        self.criar_aba_op_ed()
    
    def criar_aba_temporadas(self):
        """Cria a aba de gerenciamento de temporadas"""
        # Frame superior - controles
        frame_controles = ttk.Frame(self.aba_temporadas, padding="10")
        frame_controles.pack(fill=tk.X)
        
        # Ano e Estação
        ttk.Label(frame_controles, text="Ano:").grid(row=0, column=0, padx=(0, 5))
        self.cmb_ano = ttk.Combobox(frame_controles, values=["2019", "2020", "2021", "2022", "2023", "2024", "2025"])
        self.cmb_ano.set("2024")
        self.cmb_ano.grid(row=0, column=1, padx=(0, 15))
        
        ttk.Label(frame_controles, text="Estação:").grid(row=0, column=2, padx=(0, 5))
        self.cmb_estacao = ttk.Combobox(frame_controles, values=["WINTER", "SPRING", "SUMMER", "FALL"])
        self.cmb_estacao.set("SPRING")
        self.cmb_estacao.grid(row=0, column=3, padx=(0, 15))
        
        # Botões
        ttk.Button(frame_controles, text="Carregar Temporada", 
                  command=self.carregar_temporada).grid(row=0, column=4, padx=(0, 10))
        ttk.Button(frame_controles, text="Nova Temporada", 
                  command=self.nova_temporada).grid(row=0, column=5, padx=(0, 10))
        ttk.Button(frame_controles, text="Salvar Tudo", 
                  command=self.salvar_dados).grid(row=0, column=6)
        
        # Frame principal - duas colunas
        frame_principal = ttk.Frame(self.aba_temporadas, padding="10")
        frame_principal.pack(fill=tk.BOTH, expand=True)
        
        # Coluna esquerda - Temporadas
        frame_temporadas = ttk.LabelFrame(frame_principal, text="Temporadas", padding="5")
        frame_temporadas.grid(row=0, column=0, sticky=(tk.N, tk.S, tk.W, tk.E), padx=(0, 5))
        
        self.lista_temporadas = tk.Listbox(frame_temporadas, width=25, height=20)
        self.lista_temporadas.grid(row=0, column=0, sticky=(tk.N, tk.S, tk.W, tk.E))
        self.lista_temporadas.bind('<Double-Button-1>', self.on_doubleclick_temporada)
        
        scrollbar_temporadas = ttk.Scrollbar(frame_temporadas, orient=tk.VERTICAL, command=self.lista_temporadas.yview)
        scrollbar_temporadas.grid(row=0, column=1, sticky=(tk.N, tk.S))
        self.lista_temporadas.configure(yscrollcommand=scrollbar_temporadas.set)
        
        # Coluna direita - Animes
        frame_animes = ttk.LabelFrame(frame_principal, text="Animes", padding="5")
        frame_animes.grid(row=0, column=1, sticky=(tk.N, tk.S, tk.W, tk.E))
        
        self.lista_animes = tk.Listbox(frame_animes, width=50, height=15)
        self.lista_animes.grid(row=0, column=0, columnspan=4, sticky=(tk.N, tk.S, tk.W, tk.E))
        self.lista_animes.bind('<Double-Button-1>', self.on_doubleclick_anime)
        
        scrollbar_animes = ttk.Scrollbar(frame_animes, orient=tk.VERTICAL, command=self.lista_animes.yview)
        scrollbar_animes.grid(row=0, column=4, sticky=(tk.N, tk.S))
        self.lista_animes.configure(yscrollcommand=scrollbar_animes.set)
        
        # Botões para animes
        frame_botoes_animes = ttk.Frame(frame_animes)
        frame_botoes_animes.grid(row=1, column=0, columnspan=5, pady=5, sticky=(tk.W, tk.E))
        
        ttk.Button(frame_botoes_animes, text="Adicionar Anime", 
                  command=self.adicionar_anime).grid(row=0, column=0, padx=2)
        ttk.Button(frame_botoes_animes, text="Editar Anime", 
                  command=self.editar_anime).grid(row=0, column=1, padx=2)
        ttk.Button(frame_botoes_animes, text="Remover Anime", 
                  command=self.remover_anime).grid(row=0, column=2, padx=2)
        ttk.Button(frame_botoes_animes, text="Ver Detalhes", 
                  command=self.ver_detalhes).grid(row=0, column=3, padx=2)
        ttk.Button(frame_botoes_animes, text="Editar OP/ED", 
                  command=self.ir_para_op_ed).grid(row=0, column=4, padx=2)
        
        # Status bar
        self.status_var = tk.StringVar(value="Pronto")
        status_bar = ttk.Label(self.aba_temporadas, textvariable=self.status_var, relief=tk.SUNKEN)
        status_bar.pack(fill=tk.X, side=tk.BOTTOM)
        
        # Configurar weights para redimensionamento
        frame_principal.columnconfigure(1, weight=1)
        frame_principal.rowconfigure(0, weight=1)
        frame_temporadas.columnconfigure(0, weight=1)
        frame_temporadas.rowconfigure(0, weight=1)
        frame_animes.columnconfigure(0, weight=1)
        frame_animes.rowconfigure(0, weight=1)
    
    def criar_aba_op_ed(self):
        """Cria a aba para editar openings e endings"""
        # Frame superior - informações do anime
        frame_info = ttk.LabelFrame(self.aba_op_ed, text="Anime Selecionado", padding="10")
        frame_info.pack(fill=tk.X, padx=10, pady=5)
        
        self.lbl_anime_info = ttk.Label(frame_info, text="Nenhum anime selecionado. Volte para a aba 'Temporadas' e clique em 'Editar OP/ED'")
        self.lbl_anime_info.pack()
        
        # Frame principal - duas colunas
        frame_principal = ttk.Frame(self.aba_op_ed, padding="10")
        frame_principal.pack(fill=tk.BOTH, expand=True)
        
        # Coluna esquerda - Openings
        frame_openings = ttk.LabelFrame(frame_principal, text="Openings (ABERTURAS)", padding="10")
        frame_openings.grid(row=0, column=0, sticky=(tk.N, tk.S, tk.W, tk.E), padx=(0, 5))
        
        # Lista de openings
        self.lista_openings = tk.Listbox(frame_openings, height=8)
        self.lista_openings.pack(fill=tk.BOTH, expand=True)
        self.lista_openings.bind('<Double-Button-1>', self.editar_opening)
        
        # Botões openings
        frame_botoes_op = ttk.Frame(frame_openings)
        frame_botoes_op.pack(fill=tk.X, pady=5)
        
        ttk.Button(frame_botoes_op, text="+ Adicionar Opening", 
                  command=self.adicionar_opening).pack(side=tk.LEFT, padx=2)
        ttk.Button(frame_botoes_op, text="Editar", 
                  command=self.editar_opening).pack(side=tk.LEFT, padx=2)
        ttk.Button(frame_botoes_op, text="Remover", 
                  command=self.remover_opening).pack(side=tk.LEFT, padx=2)
        
        # Coluna direita - Endings
        frame_endings = ttk.LabelFrame(frame_principal, text="Endings (ENCERRAMENTOS)", padding="10")
        frame_endings.grid(row=0, column=1, sticky=(tk.N, tk.S, tk.W, tk.E))
        
        # Lista de endings
        self.lista_endings = tk.Listbox(frame_endings, height=8)
        self.lista_endings.pack(fill=tk.BOTH, expand=True)
        self.lista_endings.bind('<Double-Button-1>', self.editar_ending)
        
        # Botões endings
        frame_botoes_ed = ttk.Frame(frame_endings)
        frame_botoes_ed.pack(fill=tk.X, pady=5)
        
        ttk.Button(frame_botoes_ed, text="+ Adicionar Ending", 
                  command=self.adicionar_ending).pack(side=tk.LEFT, padx=2)
        ttk.Button(frame_botoes_ed, text="Editar", 
                  command=self.editar_ending).pack(side=tk.LEFT, padx=2)
        ttk.Button(frame_botoes_ed, text="Remover", 
                  command=self.remover_ending).pack(side=tk.LEFT, padx=2)
        
        # Frame inferior - preview
        frame_preview = ttk.LabelFrame(self.aba_op_ed, text="Preview do JSON", padding="10")
        frame_preview.pack(fill=tk.BOTH, expand=True, padx=10, pady=5)
        
        self.text_preview = tk.Text(frame_preview, height=8)
        scrollbar_preview = ttk.Scrollbar(frame_preview, orient=tk.VERTICAL, command=self.text_preview.yview)
        self.text_preview.configure(yscrollcommand=scrollbar_preview.set)
        
        self.text_preview.pack(side=tk.LEFT, fill=tk.BOTH, expand=True)
        scrollbar_preview.pack(side=tk.RIGHT, fill=tk.Y)
        
        # Configurar weights
        frame_principal.columnconfigure(0, weight=1)
        frame_principal.columnconfigure(1, weight=1)
        frame_principal.rowconfigure(0, weight=1)
        frame_openings.columnconfigure(0, weight=1)
        frame_openings.rowconfigure(0, weight=1)
        frame_endings.columnconfigure(0, weight=1)
        frame_endings.rowconfigure(0, weight=1)
    
    def converter_estacao(self, estacao):
        """Converte estação para português"""
        conversao = {
            'WINTER': 'Inverno',
            'SPRING': 'Primavera', 
            'SUMMER': 'Verao',
            'FALL': 'Outono'
        }
        return conversao.get(estacao, estacao)
    
    def atualizar_lista_temporadas(self):
        """Atualiza a lista de temporadas"""
        self.lista_temporadas.delete(0, tk.END)
        for temporada in sorted(self.dados.keys(), reverse=True):
            qtd_animes = len(self.dados[temporada]) if isinstance(self.dados[temporada], list) else 0
            self.lista_temporadas.insert(tk.END, f"{temporada} ({qtd_animes} animes)")
    
    def carregar_temporada(self):
        """Carrega uma temporada baseada nos comboboxes"""
        ano = self.cmb_ano.get()
        estacao = self.cmb_estacao.get()
        estacao_traduzida = self.converter_estacao(estacao)
        chave_temporada = f"{ano}{estacao_traduzida}"
        
        self.carregar_temporada_por_nome(chave_temporada)
    
    def carregar_temporada_por_nome(self, temporada):
        """Carrega uma temporada pelo nome"""
        if temporada in self.dados and isinstance(self.dados[temporada], list):
            self.animes_atuais = self.dados[temporada]
            self.temporada_atual = temporada
            self.atualizar_lista_animes()
            self.status_var.set(f"Carregado: {temporada} - {len(self.animes_atuais)} animes")
        else:
            self.animes_atuais = []
            self.temporada_atual = ""
            self.atualizar_lista_animes()
            messagebox.showwarning("Aviso", f"Temporada {temporada} não encontrada!")
    
    def atualizar_lista_animes(self):
        """Atualiza a lista de animes"""
        self.lista_animes.delete(0, tk.END)
        if self.animes_atuais:
            for anime in sorted(self.animes_atuais, key=lambda x: x.get('title', {}).get('romaji', '')):
                titulo = anime.get('title', {}).get('romaji', 'Sem título')
                episodios = anime.get('episodes', '?')
                anime_id = anime.get('id', '?')
                self.lista_animes.insert(tk.END, f"{titulo} ({episodios} eps) [ID: {anime_id}]")
    
    def nova_temporada(self):
        """Cria uma nova temporada"""
        ano = self.cmb_ano.get()
        estacao = self.cmb_estacao.get()
        estacao_traduzida = self.converter_estacao(estacao)
        chave_temporada = f"{ano}{estacao_traduzida}"
        
        if chave_temporada not in self.dados:
            self.dados[chave_temporada] = []
            self.carregar_temporada_por_nome(chave_temporada)
            self.atualizar_lista_temporadas()
            self.status_var.set(f"Nova temporada criada: {chave_temporada}")
        else:
            messagebox.showwarning("Aviso", "Esta temporada já existe!")
    
    def adicionar_anime(self):
        """Adiciona um novo anime"""
        if not self.temporada_atual:
            messagebox.showwarning("Aviso", "Primeiro carregue ou crie uma temporada!")
            return
        
        # Diálogo simples para adicionar anime
        nome = simpledialog.askstring("Adicionar Anime", "Nome do anime:")
        if nome:
            novo_anime = {
                'id': len(self.animes_atuais) + 1,
                'title': {
                    'romaji': nome,
                    'english': nome
                },
                'episodes': 12,
                'coverImage': {
                    'large': '',
                    'medium': ''
                },
                'opening': {'edges': []},
                'ending': {'edges': []}
            }
            self.animes_atuais.append(novo_anime)
            self.atualizar_lista_animes()
            self.dados[self.temporada_atual] = self.animes_atuais
            messagebox.showinfo("Sucesso", "Anime adicionado com sucesso!")
    
    def editar_anime(self):
        """Edita o anime selecionado"""
        selecionado = self.lista_animes.curselection()
        if not selecionado:
            messagebox.showwarning("Aviso", "Selecione um anime para editar!")
            return
        
        index = selecionado[0]
        anime = self.animes_atuais[index]
        
        # Diálogo simples para editar
        novo_nome = simpledialog.askstring("Editar Anime", "Novo nome:", initialvalue=anime.get('title', {}).get('romaji', ''))
        if novo_nome:
            anime['title']['romaji'] = novo_nome
            anime['title']['english'] = novo_nome
            self.atualizar_lista_animes()
            self.dados[self.temporada_atual] = self.animes_atuais
            messagebox.showinfo("Sucesso", "Anime atualizado com sucesso!")
    
    def remover_anime(self):
        """Remove o anime selecionado"""
        selecionado = self.lista_animes.curselection()
        if not selecionado:
            messagebox.showwarning("Aviso", "Selecione um anime para remover!")
            return
        
        index = selecionado[0]
        anime = self.animes_atuais[index]
        titulo = anime.get('title', {}).get('romaji', 'Sem título')
        
        if messagebox.askyesno("Confirmar", f"Remover '{titulo}'?"):
            self.animes_atuais.pop(index)
            self.atualizar_lista_animes()
            self.dados[self.temporada_atual] = self.animes_atuais
            messagebox.showinfo("Sucesso", "Anime removido com sucesso!")
    
    def ver_detalhes(self):
        """Mostra detalhes do anime selecionado"""
        selecionado = self.lista_animes.curselection()
        if not selecionado:
            messagebox.showwarning("Aviso", "Selecione um anime para ver detalhes!")
            return
        
        index = selecionado[0]
        anime = self.animes_atuais[index]
        
        detalhes_window = tk.Toplevel(self.root)
        detalhes_window.title("Detalhes do Anime")
        detalhes_window.geometry("500x400")
        
        frame = ttk.Frame(detalhes_window)
        frame.pack(fill=tk.BOTH, expand=True, padx=10, pady=10)
        
        text_widget = tk.Text(frame, wrap=tk.WORD)
        scrollbar = ttk.Scrollbar(frame, orient=tk.VERTICAL, command=text_widget.yview)
        text_widget.configure(yscrollcommand=scrollbar.set)
        
        text_widget.pack(side=tk.LEFT, fill=tk.BOTH, expand=True)
        scrollbar.pack(side=tk.RIGHT, fill=tk.Y)
        
        json_formatado = json.dumps(anime, ensure_ascii=False, indent=2)
        text_widget.insert(tk.END, json_formatado)
        text_widget.config(state=tk.DISABLED)
    
    def ir_para_op_ed(self):
        """Vai para a aba de OP/ED com o anime selecionado"""
        selecionado = self.lista_animes.curselection()
        if not selecionado:
            messagebox.showwarning("Aviso", "Selecione um anime para editar OP/ED!")
            return
        
        index = selecionado[0]
        self.anime_selecionado = self.animes_atuais[index]
        
        # Atualizar informações na aba OP/ED
        titulo = self.anime_selecionado.get('title', {}).get('romaji', 'Sem título')
        self.lbl_anime_info.config(text=f"Editando: {titulo} (ID: {self.anime_selecionado.get('id', '?')})")
        
        # Atualizar listas de OP/ED
        self.atualizar_listas_op_ed()
        
        # Mudar para aba OP/ED
        self.notebook.select(1)
    
    def atualizar_listas_op_ed(self):
        """Atualiza as listas de openings e endings"""
        if not self.anime_selecionado:
            return
        
        # Limpar listas
        self.lista_openings.delete(0, tk.END)
        self.lista_endings.delete(0, tk.END)
        
        # Preencher openings
        if 'opening' in self.anime_selecionado and 'edges' in self.anime_selecionado['opening']:
            openings = self.anime_selecionado['opening']['edges']
            for op in openings:
                nome = op.get('node', {}).get('op', {}).get('name', 'Sem nome')
                video = op.get('node', {}).get('op', {}).get('video', 'Sem URL')
                self.lista_openings.insert(tk.END, f"{nome} | {video}")
        
        # Preencher endings
        if 'ending' in self.anime_selecionado and 'edges' in self.anime_selecionado['ending']:
            endings = self.anime_selecionado['ending']['edges']
            for ed in endings:
                nome = ed.get('node', {}).get('ed', {}).get('name', 'Sem nome')
                video = ed.get('node', {}).get('ed', {}).get('video', 'Sem URL')
                self.lista_endings.insert(tk.END, f"{nome} | {video}")
        
        # Atualizar preview
        self.atualizar_preview()
    
    def atualizar_preview(self):
        """Atualiza o preview do JSON"""
        if self.anime_selecionado:
            # Criar uma versão simplificada para preview
            preview_data = {
                'id': self.anime_selecionado.get('id'),
                'title': self.anime_selecionado.get('title'),
                'opening': self.anime_selecionado.get('opening', {'edges': []}),
                'ending': self.anime_selecionado.get('ending', {'edges': []})
            }
            
            json_str = json.dumps(preview_data, ensure_ascii=False, indent=2)
            self.text_preview.delete(1.0, tk.END)
            self.text_preview.insert(1.0, json_str)
    
    def adicionar_opening(self):
        """Adiciona um novo opening"""
        if not self.anime_selecionado:
            messagebox.showwarning("Aviso", "Nenhum anime selecionado!")
            return
        
        nome = simpledialog.askstring("Adicionar Opening", "Nome do Opening:")
        if nome:
            video = simpledialog.askstring("URL do Vídeo", "URL do vídeo (opcional):")
            video = video or ""
            
            novo_op = {
                'node': {
                    'op': {
                        'name': nome,
                        'video': video
                    }
                }
            }
            
            # Garantir que a estrutura existe
            if 'opening' not in self.anime_selecionado:
                self.anime_selecionado['opening'] = {'edges': []}
            if 'edges' not in self.anime_selecionado['opening']:
                self.anime_selecionado['opening']['edges'] = []
            
            self.anime_selecionado['opening']['edges'].append(novo_op)
            self.atualizar_listas_op_ed()
            self.dados[self.temporada_atual] = self.animes_atuais
            messagebox.showinfo("Sucesso", "Opening adicionado com sucesso!")
    
    def adicionar_ending(self):
        """Adiciona um novo ending"""
        if not self.anime_selecionado:
            messagebox.showwarning("Aviso", "Nenhum anime selecionado!")
            return
        
        nome = simpledialog.askstring("Adicionar Ending", "Nome do Ending:")
        if nome:
            video = simpledialog.askstring("URL do Vídeo", "URL do vídeo (opcional):")
            video = video or ""
            
            novo_ed = {
                'node': {
                    'ed': {
                        'name': nome,
                        'video': video
                    }
                }
            }
            
            # Garantir que a estrutura existe
            if 'ending' not in self.anime_selecionado:
                self.anime_selecionado['ending'] = {'edges': []}
            if 'edges' not in self.anime_selecionado['ending']:
                self.anime_selecionado['ending']['edges'] = []
            
            self.anime_selecionado['ending']['edges'].append(novo_ed)
            self.atualizar_listas_op_ed()
            self.dados[self.temporada_atual] = self.animes_atuais
            messagebox.showinfo("Sucesso", "Ending adicionado com sucesso!")
    
    def editar_opening(self, event=None):
        """Edita o opening selecionado"""
        if not self.anime_selecionado:
            return
        
        selecionado = self.lista_openings.curselection()
        if not selecionado:
            messagebox.showwarning("Aviso", "Selecione um opening para editar!")
            return
        
        index = selecionado[0]
        opening = self.anime_selecionado['opening']['edges'][index]
        nome_atual = opening['node']['op']['name']
        video_atual = opening['node']['op']['video']
        
        novo_nome = simpledialog.askstring("Editar Opening", "Nome do Opening:", initialvalue=nome_atual)
        if novo_nome:
            novo_video = simpledialog.askstring("URL do Vídeo", "URL do vídeo:", initialvalue=video_atual)
            opening['node']['op']['name'] = novo_nome
            opening['node']['op']['video'] = novo_video or ""
            self.atualizar_listas_op_ed()
            self.dados[self.temporada_atual] = self.animes_atuais
            messagebox.showinfo("Sucesso", "Opening atualizado com sucesso!")
    
    def editar_ending(self, event=None):
        """Edita o ending selecionado"""
        if not self.anime_selecionado:
            return
        
        selecionado = self.lista_endings.curselection()
        if not selecionado:
            messagebox.showwarning("Aviso", "Selecione um ending para editar!")
            return
        
        index = selecionado[0]
        ending = self.anime_selecionado['ending']['edges'][index]
        nome_atual = ending['node']['ed']['name']
        video_atual = ending['node']['ed']['video']
        
        novo_nome = simpledialog.askstring("Editar Ending", "Nome do Ending:", initialvalue=nome_atual)
        if novo_nome:
            novo_video = simpledialog.askstring("URL do Vídeo", "URL do vídeo:", initialvalue=video_atual)
            ending['node']['ed']['name'] = novo_nome
            ending['node']['ed']['video'] = novo_video or ""
            self.atualizar_listas_op_ed()
            self.dados[self.temporada_atual] = self.animes_atuais
            messagebox.showinfo("Sucesso", "Ending atualizado com sucesso!")
    
    def remover_opening(self):
        """Remove o opening selecionado"""
        if not self.anime_selecionado:
            return
        
        selecionado = self.lista_openings.curselection()
        if not selecionado:
            messagebox.showwarning("Aviso", "Selecione um opening para remover!")
            return
        
        index = selecionado[0]
        nome = self.anime_selecionado['opening']['edges'][index]['node']['op']['name']
        
        if messagebox.askyesno("Confirmar", f"Remover opening '{nome}'?"):
            self.anime_selecionado['opening']['edges'].pop(index)
            self.atualizar_listas_op_ed()
            self.dados[self.temporada_atual] = self.animes_atuais
            messagebox.showinfo("Sucesso", "Opening removido com sucesso!")
    
    def remover_ending(self):
        """Remove o ending selecionado"""
        if not self.anime_selecionado:
            return
        
        selecionado = self.lista_endings.curselection()
        if not selecionado:
            messagebox.showwarning("Aviso", "Selecione um ending para remover!")
            return
        
        index = selecionado[0]
        nome = self.anime_selecionado['ending']['edges'][index]['node']['ed']['name']
        
        if messagebox.askyesno("Confirmar", f"Remover ending '{nome}'?"):
            self.anime_selecionado['ending']['edges'].pop(index)
            self.atualizar_listas_op_ed()
            self.dados[self.temporada_atual] = self.animes_atuais
            messagebox.showinfo("Sucesso", "Ending removido com sucesso!")
    
    def on_doubleclick_temporada(self, event):
        """Double click na lista de temporadas"""
        selecionado = self.lista_temporadas.curselection()
        if selecionado:
            item = self.lista_temporadas.get(selecionado[0])
            temporada = item.split(' ')[0]
            self.carregar_temporada_por_nome(temporada)
    
    def on_doubleclick_anime(self, event):
        """Double click na lista de animes"""
        self.editar_anime()

def main():
    root = tk.Tk()
    app = EditorAnimesGUI(root)
    root.mainloop()

if __name__ == "__main__":
    main()