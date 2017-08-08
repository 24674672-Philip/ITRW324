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
    public partial class Zander : Form
    {
        public Zander()
        {
            InitializeComponent();
        }
        private int amount = 0;

         private void button1_Click(object sender, EventArgs e)
         {
            int temp = Convert.ToInt32(numericUpDown2.Value);
            CheckN cN = new CheckN(temp);
            int flag = cN.validateN();
            if (flag == 1)
            {
                if (temp == 0)
                {
                    MessageBox.Show("The amount cannot be 0!");
                    return;
                }
                else
                {
                    amount = temp;
                }
                Random rnd = new Random();
                int[] values = new int[amount];
                for (int i = 0; i < amount; i++)
                {
                    int rng = rnd.Next(1, 10);
                    values[i] = rng;
                    textBox1.Text += (Convert.ToInt32(values[i]) + "\r\n");
                }
                Dictionary<int, int> searchMode = new Dictionary<int, int>();
                foreach (int x in values)
                {
                    if (searchMode.ContainsKey(x))
                    {
                        searchMode[x] = searchMode[x] + 1;
                    }
                    else
                    {
                        searchMode[x] = 1;
                    }
                }

                int final = int.MinValue;
                int max = int.MinValue;
                foreach (int y in searchMode.Keys)
                {
                    if (searchMode[y] > max)
                    {
                        max = searchMode[y];
                        final = y;
                    }
                }
                MessageBox.Show("The mode is: " + final + " that occurred " + max + " times");
            }
            else
                MessageBox.Show("Please check if the number you entered is between 5 and 20.");
        }
    }
}
