using System;
using System.Windows.Forms;

namespace EditorAnimes
{
    public partial class FormAdicionarAnime : Form
    {
        public Anime AnimeAdicionado { get; private set; }

        public FormAdicionarAnime()
        {
            InitializeComponent();
        }

        private void btnSalvar_Click(object sender, EventArgs e)
        {
            if (int.TryParse(txtId.Text, out int id) && !string.IsNullOrWhiteSpace(txtTituloJapones.Text))
            {
                AnimeAdicionado = new Anime
                {
                    Id = id,
                    Title = new Titulo
                    {
                        Romaji = txtTituloJapones.Text,
                        English = txtTituloIngles.Text
                    },
                    Episodes = int.TryParse(txtEpisodios.Text, out int eps) ? eps : null,
                    CoverImage = new Capa
                    {
                        Large = txtImagemUrl.Text,
                        Medium = txtImagemUrl.Text
                    },
                    Opening = new OpeningOpening(),
                    Ending = new EndingEnding()
                };

                DialogResult = DialogResult.OK;
                Close();
            }
            else
            {
                MessageBox.Show("ID e Título em Japonês são obrigatórios!", "Erro", 
                              MessageBoxButtons.OK, MessageBoxIcon.Error);
            }
        }

        private void btnCancelar_Click(object sender, EventArgs e)
        {
            DialogResult = DialogResult.Cancel;
            Close();
        }
    }
}