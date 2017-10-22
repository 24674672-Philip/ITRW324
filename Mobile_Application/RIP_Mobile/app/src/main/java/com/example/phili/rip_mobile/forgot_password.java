package com.example.phili.rip_mobile;

import android.content.Context;
import android.content.Intent;
import android.net.ConnectivityManager;
import android.net.NetworkInfo;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.util.Log;
import android.view.View;
import android.widget.Button;
import android.widget.EditText;
import android.widget.ImageView;
import android.widget.Toast;

import org.json.JSONException;
import org.json.JSONObject;

public class forgot_password extends AppCompatActivity {

    private Button btnSendE;
    private EditText edtEmail;
    private EditText edtToken;
    private EditText edtnPassword;
    private EditText edtnRPassword;
    private ImageView imgFinish;


    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_forgot_password);

        edtEmail = (EditText) findViewById(R.id.email);
        btnSendE = (Button)findViewById(R.id.btnsendemail);
        edtToken = (EditText) findViewById(R.id.etVCode);
        edtnPassword = (EditText) findViewById(R.id.npassword);
        edtnRPassword = (EditText) findViewById(R.id.retypenpass);
        imgFinish = (ImageView)findViewById(R.id.imgFinish);

        if (isOnline()==true) {
            btnSendE.setOnClickListener(new View.OnClickListener() {
                public void onClick(View v) {
               if (edtEmail.getText().toString().matches(""))
                   Toast.makeText(forgot_password.this, "Please enter an email", Toast.LENGTH_SHORT).show();
                    else
                    sendEmail();
                    //Toast.makeText(forgot_password.this, "Email has been sent", Toast.LENGTH_SHORT).show();
                }
            });
        }else
        {
            Toast.makeText(forgot_password.this, "You are not connected to Internet", Toast.LENGTH_LONG).show();
        }


        if (isOnline()==true) {
            imgFinish.setOnClickListener(new View.OnClickListener() {
                public void onClick(View v) {
                    if (edtEmail.getText().toString().matches(""))
                        Toast.makeText(forgot_password.this, "Please enter an email", Toast.LENGTH_SHORT).show();
                    else
                        if (edtnPassword.getText().toString().matches(""))
                            Toast.makeText(forgot_password.this, "Please enter a password", Toast.LENGTH_SHORT).show();
                        else
                        if (edtnRPassword.getText().toString().matches(""))
                            Toast.makeText(forgot_password.this, "Please retype password", Toast.LENGTH_SHORT).show();
                       else
                       if (edtToken.getText().toString().matches(""))
                           Toast.makeText(forgot_password.this, "Please type in verification code", Toast.LENGTH_SHORT).show();
                        else
                            if (!edtnPassword.getText().toString().matches(edtnRPassword.getText().toString()))
                            Toast.makeText(forgot_password.this, "Passwords don't match", Toast.LENGTH_SHORT).show();
                        else {
                                ResetPassword();
                            }
                }
            });

        }else
        {
            Toast.makeText(forgot_password.this, "You are not connected to Internet", Toast.LENGTH_LONG).show();
        }
    }

    private void ResetPassword()
    {
        if (isOnline() == true) {
            String[] headersType = new String[3];
            String[] headersVal = new String[3];
            headersType[0] = "email";
            headersType[1] = "token";
            headersType[2] = "password";
            headersVal[0] = edtEmail.getText().toString();
            headersVal[1]= edtToken.getText().toString();
            HashClass hasher = new HashClass();
            headersType[2]= hasher.md5(edtnPassword.getText().toString());
            Toast.makeText(forgot_password.this,hasher.md5(edtnPassword.getText().toString()) , Toast.LENGTH_LONG).show();

            final serverLink sender = new serverLink(this);
            sender.sendServerRequest(headersType, headersVal, "/api/passwordreset", true, new serverLink.OnDownloadTaskCompleted() {
                @Override
                public void onTaskCompleted(JSONObject result, boolean error, String message) {
                    try {
                        if (result.getString("result").contains("success")) {
                            Toast.makeText(forgot_password.this,"Password changed", Toast.LENGTH_LONG).show();
                        }
                    } catch (JSONException e) {
                        Toast.makeText(forgot_password.this,e.getMessage().toString() , Toast.LENGTH_LONG).show();
                        // tvReturn.setText(e.getMessage().toString());
                    } catch (Exception e) {
                        Toast.makeText(forgot_password.this,e.getMessage().toString() , Toast.LENGTH_LONG).show();
                        // tvReturn.setText(e.getMessage().toString());
                    }
                }
            });
        }
        else
        {
            Toast.makeText(forgot_password.this, "You are not connected to Internet", Toast.LENGTH_LONG).show();
        }
    }






    private void sendEmail() {

        if (isOnline() == true) {
            String[] headersType = new String[1];
            String[] headersVal = new String[1];
            headersType[0] = "email";
            headersVal[0] = edtEmail.getText().toString();

            final serverLink sender = new serverLink(this);
            sender.sendServerRequest(headersType, headersVal, "/api/sendpasswordreset", true, new serverLink.OnDownloadTaskCompleted() {
                @Override
                public void onTaskCompleted(JSONObject result, boolean error, String message) {
                    try {
                        if (result.getString("result").contains("success")) {
                            Toast.makeText(forgot_password.this,"Check email for ", Toast.LENGTH_LONG).show();
                        }
                    } catch (JSONException e) {
                        Toast.makeText(forgot_password.this,e.getMessage().toString() , Toast.LENGTH_LONG).show();
                        // tvReturn.setText(e.getMessage().toString());
                    } catch (Exception e) {
                        Toast.makeText(forgot_password.this,e.getMessage().toString() , Toast.LENGTH_LONG).show();
                        // tvReturn.setText(e.getMessage().toString());
                    }
                }
            });
        }
        else
        {
            Toast.makeText(forgot_password.this, "You are not connected to Internet", Toast.LENGTH_LONG).show();
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

}
