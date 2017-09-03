package com.example.phili.rip_mobile;

import android.content.Context;
import android.util.Log;

import com.android.volley.Request;
import com.android.volley.RequestQueue;
import com.android.volley.Response;
import com.android.volley.VolleyError;
import com.android.volley.toolbox.StringRequest;
import com.android.volley.toolbox.Volley;
import org.json.JSONObject;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * Created by phili on 02-Sep-17.
 */

public class serverLink{

    private RequestQueue reqQ;
    private StringRequest stringReq;
    private String url = "http://52.15.226.85:8080";
    private static final String TAG = login.class.getName();
    private Context contxt;
    private String temp;


    public serverLink(Context inContext){
        contxt=inContext;
    }

    private void sendGet(){
        temp = "";
        reqQ = Volley.newRequestQueue(contxt);
        stringReq = new StringRequest(Request.Method.GET, url, new Response.Listener<String>() {
            @Override
            public void onResponse(String response) {
                Log.i(TAG,"Response: " + response.toString());
                temp = response.toString();
            }
        }, new Response.ErrorListener() {
            @Override
            public void onErrorResponse(VolleyError error) {
                Log.i(TAG,"Error: " + error.toString());
            }
        });

        reqQ.add(stringReq);

    }

    public String sendLogin(final String username, final String password, final OnDownloadTaskCompleted taskCompleted){
        boolean bTemp = false;
        temp = "";
        reqQ = Volley.newRequestQueue(contxt);
        stringReq = new StringRequest(Request.Method.POST, url + "/api/login", new Response.Listener<String>() {
            @Override
            public void onResponse(String response) {
                taskCompleted.onTaskCompleted(response,false,null);
            }
        }, new Response.ErrorListener() {
            @Override
            public void onErrorResponse(VolleyError error) {
                taskCompleted.onTaskCompleted(error.toString(),false,null);
            }
        }){//Headers
            @Override
            public Map<String,String> getHeaders(){
                Map<String,String> params = new HashMap<String, String>();
                params.put("username",username);
                params.put("password",password);
                return params;
            }};
        reqQ.add(stringReq);
        return temp;
    }

    public interface OnDownloadTaskCompleted {
        public void onTaskCompleted(String result, boolean error, String message);
    }

}
