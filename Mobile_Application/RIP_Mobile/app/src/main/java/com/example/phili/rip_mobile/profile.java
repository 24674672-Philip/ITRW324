package com.example.phili.rip_mobile;

import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.widget.TextView;

import org.w3c.dom.Text;

public class profile extends AppCompatActivity {

    private TextView etCountry, etCity, etPostal, etAdd1, etAdd2, etBio;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_profile);

        etCountry = (TextView) findViewById(R.id.etCountry);
        etCity = (TextView) findViewById(R.id.etCity);
        etPostal = (TextView) findViewById(R.id.etPostalCodes);
        etAdd1 = (TextView) findViewById(R.id.etAdl2);
        etAdd2 = (TextView) findViewById(R.id.etAdl2);

    }
}
