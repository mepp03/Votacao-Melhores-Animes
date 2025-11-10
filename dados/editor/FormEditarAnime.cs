using System;
using System.Linq;
using System.Windows.Forms;

namespace EditorAnimes
{
    public partial class FormEditarAnime : Form
    {
        private Anime anime;

        public FormEditarAnime(Anime animeParaEditar)
        {
            InitializeComponent();
            anime = animeParaEditar;
            CarregarDadosAnime();
        }

        private void CarregarDadosAnime()
        {
            txtId.Text = anime.Id.ToString();
            txtTituloJapones.Text = anime.Title?.Romaji ?? "";
            txtTituloIngles.Text = anime.Title?.English ?? "";
            txtEpisodios.Text = anime.Episodes?.ToString() ?? "";
            txtImagemUrl.Text = anime.CoverImage?.Large ?? "";

            // Carregar openings
            lstOpenings.Items.Clear();
            if (anime.Opening?.Edges != null)
            {
                foreach (var op in anime.Opening.Edges)
                {
                    lstOpenings.Items.Add($"{op.Node.Op.Name} | {op.Node.Op.Video}");
                }
            }

            // Carregar endings
            lstEndings.Items.Clear();
            if (anime.Ending?.Edges != null)
            {
                foreach (var ed in anime.Ending.Edges)
                {
                    lstEndings.Items.Add($"{ed.Node.Ed.Name} | {ed.Node.Ed.Video}");
                }
            }
        }

        private void btnSalvar_Click(object sender, EventArgs e)
        {
            // Atualizar dados básicos
            anime.Title.Romaji = txtTituloJapones.Text;
            anime.Title.English = txtTituloIngles.Text;
            anime.Episodes = int.TryParse(txtEpisodios.Text, out int eps) ? eps : null;
            
            if (!string.IsNullOrWhiteSpace(txtImagemUrl.Text))
            {
                anime.CoverImage ??= new Capa();
                anime.CoverImage.Large = txtImagemUrl.Text;
                anime.CoverImage.Medium = txtImagemUrl.Text;
            }

            DialogResult = DialogResult.OK;
            Close();
        }

        private void btnAdicionarOpening_Click(object sender, EventArgs e)
        {
            using (var form = new FormAdicionarOpEd("Opening"))
            {
                if (form.ShowDialog() == DialogResult.OK)
                {
                    anime.Opening.Edges.Add(new EdgeOp
                    {
                        Node = new NodeOp
                        {
                            Op = new Op
                            {
                                Name = form.Nome,
                                Video = form.VideoUrl
                            }
                        }
                    });
                    CarregarDadosAnime();
                }
            }
        }

        private void btnAdicionarEnding_Click(object sender, EventArgs e)
        {
            using (var form = new FormAdicionarOpEd("Ending"))
            {
                if (form.ShowDialog() == DialogResult.OK)
                {
                    anime.Ending.Edges.Add(new EdgeEd
                    {
                        Node = new NodeEd
                        {
                            Ed = new Ed
                            {
                                Name = form.Nome,
                                Video = form.VideoUrl
                            }
                        }
                    });
                    CarregarDadosAnime();
                }
            }
        }

        private void btnRemoverOpening_Click(object sender, EventArgs e)
        {
            if (lstOpenings.SelectedIndex >= 0)
            {
                anime.Opening.Edges.RemoveAt(lstOpenings.SelectedIndex);
                CarregarDadosAnime();
            }
        }

        private void btnRemoverEnding_Click(object sender, EventArgs e)
        {
            if (lstEndings.SelectedIndex >= 0)
            {
                anime.Ending.Edges.RemoveAt(lstEndings.SelectedIndex);
                CarregarDadosAnime();
            }
        }
    }
}