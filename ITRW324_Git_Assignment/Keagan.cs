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
            CheckN cN = new CheckN(n);
            int flag = cN.validateN();
            if (flag == 1)
            {
                string printNum = "";
                Random rand = new Random();
                int[] numAR = new int[n];

                //Test for 5 to 20 method..
                if(n > 0)
                {
                    for (int i = 0; i < n; i++)
                    {
                        numAR[i] = rand.Next(0, 200);
                    }

                    Array.Sort(numAR);

                    for (int i = 0; i < n; i++)
                    {
                        printNum = printNum + numAR[i] + " ";
                    }

                    Median_Class median = new Median_Class();

                    MessageBox.Show("Numbers Generated\n" + printNum + "\n\nMedian (To the nearest INT)\n" + Math.Round(median.ClacMedian(numAR)));
                }
                else
                {
                    MessageBox.Show("Number cannot be 0");
                }
            }
            else
                MessageBox.Show("Please check if the number you entered is between 5 and 20.");
        }
    }
}
