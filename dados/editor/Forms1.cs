using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Windows.Forms;
using System.Text.Json;
using System.Text.Json.Serialization;

namespace EditorAnimes
{
    public partial class Form1 : Form
    {
        private Dictionary<string, List<Anime>> dados;
        private string arquivoDb = @"C:\ssd\Área de Trabalho\alura\votacao animes\dados\dbVotos.json";
        private List<Anime> animesAtuais;

        public Form1()
        {
            InitializeComponent();
            CarregarDados();
            PopularComboBoxes();
        }

        public class Anime
        {
            public int Id { get; set; }
            public Titulo Title { get; set; }
            public int? Episodes { get; set; }
            public Capa CoverImage { get; set; }
            public OpeningOpening Opening { get; set; }
            public EndingEnding Ending { get; set; }
        }

        public class Titulo
        {
            public string Romaji { get; set; }
            public string English { get; set; }
        }

        public class Capa
        {
            public string Large { get; set; }
            public string Medium { get; set; }
        }

        public class OpeningOpening
        {
            public List<EdgeOp> Edges { get; set; } = new List<EdgeOp>();
        }

        public class EndingEnding
        {
            public List<EdgeEd> Edges { get; set; } = new List<EdgeEd>();
        }

        public class EdgeOp
        {
            public NodeOp Node { get; set; }
        }

        public class EdgeEd
        {
            public NodeEd Node { get; set; }
        }

        public class NodeOp
        {
            public Op Op { get; set; }
        }

        public class NodeEd
        {
            public Ed Ed { get; set; }
        }

        public class Op
        {
            public string Name { get; set; }
            public string Video { get; set; }
        }

        public class Ed
        {
            public string Name { get; set; }
            public string Video { get; set; }
        }

        private void CarregarDados()
        {
            try
            {
                if (File.Exists(arquivoDb))
                {
                    string json = File.ReadAllText(arquivoDb);
                    dados = JsonSerializer.Deserialize<Dictionary<string, List<Anime>>>(json);
                }
                else
                {
                    dados = new Dictionary<string, List<Anime>>();
                    MessageBox.Show("Arquivo não encontrado. Criando novo banco de dados.", "Info", 
                                  MessageBoxButtons.OK, MessageBoxIcon.Information);
                }
            }
            catch (Exception ex)
            {
                MessageBox.Show($"Erro ao carregar dados: {ex.Message}", "Erro", 
                              MessageBoxButtons.OK, MessageBoxIcon.Error);
                dados = new Dictionary<string, List<Anime>>();
            }
        }

        private void SalvarDados()
        {
            try
            {
                string json = JsonSerializer.Serialize(dados, new JsonSerializerOptions 
                { 
                    WriteIndented = true,
                    PropertyNamingPolicy = JsonNamingPolicy.CamelCase
                });
                File.WriteAllText(arquivoDb, json);
                MessageBox.Show("Dados salvos com sucesso!", "Sucesso", 
                              MessageBoxButtons.OK, MessageBoxIcon.Information);
            }
            catch (Exception ex)
            {
                MessageBox.Show($"Erro ao salvar dados: {ex.Message}", "Erro", 
                              MessageBoxButtons.OK, MessageBoxIcon.Error);
            }
        }

        private void PopularComboBoxes()
        {
            // Popular anos
            cmbAno.Items.AddRange(new object[] { "2019", "2020", "2021", "2022", "2023", "2024", "2025" });
            cmbAno.SelectedIndex = 0;

            // Popular estações
            cmbEstacao.Items.AddRange(new object[] { "WINTER", "SPRING", "SUMMER", "FALL" });
            cmbEstacao.SelectedIndex = 0;

            // Popular lista de temporadas
            AtualizarListaTemporadas();
        }

        private void AtualizarListaTemporadas()
        {
            lstTemporadas.Items.Clear();
            foreach (var temporada in dados.Keys.OrderByDescending(k => k))
            {
                int count = dados[temporada]?.Count ?? 0;
                lstTemporadas.Items.Add($"{temporada} ({count} animes)");
            }
        }

        private string ConverterEstacao(string estacao)
        {
            return estacao switch
            {
                "WINTER" => "Inverno",
                "SPRING" => "Primavera",
                "SUMMER" => "Verao",
                "FALL" => "Outono",
                _ => estacao
            };
        }

        private void btnCarregarTemporada_Click(object sender, EventArgs e)
        {
            string ano = cmbAno.SelectedItem.ToString();
            string estacao = cmbEstacao.SelectedItem.ToString();
            string estacaoTraduzida = ConverterEstacao(estacao);
            string chaveTemporada = $"{ano}{estacaoTraduzida}";

            CarregarTemporada(chaveTemporada);
        }

