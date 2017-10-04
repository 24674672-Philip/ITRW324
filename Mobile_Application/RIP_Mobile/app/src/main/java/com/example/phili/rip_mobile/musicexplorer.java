package com.example.phili.rip_mobile;

import android.content.Intent;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.widget.GridView;
import android.widget.TabHost;

import java.util.ArrayList;

public class musicexplorer extends AppCompatActivity  {

    private  TabHost mTabHost;
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_musicexplorer);

        mTabHost = (TabHost)findViewById(R.id.tabHost);
       mTabHost.setup();

       TabHost.TabSpec spec;


        //Album

        spec = mTabHost.newTabSpec("album")
                .setIndicator("Albums")
                .setContent(R.id.albumsgrid);
        mTabHost.addTab(spec);

        //Artist

        spec = mTabHost.newTabSpec("artist")
                .setIndicator("Artists")
                .setContent(R.id.artistsgrid);
        mTabHost.addTab(spec);

        //Genre

        spec = mTabHost.newTabSpec("genre")
                .setIndicator("Genres")
                .setContent(R.id.genresgrid);
        mTabHost.addTab(spec);
        //Songs

        spec = mTabHost.newTabSpec("songs")
                .setIndicator("Songs")
                .setContent(R.id.songsgrid);
        mTabHost.addTab(spec);


        GridView gv1 = (GridView)findViewById(R.id.albumsgrid);
        GridView gv2 = (GridView)findViewById(R.id.artistsgrid);
        GridView gv3 = (GridView)findViewById(R.id.genresgrid);
        GridView gv4 = (GridView)findViewById(R.id.songsgrid);

      Adapter adapter = new Adapter(this,getAlbums());
        gv1.setAdapter(adapter);


    }
    String[] name = {"art1","art2","art3","art4","art5","art6","art7","art1","art2","art3","art4","art5","art6","art7"};
    int[] images = {R.drawable.defaultsong,R.drawable.defaultsong,R.drawable.defaultsong,
            R.drawable.defaultsong,R.drawable.defaultsong,R.drawable.defaultsong,R.drawable.defaultsong,R.drawable.defaultsong,R.drawable.defaultsong,R.drawable.defaultsong,
            R.drawable.defaultsong,R.drawable.defaultsong,R.drawable.defaultsong,R.drawable.defaultsong};

    private ArrayList<Albums> getAlbums()
    {
        ArrayList<Albums> albums = new ArrayList<Albums>();
        for (int i=0;i<=13;i++)
        {
            albums.add(new Albums(name[i],images[i]));
        }



        return  albums;
    }



}
