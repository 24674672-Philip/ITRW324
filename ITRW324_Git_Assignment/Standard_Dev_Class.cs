using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;


namespace ITRW324_Git_Assignment
{
    class Standard_Dev_Class
    {
        public double CalculateStandardDeviation(int[] pData)
        {
                double total = 0;
                double ave;
                for (int i = 0; i < pData.Length; i++)
                {
                    total += pData[i];
                }
                ave = total / pData.Length;


                double devSum = 0;
                for (int i = 0; i < pData.Length; i++)
                {
                    devSum += Math.Pow(pData[i] - ave, 2);
                }
                double degOfFreedom = 1.0 / Convert.ToDouble(pData.Length);

                double variance = degOfFreedom * devSum;

                double standardDev = Math.Sqrt(variance);

                return standardDev;
            }
            
        }
}
