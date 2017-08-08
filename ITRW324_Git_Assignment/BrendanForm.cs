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
        int max;
        string sNumbers = "";
        RandomNumbersN rN = new RandomNumbersN();
        private void button1_Click(object sender, EventArgs e)
        {
            int n = Convert.ToInt32(textBox2.Text);
            rN = new RandomNumbersN(n);
            int[] numbers = rN.randomNumbers();
            max = numbers[0];
            for (int i = 0; i < numbers.Length; i++)
            {
                if (numbers[i] > max)
                    max = numbers[i];
            }
            for (int i = 0; i < numbers.Length; i++)
            {
                sNumbers = sNumbers + numbers[i] + ", ";
            }
            MessageBox.Show("The randomed numbers are " + sNumbers + "and the Max number is: " + max);
        }
    }
}
