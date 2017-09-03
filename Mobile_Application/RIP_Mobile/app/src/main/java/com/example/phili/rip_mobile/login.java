package com.example.phili.rip_mobile;

import android.content.Context;
import android.os.Bundle;
import android.support.design.widget.FloatingActionButton;
import android.support.design.widget.Snackbar;
import android.support.v7.app.AppCompatActivity;
import android.support.v7.widget.Toolbar;
import android.util.Log;
import android.view.View;
import android.view.Menu;
import android.view.MenuItem;
import android.widget.Button;
import android.widget.EditText;
import android.widget.TextView;

import com.android.volley.AuthFailureError;
import com.android.volley.Request;
import com.android.volley.RequestQueue;
import com.android.volley.Response;
import com.android.volley.VolleyError;
import com.android.volley.toolbox.StringRequest;
import com.android.volley.toolbox.Volley;

import java.util.HashMap;
import java.util.List;
import java.util.Map;


public class login extends AppCompatActivity implements View.OnClickListener{

    Button btnSend;
    EditText etUsername, etPass;
    TextView tvReturn;
    Context contxt;
    private static boolean temp;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_login);

        contxt = this;
        btnSend = (Button) findViewById(R.id.btnSend);
        etUsername  = (EditText) findViewById(R.id.etUsername);
        etPass  = (EditText) findViewById(R.id.etPass);
        tvReturn = (TextView) findViewById(R.id.tvReturnMessage);

        tvReturn.setText("Return textview");

        btnSend.setOnClickListener(this);

    }

    @Override
    public void onClick(View v){
        if(v.getId() == R.id.btnSend) {
            try {
                if(downloadData()){
                    tvReturn.setText("Login Success!");
                }
                else{
                    tvReturn.setText("Login failed!");
                }
            }
            catch (Exception e){

            }
        }
    }

    private boolean downloadData(){
        temp = false;
        final serverLink downloader = new serverLink(this);
        downloader.sendLogin(etUsername.getText().toString(),etPass.getText().toString() ,new serverLink.OnDownloadTaskCompleted() {
            @Override
            public void onTaskCompleted(String result, boolean error, String message) {
                tvReturn.setText(result);
            }
        });

        return temp;
    }

}
