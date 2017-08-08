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

        //<<<<<<< HEAD
        public void modus(int n)
        {
            CheckN cN = new CheckN(n);
            int flag = cN.validateN();
            if (flag == 1)
            {
                Random rnd = new Random();
                int[] values = new int[n];
                for (int i = 0; i < n; i++)
                {
                    int rng = rnd.Next(1, 10);
                    values[i] = rng;
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
            {
                MessageBox.Show("Please check if the number you entered is between 5 and 20.");
            }
        }
                
//=======
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
//>>>>>>> 1.0.0
        }
    }
}
