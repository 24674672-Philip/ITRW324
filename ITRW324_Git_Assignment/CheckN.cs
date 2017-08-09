using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ITRW324_Git_Assignment
{
    class CheckN
    {
        int aN;
        public CheckN()
        {
            aN = 0;
        }

        public CheckN(int pN)
        {
            aN = pN;
        }

        public int validateN()
        {
            if ((aN >= 5) && (aN <= 20))
                return 1;
            else
                return -1;
        }
    }
}
