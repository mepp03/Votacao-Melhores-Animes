using System;
using System.Windows.Forms;

namespace EditorAnimes
{
    public partial class FormAdicionarOpEd : Form
    {
        public string Nome { get; private set; }
        public string VideoUrl { get; private set; }

        public FormAdicionarOpEd(string tipo)
        {
            InitializeComponent();
            this.Text = $"Adicionar {tipo}";
            lblTipo.Text = tipo;
        }

        private void btnSalvar_Click(object sender, EventArgs e)
        {
            if (!string.IsNullOrWhiteSpace(txtNome.Text))
            {
                Nome = txtNome.Text;
                VideoUrl = txtVideoUrl.Text;
                DialogResult = DialogResult.OK;
                Close();
            }
            else
            {
                MessageBox.Show("Nome é obrigatório!", "Erro", 
                              MessageBoxButtons.OK, MessageBoxIcon.Error);
            }
        }
    }
}