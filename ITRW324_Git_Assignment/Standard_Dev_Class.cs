using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ITRW324_Git_Assignment
{
    class Standard_Dev_Class
    {
        

        public Standard_Dev_Class(int[] data)
        {
            calculateStandardDeviation(data);
        }

        private double calculateStandardDeviation(int[] pData)
        {
            int total = 0;
            int ave;
            for(int i =0; i<pData.Length; i++)
            {
                total += pData[i];
            }
            ave = total / pData.Length;

            for(int i=0;i<pData.Length; i++)
            {

            }










            return 0.00;
        }
    }
}
