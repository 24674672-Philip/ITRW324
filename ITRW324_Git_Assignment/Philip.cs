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
    public partial class Philip : Form
    {
        public Philip()
        {
            InitializeComponent();
        }

        private void btnCalc_Click(object sender, EventArgs e)
        {
            try
            {
                int n = Convert.ToInt16(textBox2.Text);
                CheckN cN = new CheckN(n);
                int flag = cN.validateN();
                if (flag == 1)
                {
                    stat calc = new stat();
                    calc.GCD(n);
                }
                else
                    MessageBox.Show("Please check if the number you entered is between 5 and 20.");
            }
            catch (Exception dex)
            {
                MessageBox.Show("Please enter an integer.","Error",MessageBoxButtons.OK,MessageBoxIcon.Error);
            }
        }
    }
}
