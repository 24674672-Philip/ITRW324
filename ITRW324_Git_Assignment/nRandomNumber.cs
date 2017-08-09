using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ITRW324_Git_Assignment
{
    class nRandomNumber
    {
        public int nNumbers;
        public int[] array;
        Random rand = new Random();

        public nRandomNumber()
        {
            nNumbers = 0;
        }

        public nRandomNumber(int n)
        {
            nNumbers = n;
        }

        public int[] randomNumberGenerate()
        {
            array = new int[nNumbers];
            for (int i = 0; i < nNumbers; i++)
            {
                array[i] = rand.Next(0, 100);
            }
            return array;
        }
    }
}
