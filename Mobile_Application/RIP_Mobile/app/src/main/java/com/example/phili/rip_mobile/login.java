package com.example.phili.rip_mobile;

import android.content.Context;
import android.content.Intent;
import android.media.AudioManager;
import android.media.MediaPlayer;
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

import org.json.JSONException;
import org.json.JSONObject;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import static com.android.volley.VolleyLog.TAG;


public class login extends AppCompatActivity implements View.OnClickListener{

    public String TOKEN = "";
    Button btnSend;
    EditText etUsername, etPass;
    TextView tvReturn,tvNew;
    Context contxt;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_login);

        contxt = this;
        btnSend = (Button) findViewById(R.id.btnSend);
        etUsername  = (EditText) findViewById(R.id.etUsername);
        etPass  = (EditText) findViewById(R.id.etPass);
        tvReturn = (TextView) findViewById(R.id.tvReturnMessage);
        tvReturn.setText("");
        tvNew = (TextView)  findViewById(R.id.txNew);
        btnSend.setOnClickListener(this);
        tvNew.setOnClickListener(new View.OnClickListener(){
            public void onClick(View v){
                Intent intent = new Intent(new Intent(login.this,registration.class));
                startActivity(intent);
            }
        });

    }

    @Override
    public void onClick(View v){
        if(v.getId() == R.id.btnSend) {
            try {
                tvReturn.setText("Loading...");
                sendLoginRequest();
            }
            catch (Exception e){

            }
        }
    }


    private void sendLoginRequest(){

        String[] headersType = new String[2];
        String[] headersVal = new String[2];
        headersType[0] = "username";
        headersType[1] = "password";
        headersVal[0] = etUsername.getText().toString();
        headersVal[1] = etPass.getText().toString();

        final serverLink sender = new serverLink(this);
        sender.sendServerRequest(headersType, headersVal, "/api/login", true,new serverLink.OnDownloadTaskCompleted() {
            @Override
            public void onTaskCompleted(JSONObject result, boolean error, String message) {
                try {
                    tvReturn.setText(result.getString("login"));
                    if(result.getString("login").contains("success")){
                        Intent intent = new Intent(new Intent(login.this,musicexplorer.class));
                        startActivity(intent);
                    }
                }
                catch (JSONException e){
                    tvReturn.setText(e.getMessage());
                }
            }
        });
    }

}
