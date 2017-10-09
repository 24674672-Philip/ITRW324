package com.example.phili.rip_mobile;

import android.content.Context;
import android.media.Image;
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
import android.widget.ImageView;
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


public class registration extends AppCompatActivity implements View.OnClickListener{

    Context contxt;
    ImageView btnRegister;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_registration);

        contxt = this;
        btnRegister = (ImageView) findViewById(R.id.btnRegister);
        btnRegister.setOnClickListener(this);
    }

    @Override
    public void onClick(View v){
        if(v.getId() == R.id.btnRegister) {
            try {
                sendRegisterRequest();
            }
            catch (Exception e){

            }
        }
    }

    private void sendRegisterRequest(){
        final serverLink sender = new serverLink(this);
        /*sender.sendServerRequest(,,"",true,new serverLink.OnDownloadTaskCompleted() {
            @Override
            public void onTaskCompleted(JSONObject result, boolean error, String message) {
                try {
                    if (result.getString("register").equals("success")){

                    }
                }
                /*catch (JSONException e){
                    //tvReturn.setText("Welp");
                }
                catch(Exception e){

                }
            }
        });*/
    }

}
