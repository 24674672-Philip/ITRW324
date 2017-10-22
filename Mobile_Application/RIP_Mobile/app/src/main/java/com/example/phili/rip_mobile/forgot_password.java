package com.example.phili.rip_mobile;

import android.content.Context;
import android.content.Intent;
import android.net.ConnectivityManager;
import android.net.NetworkInfo;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.widget.Toast;

import org.json.JSONException;
import org.json.JSONObject;

public class forgot_password extends AppCompatActivity {

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_forgot_password);
        //sendEmail();

    }

    private void sendEmail() {

        if (isOnline() == true) {
            String[] headersType = new String[1];
            String[] headersVal = new String[1];
            headersType[0] = "email";
            headersVal[0] = login.EMAIL;

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
