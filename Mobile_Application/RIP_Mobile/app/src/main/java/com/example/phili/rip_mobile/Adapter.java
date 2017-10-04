package com.example.phili.rip_mobile;

import android.content.Context;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.BaseAdapter;
import android.widget.ImageButton;
import android.widget.ImageView;
import android.widget.TextView;

import java.util.ArrayList;

/**
 * Created by tcjvr on 2017/10/04.
 */

public class Adapter extends BaseAdapter{

    Context c;
    ArrayList<Albums> albums;

    public Adapter(Context c, ArrayList<Albums> album) {
        this.c = c;
        this.albums = album;
    }

    @Override
    public int getCount() {
        return albums.size();
    }

    @Override
    public Object getItem(int pos) {
        return albums.get(pos);
    }

    @Override
    public long getItemId(int i) {
        return 0;
    }

    @Override
    public View getView(int pos, View convertView, ViewGroup parent) {

        LayoutInflater layoutInflater = (LayoutInflater) c.getSystemService(Context.LAYOUT_INFLATER_SERVICE);
       if (convertView==null)
       {
           convertView = layoutInflater.inflate(R.layout.arttemplate,parent,false);
       }

        ImageView img =  convertView.findViewById(R.id.Art);
        TextView name = convertView.findViewById(R.id.Description);

        img.setImageResource(albums.get(pos).getImg());
        name.setText(albums.get(pos).getName());
        return convertView;
    }
}
