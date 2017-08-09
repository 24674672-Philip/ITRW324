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

        public void GCD(int n)
        {
            int[] num = initRandom(n);
            int gcd = calcGCD(num);
            MessageBox.Show("GCD = " + Convert.ToString(gcd), "GCD", MessageBoxButtons.OK, MessageBoxIcon.Information);
        }

        private int calcGCD(int[] numbers)
        {
            return numbers.Aggregate(calcGCD);
        }

        private int calcGCD(int a, int b)
        {
            return b == 0 ? a : calcGCD(b, a % b);
        }

        private int[] initRandom(int n)
        {
            Random rand = new Random();
            int[] number = new int[n];

            for (int i = 0; i < n; i++)
            {
                number[i] = rand.Next(1, 100);
            }

            return number;
        }

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


        public void min(int n)
        {
            try
            {
                CheckN cN = new CheckN(n);
                int flag = cN.validateN();
                if (flag == 1)
                {
                    int min;
                    string num = "";
                    RandomNumbersN rN = new RandomNumbersN();

                    rN = new RandomNumbersN(n);
                    int[] numbers = rN.randomNumbers();
                    min = numbers[0];
                    for (int i = 0; i < numbers.Length; i++)
                    {
                        if (numbers[i] < min)
                            min = numbers[i];
                    }
                    for (int i = 0; i < numbers.Length; i++)
                    {
                        num = num + numbers[i] + ", ";
                    }
                    MessageBox.Show("The random numbers generated are: " + num + " \nof which the Min is: " + min);
                }
                else
                    MessageBox.Show("Please check if the number you entered is between 5 and 20.");
            }
            catch (FormatException)
            {
                MessageBox.Show("Please check that you have inserted an interger.");
            }
        }

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
                string numbers = "";
                for (int q = 0; q < n; q++)
                {
                    numbers = numbers + ", " + Convert.ToString(values[q]);
                }
                MessageBox.Show("The randomly generated numbers are " + numbers + " and the mode is: " + final + " that occurred " + max + " times");
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


        public void median(int n)//Calulate Median
        {
            CheckN cN = new CheckN(n);
            int flag = cN.validateN();
            if (flag == 1)
            {
                string printNum = "";
                Random rand = new Random();
                int[] numAR = new int[n];

                if (n > 0)
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
        }//median End
    }
    }

