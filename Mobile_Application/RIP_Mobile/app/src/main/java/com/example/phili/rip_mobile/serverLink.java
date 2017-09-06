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

import static com.android.volley.VolleyLog.TAG;

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

    public void sendServerRequest(final String[] headerKey, final String[] headerVal, final String apiType, final boolean sendType, final OnDownloadTaskCompleted taskCompleted){
        reqQ = Volley.newRequestQueue(contxt);

        jsonReq = new JsonObjectRequest(sendType?(Request.Method.POST):(Request.Method.GET),url + apiType,null ,
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

                for (int i = 0; i < headerKey.length; i++){
                    params.put(headerKey[i],headerVal[i]);
                    Log.i(TAG, "getHeaders: " + headerKey[i]+headerVal[i]);
                }

                return params;
            }
        };
        reqQ.add(jsonReq);
    }

    public interface OnDownloadTaskCompleted {
        public void onTaskCompleted(JSONObject result, boolean error, String message);
    }

}
