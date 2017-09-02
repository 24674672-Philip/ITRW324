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
import java.util.Map;


public class login extends AppCompatActivity implements View.OnClickListener{

    Button btnSend;
    EditText etUsername, etPass;
    TextView tvReturn;
    Context contxt;
    private RequestQueue reqQ;
    private StringRequest stringReq;
    private String url = "http://52.15.226.85:8080";
    private static final String TAG = login.class.getName();

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
                sendPost();
            }
            catch (Exception e){

            }
        }
    }

    private void sendGet(){
        reqQ = Volley.newRequestQueue(this);
        stringReq = new StringRequest(Request.Method.GET, url, new Response.Listener<String>() {
            @Override
            public void onResponse(String response) {
                Log.i(TAG,"Response: " + response.toString());
                tvReturn.setText(response.toString());
            }
        }, new Response.ErrorListener() {
            @Override
            public void onErrorResponse(VolleyError error) {
                Log.i(TAG,"Error: " + error.toString());
            }
        });

        reqQ.add(stringReq);

    }

    private void sendPost(){
        reqQ = Volley.newRequestQueue(this);
        stringReq = new StringRequest(Request.Method.POST, url + "/api/login", new Response.Listener<String>() {
            @Override
            public void onResponse(String response) {
                Log.i(TAG,"Response: " + response.toString());
                tvReturn.setText(results(response.toString()));
            }
        }, new Response.ErrorListener() {
            @Override
            public void onErrorResponse(VolleyError error) {
                Log.i(TAG,"Error: " + error.toString());
            }
        }){
            @Override
            public Map<String,String> getHeaders(){
                Map<String,String> params = new HashMap<String, String>();
                params.put("username",etUsername.getText().toString());
                params.put("password",etPass.getText().toString());
                return params;
        }};
        reqQ.add(stringReq);
    }

    private String results(String in){
        String temp = "";

        String[] result = in.split(",");

        temp = result[0];

        return temp;
    }

}
