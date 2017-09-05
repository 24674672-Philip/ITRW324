package com.example.phili.rip_mobile;

import android.content.Context;
import android.content.Intent;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.view.View;
import android.widget.Button;

public class MainActivity extends AppCompatActivity  {

    Button btnLogin,btnRegister;
    Context contxt;
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);
        contxt = this;
        btnLogin = (Button) findViewById(R.id.btnLogin);
        btnRegister = (Button) findViewById(R.id.btnRegister);
        btnLogin.setOnClickListener(new View.OnClickListener(){
            public void onClick(View v){
                Intent intent = new Intent(new Intent(MainActivity.this,login.class));
                startActivity(intent);
            }
        });

        btnRegister.setOnClickListener(new View.OnClickListener(){
            public void onClick(View v){
                Intent intent = new Intent(new Intent(MainActivity.this,registration.class));
                startActivity(intent);
            }
        });
    }
}
