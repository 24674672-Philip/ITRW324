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
            try
            {
               
                int num = Convert.ToInt32(textBox1.Text);
                CheckN check = new CheckN(num);
                int iflag = check.validateN();
                if (iflag == 1)
                {
                    stat cAverage = new stat();
                    average = cAverage.average(num);
                    lblAnswer.Text = "The mean of the random numbers are: " + average;
                }
                else
                    MessageBox.Show("Please make sure that number you entered is between 5 and 20.");
            }
            catch (FormatException)
            {
                MessageBox.Show("Please enter a numeric value");
            }
        }
    }
}
