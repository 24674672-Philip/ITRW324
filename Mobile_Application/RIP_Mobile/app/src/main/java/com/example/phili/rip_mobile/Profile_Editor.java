package com.example.phili.rip_mobile;


import android.content.Context;
import android.net.ConnectivityManager;
import android.net.NetworkInfo;
import android.os.Bundle;
import android.support.v4.app.Fragment;
import android.util.Log;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.EditText;
import android.widget.ImageView;
import android.widget.TextView;
import android.widget.Toast;

import org.json.JSONException;
import org.json.JSONObject;


/**
 * A simple {@link Fragment} subclass.
 */
public class Profile_Editor extends Fragment {


    EditText etBio;
    TextView coins;
    ImageView ivSave;

    public Profile_Editor() {
        // Required empty public constructor

    }


    @Override
    public View onCreateView(LayoutInflater inflater, ViewGroup container,
                             Bundle savedInstanceState) {
        // Inflate the layout for this fragment
        View v =  inflater.inflate(R.layout.fragment_profile__editor, container, false);

        etBio = v.findViewById(R.id.etBio);
        coins = v.findViewById(R.id.tvCoins);
        ivSave = v.findViewById(R.id.savprofile);
        coins.setText(login.COINS);
        getBio();

        if (isOnline()==true) {
            ivSave.setOnClickListener(new View.OnClickListener() {
                public void onClick(View v) {
                    if (etBio.getText().toString().matches(""))
                        Toast.makeText(getActivity(), "Please enter a bio", Toast.LENGTH_SHORT).show();
                    else
                        setBio();

                }
            });
        }else
        {
            Toast.makeText(getActivity(), "You are not connected to Internet", Toast.LENGTH_LONG).show();
        }
        return v;
    }

    private void getBio() {
        if (isOnline() == true) {
            String[] headersType = new String[1];
            String[] headersVal = new String[1];
            headersVal[0] = login.USERNAME;
            headersType[0] = "username";
            final serverLink sender = new serverLink(getActivity());
            sender.sendServerRequest(headersType, headersVal, "/api/userbio", true, new serverLink.OnDownloadTaskCompleted() {
                @Override
                public void onTaskCompleted(JSONObject result, boolean error, String message) {
                    try {
                        etBio.setText(result.getString("bio"));
                    } catch (JSONException e) {
                        Toast.makeText(getActivity(),e.getMessage().toString() , Toast.LENGTH_LONG).show();
                    } catch (Exception e) {
                        Toast.makeText(getActivity(),e.getMessage().toString() , Toast.LENGTH_LONG).show();
                    }
                }
            });
        }
        else
        {
            Toast.makeText(getActivity(), "You are not connected to Internet", Toast.LENGTH_LONG).show();
        }
    }


   private void setBio() {
        if (isOnline() == true) {
            String[] headersType = new String[3];
            String[] headersVal = new String[3];
            headersVal[0] = login.USERNAME;
            headersVal[1] = etBio.getText().toString();
            headersVal[2] =  "bearer " + login.TOKEN;
            headersType[0] = "username";
            headersType[1] = "bio";
            headersType[2] = "authentication";
            final serverLink sender = new serverLink(getActivity());
            sender.sendServerRequest(headersType, headersVal, "/api/edituserbio", true, new serverLink.OnDownloadTaskCompleted() {
                @Override
                public void onTaskCompleted(JSONObject result, boolean error, String message) {
                    try {
                         if (result.getString("result").contains("success")) {
                        Toast.makeText(getActivity(),result.getString("result"), Toast.LENGTH_LONG).show();
                         }
                    } catch (JSONException e) {
                        Toast.makeText(getActivity(),e.getMessage().toString() , Toast.LENGTH_LONG).show();
                        // tvReturn.setText(e.getMessage().toString());
                    } catch (Exception e) {
                        Toast.makeText(getActivity(),e.getMessage().toString() , Toast.LENGTH_LONG).show();
                        // tvReturn.setText(e.getMessage().toString());
                    }
                }
            });
        }
        else
        {
            Toast.makeText(getActivity(), "You are not connected to Internet", Toast.LENGTH_LONG).show();
        }
    }

    protected boolean isOnline() {

        ConnectivityManager cm = (ConnectivityManager) getActivity().getSystemService(Context.CONNECTIVITY_SERVICE);

        NetworkInfo netInfo = cm.getActiveNetworkInfo();

        if (netInfo != null && netInfo.isConnectedOrConnecting()) {

            return true;

        } else {

            return false;

        }

    }
}
