using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data;
using System.Drawing;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows.Forms;

namespace ITRW324_Git_Assignment
{
    public partial class Zander : Form
    {
        public Zander()
        {
            InitializeComponent();
        }

         private void button1_Click(object sender, EventArgs e)
         {
            int temp = Convert.ToInt32(numericUpDown2.Value);
            stat newstat = new ITRW324_Git_Assignment.stat();
            newstat.modus(temp); 
        }
    }
}
