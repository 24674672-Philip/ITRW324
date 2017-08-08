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
    public partial class BrendanForm : Form
    {
        public BrendanForm()
        {
            InitializeComponent();
        }
        
        private void button1_Click(object sender, EventArgs e)
        {
            int n = Convert.ToInt32(textBox2.Text);
            CheckN cN = new CheckN(n);
            int flag = cN.validateN();
            if (flag == 1)
            {
                stat myStat = new stat();
                myStat.max(n);
            }
            else
                MessageBox.Show("Please check if the number you entered is between 5 and 20.");
        }
    }
}
