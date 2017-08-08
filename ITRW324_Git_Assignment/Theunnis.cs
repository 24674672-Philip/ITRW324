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
    public partial class Theunnis : Form
    {
        public Theunnis()
        {
            InitializeComponent();
        }

        private void btnSubmit_Click(object sender, EventArgs e)
        {
            double average;
            int num = Convert.ToInt32(textBox1.Text);
            Average cAverage = new Average(num);
            average = cAverage.getAverage();
            lblAnswer.Text = "The mean of the random numbers are: " + average;
        }
    }
}
