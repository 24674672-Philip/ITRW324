package com.example.phili.rip_mobile;


import android.os.Bundle;
import android.support.v4.app.Fragment;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.ListView;

import java.util.ArrayList;


/**
 * A simple {@link Fragment} subclass.
 */
public class Song_List extends Fragment {


    public Song_List() {
        // Required empty public constructor
    }


    @Override
    public View onCreateView(LayoutInflater inflater, ViewGroup container,
                             Bundle savedInstanceState) {
        // Inflate the layout for this fragment
        View v = inflater.inflate(R.layout.fragment_song__list, container, false);



        ArrayList<SongDetails> songs = new ArrayList<SongDetails>();
        ListView listView = (ListView) v.findViewById(R.id.listsongs);

        for (int i = 0; i <= 10; i++) {
            songs.add(new SongDetails("Title", "Artist","Album","00:00"));
        }

        SongListAdapter adapter = new SongListAdapter(getActivity(),songs);
        listView.setAdapter(adapter);

        return  v;
    }

}
