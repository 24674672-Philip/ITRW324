using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;


namespace ITRW324_Git_Assignment
{
    class Average
    {
        private int n;
        private double[] randoms;
        private double avg;
        Random rand;
        public Average()
        {
            n = 0;
            randoms = new double[0];
        }

        public Average(int num)
        {
            n = num;
            randoms = new double[num];
            rand = new Random();
            setRandom();
            setAverage();
        }

        public void setRandom()
        {
            for (int i = 0; i < n; i++)
            {
                randoms[i] = rand.Next(1, 100);
            }
        }
        public void setAverage()
        {
            double sum = 0;
            for (int i = 0; i < n; i++)
            {
                sum += randoms[i];
            }

            avg = sum / n;

        }

        public double getAverage()
        {
            return avg;
        }


    }

}
