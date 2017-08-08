using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows.Forms;

namespace ITRW324_Git_Assignment
{
    class stat
    {

        public void max(int n)
        {
            int max;
            string sNumbers = "";
            RandomNumbersN rN = new RandomNumbersN();

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
        }// end max

        public double average(int n)
        {
            double sum = 0;
            double avg = 0;
            RandomNumbersN rN = new RandomNumbersN();
            rN = new RandomNumbersN(n);
            int[] randoms = rN.randomNumbers();
            for (int i = 0; i < n; i++)
            {
                sum += randoms[i];
            }

            avg = sum / n;
            return avg;
        }
    }
}
