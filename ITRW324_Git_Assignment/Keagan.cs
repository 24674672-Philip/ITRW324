using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data;
using System.Drawing;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows.Forms;

namespace ITRW324_Git_Assignment
{
    public partial class Keagan : Form
    {
        public Keagan()
        {
            InitializeComponent();
            richTextBox1.Text = "My name is Keagan Du Toit, I am a third year IT student studying at NWU pukke. I enjoy playing computer games and listening to music. I work as a bartender at Bourbons Street.";
            this.ActiveControl = txtNO;
        }

        private void btnCalc_Click(object sender, EventArgs e)
        {
            int n = Convert.ToInt32(txtNO.Text);
            stat medianStat = new ITRW324_Git_Assignment.stat();
            medianStat.median(n);
        }
    }
}
