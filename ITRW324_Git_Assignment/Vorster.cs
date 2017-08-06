﻿using System;
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
    public partial class Vorster : Form
    {
        public Vorster()
        {
            InitializeComponent();
        }

        private void btnAnalyse_Click(object sender, EventArgs e)
        {
            if(tbxN.Text.Length > 0)
            {
                int n = Convert.ToInt32(tbxN.Text);
                Random random = new Random();
                int[] randomNumbers = new int[n];
                for(int i =0; i<n; i++)
                {
                    randomNumbers[i] = random.Next(0,200);
                }
                Standard_Dev_Class standardDev = new Standard_Dev_Class(randomNumbers);
            }
        }
    }
}
