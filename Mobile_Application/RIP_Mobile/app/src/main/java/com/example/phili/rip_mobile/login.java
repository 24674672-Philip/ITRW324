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
import android.widget.Toast;

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
import android.net.ConnectivityManager;
import android.net.NetworkInfo;


public class login extends AppCompatActivity implements View.OnClickListener{

    public static String TOKEN = "";
    public static String USERNAME = "";
    public static String COINS = "";
    public static String EMAIL = "";
    private Button btnSend;
    private EditText etUsername, etPass;
    private TextView tvReturn,tvNew,tvForgot;
    private Context contxt;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_login);
        checkConnection();
        contxt = this;
        btnSend = (Button) findViewById(R.id.btnSend);
        etUsername  = (EditText) findViewById(R.id.etUsername);
        etPass  = (EditText) findViewById(R.id.etPass);
        tvReturn = (TextView) findViewById(R.id.tvReturnMessage);
        tvReturn.setText("");
        tvNew = (TextView)  findViewById(R.id.txNew);
        tvForgot = (TextView) findViewById(R.id.tvForgot);
        btnSend.setOnClickListener(this);
        if (isOnline()==true) {
            tvNew.setOnClickListener(new View.OnClickListener() {
                public void onClick(View v) {
                    Intent intent = new Intent(new Intent(login.this, registration.class));
                    startActivity(intent);
                }
            });

            tvForgot.setOnClickListener(new View.OnClickListener() {
                public void onClick(View v) {
                    Intent intent = new Intent(new Intent(login.this, forgot_password.class));
                    startActivity(intent);
                }
            });
        }else
        {
            Toast.makeText(login.this, "You are not connected to Internet", Toast.LENGTH_LONG).show();
        }



    }

    @Override
    public void onClick(View v){
        if(v.getId() == R.id.btnSend) {

           if (isOnline()==true) {
               try {
                   if (etUsername.getText().equals("") || etPass.getText().equals(""))
                       Toast.makeText(this, "Your ID or Password is empty", Toast.LENGTH_SHORT).show();
                   else {
                       //tvReturn.setText("Loading...");
                       Toast.makeText(login.this,"Loading...", Toast.LENGTH_SHORT).show();
                       sendLoginRequest();
                   }
               } catch (Exception e) {

                   Toast.makeText(login.this,e.getMessage().toString() , Toast.LENGTH_LONG).show();
                   //tvReturn.setText(e.getMessage().toString());
               }
           }
           else
           {
               Toast.makeText(login.this, "You are not connected to Internet", Toast.LENGTH_LONG).show();
           }
        }
    }

    protected boolean isOnline() {

        ConnectivityManager cm = (ConnectivityManager) getSystemService(Context.CONNECTIVITY_SERVICE);

        NetworkInfo netInfo = cm.getActiveNetworkInfo();

        if (netInfo != null && netInfo.isConnectedOrConnecting()) {

            return true;

        } else {

            return false;

        }

    }

    public void checkConnection(){

        if(isOnline()){

            Toast.makeText(login.this, "You are connected to Internet", Toast.LENGTH_LONG).show();

        }else{

            Toast.makeText(login.this, "You are not connected to Internet", Toast.LENGTH_LONG).show();

        }

    }

    private void sendLoginRequest() {

        if (isOnline() == true) {
            HashClass temp = new HashClass();
            String[] headersType = new String[2];
            String[] headersVal = new String[2];
            headersType[0] = "username";
            headersType[1] = "password";
            headersVal[0] = etUsername.getText().toString();
            headersVal[1] = temp.md5(etPass.getText().toString());

            final serverLink sender = new serverLink(this);
            sender.sendServerRequest(headersType, headersVal, "/api/login", true, new serverLink.OnDownloadTaskCompleted() {
                @Override
                public void onTaskCompleted(JSONObject result, boolean error, String message) {
                    try {
                        //tvReturn.setText(result.getString("login"));
                        Toast.makeText(login.this,result.getString("login") , Toast.LENGTH_SHORT).show();
                        if (result.getString("login").contains("success")) {
                            TOKEN = result.getString("token");
                            USERNAME = result.getString("user");
                            COINS = result.getString("coins");
                            EMAIL = result.getString("email");
                            Intent intent = new Intent(new Intent(login.this, MainActivity.class));
                            intent.putExtra("token", result.getString("token"));
                            startActivity(intent);
                        }
                    } catch (JSONException e) {
                        Toast.makeText(login.this,e.getMessage().toString() , Toast.LENGTH_LONG).show();
                       // tvReturn.setText(e.getMessage().toString());
                    } catch (Exception e) {
                        Toast.makeText(login.this,e.getMessage().toString() , Toast.LENGTH_LONG).show();
                       // tvReturn.setText(e.getMessage().toString());
                    }
                }
            });
        }
        else
        {
            Toast.makeText(login.this, "You are not connected to Internet", Toast.LENGTH_LONG).show();
        }
    }


}
