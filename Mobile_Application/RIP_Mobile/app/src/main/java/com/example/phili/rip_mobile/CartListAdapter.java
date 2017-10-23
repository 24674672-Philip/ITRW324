package com.example.phili.rip_mobile;

import android.content.Context;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.BaseAdapter;
import android.widget.TextView;

import java.util.ArrayList;

/**
 * Created by tcjvr on 2017/10/07.
 */

public class CartListAdapter extends BaseAdapter {

    Context c;
    ArrayList<CartDetails> items;

    public CartListAdapter(Context c, ArrayList<CartDetails> items)
    {
        this.c = c;
        this.items = items;
    }
    @Override
    public int getCount() {
        return items.size();
    }

    @Override
    public Object getItem(int i) {
        return items.get(i);
    }

    @Override
    public long getItemId(int i) {
        return 0;
    }

    @Override
    public View getView(int i, View convertView, ViewGroup parent) {
        LayoutInflater layoutInflater = (LayoutInflater) c.getSystemService(Context.LAYOUT_INFLATER_SERVICE);
        if (convertView==null)
        {
            convertView = layoutInflater.inflate(R.layout.cartlisttemp,parent,false);
        }
        TextView title = convertView.findViewById(R.id.titlesong);
        TextView artist = convertView.findViewById(R.id.artistsong);
        TextView price = convertView.findViewById(R.id.price);

        title.setText(items.get(i).getTitle());
        artist.setText(items.get(i).getArtist());
        price.setText(items.get(i).getPrice());

        return convertView;
    }
}
