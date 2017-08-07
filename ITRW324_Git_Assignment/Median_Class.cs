using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ITRW324_Git_Assignment
{
    class Median_Class
    {
        public double ClacMedian(int[] toBeCalc)
        {
            double ans = 0;
            int x = toBeCalc.Length;
            if (x % 2 == 0)
            {
                int lowerBound = 0;
                int upperBound = 0;
                int medianLength = toBeCalc.Length / 2;
                Array.Sort(toBeCalc);
                lowerBound = toBeCalc[medianLength - 1];
                upperBound = toBeCalc[medianLength];
                ans = (lowerBound + upperBound) / 2;
                return ans;

            }
            else
            {
                int medianLength = toBeCalc.Length / 2;
                Array.Sort(toBeCalc);
                ans = toBeCalc[medianLength];
                return ans;
            }


        }
    }
}
