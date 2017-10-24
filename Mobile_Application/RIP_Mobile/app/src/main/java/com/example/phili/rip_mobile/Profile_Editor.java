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

public class Profile_Editor extends Fragment {


    TextView username;
    EditText etBio;
    TextView coins;
    ImageView enableEdit;
    ImageView ivSave;
    EditText etCountry;
    EditText etCity;
    EditText etPostal;
    EditText etAdline1;
    EditText etAdline2;
    boolean useable;

    public Profile_Editor() {
        // Required empty public constructor

    }
    @Override
    public View onCreateView(LayoutInflater inflater, ViewGroup container,
                             Bundle savedInstanceState) {
        // Inflate the layout for this fragment
        View v =  inflater.inflate(R.layout.fragment_profile__editor, container, false);
        enableEdit = v.findViewById(R.id.edtprofile);
        etBio = v.findViewById(R.id.etBio);
        coins = v.findViewById(R.id.tvCoins);
        username = v.findViewById(R.id.uname);
        ivSave = v.findViewById(R.id.savprofile);
        etCountry = v.findViewById(R.id.etCountry);
        etCity = v.findViewById(R.id.etCity);
        etPostal = v.findViewById(R.id.etPostalCodes);
        etAdline1 = v.findViewById(R.id.etAdl1);
        etAdline2= v.findViewById(R.id.etAdl2);
        username.setText(login.USERNAME);
        getBio();
        getAddress();
        disableText();

        enableEdit.setOnClickListener(new View.OnClickListener() {
            public void onClick(View v) {
                if (useable== false)
                {
                    enableText();
                }
                else
                    Toast.makeText(getActivity(), "Already enabled", Toast.LENGTH_SHORT).show();
            }
        });

        coins.setText(login.COINS);


        if (isOnline()==true) {


            ivSave.setOnClickListener(new View.OnClickListener() {
                public void onClick(View v) {
                    if (etBio.getText().toString().matches(""))
                        Toast.makeText(getActivity(), "Please enter a bio", Toast.LENGTH_SHORT).show();
                    else
                        setBio();

                    if (etCountry.getText().toString().matches(""))
                        Toast.makeText(getActivity(), "Please enter a country", Toast.LENGTH_SHORT).show();
                    else
                    if (etCity.getText().toString().matches(""))
                        Toast.makeText(getActivity(), "Please enter a city", Toast.LENGTH_SHORT).show();
                    else
                    if (etPostal.getText().toString().matches(""))
                        Toast.makeText(getActivity(), "Please enter a postal code", Toast.LENGTH_SHORT).show();
                    else
                    if (etAdline1.getText().toString().matches(""))
                        Toast.makeText(getActivity(), "Please enter a addressline 1", Toast.LENGTH_SHORT).show();
                    else
                    if (etAdline2.getText().toString().matches(""))
                        Toast.makeText(getActivity(), "Please enter a addressline 2", Toast.LENGTH_SHORT).show();
                    else
                        setAddress();

                    disableText();
                }
            });}
        else
            Toast.makeText(getActivity(), "You are not connected to Internet", Toast.LENGTH_LONG).show();

        return v;
    }


    private void disableText()
    {
        etBio.setFocusable(false);
        etBio.setClickable(false);
        etCountry.setFocusable(false);
        etCountry.setClickable(false);
        etCity.setFocusable(false);
        etCity.setClickable(false);
        etPostal.setFocusable(false);
        etPostal.setClickable(false);
        etAdline1.setFocusable(false);
        etAdline1.setClickable(false);
        etAdline2.setFocusable(false);
        etAdline2.setClickable(false);
        useable = false;

    }


    private void enableText(){
        etBio.setFocusableInTouchMode(true);
        etBio.setClickable(true);
        etCountry.setFocusableInTouchMode(true);
        etCountry.setClickable(true);
        etCity.setFocusableInTouchMode(true);
        etCity.setClickable(true);
        etPostal.setFocusableInTouchMode(true);
        etPostal.setClickable(true);
        etAdline1.setFocusableInTouchMode(true);
        etAdline1.setClickable(true);
        etAdline2.setFocusableInTouchMode(true);
        etAdline2.setClickable(true);
        useable = true;
        Toast.makeText(getActivity(), "Enabled", Toast.LENGTH_LONG).show();

    }
    private void getAddress()
    {
        if (isOnline() == true) {
            String[] headersType = new String[1];
            String[] headersVal = new String[1];
            headersVal[0] = login.USERID;
            headersType[0] = "userid";
            final serverLink sender = new serverLink(getActivity());
            sender.sendServerRequest(headersType, headersVal, "/api/getaddress", false, new serverLink.OnDownloadTaskCompleted() {
                @Override
                public void onTaskCompleted(JSONObject result, boolean error, String message) {
                    try {
                        etCountry.setText(result.getString("Country"));
                        etCity.setText(result.getString("City"));
                        etPostal.setText(result.getString("PostalCode"));
                        etAdline1.setText(result.getString("AddressLine1"));
                        etAdline2.setText(result.getString("AddressLine2"));
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

    private void setAddress() {
        if (isOnline() == true) {
            String[] headersType = new String[6];
            String[] headersVal = new String[6];
            headersVal[0] = login.USERID;
            headersVal[1] = etCountry.getText().toString();
            headersVal[2] = etCity.getText().toString();
            headersVal[3] = etPostal.getText().toString();
            headersVal[4] = etAdline1.getText().toString();
            headersVal[5] =  etAdline2.getText().toString();


            headersType[0] = "userid";
            headersType[1] = "country";
            headersType[2] = "city";
            headersType[3] = "postalcode";
            headersType[4] = "addline1";
            headersType[5] = "addline2";


            final serverLink sender = new serverLink(getActivity());
            sender.sendServerRequest(headersType, headersVal, "/api/setaddress", true, new serverLink.OnDownloadTaskCompleted() {
                @Override
                public void onTaskCompleted(JSONObject result, boolean error, String message) {
                    try {
                        if (result.getString("result").contains("success")) {
                            Toast.makeText(getActivity(),"Address Updated", Toast.LENGTH_LONG).show();
                        }
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
                            Toast.makeText(getActivity(),"Bio updated", Toast.LENGTH_LONG).show();
                        }
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
