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
            try
            {
                int temp = Convert.ToInt32(textBox1.Text);
                stat newstat = new ITRW324_Git_Assignment.stat();
                newstat.modus(temp);
            }
            catch (Exception dex)
            {
                MessageBox.Show("Please enter a valid integer.", "Error", MessageBoxButtons.OK, MessageBoxIcon.Error);
            }
        }
    }
}
