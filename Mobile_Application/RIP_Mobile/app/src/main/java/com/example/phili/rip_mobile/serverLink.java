package com.example.phili.rip_mobile;

import android.content.Context;
import android.support.v7.widget.LinearLayoutCompat;
import android.util.Log;

import com.android.volley.Request;
import com.android.volley.RequestQueue;
import com.android.volley.Response;
import com.android.volley.VolleyError;
import com.android.volley.toolbox.JsonObjectRequest;
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
    private JsonObjectRequest jsonReq;
    private String url = "http://52.211.85.57:8080";
    private Context contxt;

    public serverLink(Context inContext){
        contxt=inContext;
    }

    public void sendLogin(final String username, final String password, final OnDownloadTaskCompleted taskCompleted){
        reqQ = Volley.newRequestQueue(contxt);

        jsonReq = new JsonObjectRequest(Request.Method.POST,url + "/api/login",null ,
                new Response.Listener<JSONObject>() {
            @Override
            public void onResponse(JSONObject response) {
                taskCompleted.onTaskCompleted(response,false,null);
            }
        }, new Response.ErrorListener() {
            @Override
            public void onErrorResponse(VolleyError error) {
                taskCompleted.onTaskCompleted(null,false,error.getMessage());
            }
        }){
            @Override
            public Map<String,String> getHeaders(){
                Map<String,String> params = new HashMap<String, String>();
                params.put("username",username);
                params.put("password",password);
                return params;
            }
        };
        reqQ.add(jsonReq);
    }

    public void sendRegister(final String[] headers, final OnDownloadTaskCompleted taskCompleted){
        reqQ = Volley.newRequestQueue(contxt);

        jsonReq = new JsonObjectRequest(Request.Method.POST,url + "/api/register",null ,
                new Response.Listener<JSONObject>() {
                    @Override
                    public void onResponse(JSONObject response) {
                        taskCompleted.onTaskCompleted(response,false,null);
                    }
                }, new Response.ErrorListener() {
            @Override
            public void onErrorResponse(VolleyError error) {
                taskCompleted.onTaskCompleted(null,false,error.getMessage());
            }
        }){
            @Override
            public Map<String,String> getHeaders(){
                Map<String,String> params = new HashMap<String, String>();
                params.put("fname",headers[0]);
                params.put("lname",headers[1]);
                params.put("email",headers[2]);
                params.put("dob",headers[3]);
                params.put("password",headers[4]);
                params.put("username",headers[5]);
                params.put("country",headers[6]);
                params.put("addline1",headers[7]);
                params.put("addline2",headers[8]);
                params.put("postalcode",headers[9]);
                params.put("city",headers[10]);
                return params;
            }
        };
        reqQ.add(jsonReq);
    }

    public void sendTest(final OnDownloadTaskCompleted taskCompleted){
        reqQ = Volley.newRequestQueue(contxt);

        jsonReq = new JsonObjectRequest(Request.Method.POST,url + "/test",null ,
                new Response.Listener<JSONObject>() {
                    @Override
                    public void onResponse(JSONObject response) {
                        taskCompleted.onTaskCompleted(response,false,null);
                    }
                }, new Response.ErrorListener() {
            @Override
            public void onErrorResponse(VolleyError error) {
                taskCompleted.onTaskCompleted(null,false,error.getMessage());
            }
        });
        reqQ.add(jsonReq);
    }

    public interface OnDownloadTaskCompleted {
        public void onTaskCompleted(JSONObject result, boolean error, String message);
    }

}
