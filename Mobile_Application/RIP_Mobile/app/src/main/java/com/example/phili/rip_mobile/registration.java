package com.example.phili.rip_mobile;

import android.content.Context;
import android.content.Intent;
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


public class registration extends AppCompatActivity implements View.OnClickListener{

    Context contxt;
    ImageView btnRegister;
    EditText etFname, etLname, etPass, etPass2, etUsername, etEmail, etDOB,  etAdd1, etAdd2, etCountry, etCity, etPostal;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_registration);

        etFname = (EditText) findViewById(R.id.etName);
        etLname = (EditText) findViewById(R.id.etSurname);
        etPass = (EditText) findViewById(R.id.etPass);
        etPass2 = (EditText) findViewById(R.id.etRetypePass);
        etUsername = (EditText) findViewById(R.id.etUsername);
        etEmail = (EditText) findViewById(R.id.etEmail);
        etDOB = (EditText) findViewById(R.id.etDOB);
        etAdd1 = (EditText) findViewById(R.id.etAdl1);
        etAdd2 = (EditText) findViewById(R.id.etAdl2);
        etCountry = (EditText) findViewById(R.id.etCity);
        etCity = (EditText) findViewById(R.id.etCountry);
        etPostal = (EditText) findViewById(R.id.etPostalCodes);


        contxt = this;
        btnRegister = (ImageView) findViewById(R.id.btnRegister);
        btnRegister.setOnClickListener(this);
    }

    @Override
    public void onClick(View v){
        if(v.getId() == R.id.btnRegister) {
            try {
                if(textValidator()){
                    sendRegisterRequest();
                }
                else{
                    Toast toast = Toast.makeText(this, "Please enter the correct details", Toast.LENGTH_SHORT);
                }
            }
            catch (Exception e){
                Log.i("onclick",e.getMessage().toString());
            }
        }
    }

    private void sendRegisterRequest(){

        String[] headersType = new String[2];
        String[] headersVal = new String[2];
        headersType[0] = "username";
        headersType[1] = "password";
        headersType[2] = "fname";
        headersType[3] = "lname";
        headersType[4] = "email";
        headersType[5] = "birthdate";
        headersVal[0] = etUsername.getText().toString();
        headersVal[1] = etPass.getText().toString();
        headersVal[2] = etFname.getText().toString();
        headersVal[3] = etLname.getText().toString();
        headersVal[4] = etEmail.getText().toString();
        headersVal[5] = etDOB.getText().toString();



        final serverLink sender = new serverLink(this);
        sender.sendServerRequest(headersType, headersVal, "/api/registeruser", true,new serverLink.OnDownloadTaskCompleted() {
            @Override
            public void onTaskCompleted(JSONObject result, boolean error, String message) {
                try {
                    if(result.getString("register").contains("success")){
                        //registeruser success
                        sendRegisterAdressRequest(result.get("userid").toString());
                    }
                    else{
                        //register failed
                        Toast toast = Toast.makeText(contxt, "Something went wrong", Toast.LENGTH_SHORT);
                    }
                }
                catch (JSONException e){
                    Log.i("reg",e.getMessage().toString());
                }
                catch (Exception e){
                    Log.i("reg",e.getMessage().toString());
                }
            }
        });
    }

    private void sendRegisterAdressRequest(String userid){

        String[] headersType = new String[2];
        String[] headersVal = new String[2];
        headersType[0] = "addline1";
        headersType[1] = "addline2";
        headersType[2] = "country";
        headersType[3] = "city";
        headersType[4] = "postalcode";
        headersType[5] = "userid";
        headersVal[0] = etAdd1.getText().toString();
        headersVal[1] = etAdd2.getText().toString();
        headersVal[2] = etCountry.getText().toString();
        headersVal[3] = etCity.getText().toString();
        headersVal[4] = etPostal.getText().toString();
        headersVal[5] = userid;

        final serverLink sender = new serverLink(this);
        sender.sendServerRequest(headersType, headersVal, "/api/registeraddress", true,new serverLink.OnDownloadTaskCompleted() {
            @Override
            public void onTaskCompleted(JSONObject result, boolean error, String message) {
                try {
                    if(!result.getString("result").isEmpty()){
                        registration.super.onBackPressed();//Success
                    }
                }
                catch (JSONException e){
                    Log.i("regAdress",e.getMessage().toString());
                }
                catch (Exception e){
                    Log.i("regAdress",e.getMessage().toString());
                }
            }
        });
    }

    public boolean textValidator(){
        boolean isValidated = false;

        if(etPass.getText().toString().equals(etPass2.getText().toString()))
            isValidated = true;

        else if (etFname.getText().toString().matches("")){
            isValidated = false;
            Toast.makeText(this, "Missing: Name", Toast.LENGTH_SHORT).show();
        }
        else if (etLname.getText().toString().matches("")){
            isValidated = false;
            Toast.makeText(this, "Missing: Surname", Toast.LENGTH_SHORT).show();
        }
        else if (etEmail.getText().toString().matches("")){
            isValidated = false;
            Toast.makeText(this, "Missing: Email Address", Toast.LENGTH_SHORT).show();
        }
        else if (etDOB.getText().toString().matches("")){
            isValidated = false;
            Toast.makeText(this, "Missing: Date of Birth", Toast.LENGTH_SHORT).show();
        }
        else if (etAdd1.getText().toString().matches("")){
            isValidated = false;
            Toast.makeText(this, "Missing: Address 1", Toast.LENGTH_SHORT).show();
        }
        else if (etAdd2.getText().toString().matches("")){
            isValidated = false;
            Toast.makeText(this, "Missing: Address 2", Toast.LENGTH_SHORT).show();
        }
        else if (etCountry.getText().toString().matches("")){
            isValidated = false;
            Toast.makeText(this, "Missing: Country", Toast.LENGTH_SHORT).show();
        }
        else if (etCity.getText().toString().matches("")){
            isValidated = false;
            Toast.makeText(this, "Missing: City", Toast.LENGTH_SHORT).show();
        }
        else if (etPostal.getText().toString().matches("")){
            isValidated = false;
            Toast.makeText(this, "Missing: Postal Code", Toast.LENGTH_SHORT).show();
        }
        else if (etPass.getText().toString().matches("")){
            isValidated = false;
            Toast.makeText(this, "Missing: Password 1", Toast.LENGTH_SHORT).show();
        }
        else if (etPass2.getText().toString().matches("")){
            isValidated = false;
            Toast.makeText(this, "Missing: Password 2", Toast.LENGTH_SHORT).show();
        }
        else if (etUsername.getText().toString().matches("")){
            isValidated = false;
            Toast.makeText(this, "Missing: Username", Toast.LENGTH_SHORT).show();
        }
        else if (etPass.length() != 8){
            isValidated = false;
            Toast.makeText(this, "The password can only be 8 length", Toast.LENGTH_SHORT).show();
        }

        else{
            isValidated = false;
        }
        return isValidated;
    }



}
