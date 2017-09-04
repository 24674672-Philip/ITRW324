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

import org.json.JSONException;
import org.json.JSONObject;

import java.util.HashMap;
import java.util.List;
import java.util.Map;


public class login extends AppCompatActivity implements View.OnClickListener{

    Button btnSend;
    EditText etUsername, etPass;
    TextView tvReturn;
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
        btnSend.setOnClickListener(this);

    }

    @Override
    public void onClick(View v){
        if(v.getId() == R.id.btnSend) {
            try {
                tvReturn.setText("Loading..");
                sendLoginRequest();
            }
            catch (Exception e){

            }
        }
    }

    private void sendLoginRequest(){
        final serverLink sender = new serverLink(this);
        sender.sendLogin(etUsername.getText().toString(),etPass.getText().toString() ,new serverLink.OnDownloadTaskCompleted() {
            @Override
            public void onTaskCompleted(JSONObject result, boolean error, String message) {
                try {
                    tvReturn.setText(result.getString("login"));
                }
                catch (JSONException e){
                    tvReturn.setText("Welp");
                }
            }
        });
    }

}
