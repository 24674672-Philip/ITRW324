package com.example.phili.rip_mobile;

import android.content.Context;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.ArrayAdapter;
import android.widget.BaseAdapter;
import android.widget.TextView;

import java.util.ArrayList;

/**
 * Created by tcjvr on 2017/10/07.
 */

public class SongListAdapter extends BaseAdapter {

    Context c;
    ArrayList<SongDetails> songs;

    public SongListAdapter(Context c, ArrayList<SongDetails> songs)
    {
        this.c = c;
        this.songs = songs;
    }
    @Override
    public int getCount() {
        return songs.size();
    }

    @Override
    public Object getItem(int i) {
        return songs.get(i);
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
            convertView = layoutInflater.inflate(R.layout.songlisttemp,parent,false);
        }
        TextView title = convertView.findViewById(R.id.titlesong);
        TextView artist = convertView.findViewById(R.id.artistsong);
        TextView duration = convertView.findViewById(R.id.durationsong);

        title.setText(songs.get(i).getTitle());
        artist.setText(songs.get(i).getArtist());
        duration.setText(songs.get(i).getDuration());

        return convertView;
    }
}
