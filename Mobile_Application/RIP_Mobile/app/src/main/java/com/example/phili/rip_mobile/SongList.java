package com.example.phili.rip_mobile;

import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.widget.ArrayAdapter;
import android.widget.ListView;

import java.util.ArrayList;

public class SongList extends AppCompatActivity {


    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_song_list);

        ArrayList<SongDetails> songs = new ArrayList<SongDetails>();
        ListView listView = (ListView) findViewById(R.id.listsongs);

        for (int i = 0; i <= 10; i++) {
            songs.add(new SongDetails("Title", "Artist", "00:00"));
        }

        SongListAdapter adapter = new SongListAdapter(this,songs);
        listView.setAdapter(adapter);


    }
}