        private void CarregarTemporada(string temporada)
        {
            if (dados.ContainsKey(temporada) && dados[temporada] != null)
            {
                animesAtuais = dados[temporada];
                AtualizarListaAnimes();
                lblStatus.Text = $"Carregado: {temporada} - {animesAtuais.Count} animes";
            }
            else
            {
                animesAtuais = new List<Anime>();
                AtualizarListaAnimes();
                MessageBox.Show($"Temporada {temporada} não encontrada!", "Aviso", 
                              MessageBoxButtons.OK, MessageBoxIcon.Warning);
            }
        }

        private void AtualizarListaAnimes()
        {
            lstAnimes.Items.Clear();
            if (animesAtuais != null)
            {
                foreach (var anime in animesAtuais.OrderBy(a => a.Title?.Romaji))
                {
                    string titulo = anime.Title?.Romaji ?? "Sem título";
                    string episodios = anime.Episodes?.ToString() ?? "?";
                    lstAnimes.Items.Add($"{titulo} ({episodios} eps)");
                }
            }
        }

        private void btnSalvarTemporada_Click(object sender, EventArgs e)
        {
            string ano = cmbAno.SelectedItem.ToString();
            string estacao = cmbEstacao.SelectedItem.ToString();
            string estacaoTraduzida = ConverterEstacao(estacao);
            string chaveTemporada = $"{ano}{estacaoTraduzida}";

            if (animesAtuais != null)
            {
                dados[chaveTemporada] = animesAtuais;
                SalvarDados();
                AtualizarListaTemporadas();
            }
        }

        private void btnAdicionarAnime_Click(object sender, EventArgs e)
        {
            using (var form = new FormAdicionarAnime())
            {
                if (form.ShowDialog() == DialogResult.OK)
                {
                    var novoAnime = form.AnimeAdicionado;
                    if (novoAnime != null)
                    {
                        animesAtuais.Add(novoAnime);
                        AtualizarListaAnimes();
                    }
                }
            }
        }

        private void btnRemoverAnime_Click(object sender, EventArgs e)
        {
            if (lstAnimes.SelectedIndex >= 0 && animesAtuais != null)
            {
                int index = lstAnimes.SelectedIndex;
                var animeRemovido = animesAtuais[index];
                
                if (MessageBox.Show($"Remover '{animeRemovido.Title?.Romaji}'?", "Confirmar", 
                    MessageBoxButtons.YesNo, MessageBoxIcon.Question) == DialogResult.Yes)
                {
                    animesAtuais.RemoveAt(index);
                    AtualizarListaAnimes();
                }
            }
        }

        private void btnEditarAnime_Click(object sender, EventArgs e)
        {
            if (lstAnimes.SelectedIndex >= 0 && animesAtuais != null)
            {
                int index = lstAnimes.SelectedIndex;
                var anime = animesAtuais[index];
                
                using (var form = new FormEditarAnime(anime))
                {
                    if (form.ShowDialog() == DialogResult.OK)
                    {
                        // Anime é editado por referência, então já está atualizado
                        AtualizarListaAnimes();
                    }
                }
            }
        }

        private void lstTemporadas_DoubleClick(object sender, EventArgs e)
        {
            if (lstTemporadas.SelectedIndex >= 0)
            {
                string item = lstTemporadas.SelectedItem.ToString();
                string temporada = item.Split(' ')[0]; // Pega só o nome da temporada
                CarregarTemporada(temporada);
            }
        }

        private void lstAnimes_DoubleClick(object sender, EventArgs e)
        {
            btnEditarAnime_Click(sender, e);
        }

        private void btnNovaTemporada_Click(object sender, EventArgs e)
        {
            string ano = cmbAno.SelectedItem.ToString();
            string estacao = cmbEstacao.SelectedItem.ToString();
            string estacaoTraduzida = ConverterEstacao(estacao);
            string chaveTemporada = $"{ano}{estacaoTraduzida}";

            if (!dados.ContainsKey(chaveTemporada))
            {
                dados[chaveTemporada] = new List<Anime>();
                animesAtuais = dados[chaveTemporada];
                AtualizarListaAnimes();
                AtualizarListaTemporadas();
                lblStatus.Text = $"Nova temporada criada: {chaveTemporada}";
            }
            else
            {
                MessageBox.Show("Esta temporada já existe!", "Aviso", 
                              MessageBoxButtons.OK, MessageBoxIcon.Warning);
            }
        }
    }
}