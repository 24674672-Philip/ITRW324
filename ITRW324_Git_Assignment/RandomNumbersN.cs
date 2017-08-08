using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ITRW324_Git_Assignment
{
    class RandomNumbersN
    {
        public int aN;
        public int[] numbers;
        Random r = new Random();
        public RandomNumbersN()
        {
            aN = 0;
        }

        public RandomNumbersN(int pN)
        {
            aN = pN;
        }

        public int[] randomNumbers()
        {
            numbers = new int[aN];
            for (int i = 0; i < aN; i++)
            {
                numbers[i] = r.Next(0, 100); 
            }
            return numbers;
        }
    }
}
