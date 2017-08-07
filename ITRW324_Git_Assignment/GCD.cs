using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows.Forms;

namespace ITRW324_Git_Assignment
{
    class GCD
    {
        private int n { get; set; }
        private int[] number { get; set; }

        private int gcd { get; set; }

        public GCD ()
        {
            MessageBox.Show("Please enter a valid number", "Error!", MessageBoxButtons.OK, MessageBoxIcon.Error);
        }

        public GCD (int inc)
        {
            n = inc;
            initRandom();
            gcd = calcGCD(number);
            MessageBox.Show("GCD = " + Convert.ToString(gcd), "GCD", MessageBoxButtons.OK, MessageBoxIcon.Information);
        } 

        private void initRandom()
        {
            Random rand = new Random();
            number = new int[n];

            for (int i = 0; i < n; i++)
            {
                number[i] = rand.Next();
            }

        }

        static int calcGCD(int[] numbers)
        {
            return numbers.Aggregate(calcGCD);
        }

        static int calcGCD(int a, int b)
        {
            return b == 0 ? a : calcGCD(b, a % b);
        }

    }
}
