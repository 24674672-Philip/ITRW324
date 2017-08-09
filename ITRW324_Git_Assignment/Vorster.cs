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
    public partial class Vorster : Form
    {
        public Vorster()
        {
            InitializeComponent();
        }

        private void btnAnalyse_Click(object sender, EventArgs e)
        {
            if(tbxN.Text.Length > 0)
            {
                int n = Convert.ToInt32(tbxN.Text);
                CheckN cN = new CheckN(n);
                int flag = cN.validateN();
                if (flag == 1)
                {
                    Random random = new Random();
                    int[] randomNumbers = new int[n];
                    for(int i =0; i<n; i++)
                    {
                        randomNumbers[i] = random.Next(0,200);
                    }
                    Standard_Dev_Class standardDev = new Standard_Dev_Class();
                    MessageBox.Show("Standard Deviation of n randomly generated numbers is:\n" + Math.Round(standardDev.CalculateStandardDeviation(randomNumbers), 3));
                }
                else
                    MessageBox.Show("Please check if the number you entered is between 5 and 20.");
            }
        }
    }
}
