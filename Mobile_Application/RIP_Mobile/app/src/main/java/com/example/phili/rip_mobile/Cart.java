package com.example.phili.rip_mobile;


import android.os.Bundle;
import android.support.v4.app.Fragment;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.ListView;
import android.widget.TextView;

import java.util.ArrayList;


public class Cart extends Fragment {


    public Cart() {
        // Required empty public constructor
    }


    @Override
    public View onCreateView(LayoutInflater inflater, ViewGroup container,
                             Bundle savedInstanceState) {
        // Inflate the layout for this fragment
        View v = inflater.inflate(R.layout.fragment_cart2, container, false);


        TextView coins;
        coins = (TextView)v.findViewById(R.id.tvCoins2);
        coins.setText(login.COINS);

        ArrayList<CartDetails> items = new ArrayList<CartDetails>();
        ListView listView = (ListView) v.findViewById(R.id.listcart);

        for (int i = 0; i <= 10; i++) {
            items.add(new CartDetails("Title", "Artist","Album", "0"));
        }

        CartListAdapter adapter = new CartListAdapter(getActivity(),items);
        listView.setAdapter(adapter);

        return  v;
    }

}
