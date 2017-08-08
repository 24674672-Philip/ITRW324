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
    public partial class JoyForm : Form
    {
        int min;
        string input = "";
        nRandomNumber random = new nRandomNumber();

        public JoyForm()
        {
            InitializeComponent();
            textBox2.UseWaitCursor = true;
        }

        private void button1_Click(object sender, EventArgs e)
        {
            try
            {
                int number = Convert.ToInt32(textBox2.Text);
                CheckN cN = new CheckN(number);
                int flag = cN.validateN();
                if (flag == 1)
                {
                    random = new nRandomNumber(number);
                    int[] numbers = random.randomNumberGenerate();
                    min = numbers[0];

                    for (int i = 0; i < numbers.Length; i++)
                    {
                        if (numbers[i] < min)
                            min = numbers[i];
                    }

                    for (int i = 0; i < numbers.Length; i++)
                    {
                    input = input + numbers[i] + ", ";
                    }
                        MessageBox.Show("The random numbers generated are: " + input + " \nof which the Min is: " + min);
                }
                else
                    MessageBox.Show("Please check if the number you entered is between 5 and 20.");
            }
            catch (FormatException)
            {
                MessageBox.Show("Format error! \nPlease make sure you have entered an Integer Value", "ERROR", MessageBoxButtons.OK, MessageBoxIcon.Error);
            }
            catch (Exception dexx)
            {
                MessageBox.Show("Oops! Something went wrong! \nTry again or return to the previous window and retry.\n Error :" + dexx, "Loading Error", MessageBoxButtons.OK, MessageBoxIcon.Error);
            }
        }
    }
}
