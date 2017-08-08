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
    public partial class Form1 : Form
    {
        public Form1()
        {
            InitializeComponent();
        }

      
        

        private void btnPhilip_Click(object sender, EventArgs e)
        {
            Philip tempFrm = new Philip();
            tempFrm.ShowDialog();
        }

        private void btnVorster_Click(object sender, EventArgs e)
        {
            Vorster frmVorster = new Vorster();
            frmVorster.ShowDialog();
        }

        private void btnBrendan_Click(object sender, EventArgs e)
        {
            Theunnis frmTheunnis = new Theunnis();
            frmTheunnis.Show();
        }
        }

        private void btnTheunnis_Click(object sender, EventArgs e)
        {
            BrendanForm myForm = new BrendanForm();
            myForm.ShowDialog();
        }
    }
}
